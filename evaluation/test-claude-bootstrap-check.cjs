const test = require('node:test');
const assert = require('node:assert/strict');
const { buildArguments, summarizeOutput, prompt } = require('./run-claude-bootstrap-check.cjs');

test('fresh Claude bootstrap check uses a one-shot read-only host configuration', () => {
  const args = buildArguments('local/fixture/project', 'claude-sonnet-5', 'medium');
  assert.ok(args.includes('--print'));
  assert.ok(args.includes('--no-session-persistence'));
  assert.ok(args.includes('--setting-sources') && args.includes('user'));
  assert.ok(args.includes('--permission-mode') && args.includes('plan'));
  assert.ok(args.includes('--tools') && args[args.indexOf('--tools') + 1] === '');
  assert.ok(args.includes('--disallowedTools') && args[args.indexOf('--disallowedTools') + 1] === 'mcp__*');
  assert.ok(args.includes('--strict-mcp-config'));
  assert.ok(args.includes('--mcp-config') && args[args.indexOf('--mcp-config') + 1].endsWith('.mcp-config.json'));
  assert.ok(args.includes('--effort') && args[args.indexOf('--effort') + 1] === 'medium');
  assert.ok(!prompt.includes('session-baseline.md'));
  assert.ok(!prompt.includes('read once at the start'));
  assert.ok(!prompt.includes('automatically loaded at session startup'));
});

test('JSON output summary extracts a response without grading it', () => {
  const summary = summarizeOutput(JSON.stringify({ result: 'Load once at coding-session startup.', is_error: false, session_id: 'private', model: 'alias' }));
  assert.equal(summary.parsed, true);
  assert.equal(summary.response, 'Load once at coding-session startup.');
  assert.equal(summary.has_session_identity, true);
  assert.equal(summary.has_model_metadata, true);
  assert.equal(Object.hasOwn(summary, 'status'), false);
});

test('malformed output is summarized without preserving content', () => {
  const summary = summarizeOutput('private error details');
  assert.equal(summary.parsed, false);
  assert.equal(Object.hasOwn(summary, 'response'), true);
  assert.equal(JSON.stringify(summary).includes('private error details'), false);
});
