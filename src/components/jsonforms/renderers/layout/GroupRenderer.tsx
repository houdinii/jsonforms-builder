import {
    type GroupLayout,
    type LabelDescription,
    type RankedTester,
    rankWith,
    uiTypeIs
} from "@jsonforms/core";
import {withJsonFormsLayoutProps} from "@jsonforms/react";
import {ExtendedLayoutProps} from "@/components/jsonforms/types";

const GroupRenderer = (props: ExtendedLayoutProps) => {
    const {uischema, visible} = props;
    const group = uischema as GroupLayout & LabelDescription;
    const {label} = group;

    if (!visible) {
        return null;
    }

    return (
        <div className="rounded-md mb-1">
            {label && <h3 className="text-lg mb-1">{label}</h3>}
            {props.children}
        </div>
    );
};


const groupRendererTester: RankedTester = rankWith(6, uiTypeIs("Group"));

const renderer = withJsonFormsLayoutProps(GroupRenderer);

GroupRenderer.displayName = "Group";

export default {
    renderer,
    tester: groupRendererTester,
    noPropsRenderer: GroupRenderer
};