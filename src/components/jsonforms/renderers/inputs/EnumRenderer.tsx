import { type ControlProps, isEnumControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const EnumRenderer = ({
  path,
  visible,
  handleChange,
  description,
  schema: { enum: enumValues = [] }
}: ControlProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 mb-1">
      <Select onValueChange={(selectValue) => handleChange(path, selectValue)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={description} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {(enumValues as string[]).map((value) => (
              <SelectItem value={value}>{value}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

const tester = rankWith(2, isEnumControl);

const renderer = withJsonFormsControlProps(EnumRenderer);

EnumRenderer.displayName = "Enum Input";

export default { tester, renderer, noPropsRenderer: EnumRenderer };