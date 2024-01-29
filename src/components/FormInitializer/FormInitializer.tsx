import { useState } from "react";

import { useFormData } from "../providers/FormDataProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
          elements: []
        });
      },
      vertical: () => {
        changeUiSchema({
          type: "VerticalLayout",
          elements: []
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

const GroupLabel = () => {
  const [groupLabel, setGroupLabel] = useState<string>();

  const { changeUiSchema } = useFormData();

  const onGroupAdd = () => {
    changeUiSchema({
      type: "Group",
      // @ts-expect-error -- json forms types
      label: groupLabel,
      elements: [],
      breadcrumbs: []
    });
  };

  return (
    <div className="mt-5">
      <Input
        placeholder="Group label"
        onChange={(ev) => setGroupLabel(ev.target.value)}
      />
      <Button variant="outline" className="w-full mt-5" onClick={onGroupAdd}>
        Add
      </Button>
    </div>
  );
};
