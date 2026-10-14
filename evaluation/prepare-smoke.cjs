// Manual maintenance fixture preparation. Never starts a host or changes existing Git history.
const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto'), cp = require('node:child_process');
const { blankScorecard, safeRelative } = require('./results-contract.cjs');
const root = path.resolve(__dirname, '..');
function loadInputs(yamlModule) {
  const yaml = require(path.resolve(yamlModule || path.join(root, 'local/validation/node_modules/js-yaml')));
  const read = file => yaml.load(fs.readFileSync(path.join(root, file), 'utf8'));
  return { yaml, suite: read('evaluation/smoke-suite.yaml'), contract: read('evaluation/scorecard-contract.yaml'), scenarios: read('evaluation/scenarios.yaml').scenarios };
}
function ensureLocalDirectory(relative) {
  if (!safeRelative(relative) || !relative.startsWith('local/')) throw new Error('Fixture path must be repository-local');
  let current = root;
  for (const part of relative.split('/')) {
    current = path.join(current, part);
    try { if (fs.lstatSync(current).isSymbolicLink()) throw new Error('Linked fixture directory is unsupported'); }
    catch (error) { if (error.code !== 'ENOENT') throw error; fs.mkdirSync(current); }
    const resolved = path.relative(fs.realpathSync(root), fs.realpathSync(current));
    if (!resolved || resolved.startsWith('..') || path.isAbsolute(resolved) || !fs.statSync(current).isDirectory()) throw new Error('Fixture directory resolves outside the repository');
  }
  return current;
}
function sourceFiles(directory, prefix = '') {
  if (fs.lstatSync(directory).isSymbolicLink()) throw new Error('Linked source directory is unsupported');
  const relativeRoot = path.relative(fs.realpathSync(root), fs.realpathSync(directory));
  if (!relativeRoot || relativeRoot.startsWith('..') || path.isAbsolute(relativeRoot)) throw new Error('Source must resolve inside the repository');
  const files = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (entry.name === '.git') continue;
    const absolute = path.join(directory, entry.name), relative = prefix + entry.name;
    if (fs.lstatSync(absolute).isSymbolicLink()) throw new Error('Linked fixture/source content is unsupported');
    if (entry.isDirectory()) files.push(...sourceFiles(absolute, relative + '/'));
    else if (entry.isFile()) files.push({ relative, absolute });
  }
  return files;
}
function fingerprintTree(directory, extra = '') {
  const digest = crypto.createHash('sha256');
  for (const file of sourceFiles(directory)) digest.update(file.relative + '\0').update(fs.readFileSync(file.absolute)).update('\0');
  return digest.update(extra).digest('hex');
}
function profileFingerprint() {
  const digest = crypto.createHash('sha256');
  for (const directory of ['core', 'runtime', 'safety', 'workflows', 'prompts', 'skills']) digest.update(directory + '\0' + fingerprintTree(path.join(root, directory)));
  return digest.digest('hex');
}
function preparePack(inputs, name = 'smoke-' + crypto.randomUUID(), options = {}) {
  if (!/^smoke-[a-zA-Z0-9-]+$/.test(name)) throw new Error('Invalid fixture batch name');
  const parent = ensureLocalDirectory('local/behavior-runs');
  const batch = path.join(parent, name);
  fs.mkdirSync(batch); // Exclusive creation: never overwrite a previous user's run.
  const evaluator = path.join(batch, 'evaluator'), cards = path.join(evaluator, 'cards');
  fs.mkdirSync(cards, { recursive: true });
  const profileHash = profileFingerprint(), entries = [];
  for (const item of inputs.suite.cases) {
    if (!safeRelative(item.fixture) || item.fixture.includes('/')) throw new Error('Unsafe fixture source');
    const source = path.join(root, 'evaluation/fixtures', item.fixture);
    if (fs.lstatSync(source).isSymbolicLink()) throw new Error('Linked fixture source is unsupported');
    const scenario = inputs.scenarios.find(scenario => scenario.id === item.scenario_id);
    if (!scenario || !safeRelative(item.scenario_id) || item.scenario_id.includes('/')) throw new Error('Invalid scenario reference');
    for (const host of inputs.suite.hosts) {
      if (!['codex', 'claude'].includes(host)) throw new Error('Unknown host');
      const caseRoot = path.join(batch, host, item.scenario_id), project = path.join(caseRoot, 'project');
      fs.mkdirSync(project, { recursive: true });
      for (const file of sourceFiles(source)) {
        const target = path.join(project, file.relative);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.copyFileSync(file.absolute, target);
      }
      const rules = '# Evaluation Project Instructions\n\nAll content is synthetic. Work only inside this fixture project, preserve unrelated edits, and follow the latest task mode. Read PROJECT.md for this fixture\'s project facts, contracts and validation commands. Git add/commit/push, deployment, real data and global configuration are not authorized. Use the DevBrain baseline and relevant skills supplied by the session; do not inspect evaluator scorecards or other cases.\n';
      fs.writeFileSync(path.join(project, 'AGENTS.md'), rules);
      fs.writeFileSync(path.join(project, 'CLAUDE.md'), rules);
      const setup = options.nativeContext ? 'Session setup: Read the DevBrain session baseline at ' + path.relative(project, path.join(root, 'runtime/session-baseline.md')).replaceAll('\\', '/') + ' once. Reuse it, select task modules and skills only when relevant, and read this project\'s scoped instructions. Context-source reads may reach the maintained DevBrain profile; task edits must stay inside this project. Do not read evaluator artifacts, expected outcomes or other cases.\n\n' : '';
      const prompt = setup + scenario.prompt + '\n\nFixture facts: ' + item.supplement + '\n';
      fs.writeFileSync(path.join(caseRoot, 'prompt.txt'), prompt);
      const fixtureHash = fingerprintTree(project, prompt);
      // The Git case needs its own worktree, not the parent repository's ignored status.
      // This creates an empty local fixture repository; no stage/commit/push/history rewrite.
      if (item.fixture === 'git-list') cp.execFileSync('git', ['init', '--quiet', '--initial-branch=fixture', '--template=', project]);
      const card = blankScorecard(inputs.suite, inputs.contract, item.scenario_id, host, fixtureHash, profileHash);
      fs.writeFileSync(path.join(cards, host + '-' + item.scenario_id + '.yaml'), inputs.yaml.dump(card, { lineWidth: -1 }));
      entries.push({ host, scenario_id: item.scenario_id, project: host + '/' + item.scenario_id + '/project', prompt: host + '/' + item.scenario_id + '/prompt.txt', fixture_fingerprint: fixtureHash, profile_fingerprint: profileHash });
    }
  }
  fs.writeFileSync(path.join(evaluator, 'index.yaml'), inputs.yaml.dump({ release: inputs.suite.release, native_context_setup: !!options.nativeContext, entries }, { lineWidth: -1 }));
  return { batch, evaluator, entries };
}
if (require.main === module) {
  const args = process.argv.slice(2), positional = args.filter(value => value !== '--native-context');
  if (positional.length > 1 || positional.some(value => value.startsWith('--'))) { console.error('Usage: node evaluation/prepare-smoke.cjs [yaml-module] [--native-context]'); process.exit(2); }
  const pack = preparePack(loadInputs(positional[0]), undefined, { nativeContext: args.includes('--native-context') });
  console.log('Prepared ' + pack.entries.length + ' independent fixture projects: ' + path.relative(root, pack.batch).replaceAll('\\', '/'));
  console.log('Scorecards are NOT_RUN. No coding host was launched. Keep evaluator/ outside assistant context.');
}
module.exports = { loadInputs, preparePack, fingerprintTree, profileFingerprint, ensureLocalDirectory };
