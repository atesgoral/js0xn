import test from 'ava';

const js0xn = require('..');

test('encode primitive: null', (t) => {
  t.is(js0xn.encode(null), null);
});

test('encode primitive: number', (t) => {
  t.is(js0xn.encode(42), 42);
});

test('encode primitive: Boolean', (t) => {
  t.is(js0xn.encode(true), true);
  t.is(js0xn.encode(false), false);
});

test('encode primitive: regular string', (t) => {
  t.is(js0xn.encode('hello'), 'hello');
});

test('encode primitive: string prefixed by 0x', (t) => {
  t.is(js0xn.encode('0x1234'), '0xx1234');
});

test('encode object', (t) => {
  t.deepEqual(js0xn.encode({ a: 1 }), { a: 1 });
});

test('encode array', (t) => {
  t.deepEqual(js0xn.encode([ 1, 2 ]), [ 1, 2 ]);
});

test('encode buffer', (t) => {
  t.is(js0xn.encode(Buffer.from([ 255, 0 ])), '0xff00');
});

test('encode nested', (t) => {
  t.deepEqual(
    js0xn.encode({
      a: 1,
      b: [ '0xee11', Buffer.from([ 255, 0 ]) ],
      c: [ { d: true, e: null } ]
    }),
    {
      a: 1,
      b: [ '0xxee11', '0xff00' ],
      c: [ { d: true, e: null } ]
    }
  );
});

test('decode primitive: null', (t) => {
  t.is(js0xn.decode(null), null);
});

test('decode primitive: number', (t) => {
  t.is(js0xn.decode(42), 42);
});

test('decode primitive: Boolean', (t) => {
  t.is(js0xn.decode(true), true);
  t.is(js0xn.decode(false), false);
});

test('decode primitive: regular string', (t) => {
  t.is(js0xn.decode('hello'), 'hello');
});

test('decode primitive: string prefixed by 0x', (t) => {
  t.is(js0xn.decode('0xx1234'), '0x1234');
});

test('decode object', (t) => {
  t.deepEqual(js0xn.decode({ a: 1 }), { a: 1 });
});

test('decode array', (t) => {
  t.deepEqual(js0xn.decode([ 1, 2 ]), [ 1, 2 ]);
});

test('decode buffer', (t) => {
  t.deepEqual(js0xn.decode('0xff00'), Buffer.from([ 255, 0 ]));
});

test('decode nested', (t) => {
  t.deepEqual(
    js0xn.decode({
      a: 1,
      b: [ '0xxee11', '0xff00' ],
      c: [ { d: true, e: null } ]
    }),
    {
      a: 1,
      b: [ '0xee11', Buffer.from([ 255, 0 ]) ],
      c: [ { d: true, e: null } ]
    }
  );
});
