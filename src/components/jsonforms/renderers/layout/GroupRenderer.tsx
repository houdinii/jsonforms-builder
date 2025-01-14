// components/jsonforms/renderers/layout/GroupRenderer.tsx
import {
  type GroupLayout,
  type LabelDescription,
  type LayoutProps,
  type RankedTester,
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

const GroupRenderer = (props: LayoutProps) => {
  const { uischema, visible, ...rest } = props;

  const group = uischema as GroupLayout & LabelDescription;
  const { label, elements } = group;

  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-md mb-1">
      {label && <h3 className="text-lg mb-1">{label}</h3>}
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

const groupRendererTester: RankedTester = rankWith(6, uiTypeIs("Group"));

// For clean form, use this renderer directly without the HOC
const renderer = withJsonFormsLayoutProps(GroupRenderer);

GroupRenderer.displayName = "Group";

export default {
  renderer,
  tester: groupRendererTester,
  noPropsRenderer: GroupRenderer
};