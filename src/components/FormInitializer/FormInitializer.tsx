import { useState } from "react";

import { GroupLabel } from "../GroupLabelAdd/GroupLabelAdd";
import { useFormData } from "../providers/FormDataProvider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export enum UiElementTypes {
  horizontal = "HorizontalLayout",
  vertical = "VerticalLayout",
  group = "Group",
  categorization = "Categorization"
}

export const FormInitializer = () => {
  const [addingGroup, setAddingGroup] = useState(false);

  const { changeUiSchema } = useFormData();

  const onSelectChange = (value: keyof typeof UiElementTypes) => {
    const actions = {
      horizontal: () => {
        changeUiSchema({
          type: "HorizontalLayout",
          elements: [],
          breadcrumbs: []
        });
      },
      vertical: () => {
        changeUiSchema({
          type: "VerticalLayout",
          elements: [],
          breadcrumbs: []
        });
      },
      group: () => {
        setAddingGroup(true);
      },
      categorization: () => {
        // TODO: implement
      }
    };

    actions[value]();
  };

  return (
    <div>
      <div className="h-full flex flex-col justify-end items-end">
        <Select onValueChange={onSelectChange}>
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
      </div>
      {addingGroup && <GroupLabel />}
    </div>
  );
};
