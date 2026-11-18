const test = require('node:test');
const assert = require('node:assert/strict');
const {
  buildArguments,
  summarizeEvents,
  captureStatus,
  prompt,
} = require('./run-codex-bootstrap-check.cjs');
const { bootstrapReceiptContext, loadInputs } = require('./prepare-smoke.cjs');

test('fresh Codex bootstrap check keeps context discovery native and actions read-only', () => {
  const args = buildArguments('local/fixture/project', 'gpt-5.6-sol');
  assert.ok(args.includes('--ephemeral'));
  assert.ok(args.includes('--ignore-user-config'));
  assert.ok(args.includes('--sandbox') && args.includes('read-only'));
  assert.ok(args.includes('model_reasoning_effort="low"'));
  assert.ok(!args.includes('--dangerously-bypass-approvals-and-sandbox'));
  assert.ok(!args.some((value) => value.includes('session-baseline.md')));
  assert.ok(!prompt.includes('session-baseline.md'));
  assert.ok(!prompt.includes('read once at the start'));
  assert.ok(!prompt.includes('automatically loaded at session startup'));
});

test('event summarizer captures a response without grading it', () => {
  const events = [
    { type: 'thread.started' },
    {
      type: 'item.completed',
      item: { type: 'agent_message', text: 'Read once at session start.' },
    },
    { type: 'turn.completed' },
  ]
    .map((value) => JSON.stringify(value))
    .join('\n');
  const summary = summarizeEvents(events);
  assert.equal(summary.turn_completed, true);
  assert.deepEqual(summary.messages, ['Read once at session start.']);
  assert.deepEqual(summary.event_types, ['thread.started', 'item.completed', 'turn.completed']);
});

test('event summarizer counts malformed lines without persisting their content', () => {
  const summary = summarizeEvents('{bad line}\n{"type":"turn.completed"}');
  assert.equal(summary.unparsed_line_count, 1);
  assert.deepEqual(summary.event_types, ['turn.completed']);
  assert.equal(JSON.stringify(summary).includes('{bad line}'), false);
});

test('bootstrap provenance comes from the current checkout', () => {
  const context = bootstrapReceiptContext();
  assert.equal(context.candidate, loadInputs().suite.release);
  assert.match(context.checkout_profile_fingerprint, /^[a-f0-9]{64}$/);
});

test('a completed event still needs a response and a clean process exit', () => {
  const changes = { changed: [], removed: [] };
  const clean = { exitCode: 0, timedOut: false, error: null };
  const summary = { turn_completed: true, messages: ['The startup rule was present.'] };
  assert.equal(captureStatus(clean, summary, changes), 'needs_human_review');
  assert.equal(captureStatus({ ...clean, exitCode: 1 }, summary, changes), 'blocked');
  assert.equal(captureStatus({ ...clean, timedOut: true }, summary, changes), 'blocked');
  assert.equal(captureStatus(clean, { ...summary, messages: [' '] }, changes), 'blocked');
  assert.equal(captureStatus(clean, summary, { ...changes, changed: ['file'] }), 'blocked');
});
