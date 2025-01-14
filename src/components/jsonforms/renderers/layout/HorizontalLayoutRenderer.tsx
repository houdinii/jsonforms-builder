// components/jsonforms/renderers/layout/HorizontalLayoutRenderer.tsx
import {type RankedTester, rankWith, uiTypeIs} from "@jsonforms/core";
import {withJsonFormsLayoutProps} from "@jsonforms/react";
import {ExtendedLayoutProps} from "@/components/jsonforms/types";

const HorizontalLayoutRenderer = (props: ExtendedLayoutProps) => {
    const {visible} = props;

    if (!visible) {
        return null;
    }

    return (
        <div className="rounded-md mb-1">
            {props.children}
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