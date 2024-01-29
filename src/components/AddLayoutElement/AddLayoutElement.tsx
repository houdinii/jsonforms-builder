import React, { type FC } from "react";

import { type Layout } from "@jsonforms/core";
import get from "lodash.get";
import set from "lodash.set";

import { UiElementTypes } from "../FormInitializer/FormInitializer";
import { useFormData } from "../providers/FormDataProvider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export const AddLayoutElement: FC<{
  breadcrumbPath: string;
  previousBreadcrumbs: number[];
}> = ({ breadcrumbPath, previousBreadcrumbs }) => {
  const { changeUiSchema, uischema } = useFormData();

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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const uiSchemaCopy = { ...uischema! };
        const parentUiSchemaElements = get(
          uischema,
          breadcrumbPath
        ) as Layout["elements"];

        parentUiSchemaElements.push({
          type: "Group",
          // @ts-expect-error -- Json FORMS types are not up to date
          label: "New group",
          elements: [],
          breadcrumbs: [...previousBreadcrumbs, parentUiSchemaElements.length]
        });

        const modifiedUiSchema = set(
          uiSchemaCopy,
          breadcrumbPath,
          parentUiSchemaElements
        );

        changeUiSchema(modifiedUiSchema);
      },
      categorization: () => {
        // TODO: implement
      }
    };

    actions[value]();
  };

  return (
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
  );
};
