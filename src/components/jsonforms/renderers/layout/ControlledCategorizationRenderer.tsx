import { useMemo } from "react";

import {
  type Categorization,
  type Category,
  isVisible,
  type JsonFormsCore,
  type Layout,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs
} from "@jsonforms/core";
import {
  JsonFormsDispatch,
  useJsonForms,
  withJsonFormsLayoutProps
} from "@jsonforms/react";

import { AddCategoryElement } from "../../../AddLayoutElement/AddLayoutElement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { type ElementWithBreadcrumbs } from "../types";

export interface CategorizationLayoutRendererProps extends StatePropsOfLayout {
  selected?: number;
  ownState?: boolean;
  ajv: JsonFormsCore["ajv"];
  data?: unknown;
  onChange?(selected: number, prevSelected: number): void;
}

const CategorizationRenderer = (props: CategorizationLayoutRendererProps) => {
  const { uischema, visible, data, schema, ...rest } = props;
  const { core: { ajv } = {} } = useJsonForms();

  const categorization = uischema as Categorization;

  const categories = useMemo(
    () =>
      categorization?.elements.filter((category: Category | Categorization) => {
        if (category.type !== "Category" || !ajv) {
          return false;
        }

        return isVisible(category, data, "", ajv);
      }),
    [categorization?.elements, ajv, data]
  );

  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-md p-5 shadow-around mb-2">
      <p className="text-slate-400 text-sm">Categorization</p>
      <Tabs defaultValue="0" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {categories.map(({ label }, idx: number) => (
            <TabsTrigger key={idx} value={`${idx}`}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {categories.map((child, index) => {
          return (
            <TabsContent key={index} value={`${index}`}>
              <JsonFormsDispatch
                key={index}
                uischema={child}
                schema={schema}
                {...rest}
              />
            </TabsContent>
          );
        })}
      </Tabs>
      <div className="flex justify-between gap-4 mt-5 w-full">
        <AddCategoryElement
          uiSchema={uischema as ElementWithBreadcrumbs<Layout>}
        />
      </div>
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("Categorization")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(CategorizationRenderer)
};
