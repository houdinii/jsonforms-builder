import {
    type ControlElement,
    isControl,
    type JsonSchema,
    type Layout,
    type UISchemaElement
} from '@jsonforms/core';
import set from 'lodash.set';

import { useFormData } from '../../providers/FormDataProvider';
import omit from 'lodash/omit';


const findAllControlScopes = (
    element: Layout | ControlElement,
    scopes: Set<string> = new Set()
): Set<string> => {
    // If it's a control element with a scope, add it
    if (isControl(element) && element.scope) {
        const key = element.scope.replace('#/properties/', '');
        scopes.add(key);
    }

    // If it has child elements, recursively process them
    if ('elements' in element && Array.isArray(element.elements)) {
        element.elements.forEach(child => {
            findAllControlScopes(child as Layout | ControlElement, scopes);
        });
    }

    return scopes;
};

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
    const { changeUiSchema, uischema, changeSchema, schema } = useFormData();

    return (elementToDelete: Layout | ControlElement) => {
        // Find ALL control scopes in the element being deleted and its children
        const scopesToRemove = findAllControlScopes(elementToDelete);

        // Remove the element from uischema
        if (!uischema) {
            changeUiSchema(null);
            return;
        }

        const newUiSchema = removeElementFromLayout(
            uischema as Layout,
            elementToDelete as Layout
        ) || null;

        changeUiSchema(newUiSchema);

        // Update schema by removing all found properties
        if (scopesToRemove.size > 0) {
            const newProperties = omit(
                schema.properties,
                Array.from(scopesToRemove)
            );

            changeSchema({
                ...schema,
                // @ts-ignore
                properties: newProperties
            });
        }
    };
};