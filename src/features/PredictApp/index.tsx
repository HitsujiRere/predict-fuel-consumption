import { NumberFormatter, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useCallback } from "react";
import { Form } from "./components/Form";
import { StandardChart } from "./components/StandardChart";
import type { Parameter } from "./types/Parameter";
import { mpgToKmPL } from "./utils/convertUnits";
import { predictFuelConsumption } from "./utils/predictFuelConsumption";

export const PredictApp = () => {
  const [prediction, setPrediction] = useState<number | undefined>(undefined);
  const changeHandler = useCallback((param: Parameter) => {
    setPrediction(mpgToKmPL(predictFuelConsumption(param)));
  }, []);

  return (
    <Stack gap="lg">
      <Form onChange={changeHandler} />

      <Text size="lg">
        Predicted fuel consumption is{" "}
        {prediction === undefined ? (
          "..."
        ) : (
          <>
            <NumberFormatter
              value={prediction}
              decimalScale={1}
              suffix=" km/L"
            />
            !!
          </>
        )}
      </Text>

      <div>
        <Title order={2}>Standard Conversion Values</Title>
        <StandardChart prediction={prediction} />
      </div>
    </Stack>
  );
};
