import { type FC, useState } from "react";

import { type Layout } from "@jsonforms/core";

import { UiElementTypes } from "../FormInitializer/FormInitializer";
import { GroupLabel } from "../GroupLabelAdd/GroupLabelAdd";
import { useAddElement } from "../jsonforms/hooks/useAddElement";
import { type ElementWithBreadcrumbs } from "../jsonforms/renderers/types";

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
      // @ts-expect-error -- Json FORMS types are not up to date
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
