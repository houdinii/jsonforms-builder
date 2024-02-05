import { type FC, useState } from "react";

import { type Layout } from "@jsonforms/core";

import { useFormData } from "../providers/FormDataProvider";
import { Input } from "../ui/input";

import { Button } from "@/components/ui/button";

export const GroupLabel: FC<{
  onGroupAdd?: (groupLabel: string) => void;
}> = ({ onGroupAdd }) => {
  const [groupLabel, setGroupLabel] = useState<string>("");

  const { changeUiSchema } = useFormData();

  const handleAddClick =
    onGroupAdd ??
    (() => {
      changeUiSchema({
        type: "Group",
        label: groupLabel,
        elements: []
      } as Layout);
    });

  return (
    <div className="mt-5">
      <Input
        placeholder="Group label"
        onChange={(ev) => setGroupLabel(ev.target.value)}
      />
      <Button
        variant="outline"
        className="w-full mt-5"
        onClick={() => handleAddClick(groupLabel)}
      >
        Add
      </Button>
    </div>
  );
};
