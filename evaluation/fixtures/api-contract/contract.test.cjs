const test = require('node:test'), assert = require('node:assert/strict');
test('both consumers use the existing name contract', () => {
  const payload = require('./producer.cjs')();
  assert.equal(require('./consumer-a.cjs')(payload), 'SYNTHETIC RECORD');
  assert.equal(require('./consumer-b.cjs')(payload), 'Record: Synthetic record');
});
