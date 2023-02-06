const func = (
  a: number[],
  aOffset: number,
  b: number[],
  bOffset: number,
  memo: ReturnType<typeof useMemo<number>> = useMemo<number>()
): number => {
  if (a.length - 1 === aOffset) return b.length - bOffset - 1;
  if (b.length - 1 === bOffset) return a.length - aOffset - 1;
  const memoData = memo.get(aOffset, bOffset);
  if (memoData) {
    return memoData;
  }
  if (a[aOffset] === b[bOffset]) {
    const ret = func(a, aOffset + 1, b, bOffset + 1, memo);
    memo.set(ret, aOffset, bOffset);
    return ret;
  } else {
    const ret =
      1 +
      Math.min(
        func(a, aOffset + 1, b, bOffset + 1, memo), // update
        func(a, aOffset, b, bOffset + 1, memo), // insert
        func(a, aOffset + 1, b, bOffset, memo) // delete
      );
    memo.set(ret, aOffset, bOffset);
    return ret;
  }
};

export default (a: string, b: string) => {
  if (!a) return b.length;
  if (!b) return a.length;
  const aa: number[] = [];
  for (const ca of a) {
    aa.push(ca.codePointAt(0) as number);
  }
  const ba: number[] = [];
  for (const cb of b) {
    ba.push(cb.codePointAt(0) as number);
  }
  return func(aa, 0, ba, 0);
};
