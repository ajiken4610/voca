const func = (a: string, b: string): number => {
  if (!a) return b.length;
  if (!b) return a.length;
  if (a.substring(0, 1) === b.substring(0, 1)) {
    return func(a.substring(1), b.substring(1));
  } else {
    return (
      1 +
      Math.min(
        func(a.substring(1), b.substring(1)),
        func(a.substring(1), b),
        func(a, b.substring(1))
      )
    );
  }
};

export default func;
