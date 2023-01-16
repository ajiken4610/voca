const getToNgram = (text: string, n: number = 3) => {
  let ret: { [key: string]: number } = {};
  for (var m = 0; m < n; m++) {
    for (var i = 0; i < text.length - m; i++) {
      const c = text.substring(i, i + m + 1);
      ret[c] = ret[c] ? ret[c] + 1 : 1;
    }
  }
  return ret;
};

const getValuesSum = (object: { [key: string]: number }) => {
  return Object.values(object).reduce((prev, current) => prev + current, 0);
};

export default (a: string, b: string) => {
  const aGram = getToNgram(a);
  const bGram = getToNgram(b);
  const keyOfAGram = Object.keys(aGram);
  const keyOfBGram = Object.keys(bGram);
  const abKey = keyOfAGram.filter((n) => keyOfBGram.includes(n));
  let dot = abKey.reduce(
    (prev, key) => prev + Math.min(aGram[key], bGram[key]),
    0
  );

  const abLengthMul = Math.sqrt(getValuesSum(aGram) * getValuesSum(bGram));
  // return 1 - Math.acos(dot / abLengthMul) / Math.PI;
  return dot / abLengthMul;
};
