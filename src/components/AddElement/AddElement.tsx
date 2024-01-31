import { type ChangeEvent, type FC, useState } from "react";

import { type Layout, toDataPath } from "@jsonforms/core";
import set from "lodash.set";
import { X } from "lucide-react";

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

import { Badge } from "@/components/ui/badge";

enum ControlElementTypes {
  input = "TextInput",
  boolean = "Checkbox",
  enum = "Enum"
}

export const AddElement: FC<{
  uiSchema: ElementWithBreadcrumbs<Layout>;
}> = ({ uiSchema }) => {
  const [elementType, setElementType] =
    useState<keyof typeof ControlElementTypes>();

  const onSelectChange = (value: keyof typeof ControlElementTypes) => {
    setElementType(value);
  };

  const getShownElement = () => {
    if (!elementType) {
      return null;
    }

    if (["input", "boolean"].includes(elementType)) {
      return (
        <ElementWithDescription uiSchema={uiSchema} elementType={elementType} />
      );
    }

    if (["enum"].includes(elementType)) {
      return <EnumElement uiSchema={uiSchema} />;
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
      {getShownElement()}
    </div>
  );
};

const ElementWithDescription: FC<{
  elementType: keyof typeof ControlElementTypes | undefined;
  uiSchema: ElementWithBreadcrumbs<Layout>;
}> = ({ elementType, uiSchema }) => {
  const [scope, setScope] = useState<string>("#/properties/");
  const [description, setDescription] = useState<string>();

  const handleUiElementAdd = useAddUiElement(uiSchema);
  const handleAddElement = useAddElement();
  const { changeData, data } = useFormData();

  const resetStates = () => {
    setDescription(undefined);
    setScope("#/properties/");
  };

  const handleScopeChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value.startsWith("#/properties/")) {
      setScope(ev.target.value);
    }
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
      },
      enum: () => {
        handleUiElementAdd({ type: "Control", scope });
        handleAddElement(scope, {
          type: "string",
          description,
          enum: ["hello", "world", "yes"]
        });
        resetStates();
      }
    };

    if (elementType) {
      actions[elementType]();
    }
  };

  return (
    <div className="mt-4 ">
      <Label htmlFor="scope">Element scope</Label>
      <Input
        id="scope"
        required
        value={scope ?? "#/properties/"}
        placeholder="Scope"
        onChange={handleScopeChange}
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
  );
};

const EnumElement: FC<{
  uiSchema: ElementWithBreadcrumbs<Layout>;
}> = ({ uiSchema }) => {
  const [description, setDescription] = useState<string>();
  const [scope, setScope] = useState<string>("#/properties/");
  const [enums, setEnums] = useState<string[]>([]);
  const [newOption, setNewOption] = useState<string>("");

  const handleUiElementAdd = useAddUiElement(uiSchema);
  const handleAddElement = useAddElement();

  const handleButtonClick = () => {
    handleUiElementAdd({ type: "Control", scope });
    handleAddElement(scope, {
      type: "string",
      description,
      enum: enums
    });
  };

  const handleScopeChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value.startsWith("#/properties/")) {
      setScope(ev.target.value);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex gap-x-2 gap-y-0 flex-wrap">
          {enums.map((option) => (
            <Badge key={option} className="mt-2 flex justify-between w-16">
              {option}
              <X
                size={12}
                className="cursor-pointer"
                onClick={() =>
                  setEnums((prev) => prev.filter((el) => el !== option))
                }
              />
            </Badge>
          ))}
        </div>
        <Label htmlFor="options">Element options</Label>
        <Input
          id="options"
          value={newOption}
          placeholder="New option name"
          onChange={(ev) => setNewOption(ev.target.value)}
        />
        <Button
          size={"sm"}
          className="mt-2 w-full"
          onClick={() => {
            setEnums((prev) => [...prev, newOption]);
            setNewOption("");
          }}
        >
          Add Option
        </Button>
      </div>

      <Label htmlFor="scope">Element scope</Label>
      <Input
        id="scope"
        required
        value={scope ?? "#/properties/"}
        placeholder="Scope"
        onChange={handleScopeChange}
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
  );
};
