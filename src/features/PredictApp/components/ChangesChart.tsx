import { LineChart } from "@mantine/charts";
import { toFixed } from "../../../utils/toFixed";
import standardEfficiancy from "../assets/standardEfficiancy.json";
import type { Parameter } from "../types/Parameter";
import { fixedDomain } from "../utils/fixedDomain";
import { predictFuelConsumption } from "../utils/predictFuelConsumption";

export type StandardChartProps = {
  parameter?: Parameter;
  name: keyof Parameter;
};

export const ChangesChart = ({ parameter, name }: StandardChartProps) => {
  if (parameter === undefined) return undefined;

  const data = [...Array(11)]
    .map((_, i) => toFixed(parameter[name] * (0.5 + i * 0.1), 1))
    .map((param) => ({
      param,
      prediction: toFixed(
        predictFuelConsumption({ ...parameter, [name]: param }),
        2,
      ),
    }));

  return (
    <LineChart
      h={300}
      curveType="natural"
      dataKey="param"
      xAxisLabel={name}
      yAxisLabel="km/L"
      yAxisProps={{ domain: fixedDomain(data, { ignores: ["param"] }) }}
      series={[
        {
          name: "prediction",
          color: "green",
        },
      ]}
      referenceLines={[
        { x: parameter[name], label: "Current" },
        ...["2015", "2020", "2025"].map((year) => ({
          y: standardEfficiancy.find((row) => row.year === year)?.[
            "japan_km/L"
          ],
          label: `Japan ${year}`,
          color: "grape.6",
        })),
      ]}
      data={data}
    />
  );
};
