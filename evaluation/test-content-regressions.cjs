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
cp.execFileSync('git', ['-c', 'safe.directory=' + root, '-c', 'safe.directory=' + path.join(root, '.git'), 'clone', '--quiet', '--no-hardlinks', '--', root, clone]);
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
validate();
mutateYaml('prompts/commands.yaml', v => { v.commands.handoff.mode = 'analyze_then_implement'; }, 'Handoff remains read-only and selective');
mutateYaml('prompts/commands.yaml', v => { v.commands['resume-task'].approval = 'none'; }, 'Resume preserves task authorization and selective routing');
mutateYaml('prompts/commands.yaml', v => { v.commands.handoff.modules.push('workflows/context-reconciliation.md'); }, 'Handoff remains read-only and selective');
mutateYaml('evaluation/scenarios.yaml', v => { const s = v.scenarios.find(s => s.id === '47-handoff-read-only'); s.context_to_read = s.context_to_read.filter(p => p !== 'workflows/session-continuity.md'); }, 'Session continuity scenario routing 47-handoff-read-only');
mutateYaml('evaluation/scenarios.yaml', v => { v.scenarios.find(s => s.id === '53-model-switch-small-task').context_to_read.push('workflows/session-continuity.md'); }, 'Model switch with sufficient context stays minimal');
mutateYaml('devbrain.yaml', v => { v.always_load.push('workflows/session-continuity.md'); }, 'Canonical always_load');
validate();
console.log('PASS: ' + assertions + ' content regression assertions; six intentional regressions rejected.');
console.log('All fixture writes stayed in local/. Clone retained; no Git history or real host configuration changed.');
