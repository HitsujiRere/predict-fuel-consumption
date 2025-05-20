import { Button, Group, NumberInput, SimpleGrid, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { TbArrowDown } from "react-icons/tb";
import { z } from "zod";
import type { Parameter } from "../types/Parameter";
import { LoadMenu } from "./LoadMenu";

const formSchema = z.object({
  displacement: z.number().min(1),
  horsepower: z.number().min(1),
  acceleration: z.number().min(1),
});

type FormType = z.infer<typeof formSchema>;

export type FormProps = {
  onChange: (param: Parameter) => void;
};

export const Form = ({ onChange }: FormProps) => {
  const form = useForm<FormType>({
    validate: zodResolver(formSchema),
    validateInputOnBlur: true,
    onValuesChange: (values) => {
      onChange(values);
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onChange(values))}>
      <Stack>
        <Group justify="end">
          <LoadMenu onClick={(param) => form.setValues(param)} />
        </Group>

        <SimpleGrid type="container" cols={{ base: 1, "600px": 2, "900px": 3 }}>
          <NumberInput
            label="Displacement"
            description="Engine displacement (in cubic inches)"
            suffix=" cu in"
            key={form.key("displacement")}
            {...form.getInputProps("displacement")}
            allowNegative={false}
          />
          <NumberInput
            label="Horsepower"
            description="Engine's horsepower rating (hp)"
            suffix=" hp"
            key={form.key("horsepower")}
            {...form.getInputProps("horsepower")}
            allowNegative={false}
          />
          <NumberInput
            label="Acceleration"
            description="0-60mph acceleration time (in seconds)"
            suffix=" sec"
            key={form.key("acceleration")}
            {...form.getInputProps("acceleration")}
            allowNegative={false}
          />
        </SimpleGrid>

        <Button type="submit" leftSection={<TbArrowDown />}>
          Predict!
        </Button>
      </Stack>
    </form>
  );
};
