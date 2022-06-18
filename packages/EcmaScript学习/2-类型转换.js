const obj = {
  toString() {
    console.log('to string');
  },

  valueOf() {
    console.log('value of');
  },

  [Symbol.toPrimitive](hint) {
    if (hint === 'string') {
      console.log('str');
      return 'string';
    } else if (hint === 'number') {
      console.log('num');
      return 0;
    } else if (hint === 'default') {
      console.log('default...');
      return 'default';
    }
  }
}

const obj2 = {
  toString() {
    console.log('to string');
  },

  valueOf() {
    console.log('value of');
  }
}
obj[Symbol.toPrimitive] = (hint) => {
  if (hint === 'string') {
    console.log('str');
    return 'string';
  } else if (hint === 'number') {
    console.log('num');
    return 0;
  } else if (hint === 'default') {
    console.log('default...');
    return 'default';
  }
}
console.log(obj + "");