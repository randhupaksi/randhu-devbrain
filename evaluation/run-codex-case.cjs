// Explicit manual native evaluation. Requires separate user authorization for profile runtime/cache writes.
// Never auto-grades model behavior. Store only sanitized evidence inside the prepared evaluator directory.
const fs = require('node:fs'), path = require('node:path'), cp = require('node:child_process'), crypto = require('node:crypto'), os = require('node:os');
const { loadInputs, fingerprintTree, profileFingerprint } = require('./prepare-smoke.cjs');
const { inspectResults } = require('./validate-results.cjs');
const { privateText } = require('./results-contract.cjs');
const root = path.resolve(__dirname, '..');
function sanitize(value, substitutions = []) {
  if (Array.isArray(value)) return value.map(item => sanitize(item, substitutions));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, /^(access_token|refresh_token|api_key|password|authorization)$/i.test(key) ? '<REDACTED>' : sanitize(item, substitutions)]));
  if (typeof value !== 'string') return value;
  let text = value;
  for (const [source, replacement] of [...substitutions].sort((a, b) => b[0].length - a[0].length)) if (source) for (const variant of [source, source.replaceAll('\\', '/'), source.replaceAll('/', '\\')]) text = text.split(variant).join(replacement);
  text = text.replace(/(?<![A-Za-z0-9])[A-Za-z]:[\\/][^\r\n"'`<>]*/g, '<HOST_PATH>').replace(/(?:\/Users\/|\/home\/)[A-Za-z0-9_-]+[^\r\n"'`<>]*/g, '<HOST_PATH>');
  text = text.replace(/Bearer\s+\S+/gi, 'Bearer <REDACTED>').replace(/sk-[A-Za-z0-9]{24,}|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}/g, '<REDACTED>');
  return privateText(text) ? '<REDACTED SENSITIVE STRING>' : text;
}
function fileSnapshot(project) {
  const rows = [];
  function walk(directory, prefix = '') {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
      if (entry.name === '.git') continue;
      const target = path.join(directory, entry.name), relative = prefix + entry.name;
      if (fs.lstatSync(target).isSymbolicLink()) throw new Error('Linked fixture content unsupported');
      if (entry.isDirectory()) walk(target, relative + '/');
      else if (entry.isFile()) rows.push({ path: relative, sha256: crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex') });
    }
  }
  walk(project); return rows;
}
function snapshotChanges(before, after) {
  const previous = new Map(before.map(item => [item.path, item.sha256])), current = new Map(after.map(item => [item.path, item.sha256]));
  return { changed: after.filter(item => previous.get(item.path) !== item.sha256).map(item => item.path), removed: before.filter(item => !current.has(item.path)).map(item => item.path) };
}
function repositorySnapshot() {
  const files = cp.execFileSync('git', ['-C', root, 'ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
  return [...new Set(files)].sort().filter(file => fs.existsSync(path.join(root, file))).map(file => {
    const target = path.join(root, file);
    if (fs.lstatSync(target).isSymbolicLink()) throw new Error('Linked repository source unsupported');
    return { path: file, sha256: crypto.createHash('sha256').update(fs.readFileSync(target)).digest('hex') };
  });
}
function nativeArguments(project, model, effort, sandbox) {
  const temporary = path.join(project, '.native-temp').replaceAll('\\', '/');
  const localTemporary = '{TEMP=' + JSON.stringify(temporary) + ',TMP=' + JSON.stringify(temporary) + ',TMPDIR=' + JSON.stringify(temporary) + '}';
  return ['exec', '--json', '--ephemeral', '--ignore-user-config', '--skip-git-repo-check', '--model', model, '--sandbox', sandbox, '--config', 'model_reasoning_effort="' + effort + '"', '--config', 'approval_policy="never"', '--config', 'windows.sandbox="unelevated"', '--config', 'shell_environment_policy.ignore_default_excludes=false', '--config', 'shell_environment_policy.set=' + localTemporary, '--config', 'sandbox_workspace_write.exclude_tmpdir_env_var=true', '--config', 'sandbox_workspace_write.exclude_slash_tmp=true', '--config', 'sandbox_workspace_write.network_access=false', '-C', project, '-'];
}
function captureSession(executable, args, prompt, cwd, timeoutMs = 240000) {
  return new Promise(resolve => {
    const child = cp.spawn(executable, args, { cwd, env: process.env, stdio: ['pipe', 'pipe', 'pipe'], windowsHide: true });
    let stdout = '', stderr = '', timedOut = false, error = null, hardStopTimer, settled = false;
    function finish(exitCode, signal) {
      if (settled) return; settled = true;
      clearTimeout(timer); clearTimeout(hardStopTimer);
      resolve({ stdout, stderr, exitCode, signal, timedOut, error });
    }
    const timer = setTimeout(() => {
      timedOut = true;
      // Terminate only the process tree created by this capture, never an unrelated host/browser.
      if (process.platform === 'win32' && child.pid) cp.execFile('taskkill', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true }, failure => { if (failure) { error = 'Owned process-tree termination was denied'; child.kill(); } });
      else child.kill();
      hardStopTimer = setTimeout(() => {
        error ||= 'Owned process-tree termination could not be confirmed';
        child.stdout.destroy(); child.stderr.destroy(); child.stdin.destroy(); child.kill(); child.unref();
        finish(child.exitCode, child.signalCode);
      }, 5000);
    }, timeoutMs);
    child.stdout.on('data', chunk => { stdout += chunk.toString(); });
    child.stderr.on('data', chunk => { stderr += chunk.toString(); });
    child.on('error', () => { error = 'Native executable failed to start'; });
    child.on('close', finish);
    child.stdin.on('error', () => {}); child.stdin.end(prompt);
  });
}
async function runCase(directory, scenarioId, options) {
  if (options?.allowProfileRuntime !== true) throw new Error('Profile runtime writes require explicit authorization');
  if (!/^[a-zA-Z0-9._-]+$/.test(options.model || '') || !['low', 'medium', 'high', 'xhigh'].includes(options.effort || 'medium')) throw new Error('Provide the authorized host model and effort');
  if (typeof options.observedOn !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(options.observedOn) || Number.isNaN(Date.parse(options.observedOn)) || new Date(options.observedOn).toISOString().slice(0, 10) !== options.observedOn || (options.cliVersion && !/^[0-9.]+$/.test(options.cliVersion))) throw new Error('Invalid observation metadata');
  const inputs = loadInputs(), checked = inspectResults(directory, inputs);
  if (checked.errors.length || !inputs.suite.cases.some(item => item.scenario_id === scenarioId)) throw new Error('Invalid batch/case');
  const evaluator = fs.realpathSync(directory), batch = path.dirname(evaluator);
  const index = inputs.yaml.load(fs.readFileSync(path.join(evaluator, 'index.yaml'), 'utf8'));
  if (!index.native_context_setup) throw new Error('Prepare native-context inputs for both hosts first');
  const entry = index.entries.find(item => item.host === 'codex' && item.scenario_id === scenarioId);
  const expectedProject = 'codex/' + scenarioId + '/project', expectedPrompt = 'codex/' + scenarioId + '/prompt.txt';
  if (!entry || entry.project !== expectedProject || entry.prompt !== expectedPrompt) throw new Error('Unexpected case paths');
  const project = path.join(batch, entry.project), prompt = fs.readFileSync(path.join(batch, entry.prompt), 'utf8');
  const cardFile = path.join(evaluator, 'cards', 'codex-' + scenarioId + '.yaml'), card = inputs.yaml.load(fs.readFileSync(cardFile, 'utf8'));
  assertProfileFingerprint(card.profile_fingerprint, profileFingerprint());
  if (card.status !== 'NOT_RUN' || card.execution_stage !== 'unattempted' || fingerprintTree(project, prompt) !== card.fixture_fingerprint) throw new Error('Do not overwrite an attempt or run drifted inputs');
  const evidenceRoot = path.join(evaluator, 'evidence');
  if (!fs.existsSync(evidenceRoot)) fs.mkdirSync(evidenceRoot);
  if (fs.lstatSync(evidenceRoot).isSymbolicLink()) throw new Error('Linked evidence directory unsupported');
  const caseEvidence = path.join(evidenceRoot, 'codex-' + scenarioId); fs.mkdirSync(caseEvidence);
  fs.mkdirSync(path.join(project, '.native-temp')); // Exclusive fixture-local tool TEMP; host authentication/profile stays untouched.
  const before = fileSnapshot(project), sourceBefore = repositorySnapshot(), sandbox = ['08-api-breaking', '12-git-list', '47-handoff-read-only', '50-resume-latest-intent', '51-resume-unsupported-approval', '52-handoff-validation-honesty'].includes(scenarioId) ? 'read-only' : 'workspace-write';
  const args = nativeArguments(project, options.model, options.effort || 'medium', sandbox);
  const captured = await captureSession(options.executable || 'codex', args, prompt, project, options.timeoutMs);
  const events = [], unparsed = [];
  for (const line of captured.stdout.split(/\r?\n/).filter(Boolean)) { try { events.push(JSON.parse(line)); } catch { unparsed.push(line); } }
  const sessionStarted = events.some(event => event.type === 'thread.started' || event.type === 'session.started');
  const completed = events.some(event => event.type === 'turn.completed');
  const substitutions = [[project, '<PROJECT>'], [root, '<DEVBRAIN_ROOT>'], [os.homedir(), '<USER_PROFILE>']];
  const after = fileSnapshot(project), changes = snapshotChanges(before, after), sourceChanges = snapshotChanges(sourceBefore, repositorySnapshot()), evidence = { requested_model: options.model, reasoning_effort: options.effort || 'medium', sandbox, native_session_started: sessionStarted, turn_completed: completed, exit_code: captured.exitCode, timed_out: captured.timedOut, before, after, repository_source_changes: sourceChanges, events: sanitize(events, substitutions), stderr: sanitize(captured.stderr, substitutions), unparsed_stdout: sanitize(unparsed, substitutions), startup_error: captured.error };
  fs.writeFileSync(path.join(caseEvidence, 'trace.json'), JSON.stringify(evidence, null, 2));
  const artifact = 'evidence/codex-' + scenarioId + '/trace.json';
  Object.assign(card, { attempted: true, status: 'BLOCKED', execution_stage: sessionStarted ? 'session' : 'preflight', fresh_session: sessionStarted ? true : null, interface: 'Codex CLI' + (options.cliVersion ? ' ' + options.cliVersion : ' (version not captured)') + '; ephemeral fresh exec; user config excluded', model: sessionStarted ? options.model + ' (requested CLI model)' : null, observed_on: options.observedOn, failure_categories: ['host_limitation'], reason: completed ? 'Native response captured; semantic grading is pending.' : sessionStarted ? 'Native session initialized but no completed model response was captured.' : 'Native CLI did not initialize a model session.' });
  card.observations = [{ id: 'native-attempt', kind: 'environment', summary: sessionStarted ? 'Fresh Codex exec initialized; sanitized trace and file hashes captured; task scores pending review.' : 'CLI startup attempted without a confirmed model session; sanitized environment evidence captured.', artifact }];
  card.dimensions.routing_context = { status: 'BLOCKED', evidence: ['native-attempt'] };
  card.limitations = ['Unscored capture is not a behavioral PASS.', 'Personal paths and secret-like strings are redacted before persistence.', 'Requested model metadata is not a resolved backend model identifier.'];
  fs.writeFileSync(cardFile, inputs.yaml.dump(card, { lineWidth: -1 }));
  return { scenario_id: scenarioId, native_session_started: sessionStarted, turn_completed: completed, exit_code: captured.exitCode, timed_out: captured.timedOut, changed_files: changes.changed, removed_files: changes.removed, repository_source_changes: sourceChanges, artifact };
}
if (require.main === module) {
  if (process.argv[2] !== '--run' || process.argv[3] !== '--allow-profile-runtime') { console.error('Explicit --run and --allow-profile-runtime flags are required after user authorization.'); process.exit(2); }
  runCase(process.argv[4], process.argv[5], { allowProfileRuntime: true, model: process.argv[6], effort: 'medium', observedOn: process.argv[7], cliVersion: process.argv[8] }).then(result => console.log(JSON.stringify(result))).catch(() => { console.error('Native capture unavailable; inspect the local batch and authorization prerequisites.'); process.exitCode = 2; });
}
function assertProfileFingerprint(recorded, current) {
  if (recorded !== current) throw new Error('Operational profile changed; prepare a fresh batch');
}
module.exports = { sanitize, fileSnapshot, snapshotChanges, captureSession, runCase, assertProfileFingerprint, nativeArguments };
