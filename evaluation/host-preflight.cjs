// Records supplied environment observations; never launches a host or grants execution authority.
const fs = require('node:fs'), path = require('node:path');
const { inspectResults } = require('./validate-results.cjs');
const { loadInputs } = require('./prepare-smoke.cjs');
const { validateScorecard, safeRelative, privateText } = require('./results-contract.cjs');
function assessHost(facts) {
  const checks = ['command_available', 'workspace_boundary_verified', 'fresh_session_setup_verified'];
  if (!facts || checks.some(key => ![true, false, null].includes(facts[key]))) throw new Error('Preflight facts require explicit boolean or unknown values');
  const reasons = [];
  if (facts.command_available !== true) reasons.push('Host command is unavailable or unverified.');
  if (facts.workspace_boundary_verified !== true) reasons.push('Runtime writes staying within the authorized boundary are unverified.');
  if (facts.fresh_session_setup_verified !== true) reasons.push('Fresh-session setup and evidence isolation are unverified.');
  return { ready: reasons.length === 0, reasons };
}
function recordPreflight(directory, inputs, receipt) {
  const initial = inspectResults(directory, inputs);
  if (initial.errors.length) throw new Error('Initial scorecards are invalid');
  if (receipt?.schema !== 'devbrain-host-preflight' || receipt.release !== inputs.suite.release || !Array.isArray(receipt.hosts)) throw new Error('Preflight receipt schema/release');
  const date = receipt.observed_on;
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date || privateText(JSON.stringify(receipt))) throw new Error('Invalid date or sensitive preflight receipt');
  const evaluator = fs.realpathSync(directory), prepared = [], targets = [];
  const receiptHosts = receipt.hosts.map(item => item.host);
  if (receiptHosts.length !== inputs.suite.hosts.length || new Set(receiptHosts).size !== receiptHosts.length || receiptHosts.some(host => !inputs.suite.hosts.includes(host))) throw new Error('One receipt per target host is required');
  for (const facts of receipt.hosts) {
    if (typeof facts.interface !== 'string' || !facts.interface.trim() || typeof facts.summary !== 'string' || !facts.summary.trim() || !safeRelative(facts.artifact)) throw new Error('Preflight evidence metadata');
    const assessment = assessHost(facts);
    for (const item of inputs.suite.cases) {
      const target = path.join(evaluator, 'cards', facts.host + '-' + item.scenario_id + '.yaml');
      const card = inputs.yaml.load(fs.readFileSync(target, 'utf8'));
      if (card.host !== facts.host || card.scenario_id !== item.scenario_id) throw new Error('Scorecard identity does not match its target');
      if (card.status !== 'NOT_RUN' || card.execution_stage !== 'unattempted') throw new Error('Preflight must not overwrite an existing attempt');
      if (!assessment.ready) {
        Object.assign(card, { attempted: true, status: 'BLOCKED', execution_stage: 'preflight', fresh_session: null, failure_categories: ['host_limitation'], interface: facts.interface, observed_on: receipt.observed_on, reason: assessment.reasons.join(' ') });
        card.observations = [{ id: 'host-preflight', kind: 'environment', summary: facts.summary, artifact: facts.artifact }];
        card.dimensions.routing_context = { status: 'BLOCKED', evidence: ['host-preflight'] };
        card.limitations = ['No model session was started. Preflight describes environment prerequisites only.'];
      } else card.reason = 'Preflight prerequisites recorded; no native session has been started.';
      if (validateScorecard(card, inputs.suite, inputs.contract).length) throw new Error('Preflight result violates scorecard contract');
      targets.push({ target, bytes: inputs.yaml.dump(card, { lineWidth: -1 }) });
    }
    prepared.push({ host: facts.host, ...assessment, native_session_started: false });
  }
  // Verify artifacts physically before any mutation, without following linked components.
  for (const facts of receipt.hosts) {
    let component = evaluator;
    for (const part of facts.artifact.split('/')) { component = path.join(component, part); if (!fs.existsSync(component) || fs.lstatSync(component).isSymbolicLink()) throw new Error('Preflight evidence artifact unavailable or linked'); }
    const relative = path.relative(evaluator, fs.realpathSync(component));
    if (!relative || relative.startsWith('..') || path.isAbsolute(relative) || !fs.statSync(component).isFile() || privateText(fs.readFileSync(component, 'utf8'))) throw new Error('Unsafe preflight evidence artifact');
  }
  for (const target of targets) fs.writeFileSync(target.target, target.bytes);
  return { hosts: prepared, scorecards: targets.length, native_sessions_started: 0 };
}
if (require.main === module) {
  try {
    if (!process.argv[2] || !process.argv[3]) throw new Error('Missing input');
    const inputs = loadInputs(process.argv[4]);
    const receipt = inputs.yaml.load(fs.readFileSync(process.argv[3], 'utf8'));
    console.log(JSON.stringify(recordPreflight(process.argv[2], inputs, receipt), null, 2));
  } catch { console.error('Preflight recording unavailable: check local scorecards, receipt and sanitized evidence.'); process.exit(2); }
}
module.exports = { assessHost, recordPreflight };
