type Data = Record<string, unknown>[];

export const fixedDomain = (data: Data, key: string): [number, number] => {
  const min = Math.min(
    ...data.map((row) =>
      Math.min(
        ...Object.entries(row)
          .filter(([i]) => i !== key)
          .map(([, x]) => x)
          .filter((x) => typeof x === "number"),
      ),
    ),
  );

  const max = Math.max(
    ...data.map((row) =>
      Math.max(
        ...Object.entries(row)
          .filter(([i]) => i !== key)
          .map(([, x]) => x)
          .filter((x) => typeof x === "number"),
      ),
    ),
  );

  return [min, max];
};
