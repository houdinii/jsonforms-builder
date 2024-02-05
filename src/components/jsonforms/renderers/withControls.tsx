import { type ComponentType } from "react";

import {
  type Categorization,
  type ControlElement,
  type LayoutProps,
  type OwnPropsOfControl
} from "@jsonforms/core";
import { X } from "lucide-react";

import { AddElement } from "@/components/AddElement/AddElement";
import {
  AddCategoryElement,
  AddLayoutElement
} from "@/components/AddLayoutElement/AddLayoutElement";
import { useDeleteUiElement } from "@/components/jsonforms/hooks/useElements";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

export const withElementControls = (
  WrappedComponent: ComponentType<OwnPropsOfControl>
) => {
  return (props: OwnPropsOfControl) => {
    const { visible, uischema } = props;

    const removeElement = useDeleteUiElement();

    if (!visible) {
      return null;
    }

    return (
      <div className=" rounded-md p-5 shadow-around mb-2">
        <div className="text-slate-400 text-sm flex justify-between w-full items-center">
          {WrappedComponent.displayName ?? "Element"}
          <Tooltip>
            <TooltipTrigger asChild>
              <X
                size={16}
                className="cursor-pointer"
                onClick={() => removeElement(uischema as ControlElement)}
              />
            </TooltipTrigger>
            <TooltipContent>Remove Element</TooltipContent>
          </Tooltip>
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export const withLayoutControls = (
  WrappedComponent: ComponentType<LayoutProps>
) => {
  return (props: LayoutProps) => {
    const { uischema, visible } = props;
    const removeElement = useDeleteUiElement();

    const addElementControls =
      WrappedComponent.displayName === "Categorization Layout" ? (
        <AddCategoryElement uiSchema={uischema as Categorization} />
      ) : (
        <div className="flex justify-between gap-4 mt-5 w-full">
          <AddLayoutElement uiSchema={uischema as ControlElement} />
          <AddElement uiSchema={uischema as ControlElement} />
        </div>
      );

    if (!visible) {
      return null;
    }

    return (
      <div className="rounded-md p-5 shadow-around mb-2">
        <div className="text-slate-400 text-sm flex justify-between w-full items-center">
          {WrappedComponent.displayName ?? "Element"}
          <Tooltip>
            <TooltipTrigger asChild>
              <X
                size={16}
                className="cursor-pointer"
                onClick={() => removeElement(props?.uischema as ControlElement)}
              />
            </TooltipTrigger>
            <TooltipContent>Remove Element</TooltipContent>
          </Tooltip>
        </div>
        <WrappedComponent {...props} />
        {uischema && addElementControls}
      </div>
    );
  };
};
