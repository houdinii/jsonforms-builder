import { type FC, useState } from "react";

import { useFormData } from "../providers/FormDataProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
        // @ts-expect-error -- json forms types
        label: groupLabel,
        elements: [],
        breadcrumbs: []
      });
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
