import {
  type HorizontalLayout,
  type LayoutProps,
  type RankedTester,
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

const HorizontalLayoutRenderer = (props: LayoutProps) => {
  const { uischema, visible, ...rest } = props;

  const { elements } = uischema as HorizontalLayout;
  const gridColsClass = `grid-cols-${
    elements.length >= 3 ? "3" : elements.length || "1"
  }`;

  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-md mb-2">
      <div className={`grid ${gridColsClass} gap-4 items-end`}>
        {elements.map((child, idx) => {
          return <JsonFormsDispatch key={idx} uischema={child} {...rest} />;
        })}
      </div>
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("HorizontalLayout")
);

const renderer = withJsonFormsLayoutProps(HorizontalLayoutRenderer);

renderer.displayName = "Horizontal Layout";

export default {
  tester: categorizationRendererTester,
  renderer
};
