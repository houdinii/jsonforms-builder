import {
  type ControlElement,
  type JsonSchema,
  type Layout,
  type UISchemaElement
} from "@jsonforms/core";
import get from "lodash.get";
import set from "lodash.set";

import { useFormData } from "../../providers/FormDataProvider";
import { type ElementWithBreadcrumbs } from "../renderers/types";

type UiSchemaElement = UISchemaElement | Layout;

export const useAddUiElement = (
  parentElement: ElementWithBreadcrumbs<Layout>
) => {
  const { breadcrumbs: parentBreadcrumbs, elements: parentElements } =
    parentElement;
  const { changeUiSchema, uischema } = useFormData();

  const path = `elements${
    parentBreadcrumbs?.length
      ? `[${parentBreadcrumbs.join("].elements[")}]`
      : ""
  }`;

  const handleElementAdd = (
    element: (UiSchemaElement & { label?: string }) | ControlElement
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const uiSchemaCopy = { ...uischema! };
    const { elements } = get(
      uiSchemaCopy,
      path
    ) as ElementWithBreadcrumbs<Layout>;

    set(
      uiSchemaCopy,
      path,
      path === "elements"
        ? [
            ...parentElements,
            {
              ...element,
              breadcrumbs: [...parentBreadcrumbs, parentElements.length]
            }
          ]
        : {
            ...parentElement,
            elements: [
              ...(elements ?? parentElements),
              {
                ...element,
                breadcrumbs: [...parentBreadcrumbs, parentElements.length]
              }
            ]
          }
    );

    changeUiSchema({ ...uiSchemaCopy } as ElementWithBreadcrumbs<Layout>);
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
