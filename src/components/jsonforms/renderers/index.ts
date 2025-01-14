import { type JsonFormsRendererRegistryEntry } from "@jsonforms/core";
import {
  withJsonFormsControlProps,
  withJsonFormsLayoutProps
} from "@jsonforms/react";

import CheckboxRendered from "./inputs/CheckboxRendered";
import EnumRenderer from "./inputs/EnumRenderer";
import TextInput from "./inputs/TextInput";

import DateRenderer from "@/components/jsonforms/renderers/inputs/DateRenderer";
import NumberRenderer from "@/components/jsonforms/renderers/inputs/NumberRenderer";
import CategorizationRenderer from "@/components/jsonforms/renderers/layout/CategorizationRenderer";
import CategoryRenderer from "@/components/jsonforms/renderers/layout/CategoryRenderer";
import GroupRenderer from "@/components/jsonforms/renderers/layout/GroupRenderer";
import HorizontalLayoutRenderer from "@/components/jsonforms/renderers/layout/HorizontalLayoutRenderer";
import VerticalLayoutRenderer from "@/components/jsonforms/renderers/layout/VerticalLayoutRenderer";
import {
  withElementControls,
  withLayoutControls
} from "@/components/jsonforms/renderers/withControls";
import ParagraphRenderer from "@/components/jsonforms/renderers/inputs/ParagraphRenderer";

const uiRenderers = [
  VerticalLayoutRenderer,
  HorizontalLayoutRenderer,
  CategorizationRenderer,
  CategoryRenderer,
  GroupRenderer
];

const elementRenderers = [
  CheckboxRendered,
  TextInput,
  DateRenderer,
  NumberRenderer,
  EnumRenderer,
  ParagraphRenderer
];

const elementRenderersWithControls = elementRenderers.map((el) => ({
  ...el,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  renderer: withJsonFormsControlProps(withElementControls(el.noPropsRenderer))
}));

const uiRenderersWithControls = uiRenderers.map((el) => ({
  ...el,
  renderer: withJsonFormsLayoutProps(withLayoutControls(el.noPropsRenderer))
}));

// Create clean versions of renderers without the HOC wrappers
const cleanUiRenderers = [
  VerticalLayoutRenderer,
  HorizontalLayoutRenderer,
  CategorizationRenderer,
  CategoryRenderer,
  GroupRenderer
].map(r => ({
  ...r,
  renderer: r.renderer // Use the renderer property, not noPropsRenderer
}));

// Create clean versions of element renderers
const cleanElementRenderers = [
  CheckboxRendered,
  TextInput,
  DateRenderer,
  NumberRenderer,
  EnumRenderer,
  ParagraphRenderer
].map(r => ({
  ...r,
  renderer: r.renderer // Use the renderer property, not noPropsRenderer
}));

export const renderersWithControls: JsonFormsRendererRegistryEntry[] = [
  ...elementRenderersWithControls,
  ...uiRenderersWithControls
];

export const renderersWithoutControls: JsonFormsRendererRegistryEntry[] = [
    ...cleanUiRenderers,
    ...cleanElementRenderers
].map(r => ({...r, renderer: r.renderer || r.noPropsRenderer}));