import test from 'ava';

const js0xn = require('..');

test('encode null', (t) => {
  t.is(js0xn.encode(null), null);
});
