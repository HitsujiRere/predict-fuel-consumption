import type { Parameter } from "../types/Parameter";
import { mpgToKmPL } from "./convertUnits";

// intercept coefficient
const intercept = -46.014853;

// 1-degree coefficients
const coefficients1 = [-0.489686, 1.508819, 14.839985];

// 2-degree coefficients
const coefficients2 = [
  -0.005079, 0.018526, 0.039993, -0.017776, -0.168853, -0.752744,
];

// 3-degree coefficients
const coefficients3 = [
  0.000002, 0.000007, 0.000167, -0.000057, -0.000435, -0.001597, 0.000067,
  0.000308, 0.005279, 0.01254,
];

export const predictFuelConsumption = (param: Parameter) => {
  // parameters
  const A = [param.displacement, param.horsepower, param.acceleration];

  const n = A.length;

  let predicted1 = 0.0;
  for (let i = 0; i < n; i++) {
    predicted1 += A[i] * coefficients1[i];
  }

  let predicted2 = 0.0;
  let index2 = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      predicted2 += A[i] * A[j] * coefficients2[index2];
      index2++;
    }
  }

  let predicted3 = 0.0;
  let index3 = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      for (let k = j; k < n; k++) {
        predicted3 += A[i] * A[j] * A[k] * coefficients3[index3];
        index3++;
      }
    }
  }

  const mpg = intercept + predicted1 + predicted2 + predicted3;

  return mpgToKmPL(mpg);
};
