import {
  type ControlElement,
  isControl,
  type JsonSchema,
  type Layout,
  type UISchemaElement
} from "@jsonforms/core";
import set from "lodash.set";

import { useFormData } from "../../providers/FormDataProvider";

const addElementToLayout = (
  uiElement: Layout,
  elementToAdd: Layout,
  parentElement: Layout
): Layout => {
  if (!isControl(uiElement) && uiElement.elements.length) {
    return {
      ...uiElement,
      elements: (uiElement === parentElement
        ? [...uiElement.elements, elementToAdd]
        : uiElement.elements.map((el) =>
            addElementToLayout(el as Layout, elementToAdd, parentElement)
          )) as UISchemaElement[]
    };
  }

  return {
    ...uiElement,
    elements: uiElement === parentElement ? [elementToAdd] : []
  };
};

export const useAddUiElement = (parentElement: Layout) => {
  const { changeUiSchema, uischema } = useFormData();

  const handleElementAdd = (element: Layout | ControlElement) => {
    if (!uischema) {
      changeUiSchema(element);

      return;
    }

    const newCopy = addElementToLayout(
      uischema as Layout,
      element as Layout, // it's simpler to cast than to bother with the types
      parentElement
    );

    changeUiSchema(newCopy);
  };

  return handleElementAdd;
};

export const useAddElement = () => {
  const { changeSchema, schema } = useFormData();

  const handleElementAdd = (scope: string, element: JsonSchema) => {
    const path = scope.replace("#/", "").replaceAll("/", ".");

    const schemaCopy = { ...schema };

    set(schemaCopy, path, element);

    changeSchema(schemaCopy);
  };

  return handleElementAdd;
};
