const test = require('node:test'), assert = require('node:assert/strict'), normalize = require('./labels.cjs');
test('trims strings, omits blanks and preserves order', () => assert.deepEqual(normalize([' First ', ' ', 'Last']), ['First', 'Last']));
test('omits non-string entries safely', () => assert.deepEqual(normalize([null, ' A ', 2, undefined, '', false]), ['A']));
test('preserves newer empty-input behavior', () => assert.deepEqual(normalize(), []));
