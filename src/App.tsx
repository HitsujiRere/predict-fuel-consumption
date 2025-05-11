import { Container, Group, Stack, Title } from "@mantine/core";
import { TbGasStation } from "react-icons/tb";
import { PredictApp } from "./features/PredictApp";
import "@mantine/core/styles/baseline.css";
import "@mantine/core/styles/default-css-variables.css";
import "@mantine/core/styles/global.css";
import "@mantine/charts/styles.css";

export const App = () => {
  return (
    <Container size="md" p="md">
      <Stack>
        <Title order={1}>
          <Group align="center">
            <TbGasStation />
            Predict fuel consumption
          </Group>
        </Title>

        <PredictApp />
      </Stack>
    </Container>
  );
};
