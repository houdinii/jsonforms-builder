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
    <div
      className="bg-slate-50 rounded-md p-5 shadow-xl"
      key={`-${label ?? ""}-${elements.length}`}
    >
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
      <div className="flex justify-between gap-4 mt-5 w-full">
        <AddLayoutElement
          key={`${label ?? ""}-${elements.length}`}
          uiSchema={uischema as ElementWithBreadcrumbs<Layout>}
        />
        {/* <AddElement breadcrumbPath={[...breadcrumbs, elements.length]} /> */}
      </div>
    </div>
  );
};

const categorizationRendererTester: RankedTester = rankWith(
  1000,
  uiTypeIs("Group")
);

export default {
  tester: categorizationRendererTester,
  renderer: withJsonFormsLayoutProps(GroupRenderer)
};
