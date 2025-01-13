import { type ControlProps, isBooleanControl, rankWith } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";

import { Checkbox } from "../../../ui/checkbox";
import { Label } from "../../../ui/label";

const CheckboxRenderer = ({
  data = false,
  visible,
  path,
  handleChange,
  description
}: ControlProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 mb-1">
      <Checkbox
        id="checkbox"
        checked={data as boolean}
        onCheckedChange={(checked) => handleChange(path, checked)}
      />
      <Label htmlFor="checkbox">{description}</Label>
    </div>
  );
};

const tester = rankWith(1, isBooleanControl);

const renderer = withJsonFormsControlProps(CheckboxRenderer);

CheckboxRenderer.displayName = "Checkbox Input";

export default { tester, renderer, noPropsRenderer: CheckboxRenderer };