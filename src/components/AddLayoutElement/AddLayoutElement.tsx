// noinspection JSUnusedGlobalSymbols

import { type FC, useState } from 'react';

import {
    type Categorization,
    type ControlElement,
    type Layout
} from '@jsonforms/core';

import { UiElementTypes } from '../FormInitializer/FormInitializer';
import { GroupLabel } from '../GroupLabelAdd/GroupLabelAdd';
import { useAddUiElement } from '../jsonforms/hooks/useElements';
import { Input } from '../ui/input';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

export const AddLayoutElement: FC<{
    uiSchema: Layout | ControlElement;
}> = ({ uiSchema: parentUiSchema }) => {
    const [value, setValue] = useState<string>();
    const [addingElement, setAddingElement] = useState(false);

    const handleUiElementAdd = useAddUiElement(parentUiSchema);

    const onSelectChange = (value: keyof typeof UiElementTypes) => {
        const actions = {
            horizontal: () => {
                handleUiElementAdd({
                    type: 'HorizontalLayout',
                    elements: []
                });
                setValue('');
            },
            vertical: () => {
                handleUiElementAdd({
                    type: 'VerticalLayout',
                    elements: []
                });
                setValue('');
            },
            group: () => {
                setAddingElement(true);
            },
            categorization: () => {
                handleUiElementAdd({
                    type: 'Categorization',
                    elements: []
                });
                setValue('');
            }
        };

        actions[value]();
    };

    const handleGroupAdd = (groupLabel: string) => {
        handleUiElementAdd({
            type: 'Group',
            // @ts-expect-error -- json forms types are confusing
            label: groupLabel,
            elements: []
        });
        setAddingElement(false);
        setValue('');
    };

    return (
        <div className="w-full">
            <Select value={value} onValueChange={onSelectChange}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Add ui element" />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(UiElementTypes).map(([key, value]) => (
                        <SelectItem value={key} key={key}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {addingElement && <GroupLabel onGroupAdd={handleGroupAdd} />}
        </div>
    );
};

export const AddCategoryElement: FC<{
    uiSchema: Categorization;
}> = ({ uiSchema }) => {
    const [value, setValue] = useState('');

    const handleUiElementAdd = useAddUiElement(uiSchema);

    const handleButtonClick = () => {
        handleUiElementAdd({
            type: 'Category',
            // @ts-expect-error -- json forms types are confusing
            label: value,
            elements: []
        });
        setValue('');
    };

    return (
        <div className="flex gap-4">
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={'Category label'}
            />
            <Button disabled={!value} onClick={handleButtonClick}>
                Add category
            </Button>
        </div>
    );
};