import { Matrix } from "ml-matrix";
import type { Parameter } from "../types/Parameter";

// Coefficient
// biome-ignore format: Do not format!
const coef = [
   1.2920e+2, -1.5142e+1, -1.4912e-1, -3.7988e-1, 
   2.7916e-2, -5.6165e+0,  1.0941e+0, -5.3317e-2,
   1.10878-1, -1.1719e-3,  3.9248e-1, -1.6342e-5, 
   1.3074e-3,  8.4603e-5,  1.1231e-3, -1.7662e-3,
  -1.3002e-4,  1.3294e-2, -2.6554e-6, -7.0916e-4, 
   1.2671e-1,
];

// Constant term
const r = coef[0];

// Linear term
const p = Matrix.rowVector(coef.slice(1, 6));

// Quadratic term matrix
// biome-ignore format: Format 5x5 matrix
const Q = new Matrix([
  [coef[ 6],   coef[ 7]/2, coef[ 8]/2, coef[ 9]/2, coef[10]/2],
  [coef[ 7]/2, coef[11],   coef[12]/2, coef[13]/2, coef[14]/2],
  [coef[ 8]/2, coef[12]/2, coef[15],   coef[16]/2, coef[17]/2],
  [coef[ 9]/2, coef[13]/2, coef[16]/2, coef[18],   coef[19]/2],
  [coef[10]/2, coef[14]/2, coef[17]/2, coef[19]/2, coef[20]]
]);

console.log({ Q, p, r });

export const predictFuelConsumption = (param: Parameter) => {
  const A = Matrix.columnVector([
    param.cylinders,
    param.displacement,
    param.horsepower,
    param.weight,
    param.acceleration,
  ]);

  // A^T Q A + p A + r
  return A.transpose().mmul(Q).mmul(A).get(0, 0) + p.mmul(A).get(0, 0) + r;
};
