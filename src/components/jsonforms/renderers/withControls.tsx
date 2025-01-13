import {type ComponentType} from "react";

import {type Categorization, type ControlElement, type ControlProps, type LayoutProps} from "@jsonforms/core";

import {AddElement} from "@/components/AddElement/AddElement";
import {AddCategoryElement, AddLayoutElement} from "@/components/AddLayoutElement/AddLayoutElement";
import {CollapsiblePanel} from "@/components/CollapsiblePanel/CollapsiblePanel";
import {useDeleteUiElement} from "@/components/jsonforms/hooks/useElements";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {X} from "lucide-react";

export const withElementControls = (
    WrappedComponent: ComponentType<ControlProps>
) => {
    return (props: ControlProps) => {
        const {visible, uischema} = props;

        const removeElement = useDeleteUiElement();

        if (!visible) {
            return null;
        }

        return (
            <CollapsiblePanel
                label={WrappedComponent.displayName ?? "Element"}
                onRemove={() => removeElement(uischema)}
            >
                <WrappedComponent {...props} />
            </CollapsiblePanel>
        );
    };
};

export const withLayoutControls = (
    WrappedComponent: ComponentType<LayoutProps>
) => {
    return (props: LayoutProps) => {
        const {uischema, visible} = props;
        const removeElement = useDeleteUiElement();

        const addElementControls =
            WrappedComponent.displayName === "Categorization Layout" ? (
                <AddCategoryElement uiSchema={uischema as Categorization}/>
            ) : (
                <div className="flex justify-between gap-2 mt-2 w-full">
                    <AddLayoutElement uiSchema={uischema as ControlElement}/>
                    <AddElement uiSchema={uischema as ControlElement}/>
                </div>
            );

        if (!visible) {
            return null;
        }

        return (
            <CollapsiblePanel
                label={WrappedComponent.displayName ?? "Element"}
                onRemove={() => removeElement(uischema as ControlElement)}
            >
                <WrappedComponent {...props} />
                {addElementControls}
            </CollapsiblePanel>
        );
    };
};