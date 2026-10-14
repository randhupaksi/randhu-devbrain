// Read-only scorecard validation. Valid structure is not proof that evidence is truthful.
const fs = require('node:fs'), path = require('node:path');
const { loadInputs } = require('./prepare-smoke.cjs');
const { compareScorecards, privateText, safeRelative } = require('./results-contract.cjs');
function inspectResults(directory, inputs) {
  const root = path.resolve(__dirname, '..'), requested = path.resolve(directory), relativeInput = path.relative(root, requested).replaceAll('\\', '/');
  if (!safeRelative(relativeInput) || !relativeInput.startsWith('local/behavior-runs/') || !relativeInput.endsWith('/evaluator')) throw new Error('Results must be a repository-local smoke evaluator directory');
  let component = root;
  for (const part of relativeInput.split('/')) {
    component = path.join(component, part);
    if (fs.lstatSync(component).isSymbolicLink()) throw new Error('Linked evaluator directory is unsupported');
  }
  const evaluator = fs.realpathSync(requested), cardsDirectory = path.join(evaluator, 'cards');
  const resolvedRelative = path.relative(fs.realpathSync(root), evaluator);
  if (!resolvedRelative || resolvedRelative.startsWith('..') || path.isAbsolute(resolvedRelative)) throw new Error('Evaluator must resolve inside the repository');
  if (fs.lstatSync(cardsDirectory).isSymbolicLink()) throw new Error('Linked scorecard directory is unsupported');
  const cards = [], parseErrors = [];
  for (const file of fs.readdirSync(cardsDirectory).filter(file => file.endsWith('.yaml')).sort()) {
    const target = path.join(cardsDirectory, file);
    if (fs.lstatSync(target).isSymbolicLink()) throw new Error('Linked scorecard is unsupported');
    try { cards.push(inputs.yaml.load(fs.readFileSync(target, 'utf8'))); }
    catch { parseErrors.push('Invalid scorecard YAML'); }
  }
  const report = compareScorecards(cards, inputs.suite, inputs.contract);
  report.errors.push(...parseErrors);
  for (const item of inputs.suite.cases) for (const host of inputs.suite.hosts) if (!cards.some(card => card?.scenario_id === item.scenario_id && card?.host === host)) report.errors.push('Missing scorecard: ' + item.scenario_id + '/' + host);
  // Resolve artifacts only after validating their relative syntax.
  if (report.errors.length === 0) for (const card of cards) for (const observation of card.observations) if (observation.artifact) {
    let target = evaluator;
    for (const part of observation.artifact.split('/')) {
      target = path.join(target, part);
      if (!fs.existsSync(target) || fs.lstatSync(target).isSymbolicLink()) { report.errors.push('Unavailable or linked evidence artifact'); break; }
    }
    if (fs.existsSync(target)) {
      const relative = path.relative(evaluator, fs.realpathSync(target));
      if (!relative || relative.startsWith('..') || path.isAbsolute(relative) || !fs.statSync(target).isFile()) report.errors.push('Evidence artifact escapes evaluator scope or is not a file');
      else if (privateText(fs.readFileSync(target, 'utf8'))) report.errors.push('Sensitive path/key candidate in evidence artifact');
    }
  }
  if (report.errors.length) for (const item of report.comparisons) { item.native_comparable = false; item.both_pass = false; item.native_sessions_started = 0; }
  return { ...report, scorecards: cards.length, native_sessions_started: report.comparisons.reduce((total, item) => total + item.native_sessions_started, 0), preflight_blocked: report.errors.length ? 0 : cards.filter(card => card.execution_stage === 'preflight' && card.status === 'BLOCKED').length, native_comparable_cases: report.comparisons.filter(item => item.native_comparable).length, native_both_pass_cases: report.comparisons.filter(item => item.both_pass).length };
}
if (require.main === module) {
  if (!process.argv[2]) { console.error('Supply the prepared batch evaluator directory. See evaluation/README.md.'); process.exit(2); }
  try {
    const report = inspectResults(process.argv[2], loadInputs(process.argv[3]));
    console.log(JSON.stringify(report, null, 2));
    if (report.errors.length) process.exit(1);
  } catch {
    console.error('Result validation unavailable: check the repository-local evaluator directory and YAML prerequisites.');
    process.exit(2);
  }
}
module.exports = { inspectResults };
