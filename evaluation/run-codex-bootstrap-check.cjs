// Fresh, read-only Codex CLI check for automatic global DevBrain bootstrap discovery.
// This deliberately does not paste the baseline into the prompt and never auto-grades behavior.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const os = require('node:os');
const crypto = require('node:crypto');
const { captureSession, fileSnapshot, snapshotChanges, sanitizeArtifact } = require('./run-codex-case.cjs');

const root = path.resolve(__dirname, '..');
const prompt = [
  'This is a fresh, read-only bootstrap discovery check.',
  'Do not inspect, read, search, or execute files or tools.',
  'Based only on developer guidance already present in this session, summarize any instructions it gives about when and how to load or reuse itself.',
  'If that rule is not present in your startup context, answer unknown.'
].join(' ');

function ensureLocalRoot(localRoot = path.join(root, 'local')) {
  fs.mkdirSync(localRoot, { recursive: true });
  if (fs.lstatSync(localRoot).isSymbolicLink()) throw new Error('Linked local fixture root is unsupported');
  const absolute = fs.realpathSync(localRoot);
  const relative = path.relative(fs.realpathSync(root), absolute);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative) || fs.lstatSync(absolute).isSymbolicLink()) {
    throw new Error('Local fixture root must resolve inside the repository');
  }
  return absolute;
}

function buildArguments(project, model) {
  return [
    'exec', '--json', '--ephemeral', '--ignore-user-config',
    '--model', model, '--sandbox', 'read-only',
    '--config', 'model_reasoning_effort="low"',
    '--config', 'approval_policy="never"',
    '--config', 'windows.sandbox="unelevated"',
    '-C', project, '-'
  ];
}

function summarizeEvents(stdout) {
  const events = [], unparsedLines = [];
  for (const line of stdout.split(/\r?\n/).filter(Boolean)) {
    try { events.push(JSON.parse(line)); } catch { unparsedLines.push(line); }
  }
  const messages = events
    .filter(event => event.type === 'item.completed' && event.item?.type === 'agent_message')
    .map(event => event.item.text)
    .filter(value => typeof value === 'string');
  const itemTypes = events
    .filter(event => event.item?.type)
    .map(event => event.item.type);
  return {
    event_types: [...new Set(events.map(event => event.type).filter(Boolean))],
    item_types: [...new Set(itemTypes)],
    messages,
    turn_completed: events.some(event => event.type === 'turn.completed'),
    parsed_event_count: events.length,
    unparsed_line_count: unparsedLines.length
  };
}

async function run(options) {
  if (options?.allowProfileRuntime !== true) throw new Error('Codex profile/runtime use requires explicit authorization');
  if (!/^[a-zA-Z0-9._-]+$/.test(options.model || '') || !/^[0-9.]+$/.test(options.cliVersion || '')) throw new Error('Provide the observed Codex model label and CLI version');
  if (typeof options.observedOn !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(options.observedOn) || Number.isNaN(Date.parse(options.observedOn))) throw new Error('Provide an ISO observation date');

  const local = ensureLocalRoot();
  const runRoot = path.join(local, 'cli-host-runs', 'codex-bootstrap-' + Date.now() + '-' + crypto.randomBytes(4).toString('hex'));
  const project = path.join(runRoot, 'project');
  fs.mkdirSync(project, { recursive: true });
  cp.execFileSync('git', ['-C', project, 'init', '--quiet'], { cwd: root, stdio: 'ignore' });

  const args = buildArguments(project, options.model);
  const before = fileSnapshot(project);
  const captured = await captureSession(options.executable || 'codex', args, prompt, project, options.timeoutMs || 90000);
  const changes = snapshotChanges(before, fileSnapshot(project));
  const summary = summarizeEvents(captured.stdout);
  const substitutions = [[project, '<PROJECT>'], [root, '<DEVBRAIN_ROOT>'], [os.homedir(), '<USER_PROFILE>']];
  const receipt = {
    schema: 'devbrain-cli-bootstrap-check',
    version: 1,
    candidate: '2.7.0-rc.1',
    host: 'Codex CLI',
    cli_version: options.cliVersion,
    requested_model: options.model,
    requested_effort: 'low',
    observed_on: options.observedOn,
    session_mode: 'fresh one-shot, ephemeral, user config excluded',
    sandbox: 'read-only',
    baseline_injected_by_evaluator: false,
    turn_completed: summary.turn_completed,
    exit_code: captured.exitCode,
    timed_out: captured.timedOut,
    startup_error: captured.error,
    event_types: summary.event_types,
    item_types: summary.item_types,
    changed_files: changes.changed,
    removed_files: changes.removed,
    parsed_event_count: summary.parsed_event_count,
    unparsed_line_count: summary.unparsed_line_count,
    assistant_messages: summary.messages,
    status: summary.turn_completed && changes.changed.length === 0 && changes.removed.length === 0 ? 'needs_human_review' : 'blocked',
    scoring_note: 'A captured response is not an automatic PASS. Review whether the startup context supplied the rule without file reads or evaluator injection.'
  };
  const reportFile = path.join(runRoot, 'receipt.json');
  fs.writeFileSync(reportFile, sanitizeArtifact(receipt, substitutions), { flag: 'wx' });
  return {
    status: receipt.status,
    turn_completed: receipt.turn_completed,
    timed_out: receipt.timed_out,
    exit_code: receipt.exit_code,
    receipt: path.relative(root, reportFile).replaceAll('\\', '/')
  };
}

if (require.main === module) {
  if (process.argv[2] !== '--run' || process.argv[3] !== '--allow-profile-runtime') {
    console.error('Explicit --run and --allow-profile-runtime flags are required after user authorization.');
    process.exit(2);
  }
  const [model, observedOn, cliVersion] = process.argv.slice(4);
  run({ allowProfileRuntime: true, model, observedOn, cliVersion })
    .then(result => console.log(JSON.stringify(result)))
    .catch(error => {
      console.error('Codex bootstrap check unavailable: ' + String(error.message || 'unknown failure').replace(/[A-Za-z]:[\\/][^\s]+/g, '<HOST_PATH>'));
      process.exitCode = 2;
    });
}

module.exports = { ensureLocalRoot, buildArguments, summarizeEvents, prompt, run };
