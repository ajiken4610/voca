type keyable = string | number;

interface MemoStructure<T> {
  [key: keyable]: MemoStructure<T> | T;
}

class Memo<T> {
  memo: MemoStructure<T> = {};
  memoIndex: keyable[][] = [];
  length: number;
  constructor(length: number) {
    this.length = length;
  }
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
    while (this.memoIndex.length > this.length) {
      const args = this.memoIndex.shift() as keyable[];
      // argの要素をthis.memoから削除する:オブジェクトが空になったら親参照ごと削除する
      let currentMemo: MemoStructure<T> = this.memo;
      const memos: [MemoStructure<T>, keyable][] = [];
      for (var i = 0; i < args.length - 1; i++) {
        const arg = args[i];
        memos.push([currentMemo, arg]);
        currentMemo = currentMemo[arg] || {};
      }
      delete currentMemo[args[args.length - 1]];
      for (const memo of memos.reverse()) {
        const c = memo[0][memo[1]] as object;
        if (!Object.keys(c).length) {
          delete memo[0][memo[1]];
        }
      }
    }
  }
}

export default <T>(length: number = 65536) => {
  return new Memo<T>(length);
};

// console.log(new Memo<number>(2));
