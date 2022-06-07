const str = '112345123';

const trans = str => {
  let targetI = 0;
  let targetJ = 1;
  for (let i = 0; i < str.length; i++) {
    let obj = {};
    const itemI = str[i];
    obj[itemI] = 1;
    for (let j = i + 1; j < str.length; j++) {
      const itemJ = str[j];
      // console.log(obj, itemJ);
      if (obj[itemJ]) {
        if (targetJ - targetI < j - i) {
          targetI = i;
          targetJ = j;
        }
        break;
      } else {
        obj[itemJ] = 1;
      }
    }
  }
  // console.log(targetI, targetJ);
  return str.substring(targetI, targetJ);
};

const trans2 = str => {
  const window = [];
  let res = '';
  for (let i = 0; i < str.length; i++) {
    const item = str[i];
    // console.log(window, item);
    if (window.length > res.length) {
      res = window.join('');
    }

    const index = window.indexOf(item);
    if (index > -1) {
      window.splice(0, index + 1);
    }
    window.push(item);
    left = i;
    // max = Math.max(window.length, max);
    // console.log(left, right);
  }
  // return max;
  return res;
  return str.substring(left, right);
};

// console.log(trans(str));

const a = '12342317892';
console.log(trans(a));
console.log(trans2(a));
