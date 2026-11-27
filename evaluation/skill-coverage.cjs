const fs = require('node:fs');
const path = require('node:path');
const { loadInputs, profileFingerprint } = require('./prepare-smoke.cjs');
const { inspectResults } = require('./validate-results.cjs');

function main([evaluator, ...extra]) {
  if (extra.length) throw new Error('Supply at most one local evaluator directory');
  const inputs = loadInputs();
  if (inputs.release !== inputs.suite.release) throw new Error('Manifest and smoke release differ');
  const read = (file) =>
    inputs.yaml.load(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'));
  const manifest = read('devbrain.yaml');
  const matrix = read('evaluation/cli-host-matrix.yaml');
  if (manifest.version !== matrix.release)
    throw new Error('Manifest and host matrix release differ');
  const fingerprint = profileFingerprint();
  const results = evaluator && inspectResults(evaluator, inputs, fingerprint);
  if (results?.errors.length)
    throw new Error('Invalid scorecards. Run validate-results for details.');
  const cards = new Map(
    (results?.current_profile_cards || []).map((card) => [
      card.host + '/' + card.scenario_id,
      card,
    ]),
  );
  const smokeCases = new Set(inputs.suite.cases.map((item) => item.scenario_id));
  const status = (host, scenarioId) => {
    if (!smokeCases.has(scenarioId)) return 'NO_SMOKE_CASE';
    const card = cards.get(host + '/' + scenarioId);
    if (!card) return 'NOT_RUN';
    if (card.stage === 'unattempted') return 'NOT_RUN';
    if (card.stage === 'preflight') return 'PREFLIGHT_BLOCKED';
    if (card.evidence_kind !== 'native_session' || !card.fresh_session) return 'NOT_COMPARABLE';
    return card.status;
  };
  const coverage = manifest.skills.map((skill) => {
    const cases = (field) =>
      inputs.scenarios.filter((scenario) => scenario[field].includes(skill)).map(({ id }) => id);
    const describe = (scenarioIds, host) =>
      Object.fromEntries(scenarioIds.map((id) => [id, status(host, id)]));
    return {
      skill,
      listed_in_manifest: true,
      hosts: Object.fromEntries(
        inputs.suite.hosts.map((host) => [
          host,
          {
            activation_contracts: describe(cases('skills_active'), host),
            boundary_contracts: describe(cases('skills_unnecessary'), host),
          },
        ]),
      ),
    };
  });
  console.log(
    JSON.stringify(
      {
        release: manifest.version,
        profile_fingerprint: fingerprint,
        matching_profile_cards: cards.size,
        host_matrix: Object.fromEntries(matrix.hosts.map((host) => [host.id, host.native_status])),
        scope:
          'Scenario statuses describe reviewed scorecards as supplied. Installation, discovery and benchmark deltas require separate evidence.',
        skills: coverage,
      },
      null,
      2,
    ),
  );
}

try {
  main(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
