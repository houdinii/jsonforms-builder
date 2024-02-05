import {
  type HorizontalLayout,
  type Layout,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";
import { X } from "lucide-react";

import { AddLayoutElement } from "../../../AddLayoutElement/AddLayoutElement";

import { AddElement } from "@/components/AddElement/AddElement";
import { useDeleteUiElement } from "@/components/jsonforms/hooks/useElements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

const HorizontalLayoutRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const removeElement = useDeleteUiElement();

  const { elements } = uischema as HorizontalLayout;
  const gridColsClass =
    elements.length >= 3
      ? "grid-cols-3"
      : `grid-cols-${elements.length || "1"}`;

  if (!visible) {
    return null;
  }

  return (
    <div className=" rounded-md p-5 shadow-around mb-2">
      <div className="text-slate-400 text-sm flex justify-between w-full items-center">
        Horizontal Layout
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
      <div className={`grid ${gridColsClass} gap-4 items-end`}>
        {elements.map((child, idx) => {
          return <JsonFormsDispatch key={idx} uischema={child} {...rest} />;
        })}
      </div>
      <div className="flex justify-between gap-4 mt-5 w-full">
        <AddLayoutElement uiSchema={uischema as Layout} />
        <AddElement uiSchema={uischema as Layout} />
      </div>
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("HorizontalLayout")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(HorizontalLayoutRenderer)
};
