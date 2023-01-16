type keyable = string | number;

interface MemoStructure<T> {
  [key: keyable]: MemoStructure<T> | T;
}

class Memo<T> {
  memo: MemoStructure<T> = {};
  memoIndex: keyable[][] = [];
  get(...args: keyable[]) {
    let ret = this.memo;
    for (const c of args) {
      // console.log(c, ret, ret[c]);
      if (ret[c]) {
        ret = ret[c] || {};
      } else {
        return null;
      }
    }
    return ret as T;
  }
  set(val: T, ...args: keyable[]) {
    if (this.get(...args)) {
      return;
    }
    let currentMemo = this.memo;
    for (var i = 0; i < args.length - 1; i++) {
      const arg = args[i];
      currentMemo = currentMemo[arg] || (currentMemo[arg] = {});
    }
    currentMemo[args[args.length - 1]] = val;
    this.memoIndex.push(args);
  }
}

export default <T>() => {
  return new Memo<T>();
};
