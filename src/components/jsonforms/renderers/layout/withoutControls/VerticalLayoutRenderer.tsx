import {
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs,
  type VerticalLayout
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

const VerticalLayoutRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const { elements } = uischema as VerticalLayout;

  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-md p-5 shadow-around mb-2">
      {elements.map((child, idx) => {
        return <JsonFormsDispatch key={idx} uischema={child} {...rest} />;
      })}
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("VerticalLayout")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(VerticalLayoutRenderer)
};
