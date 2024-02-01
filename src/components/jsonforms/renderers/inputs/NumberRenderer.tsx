import { useEffect, useState } from "react";

import {
  type ControlProps,
  isIntegerControl,
  isNumberControl,
  or,
  rankWith
} from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

import { useDebounce } from "@/lib/hooks/useDebounce";

const toNumber = (value: string) =>
  value === "" ? undefined : parseFloat(value);
const toInteger = (value: string) =>
  value === "" ? undefined : parseInt(value, 10);

const NumberInput = ({
  data,
  path,
  description,
  schema: { type },
  handleChange
}: Omit<ControlProps, "data"> & { data?: number }) => {
  const [value, setValue] = useState<string>(`${data ?? ""}`);

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    if (debouncedValue) {
      handleChange(
        path,
        type === "number" ? toNumber(debouncedValue) : toInteger(debouncedValue)
      );

      return;
    }

    handleChange(path, undefined);
  }, [debouncedValue, handleChange, path, type]);

  return (
    <div className="mb-2">
      <Label htmlFor="numberInput">{description}</Label>
      <Input
        id="numberInput"
        type="number"
        min={0}
        step={type === "number" ? "0.1" : "1"}
        className="mb-2"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </div>
  );
};

const tester = rankWith(2, or(isNumberControl, isIntegerControl));

const renderer = withJsonFormsControlProps(NumberInput);

export default { tester, renderer };
