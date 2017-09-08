# js0xn

A Buffer encoding/decoding scheme for JSON with the aim of:

1. Keeping the payload human-readable
2. Minimizing bloat

It's still standard JSON. Buffers are encoded as strings.

For example, a Buffer instance with the bytes 1, 10, 100 gets encoded as the hex string `"0x010a64"`.

Regular strings are untouched, except getting escaped when they already start with a "0x".

## Installation

```
npm install --save js0xn
```

## Usage

```
const js0xn = require('js0xn');
```

### js0xn.stringify()

`js0xn.stringify()` stringifies a value just like `JSON.stringify()` does, with the additional handling of Buffer instances.

#### JSON-native types

Types that are native to JSON are handled the same way as `JSON.stringify()`.

```
js0xn.stringify(1) // '1'
js0xn.stringify(true) // 'true'
js0xn.stringify('hello') // '"hello"'
js0xn.stringify([ 1, 2, 'a', 'b' ]) // '[1,2,"a","b"]'
js0xn.stringify({ a: 1, b: 'foo', c: true }) // '{"a":1,"b":"foo","c":true}'
```

#### Buffer instances

Buffer instances are encoded as hex strings prefixed with "0x":

```
js0xn.stringify(Buffer.from([ 0x00, 0xc3, 0xff ])) // '"0x00c3ff"'
```

And they can be deeply nested:

```
js0xn.stringify({ a: [ Buffer.from([ 0x00, 0xc3, 0xff ]) ] }) // '{"a":["0x00c3ff"]}'
```

#### Strings that start with "0x"

If some strings happen to already start with the character sequence "0x", the sequence is escaped as "0xx" to disambiguate such strings from buffer strings:

```
js0xn.stringify('0xy6en') // '"0xxy6en"'
```

### js0xn.parse()

`js0xn.parse()` parses a JSON string just like `JSON.parse()` does, with the additional handling of buffer strings.

```
js0xn.parse('["hello","0xff"]') // [ 'hello', Buffer.from([ 255 ]) ]
js0xn.parse('"0xxym0r0n"') // '0xym0r0n'
```

### js0xn.encode()

`js0xn.encode()` does in-place encoding of Buffer instance values, even when deeply nested. Can be used to encode Buffer instances before passing down values for JSON stringification (e.g. when using Express, `response.body` will be set to an object for automatic JSON stringification, but encoding of Buffer instances is all that is needed.)

```
js0xn.encode({ b: Buffer.from([ 0x00, 0xc3, 0xff ]) }) // { b: '0x00c3ff' }
```

### js0xn.decode()

`js0xn.decode()` does in-place decoding of buffer strings, even when deeply nested. Can be used to decode buffer strings into Buffer instances when you already have values parsed from JSON (e.g. when the body-parser middleware for Express already parses JSON payload and presents it as `request.body` and all that is needed is to decode buffer strings.)

```
js0xn.decode({ b: '0x00c3ff' }) // { b: Buffer.from([ 0x00, 0xc3, 0xff ]) }
```
