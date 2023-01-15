const memo = useMemo<number>();
const func = (a: string, b: string): number => {
  // const beforeLen = memo.size;
  // memo.add([a, b]);
  // const afterLen = memo.size;
  // beforeLen === afterLen && console.log(a, b);
  // console.log(memo);
  if (!a) return b.length;
  if (!b) return a.length;
  const memoData = memo.get(a, b);
  // console.log(memo);
  console.log(a, "-", b, "-", memo.memoIndex.length);
  if (memoData) {
    //console.log(memoData, memo);
    // console.log(a, b);
    return memoData;
  }
  const subA = a.substring(1);
  const subB = b.substring(1);
  if (a.substring(0, 1) === b.substring(0, 1)) {
    const ret = func(subA, subB);
    memo.set(ret, a, b);
    return ret;
  } else {
    const ret = 1 + Math.min(func(subA, subB), func(subA, b), func(a, subB));
    memo.set(ret, a, b);
    return ret;
  }
};

export default func;
