// Manual maintenance test: mutates only a disposable clone under local/.
// Does not launch a coding host or prove model behavior.
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const yamlPath = path.resolve(process.argv[2] || path.join(root, 'local/validation/node_modules/js-yaml'));
const yaml = require(yamlPath);
const localRoot = path.join(root, 'local');
fs.mkdirSync(localRoot, { recursive: true });
assert.ok(!fs.lstatSync(localRoot).isSymbolicLink(), 'Linked local fixture root is unsupported');
const localRelative = path.relative(fs.realpathSync(root), fs.realpathSync(localRoot));
assert.ok(localRelative && !localRelative.startsWith('..') && !path.isAbsolute(localRelative), 'Fixture root must resolve inside the repository');
const testRoot = path.join(localRoot, 'content-regressions-' + crypto.randomUUID());
const clone = path.join(testRoot, 'Relocated Source');
assert.ok(path.relative(localRoot, clone) && !path.relative(localRoot, clone).startsWith('..') && !path.isAbsolute(path.relative(localRoot, clone)));
fs.mkdirSync(testRoot, { recursive: true });
fs.mkdirSync(clone, { recursive: true });
const sourceGit = path.join(root, '.git');
assert.ok(fs.statSync(sourceGit).isDirectory(), 'A directory-based repository is required for the disposable mirror');
fs.cpSync(sourceGit, path.join(clone, '.git'), { recursive: true, errorOnExist: true });
const files = cp.execFileSync('git', ['-C', root, 'ls-files', '--cached', '--others', '--exclude-standard', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
for (const file of files) {
  const source = path.join(root, file), target = path.resolve(clone, file);
  const relative = path.relative(clone, target);
  assert.ok(relative && !relative.startsWith('..') && !path.isAbsolute(relative));
  if (!fs.existsSync(source)) continue;
  assert.ok(!fs.lstatSync(source).isSymbolicLink(), 'Linked source is unsupported');
  const sourceRelative = path.relative(fs.realpathSync(root), fs.realpathSync(source));
  assert.ok(sourceRelative && !sourceRelative.startsWith('..') && !path.isAbsolute(sourceRelative), 'Source must resolve inside the repository');
  if (!fs.statSync(source).isFile()) continue;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}
let assertions = 0;
function validate(expectedFinding) {
  const result = cp.spawnSync(process.execPath, [path.join(clone, 'evaluation/validate-content.cjs'), yamlPath], { encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  assert.equal(result.error, undefined, 'Validator process unavailable');
  const report = JSON.parse(result.stdout);
  if (expectedFinding) {
    assert.equal(result.status, 1, 'Expected a rejected regression');
    assert.ok(report.errors.includes(expectedFinding), 'Expected finding missing: ' + expectedFinding);
  } else {
    assert.equal(result.status, 0, 'Fixture should validate: ' + report.errors.join(', '));
    assert.deepEqual(report.errors, []);
  }
  assertions++;
}
function mutateYaml(file, change, finding) {
  const target = path.join(clone, file), original = fs.readFileSync(target);
  try {
    const value = yaml.load(original.toString('utf8'));
    change(value);
    fs.writeFileSync(target, yaml.dump(value, { lineWidth: -1 }));
    validate(finding);
  } finally { fs.writeFileSync(target, original); }
}
function removeText(file, text, finding) {
  const target = path.join(clone, file), original = fs.readFileSync(target);
  assert.ok(original.toString('utf8').includes(text), 'Expected calibrated instruction');
  try { fs.writeFileSync(target, original.toString('utf8').replace(text, '')); validate(finding); }
  finally { fs.writeFileSync(target, original); }
}
validate();
removeText('runtime/session-baseline.md', 'An explicitly requested handoff or DevBrain workflow command still selects its task-map module, even for a small task.', 'Explicit workflow routing survives small-task shortcut');
removeText('workflows/ui-task.md', 'do not move them to external TEMP directories', 'Denied UI cleanup preserves workspace boundary');
mutateYaml('prompts/commands.yaml', v => { v.commands.handoff.mode = 'analyze_then_implement'; }, 'Handoff remains read-only and selective');
mutateYaml('prompts/commands.yaml', v => { v.commands['resume-task'].approval = 'none'; }, 'Resume preserves task authorization and selective routing');
mutateYaml('prompts/commands.yaml', v => { v.commands.handoff.modules.push('workflows/context-reconciliation.md'); }, 'Handoff remains read-only and selective');
mutateYaml('evaluation/scenarios.yaml', v => { const s = v.scenarios.find(s => s.id === '47-handoff-read-only'); s.context_to_read = s.context_to_read.filter(p => p !== 'workflows/session-continuity.md'); }, 'Session continuity scenario routing 47-handoff-read-only');
mutateYaml('evaluation/scenarios.yaml', v => { v.scenarios.find(s => s.id === '53-model-switch-small-task').context_to_read.push('workflows/session-continuity.md'); }, 'Model switch with sufficient context stays minimal');
mutateYaml('devbrain.yaml', v => { v.always_load.push('workflows/session-continuity.md'); }, 'Canonical always_load');
mutateYaml('evaluation/smoke-suite.yaml', v => { v.cases[0].scenario_id = 'missing'; }, 'Smoke scenario reference: missing');
mutateYaml('evaluation/smoke-suite.yaml', v => { v.hosts = ['codex']; }, 'Smoke host targets');
mutateYaml('evaluation/cli-host-matrix.yaml', v => { v.hosts = v.hosts.filter(h => h.id !== 'claude_code_cli'); }, 'CLI host matrix coverage');
mutateYaml('evaluation/scorecard-contract.yaml', v => { v.dimensions.pop(); }, 'Canonical scoring dimensions');
mutateYaml('evaluation/scorecard-contract.yaml', v => { v.execution_stages = ['session']; }, 'Explicit evaluation execution stages');
mutateYaml('evaluation/failure-taxonomy.yaml', v => { v.calibration.require_observed_behavior = false; }, 'Evidence-driven calibration');
removeText('runtime/task-map.md', '| Explicitly create or maintain project instructions/context | `workflows/project-context-setup.md`, `project-templates/README.md` | None; keep discovery read-only unless context changes are requested |', 'Project-context maintenance task route');
removeText('workflows/project-context-setup.md', "Never promote a project's stack, brand, endpoint, business rule, user data, private path, or client detail into DevBrain global core/runtime.", 'Project context stays project-scoped');
removeText('project-templates/AGENTS.template.md', '- `PROJECT-CONTEXT.md` is an index and fact catalog, not a second instruction file. Each fact should have one canonical owner; link to specialist files instead of copying their details.', 'Project context template keeps single fact owner');
mutateYaml('evaluation/scenarios.yaml', v => { v.scenarios.find(s => s.id === '56-project-ui-context-routing').context_to_read.push('PROJECT-API-CONTRACT.md'); }, 'Project UI routing excludes API contract');
mutateYaml('evaluation/scenarios.yaml', v => { v.scenarios.find(s => s.id === '57-project-api-context-routing').context_to_read.push('PROJECT-VISUAL-DNA.md'); }, 'Project API routing excludes Visual DNA');
mutateYaml('evaluation/scenarios.yaml', v => { v.scenarios.find(s => s.id === '55-project-context-setup').context_to_read = v.scenarios.find(s => s.id === '55-project-context-setup').context_to_read.filter(p => p !== 'workflows/project-context-setup.md'); }, 'Project-context workflow scenario routing 55-project-context-setup');
validate();
console.log('PASS: ' + assertions + ' content regression assertions; twenty intentional regressions rejected.');
console.log('All fixture writes stayed in local/. Clone retained; no Git history or real host configuration changed.');
