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
  const uiSchemaWithBreadCrumbs = uischema as ElementWithBreadcrumbs<Layout>;

  if (!visible) {
    return null;
  }

  const path = `elements${
    uiSchemaWithBreadCrumbs.breadcrumbs.length
      ? `[${uiSchemaWithBreadCrumbs.breadcrumbs.join("].elements[")}]`
      : ""
  }`;

  return (
    <div>
      {label && <h3 className="text-2xl text-slate-50">{label}</h3>}
      {elements.map((child) => {
        return (
          <JsonFormsDispatch
            key={`${child.type}-${label ?? ""}-${elements.indexOf(child)}`}
            uischema={child}
            {...rest}
          />
        );
      })}
      <div className="flex justify-between gap-4">
        <AddLayoutElement
          breadcrumbPath={path}
          previousBreadcrumbs={uiSchemaWithBreadCrumbs.breadcrumbs}
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
