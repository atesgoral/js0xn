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
  } else if (typeof val === 'string') {
    if (val[0] === '0' && val[1] === 'x') {
      return '0xx' + val.slice(2);
    }
  }

  return val;
}

function decode(val) {
  if (typeof val === 'string' && val[0] === '0' && val[1] === 'x') {
    if (val[2] !== 'x') {
      return Buffer.from(val.slice(2), 'hex');
    } else {
      return '0x' + val.slice(3);
    }
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
