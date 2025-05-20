import { CompositeChart } from "@mantine/charts";
import { toFixed } from "../../../utils/toFixed";
import standardEfficiancy from "../assets/standardEfficiancy.json";
import { fixedDomain } from "../utils/fixedDomain";

export type StandardChartProps = {
  prediction?: number;
};

export const StandardChart = ({ prediction }: StandardChartProps) => {
  const scaledPrediction =
    prediction !== undefined ? toFixed(prediction, 1) : undefined;

  const data = standardEfficiancy.map((row) => ({
    ...row,
    prediction: scaledPrediction,
  }));

  return (
    <CompositeChart
      h={300}
      withLegend
      curveType="monotone"
      dataKey="year"
      yAxisLabel="km/L"
      yAxisProps={{ domain: fixedDomain(data, "key") }}
      series={[
        {
          name: "prediction",
          type: "area",
          label: "Prediction",
          color: "green",
        },
        {
          name: "eu_km/L",
          type: "line",
          label: "EU",
          color: "red",
        },
        {
          name: "japan_km/L",
          type: "line",
          label: "Japan",
          color: "grape",
        },
        {
          name: "usa_km/L",
          type: "line",
          label: "the United state in America",
          color: "indigo",
        },
      ]}
      data={data}
    />
  );
};
