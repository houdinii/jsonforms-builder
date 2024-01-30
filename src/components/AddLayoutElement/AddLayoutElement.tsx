import { type FC, useState } from "react";

import { type Layout } from "@jsonforms/core";

import { UiElementTypes } from "../FormInitializer/FormInitializer";
import { GroupLabel } from "../GroupLabelAdd/GroupLabelAdd";
import { useAddElement } from "../jsonforms/hooks/useAddElement";
import { type ElementWithBreadcrumbs } from "../jsonforms/renderers/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const AddLayoutElement: FC<{
  uiSchema: ElementWithBreadcrumbs<Layout>;
}> = ({ uiSchema: parentUiSchema }) => {
  const [value, setValue] = useState<string>();
  const [addingElement, setAddingElement] = useState(false);

  const handleElementAdd = useAddElement(parentUiSchema);

  const onSelectChange = (value: keyof typeof UiElementTypes) => {
    const actions = {
      horizontal: () => {
        handleElementAdd({
          type: "HorizontalLayout",
          elements: []
        });
        setValue("");
      },
      vertical: () => {
        handleElementAdd({
          type: "VerticalLayout",
          elements: []
        });
        setValue("");
      },
      group: () => {
        setAddingElement(true);
      },
      categorization: () => {
        handleElementAdd({
          type: "Categorization",
          elements: []
        });
        setValue("");
      }
    };

    actions[value]();
  };

  const handleGroupAdd = (groupLabel: string) => {
    handleElementAdd({
      type: "Group",
      label: groupLabel,
      elements: []
    });
    setAddingElement(false);
    setValue("");
  };

  return (
    <div>
      <Select value={value} onValueChange={onSelectChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Add ui element" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(UiElementTypes).map(([key, value]) => (
            <SelectItem value={key} key={key}>
              {value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {addingElement && <GroupLabel onGroupAdd={handleGroupAdd} />}
    </div>
  );
};

export const AddCategoryElement: FC<{
  uiSchema: ElementWithBreadcrumbs<Layout>;
}> = ({ uiSchema }) => {
  const [value, setValue] = useState("");

  const handleElementAdd = useAddElement(uiSchema);

  const handleButtonClick = () => {
    handleElementAdd({
      type: "Category",
      label: value,
      elements: []
    });
    setValue("");
  };

  return (
    <div className="flex gap-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={"Category label"}
      />
      <Button disabled={!value} onClick={handleButtonClick}>
        Add category
      </Button>
    </div>
  );
};
