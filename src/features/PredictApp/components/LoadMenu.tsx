import { Button, Menu } from "@mantine/core";
import type { Parameter } from "../types/Parameter";
import { loadDatasetParameterFromName } from "../utils/loadDatasetParameterFromName";

export type LoadMenuProps = {
  onClick: (param: Partial<Parameter>) => void;
};

export const LoadMenu = ({ onClick }: LoadMenuProps) => {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <Menu.Target>
        <Button color="green" w="max">
          Load from Dataset
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            onClick(loadDatasetParameterFromName("datsun b210 gx") ?? {})
          }
        >
          Datsun B210 GX
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            onClick(loadDatasetParameterFromName("ford pinto") ?? {})
          }
        >
          Ford Pinto
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            onClick(loadDatasetParameterFromName("toyota corolla tercel") ?? {})
          }
        >
          Toyota Corolla Tercel
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
