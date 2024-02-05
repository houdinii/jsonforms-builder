import {
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

const VerticalLayoutRenderer = (
  props: StatePropsOfLayout & { uischema: Layout }
) => {
  const { uischema, visible, ...rest } = props;
  const { elements } = uischema;

  const removeElement = useDeleteUiElement();

  if (!visible) {
    return null;
  }

  return (
    <div className=" rounded-md p-5 shadow-around mb-2">
      <div className="text-slate-400 text-sm flex justify-between w-full items-center">
        Vertical Layout
        <Tooltip>
          <TooltipTrigger asChild>
            <X
              size={16}
              className="cursor-pointer"
              onClick={() => removeElement(uischema)}
            />
          </TooltipTrigger>
          <TooltipContent>Remove Element</TooltipContent>
        </Tooltip>
      </div>

      {elements.map((child, idx) => {
        return <JsonFormsDispatch key={idx} uischema={child} {...rest} />;
      })}
      <div className="flex justify-between gap-4 mt-5 w-full">
        <AddLayoutElement uiSchema={uischema} />
        <AddElement uiSchema={uischema} />
      </div>
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("VerticalLayout")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(VerticalLayoutRenderer)
};
