// https://qiita.com/convto/items/39efea78e23a944d0760
// https://github.com/cubicdaiya/gonp/blob/master/diff.go
interface PointWithRoute {
  x: number;
  y: number;
  r: number;
}
interface Point {
  x: number;
  y: number;
}
interface SesElem {
  e: string;
  t: Operation;
  aIdX: number;
  bIdX: number;
}
export enum Operation {
  ADD,
  DELETE,
  COMMON,
}
const snake = (
  a: number[],
  b: number[],
  k: number,
  p: number,
  pp: number,
  m: number,
  n: number,
  offset: number,
  path: number[],
  pointWithRoute: PointWithRoute[]
) => {
  let r: number;
  if (p > pp) {
    r = path[k - 1 + offset];
  } else {
    r = path[k + 1 + offset];
  }
  let y = Math.max(p, pp);
  let x = y - k;
  while (x < m && y < n && a[x] === b[y]) {
    x++;
    y++;
  }
  path[k + offset] = pointWithRoute.length;
  pointWithRoute.push({ x, y, r });
  return y;
};

const calEditGraph = (a: number[], b: number[], m: number, n: number, reverse: boolean) => {
  const fp: number[] = [...Array(m + n + 3).fill(-1)];
  const path: number[] = [...Array(m + n + 3).fill(-1)];
  const pointWithRoute: PointWithRoute[] = [];
  const delta = n - m;
  const offset = m + 1;
  for (var p = 0; ; p++) {
    for (var k = -p; k <= delta - 1; k++) {
      fp[k + offset] = snake(a, b, k, fp[k - 1 + offset] + 1, fp[k + 1 + offset], m, n, offset, path, pointWithRoute);
    }
    for (var k = delta + p; k >= delta + 1; k--) {
      fp[k + offset] = snake(a, b, k, fp[k - 1 + offset] + 1, fp[k + 1 + offset], m, n, offset, path, pointWithRoute);
    }
    fp[delta + offset] = snake(a, b, k, fp[delta - 1 + offset] + 1, fp[delta + 1 + offset], m, n, offset, path, pointWithRoute);
    if (fp[delta + offset] === n) {
      // return { fp, distance: delta + 2 * p };
      break;
    }
  }
  let r = path[delta + offset];
  const epc: Point[] = [];
  while (r != -1) {
    epc.push({ x: pointWithRoute[r].x, y: pointWithRoute[r].y });
    r = pointWithRoute[r].r;
  }
  const ses: SesElem[] = [];
  let lcs: string = "";
  let x = 1,
    y = 1;
  let px = 0,
    py = 0;
  for (var i = epc.length - 1; i >= 0; i--) {
    while (px < epc[i].x || py < epc[i].y) {
      if (epc[i].y - epc[i].x > py - px) {
        if (reverse) {
          ses.push({ e: String.fromCharCode(b[py]), t: Operation.DELETE, aIdX: y + /*oy*/ 0, bIdX: 0 });
        } else {
          ses.push({ e: String.fromCharCode(b[py]), t: Operation.ADD, aIdX: 0, bIdX: y + /*oy*/ 0 });
        }
        y++;
        py++;
      } else if (epc[i].y - epc[i].x < py - px) {
        if (reverse) {
          ses.push({ e: String.fromCharCode(a[px]), t: Operation.ADD, aIdX: x + /*oy*/ 0, bIdX: 0 });
        } else {
          ses.push({ e: String.fromCharCode(a[px]), t: Operation.DELETE, aIdX: 0, bIdX: x + /*oy*/ 0 });
        }
        x++;
        px++;
      } else {
        if (reverse) {
          lcs += String.fromCharCode(b[py]);
          ses.push({ e: String.fromCharCode(b[py]), t: Operation.COMMON, aIdX: y + /*diff.oy*/ 0, bIdX: x + /*diff.ox*/ 0 });
        } else {
          lcs += String.fromCharCode(a[px]);
          ses.push({ e: String.fromCharCode(a[px]), t: Operation.COMMON, aIdX: x + /*diff.ox*/ 0, bIdX: y + /*diff.oy*/ 0 });
        }
        x++;
        y++;
        px++;
        py++;
      }
    }
  }
  if (!(x > m && y > n)) {
    console.log("something go wrong.");
  }
  return { lcs, ses, distance: delta + 2 * p };
};

export const calDiffInfo = (src: string, dst: string) => {
  const aa: number[] = [];
  for (const ca of src) {
    aa.push(ca.codePointAt(0) as number);
  }
  const ba: number[] = [];
  for (const cb of dst) {
    ba.push(cb.codePointAt(0) as number);
  }
  if (aa.length <= ba.length) {
    return calEditGraph(aa, ba, aa.length, ba.length, false);
  } else {
    return calEditGraph(ba, aa, ba.length, aa.length, true);
  }
};
