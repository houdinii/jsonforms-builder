import {
  type HorizontalLayout,
  type Layout,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

import { AddLayoutElement } from "../../../AddLayoutElement/AddLayoutElement";

import { AddElement } from "@/components/AddElement/AddElement";

const HorizontalLayoutRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const { elements } = uischema as HorizontalLayout;
  const gridColsClass =
    elements.length >= 3
      ? "grid-cols-3"
      : `grid-cols-${elements.length || "1"}`;

  if (!visible) {
    return null;
  }

  return (
    <div className=" rounded-md p-5 shadow-around mb-2">
      <p className="text-slate-400 text-sm">Horizontal layout</p>
      <div className={`grid ${gridColsClass} gap-4 items-end`}>
        {elements.map((child, idx) => {
          return <JsonFormsDispatch key={idx} uischema={child} {...rest} />;
        })}
      </div>
      <div className="flex justify-between gap-4 mt-5 w-full">
        <AddLayoutElement uiSchema={uischema as Layout} />
        <AddElement uiSchema={uischema as Layout} />
      </div>
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  6,
  uiTypeIs("HorizontalLayout")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(HorizontalLayoutRenderer)
};
