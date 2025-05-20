type Data = Record<string, unknown>[];

export const fixedDomain = (
  data: Data,
  { ignores }: { ignores: string[] },
): [number, number] => {
  const min = Math.min(
    ...data.map((row) =>
      Math.min(
        ...Object.entries(row)
          .filter(([key]) => !ignores.includes(key))
          .map(([, x]) => x)
          .filter((x) => typeof x === "number"),
      ),
    ),
  );

  const max = Math.max(
    ...data.map((row) =>
      Math.max(
        ...Object.entries(row)
          .filter(([key]) => !ignores.includes(key))
          .map(([, x]) => x)
          .filter((x) => typeof x === "number"),
      ),
    ),
  );

  return [min, max];
};
