import {
    type ControlElement,
    isControl,
    type JsonSchema,
    type Layout,
    type UISchemaElement
} from '@jsonforms/core';
import set from 'lodash.set';

import { useFormData } from '../../providers/FormDataProvider';

const addElementToLayout = (
    uiElement: Layout,
    elementToAdd: Layout,
    parentElement: Layout | ControlElement
): Layout => {
    if (!isControl(uiElement) && uiElement.elements.length) {
        return {
            ...uiElement,
            elements: (uiElement === parentElement
                ? [...uiElement.elements, elementToAdd]
                : uiElement.elements.map((el) =>
                      addElementToLayout(
                          el as Layout,
                          elementToAdd,
                          parentElement
                      )
                  )) as UISchemaElement[]
        };
    }

    return {
        ...uiElement,
        elements: uiElement === parentElement ? [elementToAdd] : []
    };
};

const removeElementFromLayout = (
    uiElement: Layout,
    elementToRemove: Layout
): Layout | undefined => {
    if (elementToRemove === uiElement) {
        return undefined;
    }

    if (uiElement.elements) {
        return {
            ...uiElement,
            elements: uiElement.elements
                .map((el) =>
                    removeElementFromLayout(el as Layout, elementToRemove)
                )
                .filter(Boolean) as UISchemaElement[]
        };
    }

    return uiElement;
};

export const useAddUiElement = (parentElement: Layout | ControlElement) => {
    const { changeUiSchema, uischema } = useFormData();

    return (element: Layout | ControlElement) => {
        if (!uischema) {
            changeUiSchema(element);

            return;
        }

        const newCopy = addElementToLayout(
            uischema as Layout,
            element as Layout, // it's simpler to cast than to bother with the types
            parentElement
        );

        changeUiSchema(newCopy);
    };
};

export const useAddElement = () => {
    const { changeSchema, schema } = useFormData();

    return (scope: string, element: JsonSchema) => {
        const path = scope.replace('#/', '').replaceAll('/', '.');

        const schemaCopy = { ...schema };

        set(schemaCopy, path, element);

        changeSchema(schemaCopy);
    };
};

export const useDeleteUiElement = () => {
    const { changeUiSchema, uischema } = useFormData();

    return (elementToDelete: Layout | ControlElement) => {
        if (!uischema) {
            changeUiSchema(elementToDelete);

            return;
        }

        const newCopy = removeElementFromLayout(
            uischema as Layout,
            elementToDelete as Layout // it's simpler to cast than to bother with the types
        );

        changeUiSchema(newCopy);
    };
};