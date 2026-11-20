// Prepare and summarize synthetic comparisons. Host sessions are run separately.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const {
  ensureLocalDirectory,
  fingerprintTree,
  profileFingerprint,
  sourceFiles,
  loadInputs,
} = require('./prepare-smoke.cjs');

const root = path.resolve(__dirname, '..');
const dimensions = ['scope', 'correctness', 'completion', 'verification', 'clarity'];
const effortMetrics = ['tool_calls', 'elapsed_ms', 'input_tokens', 'output_tokens'];
const conditions = ['native', 'reference', 'candidate'];
const hosts = ['codex', 'claude'];
const token = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const runId = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;
const hash = /^[0-9a-f]{64}$/;

function validateSuite(suite) {
  if (
    suite?.schema !== 'devbrain-benchmark' ||
    suite.version !== 1 ||
    !/^[0-9a-f]{40}$/.test(suite.reference_commit) ||
    !Array.isArray(suite.cases) ||
    !suite.cases.length
  ) {
    throw new Error('Invalid benchmark suite');
  }
  const ids = new Set();
  for (const item of suite.cases) {
    if (
      typeof item?.id !== 'string' ||
      !token.test(item.id) ||
      ids.has(item.id) ||
      typeof item.fixture !== 'string' ||
      !token.test(item.fixture) ||
      ![item.prompt, item.evidence].every((value) => typeof value === 'string' && value.trim()) ||
      !fs.existsSync(path.join(root, 'evaluation/fixtures', item.fixture, 'PROJECT.md'))
    ) {
      throw new Error('Invalid benchmark case');
    }
    ids.add(item.id);
  }
}

function prepare(suite, release, repeat, onlyCase) {
  validateSuite(suite);
  const cases = onlyCase ? suite.cases.filter((item) => item.id === onlyCase) : suite.cases;
  if (!cases.length || !Number.isInteger(repeat) || repeat < 1 || repeat > 5) {
    throw new Error('Choose an existing case and 1–5 repetitions');
  }
  const sources = new Map(
    cases.map((item) => [
      item.id,
      sourceFiles(path.join(root, 'evaluation/fixtures', item.fixture)),
    ]),
  );
  const parent = ensureLocalDirectory('local/benchmarks');
  const batch = fs.mkdtempSync(path.join(parent, 'batch-'));
  const reviewer = path.join(batch, 'review');
  fs.mkdirSync(path.join(reviewer, 'scores'), { recursive: true });
  const index = {
    schema: 'devbrain-benchmark-batch',
    release,
    reference_commit: suite.reference_commit,
    candidate_profile_fingerprint: profileFingerprint(),
    entries: [],
  };
  const rules =
    '# Project instructions\n\nRead PROJECT.md for the synthetic brief and project constraints. Work within this project and honor the task mode. Use local synthetic data and services only. Preserve unrelated files. Commit, push, deployment and global configuration changes are outside this task.\n';
  const rubric = { dimensions, cases: {} };
  for (const item of cases) {
    rubric.cases[item.id] = item.evidence;
    const prompt = item.prompt + '\n';
    for (const host of hosts) {
      for (let attempt = 1; attempt <= repeat; attempt++) {
        // Vary order without encoding the treatment in filenames or model inputs.
        const order = conditions.slice();
        for (let i = order.length - 1; i > 0; i--) {
          const j = crypto.randomInt(i + 1);
          [order[i], order[j]] = [order[j], order[i]];
        }
        for (const condition of order) {
          const id = crypto.randomUUID();
          const slot = path.join(batch, 'runs', id);
          const project = path.join(slot, 'project');
          fs.mkdirSync(project, { recursive: true });
          for (const file of sources.get(item.id)) {
            const target = path.join(project, file.relative);
            fs.mkdirSync(path.dirname(target), { recursive: true });
            fs.copyFileSync(file.absolute, target, fs.constants.COPYFILE_EXCL);
          }
          for (const file of ['AGENTS.md', 'CLAUDE.md']) {
            fs.writeFileSync(path.join(project, file), rules, { flag: 'wx' });
          }
          const input = fingerprintTree(project, prompt);
          execFileSync('git', [
            'init',
            '--quiet',
            '--initial-branch=fixture',
            '--template=',
            project,
          ]);
          fs.writeFileSync(path.join(slot, 'prompt.txt'), prompt);
          index.entries.push({ id, case: item.id, host, attempt, condition, input });
          writeJson(path.join(reviewer, 'scores', id + '.json'), {
            id,
            case: item.id,
            status: 'NOT_RUN',
            environment: null,
            ratings: null,
            critical: [],
            notes: '',
          });
        }
      }
    }
  }
  writeJson(path.join(batch, 'operator-index.json'), index);
  writeJson(path.join(reviewer, 'rubric.json'), rubric);
  return { batch, index };
}

