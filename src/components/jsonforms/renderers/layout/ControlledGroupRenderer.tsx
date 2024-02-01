import {
  type GroupLayout,
  type LabelDescription,
  type Layout,
  type RankedTester,
  rankWith,
  type StatePropsOfLayout,
  uiTypeIs
} from "@jsonforms/core";
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react";

import { AddElement } from "../../../AddElement/AddElement";
import { AddLayoutElement } from "../../../AddLayoutElement/AddLayoutElement";
import { type ElementWithBreadcrumbs } from "../types";

const GroupRenderer = (props: StatePropsOfLayout) => {
  const { uischema, visible, ...rest } = props;

  const group = uischema as GroupLayout & LabelDescription;
  const { label, elements } = group;

  if (!visible) {
    return null;
  }

  return (
    <div className=" rounded-md p-5 shadow-around mb-2">
      <p className="text-slate-400 text-sm">Group</p>

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
  uiTypeIs("Group")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(GroupRenderer)
};
