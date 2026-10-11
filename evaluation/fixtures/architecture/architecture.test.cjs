const test = require('node:test'), assert = require('node:assert/strict');
test('page and service preserve active labels and order', () => {
  const records = [{ label: ' First ', active: true }, { label: 'Hidden', active: false }, { label: ' Last ', active: true }];
  assert.deepEqual(require('./page.cjs').render(records), ['First', 'Last']);
  assert.deepEqual(require('./service.cjs').labels(records), ['First', 'Last']);
});
