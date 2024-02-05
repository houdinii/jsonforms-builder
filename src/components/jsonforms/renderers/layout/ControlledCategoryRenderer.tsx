import {
  type Category,
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

const CategoryRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const removeElement = useDeleteUiElement();

  const { elements, label } = uischema as Category;

  if (!visible) {
    return null;
  }

  return (
    <div className=" rounded-md p-5 shadow-around">
      <div className="text-slate-400 text-sm flex justify-between w-full items-center">
        Group
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
      {label && <h3 className="text-xl">{label}</h3>}
      {elements.map((child, idx) => {
        return <JsonFormsDispatch key={idx} uischema={child} {...rest} />;
      })}
      <div className="flex justify-between gap-4 mt-5 w-full flex-wrap">
        <AddLayoutElement uiSchema={uischema as Layout} />
        <AddElement uiSchema={uischema as Layout} />
      </div>
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("Category")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(CategoryRenderer)
};
