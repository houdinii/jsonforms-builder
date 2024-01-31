import {
  type Category,
  type Layout,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

import { AddLayoutElement } from "../../../AddLayoutElement/AddLayoutElement";
import { type ElementWithBreadcrumbs } from "../types";

import { AddElement } from "@/components/AddElement/AddElement";

const CategoryRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const { elements, label } = uischema as Category;

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-slate-50 rounded-md p-5 shadow-around">
      <p className="text-slate-400 text-sm">Category</p>

      {label && <h3 className="text-xl text-center">{label}</h3>}
      {elements.map((child, idx) => {
        return <JsonFormsDispatch key={idx} uischema={child} {...rest} />;
      })}
      <div className="flex justify-between gap-4 mt-5 w-full">
        <AddLayoutElement
          uiSchema={uischema as ElementWithBreadcrumbs<Layout>}
        />
        <AddElement uiSchema={uischema as ElementWithBreadcrumbs<Layout>} />
      </div>
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
