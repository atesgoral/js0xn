import test from 'ava';

const js0xn = require('..');

test('encode primitive: undefined', (t) => {
  t.is(js0xn.encode(undefined), undefined);
});

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

test('encode object with undefined property', (t) => {
  t.deepEqual(js0xn.encode({ a: undefined }), { a: undefined });
});

test('encode array', (t) => {
  t.deepEqual(js0xn.encode([ 1, 2 ]), [ 1, 2 ]);
});

test('encode array with undefined element', (t) => {
  t.deepEqual(js0xn.encode([ 1, undefined ]), [ 1, undefined ]);
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

test('stringify primitive: undefined', (t) => {
  t.is(js0xn.stringify(undefined), undefined);
});

test('stringify primitive: null', (t) => {
  t.is(js0xn.stringify(null), 'null');
});

test('stringify primitive: number', (t) => {
  t.is(js0xn.stringify(42), '42');
});

test('stringify primitive: Boolean', (t) => {
  t.is(js0xn.stringify(true), 'true');
  t.is(js0xn.stringify(false), 'false');
});

test('stringify primitive: regular string', (t) => {
  t.is(js0xn.stringify('hello'), '"hello"');
});

test('stringify primitive: string prefixed by 0x', (t) => {
  t.is(js0xn.stringify('0x1234'), '"0xx1234"');
});

test('stringify object', (t) => {
  t.deepEqual(js0xn.stringify({ a: 1 }), '{"a":1}');
});

test('stringify object with undefined property', (t) => {
  t.deepEqual(js0xn.stringify({ a: 1, b: undefined }), '{"a":1}');
});

test('stringify array', (t) => {
  t.deepEqual(js0xn.stringify([ 1, 2 ]), '[1,2]');
});

test('stringify array with undefined item', (t) => {
  t.deepEqual(js0xn.stringify([ 1, undefined ]), '[1,null]');
});

test('stringify buffer', (t) => {
  t.is(js0xn.stringify(Buffer.from([ 255, 0 ])), '"0xff00"');
});

test('stringify nested', (t) => {
  t.deepEqual(
    js0xn.stringify({
      a: 1,
      b: [ '0xee11', Buffer.from([ 255, 0 ]) ],
      c: [ { d: true, e: null } ]
    }),
    '{"a":1,"b":["0xxee11","0xff00"],"c":[{"d":true,"e":null}]}'
  );
});
