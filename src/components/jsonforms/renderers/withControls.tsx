// components/jsonforms/renderers/withControls.tsx
import {type ComponentType} from "react";
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';

import {
    type Categorization,
    type ControlElement,
    type ControlProps,
    type Layout,
    type LayoutProps
} from "@jsonforms/core";
import {JsonFormsDispatch} from "@jsonforms/react";

import {AddElement} from "@/components/AddElement/AddElement";
import {AddCategoryElement, AddLayoutElement} from "@/components/AddLayoutElement/AddLayoutElement";
import {CollapsiblePanel} from "@/components/CollapsiblePanel/CollapsiblePanel";
import {useDeleteUiElement} from "@/components/jsonforms/hooks/useElements";
import {useReorderElements} from "@/components/jsonforms/hooks/useReorderElements";

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
                elementId={`${uischema.type}-${JSON.stringify(uischema)}`}
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
        const {uischema, visible, ...rest} = props;
        const layout = uischema as Layout;
        const removeElement = useDeleteUiElement();
        const handleReorder = useReorderElements(layout);

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
                elementId={`${uischema.type}-${JSON.stringify(uischema)}`}
            >
                <WrappedComponent {...props}>
                    {layout.elements && layout.elements.length > 0 ? (
                        <DragDropContext
                            onDragEnd={(result) => {
                                if (!result.destination) return;
                                handleReorder(result.source.index, result.destination.index);
                            }}
                        >
                            <Droppable
                                droppableId={`droppable-${layout.type}`}
                                direction={layout.type === 'HorizontalLayout' ? 'horizontal' : 'vertical'}
                            >
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={layout.type === 'HorizontalLayout' ?
                                            `grid grid-cols-${Math.min(layout.elements.length, 3)} gap-2` : ''
                                        }
                                    >
                                        {layout.elements.map((child, index) => (
                                            <Draggable
                                                key={`${child.type}-${index}`}
                                                draggableId={`${child.type}-${index}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                    >
                                                        <div {...provided.dragHandleProps}>
                                                            <JsonFormsDispatch
                                                                uischema={child}
                                                                {...rest}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    ) : null}
                </WrappedComponent>
                {addElementControls}
            </CollapsiblePanel>
        );
    };
};