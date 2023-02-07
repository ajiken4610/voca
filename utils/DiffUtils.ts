// https://qiita.com/convto/items/39efea78e23a944d0760
const snake = (a: number[], b: number[], k: number, y: number, m: number, n: number) => {
  let x = y - k;
  while (x < m && y < n && a[x] === b[y]) {
    x++;
    y++;
  }
  return y;
};

const calEditGraph = (a: number[], b: number[], m: number, n: number) => {
  const fp: number[] = [...Array(m + n + 3).fill(-1)];
  const delta = n - m;
  const offset = m + 1;
  for (var p = 0; ; p++) {
    for (var k = -p; k <= delta - 1; k++) {
      fp[k + offset] = snake(a, b, k, Math.max(fp[k - 1 + offset] + 1, fp[k + 1 + offset]), m, n);
    }
    for (var k = delta + p; k >= delta + 1; k--) {
      fp[k + offset] = snake(a, b, k, Math.max(fp[k - 1 + offset] + 1, fp[k + 1 + offset]), m, n);
    }
    fp[delta + offset] = snake(a, b, k, Math.max(fp[delta - 1 + offset] + 1, fp[delta + 1 + offset]), m, n);
    if (fp[delta + offset] === n) {
      return { fp, distance: delta + 2 * p };
    }
  }
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
  if (aa.length < ba.length) {
    return calEditGraph(aa, ba, aa.length, ba.length);
  } else {
    return calEditGraph(ba, aa, ba.length, aa.length);
  }
};
