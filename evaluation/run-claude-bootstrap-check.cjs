// Fresh, read-only Claude Code CLI check for user-level DevBrain bootstrap discovery.
// It does not paste expected policy into the prompt, enable tools, or auto-grade behavior.
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
  'If no such guidance is available, answer unknown.'
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

function buildArguments(project, model, effort = 'medium') {
  return [
    '--print', '--model', model, '--effort', effort,
    '--permission-mode', 'plan', '--no-session-persistence',
    '--setting-sources', 'user', '--tools', '', '--disallowedTools', 'mcp__*',
    '--strict-mcp-config', '--mcp-config', path.join(project, '.mcp-config.json'),
    '--output-format', 'json', prompt
  ];
}

function summarizeOutput(stdout) {
  try {
    const payload = JSON.parse(stdout.trim());
    return {
      parsed: true,
      response: typeof payload.result === 'string' ? payload.result : null,
      is_error: payload.is_error === true,
      has_session_identity: typeof payload.session_id === 'string',
      has_model_metadata: typeof payload.model === 'string'
    };
  } catch {
    return { parsed: false, response: null, is_error: false, has_session_identity: false, has_model_metadata: false };
  }
}

async function run(options) {
  if (options?.allowProfileRuntime !== true) throw new Error('Claude profile/runtime use requires explicit authorization');
  if (!/^[a-zA-Z0-9._-]+$/.test(options.model || '') || !['low', 'medium', 'high'].includes(options.effort || 'medium')) throw new Error('Provide a valid requested Claude model and effort');
  if (typeof options.observedOn !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(options.observedOn) || Number.isNaN(Date.parse(options.observedOn))) throw new Error('Provide an ISO observation date');
  if (!/^[0-9.]+$/.test(options.cliVersion || '')) throw new Error('Provide the observed Claude Code CLI version');

  const local = ensureLocalRoot();
  const runRoot = path.join(local, 'cli-host-runs', 'claude-bootstrap-' + Date.now() + '-' + crypto.randomBytes(4).toString('hex'));
  const project = path.join(runRoot, 'project');
  fs.mkdirSync(project, { recursive: true });
  cp.execFileSync('git', ['-C', project, 'init', '--quiet'], { cwd: root, stdio: 'ignore' });
  fs.writeFileSync(path.join(project, '.mcp-config.json'), JSON.stringify({ mcpServers: {} }), { flag: 'wx' });

  const before = fileSnapshot(project);
  const args = buildArguments(project, options.model, options.effort || 'medium');
  const captured = await captureSession(options.executable || 'claude', args, '', project, options.timeoutMs || 60000);
  const changes = snapshotChanges(before, fileSnapshot(project));
  const summary = summarizeOutput(captured.stdout);
  const substitutions = [[project, '<PROJECT>'], [root, '<DEVBRAIN_ROOT>'], [os.homedir(), '<USER_PROFILE>']];
  const receipt = {
    schema: 'devbrain-cli-bootstrap-check',
    version: 1,
    candidate: '2.7.0-rc.1',
    host: 'Claude Code CLI',
    cli_version: options.cliVersion,
    requested_model: options.model,
    requested_effort: options.effort || 'medium',
    observed_on: options.observedOn,
    session_mode: 'fresh one-shot, no session persistence, user settings only',
    permission_mode: 'plan',
    enabled_tools: [],
    baseline_injected_by_evaluator: false,
    response_captured: summary.parsed && typeof summary.response === 'string',
    output_error: summary.is_error,
    exit_code: captured.exitCode,
    timed_out: captured.timedOut,
    startup_error: captured.error,
    changed_files: changes.changed,
    removed_files: changes.removed,
    response: summary.response,
    status: summary.parsed && !summary.is_error && typeof summary.response === 'string' && changes.changed.length === 0 && changes.removed.length === 0 ? 'needs_human_review' : 'blocked',
    scoring_note: 'A captured response is not an automatic PASS. Review whether the user-level bootstrap supplied the rule without project-file reads or evaluator injection.'
  };
  const reportFile = path.join(runRoot, 'receipt.json');
  fs.writeFileSync(reportFile, sanitizeArtifact(receipt, substitutions), { flag: 'wx' });
  return {
    status: receipt.status,
    response_captured: receipt.response_captured,
    exit_code: receipt.exit_code,
    timed_out: receipt.timed_out,
    receipt: path.relative(root, reportFile).replaceAll('\\', '/')
  };
}

if (require.main === module) {
  if (process.argv[2] !== '--run' || process.argv[3] !== '--allow-profile-runtime') {
    console.error('Explicit --run and --allow-profile-runtime flags are required after user authorization.');
    process.exit(2);
  }
  const [model, effort, observedOn, cliVersion] = process.argv.slice(4);
  const executableIndex = process.argv.indexOf('--executable');
  const executable = executableIndex >= 0 ? process.argv[executableIndex + 1] : undefined;
  run({ allowProfileRuntime: true, model, effort, observedOn, cliVersion, executable })
    .then(result => console.log(JSON.stringify(result)))
    .catch(error => {
      console.error('Claude bootstrap check unavailable: ' + String(error.message || 'unknown failure').replace(/[A-Za-z]:[\\/][^\s]+/g, '<HOST_PATH>'));
      process.exitCode = 2;
    });
}

module.exports = { ensureLocalRoot, buildArguments, summarizeOutput, prompt, run };
