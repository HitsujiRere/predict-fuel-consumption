import dataset from "../assets/autoMPG.json";
import type { Parameter } from "../types/Parameter";

export const loadDatasetParameterFromName = (
  carName: string,
): Parameter | undefined => {
  const data = dataset.find((data) => data.carName === carName);
  if (data === undefined) {
    return undefined;
  }
  return {
    displacement: data.displacement,
    horsepower: data.horsepower ?? 0,
    acceleration: data.acceleration,
  };
};
