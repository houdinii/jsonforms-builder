import { isControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

import { Input } from "../../../ui/input";

interface RatingControlProps {
  data: string;
  path: string;
  handleChange(path: string, value: string): void;
}

const TextInput = ({ data = "", path, handleChange }: RatingControlProps) => (
  <Input
    className="mb-2"
    value={data}
    onChange={(ev) => handleChange(path, ev.target.value)}
  />
);

const tester = rankWith(1, isControl);

const renderer = withJsonFormsControlProps(TextInput);

export default { tester, renderer };
