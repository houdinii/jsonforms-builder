import { type ChangeEvent, type FC, useState } from "react";

import { type Layout, toDataPath } from "@jsonforms/core";
import get from "lodash.get";
import set from "lodash.set";
import { X } from "lucide-react";

import { useAddElement, useAddUiElement } from "../jsonforms/hooks/useElements";
import { useFormData } from "../providers/FormDataProvider";
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
import { Button } from "@/components/ui/button";

enum ControlElementTypes {
  input = "Text",
  number = "Number",
  integer = "Integer",
  boolean = "Checkbox",
  enum = "Enum",
  date = "Date"
}

type ElementType = keyof typeof ControlElementTypes;
export const AddElement: FC<{
  uiSchema: Layout;
}> = ({ uiSchema }) => {
  const [elementType, setElementType] = useState<ElementType>();

  const onSelectChange = (value: ElementType) => {
    setElementType(value);
  };

  const getShownElement = () => {
    switch (elementType) {
      case undefined:
        return null;
      case "input":
      case "boolean":
      case "number":
      case "integer":
      case "date":
        return (
          <ElementWithDescription
            uiSchema={uiSchema}
            elementType={elementType}
          />
        );
      case "enum":
        return <EnumElement uiSchema={uiSchema} />;
      default:
        const exhaustiveCheck: never = elementType;
        return exhaustiveCheck;
    }
  };
  return (
    <div className="w-full">
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
  uiSchema: Layout;
}> = ({ elementType, uiSchema }) => {
  const [scope, setScope] = useState<string>("#/properties/");
  const [description, setDescription] = useState<string>();

  const handleUiElementAdd = useAddUiElement(uiSchema);
  const handleAddElement = useAddElement();
  const { changeData, data, schema } = useFormData();

  const resetStates = () => {
    setDescription(undefined);
    setScope("#/properties/");
  };

  const handleScopeChange = (ev: ChangeEvent<HTMLInputElement>) => {
    if (ev.target.value.startsWith("#/properties/")) {
      setScope(ev.target.value);
    }
  };

  const scopeAlreadyExists = !!get(
    schema,
    scope.replace("#/", "").replaceAll("/", ".")
  );

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
        // handled by Enum Component
      },
      number: () => {
        handleUiElementAdd({ type: "Control", scope });
        handleAddElement(scope, { type: "number", description });

        resetStates();
      },
      integer: () => {
        handleUiElementAdd({ type: "Control", scope });
        handleAddElement(scope, { type: "integer", description });

        resetStates();
      },
      date: () => {
        handleUiElementAdd({ type: "Control", scope });
        handleAddElement(scope, {
          type: "string",
          format: "date",
          description
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
        className="mb-2"
      />
      {scopeAlreadyExists && (
        <p className="text-xs text-destructive">
          The specified scope conflicts with previously added scopes
        </p>
      )}

      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        defaultValue={""}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <Button
        className="w-full mt-4"
        onClick={handleButtonClick}
        disabled={!/^#\/properties\/.+/.test(scope) || scopeAlreadyExists}
      >
        Add element
      </Button>
    </div>
  );
};

const EnumElement: FC<{
  uiSchema: Layout;
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
        className="mb-2"
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
