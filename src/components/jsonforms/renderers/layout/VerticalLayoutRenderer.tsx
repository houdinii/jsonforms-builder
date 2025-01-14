// components/jsonforms/renderers/layout/VerticalLayoutRenderer.tsx
import {type LayoutProps, type RankedTester, rankWith, uiTypeIs, type VerticalLayout} from "@jsonforms/core";
import {JsonFormsDispatch, withJsonFormsLayoutProps} from "@jsonforms/react";

const VerticalLayoutRenderer = (props: LayoutProps) => {
    const {uischema, visible, ...rest} = props;
    const {elements} = uischema as VerticalLayout;

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

const verticalLayoutTester: RankedTester = rankWith(
    6,
    uiTypeIs("VerticalLayout")
);

// For clean form, use this renderer directly without the HOC
const renderer = withJsonFormsLayoutProps(VerticalLayoutRenderer);

VerticalLayoutRenderer.displayName = "Vertical Layout";

export default {
    renderer,
    tester: verticalLayoutTester,
    noPropsRenderer: VerticalLayoutRenderer
};