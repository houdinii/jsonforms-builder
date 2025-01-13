import { useMemo } from 'react';

import {
    type Categorization,
    type Category,
    isVisible,
    type LayoutProps,
    type RankedTester,
    rankWith,
    uiTypeIs
} from '@jsonforms/core';
import {
    JsonFormsDispatch,
    useJsonForms,
    withJsonFormsLayoutProps
} from '@jsonforms/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CategorizationRenderer = (props: LayoutProps) => {
    const { uischema, visible, schema, ...rest } = props;
    const { core: { ajv } = {} } = useJsonForms();

    const categorization = uischema as Categorization;

    const categories = useMemo(
        () =>
            categorization?.elements.filter(
                (category: Category | Categorization) => {
                    if (category.type !== 'Category' || !ajv) {
                        return false;
                    }

                    return isVisible(category, props.data, '', ajv);
                }
            ),
        [ajv, categorization?.elements, props.data]
    );

    if (!visible) {
        return null;
    }

    return (
        <div className="rounded-md p-1  mb-1 ">
            <Tabs defaultValue="0" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    {categories.map(({ label }, idx: number) => (
                        <TabsTrigger key={idx} value={`${idx}`}>
                            {label}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {categories.map((child, index) => {
                    return (
                        <TabsContent key={index} value={`${index}`}>
                            <JsonFormsDispatch
                                key={index}
                                uischema={child}
                                schema={schema}
                                {...rest}
                            />
                        </TabsContent>
                    );
                })}
            </Tabs>
        </div>
    );
};

const categorizationRendererTester: RankedTester = rankWith(
    6,
    uiTypeIs('Categorization')
);

const renderer = withJsonFormsLayoutProps(CategorizationRenderer);

CategorizationRenderer.displayName = 'Categorization Layout';

export default {
    renderer,
    tester: categorizationRendererTester,
    noPropsRenderer: CategorizationRenderer
};