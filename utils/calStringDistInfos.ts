class Mat {
  x: number;
  y: number;
  data: number[];
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.data = [...Array(x * y).fill(-1)];
  }
  set(x: number, y: number, val: number) {
    this.data[x + y * this.x] = val;
  }
  get(x: number, y: number) {
    return this.data[x + y * this.x];
  }
  toString() {
    const ret: number[][] = [];
    for (var i = 0; i < this.x; i++) {
      const row: number[] = [];
      ret.push(row);
      for (var j = 0; j < this.y; j++) {
        row.push(this.get(i, j));
      }
    }
    return ret;
  }
}
interface DiffInfo {
  distance: number;
  // lcs 最長共通部分列 Longest Common Subsequence
  lcsStart: number;
  lcsEnd: number;
}
const func = (
  a: number[],
  aOffset: number,
  b: number[],
  bOffset: number,
  distMat: Mat = new Mat(a.length, b.length),
  lcsStartMat: Mat = new Mat(a.length, b.length),
  lcsEndMat: Mat = new Mat(a.length, b.length)
): DiffInfo => {
  if (a.length === aOffset) {
    return {
      distance: b.length - bOffset,
      lcsStart: bOffset,
      lcsEnd: bOffset,
    };
  }
  if (b.length === bOffset) {
    return {
      distance: a.length - aOffset,
      lcsStart: aOffset,
      lcsEnd: aOffset,
    };
  }
  const matDistance = distMat.get(aOffset, bOffset);
  if (matDistance !== -1) {
    const lcsStart = lcsStartMat.get(aOffset, bOffset);
    const lcsEnd = lcsEndMat.get(aOffset, bOffset);
    // lcsStart === -1 && console.log(aOffset, bOffset);
    return {
      distance: matDistance,
      lcsStart,
      lcsEnd,
    };
  }
  if (a[aOffset] === b[bOffset]) {
    const ret = func(
      a,
      aOffset + 1,
      b,
      bOffset + 1,
      distMat,
      lcsStartMat,
      lcsEndMat
    );
    distMat.set(aOffset, bOffset, ret.distance);
    const cLcsStart = aOffset;
    const cLcsEnd = ret.lcsStart === aOffset + 1 ? ret.lcsEnd : aOffset + 1;
    if (cLcsEnd - cLcsStart > ret.lcsEnd - ret.lcsStart) {
      ret.lcsStart = cLcsStart;
      ret.lcsEnd = cLcsEnd;
    }
    lcsStartMat.set(aOffset, bOffset, ret.lcsStart);
    lcsEndMat.set(aOffset, bOffset, ret.lcsEnd);
    return ret;
  } else {
    const updated = func(
      a,
      aOffset + 1,
      b,
      bOffset + 1,
      distMat,
      lcsStartMat,
      lcsEndMat
    );
    const inserted = func(
      a,
      aOffset,
      b,
      bOffset + 1,
      distMat,
      lcsStartMat,
      lcsEndMat
    );
    const deleted = func(
      a,
      aOffset + 1,
      b,
      bOffset,
      distMat,
      lcsStartMat,
      lcsEndMat
    );
    const retDistance =
      1 + Math.min(updated.distance, inserted.distance, deleted.distance);
    distMat.set(aOffset, bOffset, retDistance);
    let retLcsStart;
    let retLcsEnd;
    if (retDistance === updated.distance + 1) {
      // updated
      retLcsStart = updated.lcsStart;
      retLcsEnd = updated.lcsEnd;
    } else if (retDistance === inserted.distance + 1) {
      // inserted
      retLcsStart = inserted.lcsStart;
      retLcsEnd = inserted.lcsEnd;
    } else {
      // deleted
      retLcsStart = deleted.lcsStart;
      retLcsEnd = deleted.lcsEnd;
    }
    lcsStartMat.set(aOffset, bOffset, retLcsStart);
    lcsEndMat.set(aOffset, bOffset, retLcsEnd);
    return { distance: retDistance, lcsStart: retLcsStart, lcsEnd: retLcsEnd };
  }
};
export const calStringDistInfos = (src: string, dst: string) => {
  if (!src.length) return { distance: dst.length, lcsStart: 0, lcsEnd: 0 };
  if (!dst.length) return { distance: src.length, lcsStart: 0, lcsEnd: 0 };
  const aa: number[] = [];
  for (const ca of src) {
    aa.push(ca.codePointAt(0) as number);
  }
  const ba: number[] = [];
  for (const cb of dst) {
    ba.push(cb.codePointAt(0) as number);
  }
  // const mat = new Mat(aa.length, ba.length);
  // const mat2 = new Mat(aa.length, ba.length);
  // const mat3 = new Mat(aa.length, ba.length);
  // const ret = func(aa, 0, ba, 0, mat, mat2, mat3);
  // console.log(mat.toString());
  // console.log(mat2.toString());
  // console.log(mat3.toString());
  // return ret;
  return func(aa, 0, ba, 0);
};

console.log(calStringDistInfos);