function writeJson(file, value) {
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n', { flag: 'wx' });
}

function checkedPath(base, relative) {
  let target = base;
  for (const part of relative.split('/')) {
    target = path.join(target, part);
    if (fs.lstatSync(target).isSymbolicLink()) throw new Error('Linked benchmark input');
  }
  return target;
}

function readJson(base, relative) {
  return JSON.parse(fs.readFileSync(checkedPath(base, relative), 'utf8'));
}

function verifyRun(batch, index, id) {
  if (!runId.test(id)) throw new Error('Invalid benchmark run ID');
  const entry = index.entries.find((item) => item.id === id);
  if (!entry) throw new Error('Benchmark run is missing');
  const project = checkedPath(batch, 'runs/' + id + '/project');
  const prompt = fs.readFileSync(checkedPath(batch, 'runs/' + id + '/prompt.txt'), 'utf8');
  if (fingerprintTree(project, prompt) !== entry.input) {
    throw new Error('Benchmark input differs from the prepared fingerprint');
  }
  if (
    entry.condition === 'candidate' &&
    (loadInputs().release !== index.release ||
      profileFingerprint() !== index.candidate_profile_fingerprint)
  ) {
    throw new Error('Candidate release or profile differs from the prepared batch');
  }
  return entry.input;
}

function validateScore(score, entry) {
  const statuses = ['NOT_RUN', 'BLOCKED', 'SCORED'];
  if (
    score?.id !== entry.id ||
    score.case !== entry.case ||
    !statuses.includes(score.status) ||
    !Array.isArray(score.critical) ||
    score.critical.some((item) => typeof item !== 'string' || !item.trim()) ||
    typeof score.notes !== 'string' ||
    (score.status !== 'NOT_RUN' && !score.notes.trim()) ||
    (score.status !== 'SCORED' && score.ratings !== null) ||
    (score.status === 'NOT_RUN' && (score.environment !== null || score.critical.length))
  ) {
    throw new Error('Invalid benchmark score');
  }
  if (score.status !== 'SCORED') return;
  if (score.measurements !== undefined) {
    const measurements = score.measurements;
    if (
      !measurements ||
      Array.isArray(measurements) ||
      typeof measurements !== 'object' ||
      !Object.entries(measurements).every(
        ([key, measurement]) =>
          effortMetrics.includes(key) &&
          typeof measurement?.source === 'string' &&
          measurement.source.trim() &&
          Number.isSafeInteger(measurement.value) &&
          measurement.value >= 0,
      )
    ) {
      throw new Error('Invalid benchmark measurements');
    }
  }
  const env = score.environment;
  if (
    env?.fresh_session !== true ||
    env.input_fingerprint !== entry.input ||
    !['version', 'model', 'effort', 'mode', 'tools', 'limits', 'observed_on'].every(
      (key) => typeof env[key] === 'string' && env[key].trim(),
    ) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(env.observed_on) ||
    Object.keys(score.ratings ?? {}).length !== dimensions.length ||
    !dimensions.every((key) => [0, 1, 2].includes(score.ratings[key]))
  ) {
    throw new Error('Incomplete or mismatched benchmark score');
  }
}

