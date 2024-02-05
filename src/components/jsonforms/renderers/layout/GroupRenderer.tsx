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
    <div className="rounded-md  mb-2">
      {label && <h3 className="text-2xl mb-2">{label}</h3>}
      {elements.map((child) => {
        return (
          <JsonFormsDispatch
            key={`${child.type}-${label ?? ""}-${elements.indexOf(child)}`}
            uischema={child}
            {...rest}
          />
        );
      })}
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("Group")
);

const renderer = withJsonFormsLayoutProps(GroupRenderer);

renderer.displayName = "Group";

export default {
  tester: categorizationRendererTester,
  renderer
};
