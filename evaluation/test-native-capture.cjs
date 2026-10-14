const test = require('node:test'), assert = require('node:assert/strict');
const { sanitize, snapshotChanges, runCase } = require('./run-codex-case.cjs');
const { privateText } = require('./results-contract.cjs');
test('native launch scopes tool temporary files to the fixture without home overrides', () => {
  const path = require('node:path'), { nativeArguments } = require('./run-codex-case.cjs');
  const project = path.join(process.cwd(), 'local', 'synthetic fixture');
  const args = nativeArguments(project, 'synthetic', 'medium', 'workspace-write');
  const config = args.find(value => value.startsWith('shell_environment_policy.set='));
  for (const key of ['TEMP=', 'TMP=', 'TMPDIR=']) assert.ok(config.includes(key + JSON.stringify(path.join(project, '.native-temp').replaceAll('\\', '/'))));
  assert.ok(args.includes('sandbox_workspace_write.exclude_tmpdir_env_var=true'));
  assert.ok(args.includes('sandbox_workspace_write.exclude_slash_tmp=true'));
  assert.ok(!config.includes('HOME=')); assert.ok(!args.includes('--dangerously-bypass-approvals-and-sandbox'));
});
test('operational policy drift rejects a valid batch before any native capture', async () => {
  const fs = require('node:fs'), path = require('node:path');
  const { loadInputs, preparePack } = require('./prepare-smoke.cjs');
  const { inspectResults } = require('./validate-results.cjs');
  const inputs = loadInputs(), pack = preparePack(inputs, undefined, { nativeContext: true });
  const indexFile = path.join(pack.evaluator, 'index.yaml'), index = inputs.yaml.load(fs.readFileSync(indexFile, 'utf8'));
  for (const entry of index.entries) {
    entry.profile_fingerprint = '0'.repeat(64);
    const cardFile = path.join(pack.evaluator, 'cards', entry.host + '-' + entry.scenario_id + '.yaml');
    const card = inputs.yaml.load(fs.readFileSync(cardFile, 'utf8')); card.profile_fingerprint = entry.profile_fingerprint;
    fs.writeFileSync(cardFile, inputs.yaml.dump(card));
  }
  fs.writeFileSync(indexFile, inputs.yaml.dump(index));
  assert.deepEqual(inspectResults(pack.evaluator, inputs).errors, []);
  await assert.rejects(runCase(pack.evaluator, '47-handoff-read-only', { allowProfileRuntime: true, model: 'synthetic', observedOn: '2026-10-14' }), /fresh batch/);
  assert.equal(fs.existsSync(path.join(pack.evaluator, 'evidence')), false);
});
test('capture deadline stops its synthetic subprocess without starting a model', async () => {
  const { captureSession } = require('./run-codex-case.cjs');
  const started = Date.now();
  const result = await captureSession(process.execPath, ['-e', 'setInterval(() => {}, 1000)'], '', process.cwd(), 250);
  assert.equal(result.timedOut, true); assert.equal(result.error, null);
  assert.ok(Date.now() - started < 10000, 'Termination must finish without manual intervention');
});
test('capture refuses missing runtime authorization before starting a host', async () => {
  await assert.rejects(runCase('missing', 'case', { model: 'synthetic' }), /explicit authorization/);
});
test('path redaction retains known fixture/source names without personal roots', () => {
  const prefix = ['C', ':', '/Users/', 'Synthetic', '/DevBrain'].join('');
  const output = sanitize({ command: 'Read ' + prefix + '/runtime/session-baseline.md', other: prefix + '/local/project/test.cjs' }, [[prefix + '/local/project', '<PROJECT>'], [prefix, '<DEVBRAIN_ROOT>']]);
  assert.equal(output.command, 'Read <DEVBRAIN_ROOT>/runtime/session-baseline.md');
  assert.equal(output.other, '<PROJECT>/test.cjs'); assert.equal(privateText(JSON.stringify(output)), false);
});
test('auth-shaped values and bearer strings are removed before persistence', () => {
  const output = sanitize({ authorization: 'synthetic bearer', nested: { refresh_token: 'synthetic-private' }, message: 'Authorization: Bearer synthetic-value' });
  assert.ok(!JSON.stringify(output).includes('synthetic-private')); assert.ok(!JSON.stringify(output).includes('synthetic-value'));
});
test('hash comparison includes additions, modifications and removals', () => {
  assert.deepEqual(snapshotChanges([{ path: 'kept', sha256: 'a' }, { path: 'removed', sha256: 'b' }, { path: 'changed', sha256: 'c' }], [{ path: 'kept', sha256: 'a' }, { path: 'changed', sha256: 'd' }, { path: 'added', sha256: 'e' }]), { changed: ['changed', 'added'], removed: ['removed'] });
});
