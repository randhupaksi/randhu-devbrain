// Evidence structure checks; no model execution and no automatic PASS decision.
const path = require('node:path');
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const hash = value => typeof value === 'string' && /^[a-f0-9]{64}$/i.test(value);
const safeRelative = value => nonempty(value) && !value.includes('\\') && !path.posix.isAbsolute(value) && !/^[a-z][a-z0-9+.-]*:/i.test(value) && !value.split('/').some(part => ['..', '.', ''].includes(part));
const privateText = value => /(?<![A-Za-z0-9])[A-Za-z]:[\\/]|(?:\/Users\/|\/home\/)[A-Za-z0-9_-]+|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|sk-[A-Za-z0-9]{24,}|gh[pousr]_[A-Za-z0-9]{30,}|AKIA[A-Z0-9]{16}/.test(value);

function blankScorecard(suite, contract, scenarioId, host, fixtureHash, profileHash) {
  return {
    schema: 'devbrain-behavior-result', version: contract.version, release: suite.release,
    scenario_id: scenarioId, host, interface: null, model: null, evidence_kind: 'native_session',
    attempted: false, status: 'NOT_RUN', observed_on: null,
    fixture_fingerprint: fixtureHash, profile_fingerprint: profileHash,
    observations: [], dimensions: Object.fromEntries(contract.dimensions.map(name => [name, { status: 'UNOBSERVED', evidence: [] }])),
    critical_failures: [], limitations: [], reason: 'No native session has been started.'
  };
}

function validateScorecard(card, suite, contract) {
  const errors = [], check = (ok, message) => { if (!ok) errors.push(message); };
  if (!card || typeof card !== 'object' || Array.isArray(card)) return ['Scorecard must be an object'];
  for (const field of contract.required_fields) check(Object.hasOwn(card, field), 'Missing field: ' + field);
  check(card.schema === 'devbrain-behavior-result' && card.version === contract.version, 'Result schema/version');
  check(card.release === suite.release, 'Result release');
  check(suite.cases.some(item => item.scenario_id === card.scenario_id), 'Unknown smoke scenario');
  check(suite.hosts.includes(card.host), 'Unknown host');
  check(contract.evidence_kinds.includes(card.evidence_kind), 'Evidence kind');
  check(typeof card.attempted === 'boolean', 'Attempt flag');
  check(contract.statuses.includes(card.status), 'Result status');
  check(card.interface === null || nonempty(card.interface), 'Interface metadata');
  check(card.model === null || nonempty(card.model), 'Model metadata');
  check(card.reason === null || nonempty(card.reason), 'Reason metadata');
  for (const name of ['fixture_fingerprint', 'profile_fingerprint']) check(hash(card[name]), 'Fingerprint: ' + name);
  check(Array.isArray(card.observations), 'Observations must be an array');
  check(Array.isArray(card.critical_failures) && card.critical_failures.every(code => contract.critical_failures.includes(code)), 'Critical failure codes');
  check(Array.isArray(card.limitations) && card.limitations.every(nonempty), 'Limitations must be text');
  // Never print the candidate value in findings. This remains a heuristic privacy scan.
  check(!privateText(JSON.stringify(card)), 'Sensitive path/key candidate');
  const observations = Array.isArray(card.observations) ? card.observations : [], ids = new Set();
  for (const item of observations) {
    if (!item || typeof item !== 'object') { errors.push('Observation must be an object'); continue; }
    check(nonempty(item.id) && !ids.has(item.id), 'Observation ID missing or duplicated'); ids.add(item.id);
    check(contract.observation_kinds.includes(item.kind) && nonempty(item.summary), 'Observation kind/summary');
    if (item.artifact !== undefined && item.artifact !== null) check(safeRelative(item.artifact), 'Unsafe artifact reference');
  }
  const dimensions = card.dimensions || {};
  check(typeof dimensions === 'object' && !Array.isArray(dimensions), 'Dimensions must be an object');
  check(Object.keys(dimensions).length === contract.dimensions.length && Object.keys(dimensions).every(name => contract.dimensions.includes(name)), 'Exact scoring dimensions');
  const statuses = [];
  for (const name of contract.dimensions) {
    const dimension = dimensions[name];
    if (!dimension || typeof dimension !== 'object') { errors.push('Missing dimension: ' + name); continue; }
    statuses.push(dimension.status);
    check(contract.dimension_statuses.includes(dimension.status), 'Dimension status: ' + name);
    check(Array.isArray(dimension.evidence) && dimension.evidence.every(id => ids.has(id)), 'Unknown evidence reference: ' + name);
    if (dimension.status !== 'UNOBSERVED') check(Array.isArray(dimension.evidence) && dimension.evidence.length > 0, 'Observed dimension requires evidence: ' + name);
  }
  const critical = Array.isArray(card.critical_failures) && card.critical_failures.length > 0;
  const failed = statuses.includes('FAIL') || critical;
  const allPass = statuses.length === contract.dimensions.length && statuses.every(status => status === 'PASS');
  if (card.status === 'NOT_RUN') {
    check(card.attempted === false && observations.length === 0 && statuses.every(status => status === 'UNOBSERVED') && !critical && card.observed_on === null, 'NOT_RUN cannot contain attempted behavior');
  } else {
    check(card.attempted === true && nonempty(card.interface), 'Attempted run requires interface');
    const validDate = typeof card.observed_on === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(card.observed_on) && !Number.isNaN(Date.parse(card.observed_on)) && new Date(card.observed_on).toISOString().slice(0, 10) === card.observed_on;
    check(validDate, 'Attempted run requires valid observation date');
    check(observations.length > 0, 'Attempted run requires observations');
  }
  if (card.status === 'PASS') check(allPass && !failed, 'PASS requires every dimension and no critical failure');
  if (card.status === 'FAIL') check(failed, 'FAIL requires observed failure');
  if (card.status === 'BLOCKED') check(!failed && !allPass && nonempty(card.reason), 'BLOCKED cannot hide failures or completed scoring');
  if (failed) check(card.status === 'FAIL', 'Observed failure must remain FAIL');
  if (card.status === 'NOT_RUN') check(nonempty(card.reason), 'NOT_RUN requires reason');
  return errors;
}

