const test = require('node:test'), assert = require('node:assert/strict'), features = require('./features.cjs');
for (const [name, open] of Object.entries(features)) test(name + ' preserves title and closes once', () => {
  let calls = 0; const dialog = open('Synthetic title', () => calls++);
  assert.equal(dialog.title, 'Synthetic title'); dialog.close(); dialog.close(); assert.equal(calls, 1);
});
