import { NumberFormatter, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { useCallback } from "react";
import { ChangesChart } from "./components/ChangesChart";
import { Form } from "./components/Form";
import { StandardChart } from "./components/StandardChart";
import type { Parameter } from "./types/Parameter";
import { predictFuelConsumption } from "./utils/predictFuelConsumption";

export const PredictApp = () => {
  const [prediction, setPrediction] = useState<number | undefined>(undefined);
  const [parameter, setParameter] = useState<Parameter | undefined>(undefined);

  const changeHandler = useCallback((param: Parameter) => {
    setParameter(param);
    setPrediction(predictFuelConsumption(param));
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

      <div>
        <Title order={2}>Changes</Title>
        <SimpleGrid type="container" cols={{ base: 1, "600px": 2, "900px": 3 }}>
          <ChangesChart parameter={parameter} name="cylinders" />
          <ChangesChart parameter={parameter} name="displacement" />
          <ChangesChart parameter={parameter} name="horsepower" />
          <ChangesChart parameter={parameter} name="weight" />
          <ChangesChart parameter={parameter} name="acceleration" />
        </SimpleGrid>
      </div>
    </Stack>
  );
};
