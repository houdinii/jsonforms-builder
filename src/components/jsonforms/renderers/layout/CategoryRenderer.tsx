import {
  type Category,
  type LayoutProps,
  type RankedTester,
  rankWith,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

const CategoryRenderer = (props: LayoutProps) => {
  const { uischema, visible, ...rest } = props;

  const { elements, label } = uischema as Category;

  if (!visible) {
    return null;
  }

  return (
    <div className=" rounded-md mb-1">
      {label && <h3 className="text-lg">{label}</h3>}
      {elements.map((child, idx) => {
        return <JsonFormsDispatch key={idx} uischema={child} {...rest} />;
      })}
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("Category")
);

const renderer = withJsonFormsLayoutProps(CategoryRenderer);

CategoryRenderer.displayName = "Category";

export default {
  renderer,
  tester: categorizationRendererTester,
  noPropsRenderer: CategoryRenderer
};