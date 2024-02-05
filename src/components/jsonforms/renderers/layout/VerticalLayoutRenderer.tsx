import {
  type LayoutProps,
  type RankedTester,
  rankWith,
  uiTypeIs,
  type VerticalLayout
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

const VerticalLayoutRenderer = (props: LayoutProps) => {
  const { uischema, visible, ...rest } = props;

  const { elements } = uischema as VerticalLayout;

  if (!visible) {
    return null;
  }

  return (
    <div>
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

const renderer = withJsonFormsLayoutProps(VerticalLayoutRenderer);

renderer.displayName = "Vertical Layout";

export default {
  renderer,
  tester: categorizationRendererTester
};
