import {type RankedTester, rankWith, uiTypeIs} from "@jsonforms/core";
import {withJsonFormsLayoutProps} from "@jsonforms/react";
import {ExtendedLayoutProps} from "@/components/jsonforms/types";


const VerticalLayoutRenderer = (props: ExtendedLayoutProps) => {
    const {visible} = props;

    if (!visible) {
        return null;
    }

    return (
        <div>
            {props.children}
        </div>
    );
};

const categorizationRendererTester: RankedTester = rankWith(
    6,
    uiTypeIs("VerticalLayout")
);

const renderer = withJsonFormsLayoutProps(VerticalLayoutRenderer);

VerticalLayoutRenderer.displayName = "Vertical Layout";

export default {
    renderer,
    tester: categorizationRendererTester,
    noPropsRenderer: VerticalLayoutRenderer
};