const test = require('node:test'), assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), cp = require('node:child_process');
const { loadInputs, preparePack, fingerprintTree, ensureLocalDirectory } = require('./prepare-smoke.cjs');
const { blankScorecard, validateScorecard, compareScorecards } = require('./results-contract.cjs');
const { inspectResults } = require('./validate-results.cjs');
const { assessHost, recordPreflight } = require('./host-preflight.cjs');
const inputs = loadInputs(), { suite, contract } = inputs, id = suite.cases[0].scenario_id;
const blank = host => blankScorecard(suite, contract, id, host, 'a'.repeat(64), 'b'.repeat(64));
function passed(host) {
  const card = blank(host);
  Object.assign(card, { execution_stage: 'session', fresh_session: true, attempted: true, status: 'PASS', interface: 'Synthetic test interface', observed_on: '2026-10-08', reason: null });
  card.observations = contract.dimensions.map((name, index) => ({ id: 'e' + index, kind: 'response', summary: 'Synthetic evidence for contract testing: ' + name }));
  contract.dimensions.forEach((name, index) => { card.dimensions[name] = { status: 'PASS', evidence: ['e' + index] }; });
  return card;
}
test('pristine template is NOT_RUN rather than a behavioral pass', () => assert.deepEqual(validateScorecard(blank('codex'), suite, contract), []));
test('unattempted or partially scored work cannot be PASS', () => {
  const card = blank('codex'); card.status = 'PASS'; assert.ok(validateScorecard(card, suite, contract).length);
  const partial = passed('codex'); partial.dimensions.completion = { status: 'UNOBSERVED', evidence: [] }; assert.ok(validateScorecard(partial, suite, contract).length);
});
test('each observed dimension needs a real observation reference', () => {
  const card = passed('codex'); card.dimensions.authorization.evidence = ['missing']; assert.ok(validateScorecard(card, suite, contract).some(error => error.includes('Unknown evidence')));
  card.dimensions.authorization.evidence = []; assert.ok(validateScorecard(card, suite, contract).some(error => error.includes('requires evidence')));
});
test('critical failures cannot be hidden by PASS or BLOCKED', () => {
  for (const status of ['PASS', 'BLOCKED']) { const card = passed('codex'); card.status = status; card.critical_failures = ['user_edit_overwrite']; assert.ok(validateScorecard(card, suite, contract).length); }
});
test('FAIL needs observed failure and accepts a documented critical failure', () => {
  const card = passed('codex'); card.status = 'FAIL'; assert.ok(validateScorecard(card, suite, contract).length);
  card.critical_failures = ['unauthorized_mutation']; card.failure_categories = ['safety']; card.reason = 'Synthetic unauthorized mutation observed.'; assert.deepEqual(validateScorecard(card, suite, contract), []);
});
test('NOT_RUN cannot contain attempted evidence; partial attempts can be BLOCKED', () => {
  const card = blank('codex'); card.observations = [{ id: 'e1', kind: 'response', summary: 'Observed response' }]; assert.ok(validateScorecard(card, suite, contract).length);
  Object.assign(card, { execution_stage: 'session', fresh_session: true, failure_categories: ['evidence'], attempted: true, status: 'BLOCKED', interface: 'Synthetic test interface', observed_on: '2026-10-08', reason: 'Source-read telemetry unavailable' });
  card.dimensions.routing_context = { status: 'BLOCKED', evidence: ['e1'] }; assert.deepEqual(validateScorecard(card, suite, contract), []);
});
test('unknown host, case, malformed date and private path are rejected', () => {
  for (const [field, value] of [['host', 'other'], ['scenario_id', 'missing'], ['observed_on', '2026-02-30'], ['model', ['C', ':', '/Users/', 'Synthetic', '/work'].join('')]]) {
    const card = passed('codex'); card[field] = value; assert.ok(validateScorecard(card, suite, contract).length);
  }
});
test('artifact references cannot traverse, use URLs or absolute paths', () => {
  for (const artifact of ['../private.md', '/root/file', 'https://example.invalid/evidence', 'evidence/../file', 'evidence\\file']) {
    const card = passed('codex'); card.observations[0].artifact = artifact; assert.ok(validateScorecard(card, suite, contract).length);
  }
});
test('invalid identifier/status findings do not echo candidate sensitive values', () => {
  const candidate = ['C', ':', '/Users/', 'Synthetic', '/private'].join('');
  const card = passed('codex'); card.scenario_id = candidate; card.host = candidate; card.status = candidate;
  const report = compareScorecards([card], suite, contract); assert.ok(report.errors.length); assert.ok(!JSON.stringify(report).includes(candidate));
});
test('native comparison needs equal fixture and profile inputs', () => {
  const a = passed('codex'), b = passed('claude');
  assert.equal(compareScorecards([a, b], suite, contract).comparisons[0].both_pass, true);
  b.fixture_fingerprint = 'c'.repeat(64); assert.equal(compareScorecards([a, b], suite, contract).comparisons[0].native_comparable, false);
  b.fixture_fingerprint = a.fixture_fingerprint; b.profile_fingerprint = 'd'.repeat(64); assert.equal(compareScorecards([a, b], suite, contract).comparisons[0].native_comparable, false);
});
test('existing-session evidence and duplicates cannot establish native comparison', () => {
  const a = passed('codex'), b = passed('claude'); b.evidence_kind = 'existing_session'; b.fresh_session = false; assert.equal(compareScorecards([a, b], suite, contract).comparisons[0].both_pass, false);
  b.evidence_kind = 'native_session'; b.fresh_session = true; const report = compareScorecards([a, b, a], suite, contract); assert.ok(report.errors.length); assert.equal(report.comparisons[0].both_pass, false);
});
test('resumed or unknown session provenance cannot count as fresh native behavior', () => {
  for (const fresh of [false, null]) { const card = passed('codex'); card.fresh_session = fresh; assert.ok(validateScorecard(card, suite, contract).length); }
  const card = passed('codex'); card.execution_stage = 'preflight'; card.fresh_session = null;
  assert.ok(validateScorecard(card, suite, contract).some(error => error.includes('Preflight cannot score')));
});
test('command discovery alone cannot authorize a native start', () => {
  assert.equal(assessHost({ command_available: true, workspace_boundary_verified: null, fresh_session_setup_verified: null }).ready, false);
  assert.equal(assessHost({ command_available: true, workspace_boundary_verified: true, fresh_session_setup_verified: true }).ready, true);
  assert.throws(() => assessHost({ command_available: true }), /explicit boolean/);
});
test('blocked preflight records 24 prerequisites and zero model sessions without overwriting prior attempts', () => {
  const pack = preparePack(inputs), evidenceDirectory = path.join(pack.evaluator, 'evidence'); fs.mkdirSync(evidenceDirectory);
  fs.writeFileSync(path.join(evidenceDirectory, 'preflight.md'), 'Synthetic environment receipt for harness tests.\n');
  const receipt = { schema: 'devbrain-host-preflight', release: suite.release, observed_on: '2026-10-13', hosts: suite.hosts.map(host => ({ host, command_available: host === 'codex', workspace_boundary_verified: false, fresh_session_setup_verified: false, interface: 'Synthetic preflight', summary: 'Synthetic unavailable isolation prerequisite.', artifact: 'evidence/preflight.md' })) };
  const result = recordPreflight(pack.evaluator, inputs, receipt); assert.equal(result.native_sessions_started, 0); assert.equal(result.scorecards, 24);
  const report = inspectResults(pack.evaluator, inputs); assert.deepEqual(report.errors, []); assert.equal(report.preflight_blocked, 24); assert.equal(report.native_sessions_started, 0); assert.equal(report.native_both_pass_cases, 0);
  assert.throws(() => recordPreflight(pack.evaluator, inputs, receipt), /overwrite/);
  const card = inputs.yaml.load(fs.readFileSync(path.join(pack.evaluator, 'cards', 'codex-' + id + '.yaml'), 'utf8'));
  card.dimensions.authorization = { status: 'PASS', evidence: ['host-preflight'] };
  assert.ok(validateScorecard(card, suite, contract).some(error => error.includes('Preflight cannot score')));
  card.failure_categories = ['missing']; assert.ok(validateScorecard(card, suite, contract).some(error => error.includes('Failure categories')));
});
test('ready preflight leaves every case NOT_RUN and rejects invalid receipt metadata before writes', () => {
  const pack = preparePack(inputs), evidence = path.join(pack.evaluator, 'evidence'); fs.mkdirSync(evidence); fs.writeFileSync(path.join(evidence, 'ready.md'), 'Synthetic prerequisite observations only.\n');
  const receipt = { schema: 'devbrain-host-preflight', release: suite.release, observed_on: '2026-10-13', hosts: suite.hosts.map(host => ({ host, command_available: true, workspace_boundary_verified: true, fresh_session_setup_verified: true, interface: 'Synthetic ready preflight', summary: 'Synthetic fixture prerequisites checked; no model executed.', artifact: 'evidence/ready.md' })) };
  const invalid = { ...receipt, observed_on: '2026-02-30' }; assert.throws(() => recordPreflight(pack.evaluator, inputs, invalid), /Invalid date/);
  const privateReceipt = JSON.parse(JSON.stringify(receipt)); privateReceipt.hosts[0].summary = ['C', ':', '/Users/', 'Synthetic', '/private'].join('');
  assert.throws(() => recordPreflight(pack.evaluator, inputs, privateReceipt), /sensitive preflight/);
  const result = recordPreflight(pack.evaluator, inputs, receipt); assert.ok(result.hosts.every(host => host.ready));
  const report = inspectResults(pack.evaluator, inputs); assert.deepEqual(report.errors, []); assert.equal(report.native_sessions_started, 0); assert.equal(report.preflight_blocked, 0); assert.ok(report.comparisons.every(pair => Object.values(pair.hosts).every(status => status === 'NOT_RUN')));
});
test('fixture output rejects external/traversing targets', () => {
  for (const value of ['outside/run', 'local/../run', '/tmp/run']) assert.throws(() => ensureLocalDirectory(value));
  assert.throws(() => inspectResults(path.resolve(__dirname, '..', '..'), inputs), /repository-local/);
});
test('prepared fixtures are independent, host-equivalent and truthfully unattempted', () => {
  const pack = preparePack(inputs); assert.equal(pack.entries.length, 24);
  const report = inspectResults(pack.evaluator, inputs); assert.deepEqual(report.errors, []); assert.equal(report.native_both_pass_cases, 0);
  for (const item of suite.cases) {
    const pair = pack.entries.filter(entry => entry.scenario_id === item.scenario_id); assert.equal(pair[0].fixture_fingerprint, pair[1].fixture_fingerprint);
    const project = path.join(pack.batch, pair[0].project);
    assert.equal(fs.readFileSync(path.join(project, 'AGENTS.md'), 'utf8'), fs.readFileSync(path.join(project, 'CLAUDE.md'), 'utf8'));
    assert.ok(!fs.existsSync(path.join(project, 'scorecard-contract.yaml')));
  }
  const first = pack.entries.find(entry => entry.scenario_id === '49-resume-stale-state' && entry.host === 'codex');
  const peer = pack.entries.find(entry => entry.scenario_id === first.scenario_id && entry.host === 'claude');
  const peerBefore = fingerprintTree(path.join(pack.batch, peer.project));
  fs.appendFileSync(path.join(pack.batch, first.project, 'user-note.md'), '\nSynthetic local mutation for isolation check.\n');
  assert.equal(fingerprintTree(path.join(pack.batch, peer.project)), peerBefore);
  const gitProject = path.join(pack.batch, pack.entries.find(entry => entry.scenario_id === '12-git-list').project);
  assert.equal(cp.execFileSync('git', ['-C', gitProject, 'rev-parse', '--show-toplevel'], { encoding: 'utf8' }).trim().replaceAll('\\', '/'), gitProject.replaceAll('\\', '/'));
  assert.equal(cp.spawnSync('git', ['-C', gitProject, 'rev-parse', '--verify', 'HEAD']).status, 128);
  assert.equal(cp.execFileSync('git', ['-C', gitProject, 'remote'], { encoding: 'utf8' }).trim(), '');
  assert.throws(() => preparePack(inputs, path.basename(pack.batch)), /EEXIST/);
  const target = path.join(pack.evaluator, 'cards', 'codex-' + id + '.yaml'), original = fs.readFileSync(target);
  try { const card = inputs.yaml.load(original.toString()); card.status = 'PASS'; fs.writeFileSync(target, inputs.yaml.dump(card)); assert.ok(inspectResults(pack.evaluator, inputs).errors.length); }
  finally { fs.writeFileSync(target, original); }
  assert.deepEqual(inspectResults(pack.evaluator, inputs).errors, []);
  try {
    const candidate = ['C', ':', '/Users/', 'Synthetic', '/private'].join('');
    fs.writeFileSync(target, 'broken: [\n' + candidate);
    const malformed = inspectResults(pack.evaluator, inputs);
    assert.ok(malformed.errors.includes('Invalid scorecard YAML')); assert.ok(!JSON.stringify(malformed).includes(candidate));
    assert.equal(malformed.native_both_pass_cases, 0);
  } finally { fs.writeFileSync(target, original); }
  const evidenceDirectory = path.join(pack.evaluator, 'evidence'); fs.mkdirSync(evidenceDirectory);
  const evidence = path.join(evidenceDirectory, 'safe.md'); fs.writeFileSync(evidence, 'Synthetic observation only.\n');
  try {
    const card = passed('codex'); card.observations[0].artifact = 'evidence/safe.md'; fs.writeFileSync(target, inputs.yaml.dump(card));
    assert.deepEqual(inspectResults(pack.evaluator, inputs).errors, []);
    fs.writeFileSync(evidence, ['C', ':', '/Users/', 'Synthetic', '/private'].join(''));
    assert.ok(inspectResults(pack.evaluator, inputs).errors.includes('Sensitive path/key candidate in evidence artifact'));
    card.observations[0].artifact = 'evidence/missing.md'; fs.writeFileSync(target, inputs.yaml.dump(card));
    assert.ok(inspectResults(pack.evaluator, inputs).errors.includes('Unavailable or linked evidence artifact'));
  } finally { fs.writeFileSync(target, original); fs.writeFileSync(evidence, 'Synthetic observation only.\n'); }
});
test('fixture baselines protect four dialog consumers, API consumers and architecture behavior', () => {
  const fixtureEnvironment = { ...process.env };
  delete fixtureEnvironment.NODE_TEST_CONTEXT; // A child suite must not inherit the parent's test-runner transport.
  for (const [fixture, file] of [['design-system', 'dialogs.test.cjs'], ['api-contract', 'contract.test.cjs'], ['architecture', 'architecture.test.cjs']]) {
    const result = cp.spawnSync(process.execPath, ['--test', '--test-reporter=tap', file], { cwd: path.join(__dirname, 'fixtures', fixture), encoding: 'utf8', env: fixtureEnvironment }); assert.equal(result.status, 0, result.stdout);
  }
  const result = cp.spawnSync(process.execPath, ['--test', '--test-reporter=tap', 'labels.test.cjs'], { cwd: path.join(__dirname, 'fixtures/continuity'), encoding: 'utf8', env: fixtureEnvironment });
  assert.equal(result.status, 1); assert.match(result.stdout, /# pass 2/); assert.match(result.stdout, /# fail 1/); assert.match(result.stdout, /omits non-string entries safely/);
});
