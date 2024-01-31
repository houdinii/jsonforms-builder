import { type ControlProps, isControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";

const TextInput = ({
  data = "",
  path,
  description,
  handleChange
}: Omit<ControlProps, "data"> & { data?: string }) => (
  <div>
    <Label htmlFor="textInput">{description}</Label>
    <Input
      id="textInput"
      className="mb-2"
      value={data}
      onChange={(ev) => handleChange(path, ev.target.value)}
    />
  </div>
);

const tester = rankWith(1, isControl);

const renderer = withJsonFormsControlProps(TextInput);

export default { tester, renderer };
