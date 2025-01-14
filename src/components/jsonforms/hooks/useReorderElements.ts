// hooks/useReorderElements.ts
import {type Layout} from '@jsonforms/core';
import {useFormData} from '../../providers/FormDataProvider';

export const useReorderElements = (parentElement: Layout) => {
    const {uischema, changeUiSchema} = useFormData();

    return (sourceIndex: number, destinationIndex: number) => {
        if (!uischema) return;

        const findAndReorderElements = (element: Layout): Layout => {
            if (element === parentElement) {
                const newElements = [...element.elements];
                const [removed] = newElements.splice(sourceIndex, 1);
                newElements.splice(destinationIndex, 0, removed);
                return {...element, elements: newElements};
            }

            if (element.elements) {
                return {
                    ...element,
                    elements: element.elements.map((el) => findAndReorderElements(el as Layout))
                };
            }

            return element;
        };

        const newUiSchema = findAndReorderElements(uischema as Layout);
        changeUiSchema(newUiSchema);
    };
};