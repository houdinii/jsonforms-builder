import { type FC, useState } from "react";

import { type Layout } from "@jsonforms/core";

import { useAddElement, useAddUiElement } from "../jsonforms/hooks/useElements";
import { type ElementWithBreadcrumbs } from "../jsonforms/renderers/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";

enum ControlElementTypes {
  input = "TextInput"
}

export const AddElement: FC<{
  uiSchema: ElementWithBreadcrumbs<Layout>;
}> = ({ uiSchema }) => {
  const [elementType, setElementType] =
    useState<keyof typeof ControlElementTypes>();
  const [scope, setScope] = useState<string>();

  const handleUiElementAdd = useAddUiElement(uiSchema);
  const handleAddElement = useAddElement();

  const onSelectChange = (value: keyof typeof ControlElementTypes) => {
    setElementType(value);
    setScope("#/properties/");
  };

  const handleButtonClick = () => {
    if (!scope) {
      return;
    }

    const actions = {
      input: () => {
        handleUiElementAdd({ type: "Control", scope });
        handleAddElement(scope, { type: "string" });
      }
    };

    if (elementType) {
      actions[elementType]();
    }
  };

  return (
    <div>
      <Select onValueChange={onSelectChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Add control element" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ControlElementTypes).map(([key, value]) => (
            <SelectItem value={key} key={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {scope !== undefined && (
        <div className="mt-4 ">
          <Label htmlFor="scope">Element scope</Label>
          <Input
            id="scope"
            placeholder="Scope"
            defaultValue={"#/properties/"}
            onChange={(ev) => setScope(ev.target.value)}
          />
          <Button className="w-full mt-4" onClick={handleButtonClick}>
            Add element
          </Button>
        </div>
      )}
    </div>
  );
};
