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
import { X } from "lucide-react";

import { AddCategoryElement } from "../../../AddLayoutElement/AddLayoutElement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

import { useDeleteUiElement } from "@/components/jsonforms/hooks/useElements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

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

  const removeElement = useDeleteUiElement();

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
      <div className="text-slate-400 text-sm flex justify-between w-full items-center">
        Categorization
        <Tooltip>
          <TooltipTrigger asChild>
            <X
              size={16}
              className="cursor-pointer"
              onClick={() => removeElement(uischema as Layout)}
            />
          </TooltipTrigger>
          <TooltipContent>Remove Element</TooltipContent>
        </Tooltip>
      </div>
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
        <AddCategoryElement uiSchema={uischema as Categorization} />
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
