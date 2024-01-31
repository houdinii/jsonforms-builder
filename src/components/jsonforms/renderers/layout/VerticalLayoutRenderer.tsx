import {
  type Layout,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs,
  type VerticalLayout
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

import { AddLayoutElement } from "../../../AddLayoutElement/AddLayoutElement";
import { type ElementWithBreadcrumbs } from "../types";

import { AddElement } from "@/components/AddElement/AddElement";

const VerticalLayoutRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const { elements } = uischema as VerticalLayout;

  if (!visible) {
    return null;
  }

  return (
    <div className="bg-slate-50 rounded-md p-5 shadow-around mb-2">
      <p className="text-slate-400 text-sm">Vertical Layout</p>

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
  uiTypeIs("VerticalLayout")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(VerticalLayoutRenderer)
};