function compareScorecards(cards, suite, contract) {
  const errors = [], byKey = new Map();
  for (const card of cards) {
    const findings = validateScorecard(card, suite, contract);
    const label = (suite.cases.some(item => item.scenario_id === card?.scenario_id) ? card.scenario_id : 'unknown-scenario') + '/' + (suite.hosts.includes(card?.host) ? card.host : 'unknown-host');
    errors.push(...findings.map(message => label + ': ' + message));
    const key = card?.scenario_id + '/' + card?.host;
    if (byKey.has(key)) errors.push('Duplicate scorecard: ' + label);
    byKey.set(key, card);
  }
  const comparisons = suite.cases.map(item => {
    const pair = suite.hosts.map(host => byKey.get(item.scenario_id + '/' + host));
    const complete = pair.every(Boolean);
    const sameInputs = complete && pair.every(card => card.fixture_fingerprint === pair[0].fixture_fingerprint && card.profile_fingerprint === pair[0].profile_fingerprint);
    const comparable = errors.length === 0 && complete && sameInputs && pair.every(card => card.evidence_kind === 'native_session' && ['PASS', 'FAIL'].includes(card.status) && validateScorecard(card, suite, contract).length === 0);
    return { scenario_id: item.scenario_id, hosts: Object.fromEntries(suite.hosts.map((host, index) => [host, !pair[index] ? 'MISSING' : contract.statuses.includes(pair[index].status) ? pair[index].status : 'INVALID'])), evidence_kinds: Object.fromEntries(suite.hosts.map((host, index) => [host, !pair[index] ? 'MISSING' : contract.evidence_kinds.includes(pair[index].evidence_kind) ? pair[index].evidence_kind : 'INVALID'])), same_inputs: !!sameInputs, native_comparable: !!comparable, both_pass: !!comparable && pair.every(card => card.status === 'PASS') };
  });
  return { errors, comparisons };
}
module.exports = { blankScorecard, validateScorecard, compareScorecards, safeRelative, privateText };
