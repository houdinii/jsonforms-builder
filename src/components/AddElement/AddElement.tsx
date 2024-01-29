import React, { type FC } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@radix-ui/react-select";

enum ControlElementTypes {
  input = "Input"
}

export const AddElement: FC<{ breadcrumbPath: number[] }> = ({
  breadcrumbPath
}) => {
  const onSelectChange = (value: keyof typeof ControlElementTypes) => {
    const actions = {
      input: () => {
        // TODO
      }
    };

    actions[value]();
  };

  return (
    <Select onValueChange={onSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Add ui element" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(ControlElementTypes).map(([key, value]) => (
          <SelectItem value={key} key={key}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
