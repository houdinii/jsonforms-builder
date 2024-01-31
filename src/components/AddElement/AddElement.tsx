import { type ChangeEvent, type FC, useState } from "react";

import { type Layout, toDataPath } from "@jsonforms/core";
import set from "lodash.set";

import { useAddElement, useAddUiElement } from "../jsonforms/hooks/useElements";
import { type ElementWithBreadcrumbs } from "../jsonforms/renderers/types";
import { useFormData } from "../providers/FormDataProvider";
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
  input = "TextInput",
  boolean = "Checkbox"
}

export const AddElement: FC<{
  uiSchema: ElementWithBreadcrumbs<Layout>;
}> = ({ uiSchema }) => {
  const [elementType, setElementType] =
    useState<keyof typeof ControlElementTypes>();
  const [scope, setScope] = useState<string>();
  const [description, setDescription] = useState<string>();

  const handleUiElementAdd = useAddUiElement(uiSchema);
  const handleAddElement = useAddElement();
  const { changeData, data } = useFormData();

  const onSelectChange = (value: keyof typeof ControlElementTypes) => {
    setElementType(value);
    setScope("#/properties/");
  };

  const resetStates = () => {
    setDescription(undefined);
    setScope(undefined);
  };

  const handleButtonClick = () => {
    if (!scope) {
      return;
    }

    const actions = {
      input: () => {
        handleUiElementAdd({ type: "Control", scope });
        handleAddElement(scope, { type: "string", description });
        resetStates();
      },
      boolean: () => {
        handleUiElementAdd({ type: "Control", scope });
        handleAddElement(scope, { type: "boolean", description });
        changeData(set(data, toDataPath(scope), false));

        resetStates();
      }
    };

    if (elementType) {
      actions[elementType]();
    }
  };

  const hangleScopeChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value.startsWith("#/properties/")) {
      setScope(ev.target.value);
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
            value={scope ?? "#/properties/"}
            placeholder="Scope"
            onChange={hangleScopeChange}
          />

          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            defaultValue={""}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <Button
            className="w-full mt-4"
            onClick={handleButtonClick}
            disabled={!/^#\/properties\/.+/.test(scope)}
          >
            Add element
          </Button>
        </div>
      )}
    </div>
  );
};
