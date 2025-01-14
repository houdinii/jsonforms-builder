// components/jsonforms/renderers/layout/HorizontalLayoutRenderer.tsx
import {HorizontalLayout, type RankedTester, rankWith, uiTypeIs} from "@jsonforms/core";
import {JsonFormsDispatch, withJsonFormsLayoutProps} from "@jsonforms/react";
import {ExtendedLayoutProps} from "@/components/jsonforms/types";

const HorizontalLayoutRenderer = (props: ExtendedLayoutProps) => {
    const {uischema, visible, ...rest } = props;
    const {elements} = uischema as HorizontalLayout;

    if (!visible) {
        return null;
    }

    return (
        <div>
            {elements.map((child, idx) => (
                <JsonFormsDispatch
                    key={idx}
                    uischema={child}
                    {...rest}
                />
            ))}
        </div>
    );
};

const horizontalLayoutTester: RankedTester = rankWith(
    6,
    uiTypeIs("HorizontalLayout")
);

const renderer = withJsonFormsLayoutProps(HorizontalLayoutRenderer);

HorizontalLayoutRenderer.displayName = "Horizontal Layout";

export default {
    renderer,
    tester: horizontalLayoutTester,
    noPropsRenderer: HorizontalLayoutRenderer
};