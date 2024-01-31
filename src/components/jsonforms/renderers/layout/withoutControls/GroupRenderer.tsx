import {
  type GroupLayout,
  type LabelDescription,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

const GroupRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const group = uischema as GroupLayout & LabelDescription;
  const { label, elements } = group;

  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-md  mb-2">
      {label && <h3 className="text-2xl ">{label}</h3>}
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

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(GroupRenderer)
};
