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
}
const func = (
  a: number[],
  aOffset: number,
  b: number[],
  bOffset: number,
  mat: Mat = new Mat(a.length, b.length)
): DiffInfo => {
  if (a.length - 1 === aOffset) return { distance: b.length - bOffset - 1 };
  if (b.length - 1 === bOffset) return { distance: a.length - aOffset - 1 };
  const matDistance = mat.get(aOffset, bOffset);
  if (matDistance !== -1) {
    return { distance: matDistance };
  }
  if (a[aOffset] === b[bOffset]) {
    const ret = func(a, aOffset + 1, b, bOffset + 1, mat);
    mat.set(aOffset, bOffset, ret.distance);
    return ret;
  } else {
    const updated = func(a, aOffset + 1, b, bOffset + 1, mat);
    const inserted = func(a, aOffset, b, bOffset + 1, mat);
    const deleted = func(a, aOffset + 1, b, bOffset, mat);
    const retDistance =
      1 + Math.min(updated.distance, inserted.distance, deleted.distance);
    mat.set(aOffset, bOffset, retDistance);
    return { distance: retDistance };
  }
};
export const calStringDistInfos = (src: string, dst: string) => {
  if (!src.length) return { distance: dst.length };
  if (!dst.length) return { distance: src.length };
  const aa: number[] = [];
  for (const ca of src) {
    aa.push(ca.codePointAt(0) as number);
  }
  const ba: number[] = [];
  for (const cb of dst) {
    ba.push(cb.codePointAt(0) as number);
  }
  const mat = new Mat(aa.length, ba.length);
  const ret = func(aa, 0, ba, 0, mat);
  console.log(mat.toString());
  return ret;
  // return func(aa,0,bb,0)
};
