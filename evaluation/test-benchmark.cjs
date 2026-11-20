const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { test } = require('node:test');
const { dimensions, prepare, summarize, validateSuite, verifyRun } = require('./benchmark.cjs');
const { fingerprintTree, loadInputs } = require('./prepare-smoke.cjs');

function cohort() {
  const entries = ['native', 'reference', 'candidate'].map((condition) => ({
    id: randomUUID(),
    case: 'copy-default',
    host: 'codex',
    attempt: 1,
    condition,
    input: 'a'.repeat(64),
  }));
  const index = { schema: 'devbrain-benchmark-batch', entries };
  const scores = new Map(
    entries.map((entry) => [
      entry.id,
      {
        id: entry.id,
        case: entry.case,
        status: 'SCORED',
        environment: {
          fresh_session: true,
          input_fingerprint: entry.input,
          version: 'fixture-version',
          model: 'fixture-model',
          effort: 'medium',
          mode: 'one-shot',
          tools: 'same allowlist',
          limits: 'same time and token budget',
          observed_on: '2026-11-18',
        },
        ratings: Object.fromEntries(
          dimensions.map((key) => [key, entry.condition === 'candidate' ? 2 : 1]),
        ),
        critical: [],
        notes: 'Synthetic score used to exercise the summarizer.',
      },
    ]),
  );
  return {
    index,
    scores,
    slot: (condition) => scores.get(entries.find((entry) => entry.condition === condition).id),
    report: () => summarize(index, (id) => scores.get(id)),
  };
}

test('summarizes only comparable pairs on each dimension', () => {
  const { report, slot } = cohort();
  assert.deepEqual(
    report().comparisons.map((pair) => pair.delta.correctness),
    [1, 1],
  );
  slot('reference').environment.tools = 'different allowlist';
  assert.equal(report().comparisons[1].comparable, false);
  slot('candidate').environment.model = slot('native').environment.model = 'unknown';
  assert.equal(report().comparisons[0].comparable, false);
});

test('reports unrun, blocked and critical results without turning them into wins', () => {
  const { report, slot } = cohort();
  Object.assign(slot('reference'), { status: 'NOT_RUN', ratings: null, environment: null });
  Object.assign(slot('native'), { status: 'BLOCKED', ratings: null, environment: null });
  slot('native').critical.push('unauthorized mutation');
  const result = report();
  assert.deepEqual(result.totals, { NOT_RUN: 1, BLOCKED: 1, SCORED: 1, critical_runs: 1 });
  assert.deepEqual(
    result.comparisons.map((pair) => pair.reason),
    ['critical finding', 'missing scores'],
  );
  assert.equal(result.by_host.codex.native.comparable, 0);
  assert.equal(result.by_host.codex.native.excluded['critical finding'], 1);
  assert.equal(result.by_host.codex.reference.excluded['missing scores'], 1);
});

test('reports quality outcomes and compares only measurements from the same source', () => {
  const { report, slot } = cohort();
  slot('candidate').ratings.scope = 1;
  slot('candidate').ratings.verification = 0;
  slot('candidate').measurements = {
    tool_calls: { value: 3, source: 'fixture event counter' },
    input_tokens: { value: 20, source: 'host usage' },
  };
  slot('native').measurements = {
    tool_calls: { value: 5, source: 'fixture event counter' },
    input_tokens: { value: 40, source: 'reviewer estimate' },
  };
  const result = report();
  assert.deepEqual(result.comparisons[0].measurement_delta, { tool_calls: -2 });
  assert.equal(result.comparisons[1].measurement_delta, undefined);
  assert.equal(result.by_host.codex.native.comparable, 1);
  assert.equal(result.by_host.codex.native.dimensions.scope.tied, 1);
  assert.equal(result.by_host.codex.native.dimensions.verification.regressed, 1);
  assert.equal(result.by_host.codex.native.dimensions.correctness.improved, 1);
  slot('native').measurements.tool_calls.value = -1;
  assert.throws(report, /Invalid benchmark measurements/);
});

test('rejects missing conditions, mismatched inputs and scores from resumed sessions', () => {
  const { index, report, slot } = cohort();
  slot('candidate').environment.fresh_session = false;
  assert.throws(report, /Incomplete or mismatched/);
  slot('candidate').environment.fresh_session = true;
  slot('candidate').environment.input_fingerprint = 'f'.repeat(64);
  assert.throws(report, /Incomplete or mismatched/);
  index.entries.pop();
  assert.throws(report, /Missing benchmark condition/);
});

test('prepares isolated matched projects and keeps treatment and rubric out of model input', () => {
  const { yaml, suite: smoke } = loadInputs();
  const suite = yaml.load(fs.readFileSync(path.join(__dirname, 'benchmark-suite.yaml'), 'utf8'));
  const { batch, index } = prepare(suite, smoke.release, 1, 'copy-default');
  assert.equal(index.entries.length, 6);
  assert.equal(new Set(index.entries.map((entry) => entry.input)).size, 1);
  for (const entry of index.entries) {
    const slot = path.join(batch, 'runs', entry.id);
    const project = path.join(slot, 'project');
    const prompt = fs.readFileSync(path.join(slot, 'prompt.txt'), 'utf8');
    assert.equal(fingerprintTree(project, prompt), entry.input);
    assert.ok(fs.statSync(path.join(project, '.git')).isDirectory());
    assert.equal(prompt.trim(), suite.cases.find((item) => item.id === entry.case).prompt);
    assert.ok(!fs.existsSync(path.join(project, 'operator-index.json')));
  }
  const [entry] = index.entries;
  assert.equal(verifyRun(batch, index, entry.id), entry.input);
  const candidate = index.entries.find((run) => run.condition === 'candidate');
  assert.throws(
    () => verifyRun(batch, { ...index, release: '0.0.0-rc.1' }, candidate.id),
    /Candidate release or profile differs/,
  );
  const promptPath = path.join(batch, 'runs', entry.id, 'prompt.txt');
  fs.appendFileSync(promptPath, 'Changed after preparation.\n');
  assert.throws(() => verifyRun(batch, index, entry.id), /differs from the prepared fingerprint/);
  assert.throws(() => prepare(suite, smoke.release, 0), /repetitions/);
  suite.cases[1].id = suite.cases[0].id;
  assert.throws(() => validateSuite(suite), /Invalid benchmark case/);
});
