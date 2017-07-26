function encode(val) {
  if (val instanceof Buffer) {
    return '0x' + val.toString('hex');
  } else if (val instanceof Array) {
    for (let i = 0; i < val.length; i++) {
      val[i] = encode(val[i]);
    }
  } else if (typeof val === 'object') {
    for (let p in val) {
      val[p] = encode(val[p]);
    }
  }

  return val;
}

function decode(val) {
  if (typeof val === 'string' && val[0] === '0' && val[1] == 'x') {
    return Buffer.from(val.slice(2), 'hex');
  } else if (val instanceof Array) {
    for (let i = 0; i < val.length; i++) {
      val[i] = decode(val[i]);
    }
  } else if (typeof val === 'object') {
    for (let p in val) {
      val[p] = decode(val[p]);
    }
  }

  return val;
}

function stringify(v) {
  return JSON.stringify(encode(v));
}

function parse(v) {
  return decode(JSON.parse(v));
}

module.exports = Object.freeze({
  encode,
  decode,
  stringify,
  parse
});
