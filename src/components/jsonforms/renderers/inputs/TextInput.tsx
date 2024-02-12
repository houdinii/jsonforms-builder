import { useEffect, useState } from "react";

import { type ControlProps, isControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

import { useDebounce } from "@/lib/hooks/useDebounce";

const TextInput = ({
  data = "",
  path,
  visible,
  description,
  handleChange
}: ControlProps) => {
  const [value, setValue] = useState(data as string);

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    handleChange(path, debouncedValue);
  }, [debouncedValue, handleChange, path]);

  if (!visible) {
    return null;
  }

  return (
    <div className="mb-2">
      <Label htmlFor="textInput">{description}</Label>
      <Input
        id="textInput"
        className="mb-2"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      />
    </div>
  );
};

const tester = rankWith(1, isControl);

const renderer = withJsonFormsControlProps(TextInput);

TextInput.displayName = "Text Input";

export default { tester, renderer, noPropsRenderer: TextInput };
