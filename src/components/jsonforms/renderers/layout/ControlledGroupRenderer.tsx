import {
  type GroupLayout,
  type LabelDescription,
  type Layout,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";
import { X } from "lucide-react";

import { AddElement } from "../../../AddElement/AddElement";
import { AddLayoutElement } from "../../../AddLayoutElement/AddLayoutElement";

import { useDeleteUiElement } from "@/components/jsonforms/hooks/useElements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

const GroupRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const removeElement = useDeleteUiElement();

  const group = uischema as GroupLayout & LabelDescription;
  const { label, elements } = group;

  if (!visible) {
    return null;
  }

  return (
    <div className=" rounded-md p-5 shadow-around mb-2">
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

      {label && <h3 className="text-2xl mb-2">{label}</h3>}
      {elements.map((child) => {
        return (
          <JsonFormsDispatch
            key={`${child.type}-${label ?? ""}-${elements.indexOf(child)}`}
            uischema={child}
            {...rest}
          />
        );
      })}
      <div className="flex justify-between gap-4 mt-5 w-full">
        <AddLayoutElement uiSchema={uischema as Layout} />
        <AddElement uiSchema={uischema as Layout} />
      </div>
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("Group")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(GroupRenderer)
};
