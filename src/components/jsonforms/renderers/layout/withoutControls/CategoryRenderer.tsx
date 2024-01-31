import {
  type Category,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

const CategoryRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const { elements, label } = uischema as Category;

  if (!visible) {
    return null;
  }

  return (
    <div className=" rounded-md mb-2">
      {label && <h3 className="text-xl">{label}</h3>}
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

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(CategoryRenderer)
};