function summarize(index, readScore) {
  if (index?.schema !== 'devbrain-benchmark-batch' || !index.entries?.length) {
    throw new Error('Invalid benchmark index');
  }
  const groups = new Map();
  const ids = new Set();
  const totals = { NOT_RUN: 0, BLOCKED: 0, SCORED: 0, critical_runs: 0 };
  for (const entry of index.entries) {
    if (
      !runId.test(entry.id) ||
      ids.has(entry.id) ||
      !token.test(entry.case) ||
      !hosts.includes(entry.host) ||
      !conditions.includes(entry.condition) ||
      !Number.isInteger(entry.attempt) ||
      entry.attempt < 1 ||
      !hash.test(entry.input)
    ) {
      throw new Error('Invalid benchmark entry');
    }
    ids.add(entry.id);
    const score = readScore(entry.id);
    validateScore(score, entry);
    totals[score.status]++;
    if (score.critical.length) totals.critical_runs++;
    const key = [entry.case, entry.host, entry.attempt].join('/');
    if (!groups.has(key)) groups.set(key, new Map());
    const group = groups.get(key);
    if (group.has(entry.condition)) throw new Error('Duplicate benchmark condition');
    group.set(entry.condition, { entry, score });
  }
  const comparisons = [];
  for (const [group, slots] of groups) {
    if (slots.size !== conditions.length) throw new Error('Missing benchmark condition');
    const candidate = slots.get('candidate');
    for (const control of ['native', 'reference']) {
      const other = slots.get(control);
      const result = { group, control, comparable: false, reason: null, delta: null };
      if (candidate.score.critical.length || other.score.critical.length) {
        result.reason = 'critical finding';
      } else if (candidate.score.status !== 'SCORED' || other.score.status !== 'SCORED') {
        result.reason = 'missing scores';
      } else if (
        candidate.entry.input !== other.entry.input ||
        !['version', 'model', 'effort', 'mode', 'tools', 'limits', 'observed_on'].every(
          (key) => candidate.score.environment[key] === other.score.environment[key],
        ) ||
        /^(unknown|unverified)$/i.test(candidate.score.environment.model.trim())
      ) {
        result.reason = 'unverified or unmatched conditions';
      } else {
        result.comparable = true;
        result.delta = Object.fromEntries(
          dimensions.map((key) => [key, candidate.score.ratings[key] - other.score.ratings[key]]),
        );
        const measurementDelta = {};
        for (const metric of effortMetrics) {
          const current = candidate.score.measurements?.[metric];
          const baseline = other.score.measurements?.[metric];
          if (current && baseline && current.source === baseline.source) {
            measurementDelta[metric] = current.value - baseline.value;
          }
        }
        if (Object.keys(measurementDelta).length) result.measurement_delta = measurementDelta;
      }
      comparisons.push(result);
    }
  }
  const by_host = {};
  for (const comparison of comparisons) {
    const [, host] = comparison.group.split('/');
    const summary = (by_host[host] ??= {});
    const control = (summary[comparison.control] ??= {
      comparable: 0,
      excluded: {},
      dimensions: Object.fromEntries(
        dimensions.map((key) => [key, { improved: 0, tied: 0, regressed: 0 }]),
      ),
    });
    if (!comparison.comparable) {
      const reason = comparison.reason;
      control.excluded[reason] = (control.excluded[reason] ?? 0) + 1;
      continue;
    }
    control.comparable++;
    for (const [dimension, delta] of Object.entries(comparison.delta)) {
      const outcome = delta > 0 ? 'improved' : delta < 0 ? 'regressed' : 'tied';
      control.dimensions[dimension][outcome]++;
    }
  }
  return { totals, comparisons, by_host };
}

function main([command, value, onlyCase, ...rest]) {
  if (rest.length) throw new Error('Too many arguments');
  if (command === 'prepare') {
    const { yaml, release, suite: smoke } = loadInputs();
    if (release !== smoke.release) throw new Error('Manifest and smoke release differ');
    const suite = yaml.load(
      fs.readFileSync(path.join(root, 'evaluation/benchmark-suite.yaml'), 'utf8'),
    );
    const result = prepare(suite, release, Number(value ?? 1), onlyCase);
    console.log(
      'Prepared %d NOT_RUN slots in %s',
      result.index.entries.length,
      path.relative(root, result.batch),
    );
    return;
  }
  if (['summarize', 'verify'].includes(command) && /^batch-[a-zA-Z0-9]+$/.test(value)) {
    const batch = checkedPath(root, 'local/benchmarks/' + value);
    const index = readJson(batch, 'operator-index.json');
    if (command === 'verify' && onlyCase) {
      console.log('Verified initial input: ' + verifyRun(batch, index, onlyCase));
      return;
    }
    if (command === 'summarize' && !onlyCase) {
      console.log(
        JSON.stringify(
          summarize(index, (id) => readJson(batch, 'review/scores/' + id + '.json')),
          null,
          2,
        ),
      );
      return;
    }
  }
  throw new Error(
    'Usage: benchmark.cjs prepare [repeats] [case-id] | verify <batch-id> <run-id> | summarize <batch-id>',
  );
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(error instanceof SyntaxError ? 'Invalid benchmark JSON' : error.message);
    process.exitCode = 1;
  }
}

module.exports = { dimensions, prepare, summarize, validateSuite, verifyRun };
