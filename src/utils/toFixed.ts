export const toFixed = (n: number, d: number) => {
  return Math.round(n * 10 ** d) / 10 ** d;
};
