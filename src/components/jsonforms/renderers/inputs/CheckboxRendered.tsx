import { type ControlProps, isBooleanControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

import { Checkbox } from "../../../ui/checkbox";
import { Label } from "../../../ui/label";

const CheckboxRenderer = ({
  data = false,
  path,
  handleChange,
  description
}: Omit<ControlProps, "data"> & { data?: boolean }) => {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <Checkbox
        id="checkbox"
        checked={data}
        onCheckedChange={(checked) => handleChange(path, checked)}
      />
      <Label htmlFor="checkbox">{description}</Label>
    </div>
  );
};

const tester = rankWith(1, isBooleanControl);

const renderer = withJsonFormsControlProps(CheckboxRenderer);

export default { tester, renderer };
