import { type JsonFormsRendererRegistryEntry } from "@jsonforms/core";

import CheckboxRendered from "./inputs/CheckboxRendered";
import EnumRenderer from "./inputs/EnumRenderer";
import TextInput from "./inputs/TextInput";
import ControlledCategorizationRenderer from "./layout/ControlledCategorizationRenderer";
import ControlledCategoryRenderer from "./layout/ControlledCategoryRenderer";
import ControlledGroupRenderer from "./layout/ControlledGroupRenderer";
import ControlledHorizontalLayout from "./layout/ControlledHorizontalLayoutRenderer";
import ControlledVerticalLayout from "./layout/ControlledVerticalLayoutRenderer";

import DateRenderer from "@/components/jsonforms/renderers/inputs/DateRenderer";
import NumberRenderer from "@/components/jsonforms/renderers/inputs/NumberRenderer";
import CategorizationRenderer from "@/components/jsonforms/renderers/layout/withoutControls/CategorizationRenderer";
import CategoryRenderer from "@/components/jsonforms/renderers/layout/withoutControls/CategoryRenderer";
import GroupRenderer from "@/components/jsonforms/renderers/layout/withoutControls/GroupRenderer";
import HorizontalLayoutRenderer from "@/components/jsonforms/renderers/layout/withoutControls/HorizontalLayoutRenderer";
import VerticalLayoutRenderer from "@/components/jsonforms/renderers/layout/withoutControls/VerticalLayoutRenderer";

const uiRenderersWithControls = [
  ControlledCategorizationRenderer,
  ControlledCategoryRenderer,
  ControlledGroupRenderer,
  ControlledHorizontalLayout,
  ControlledVerticalLayout
];

const uiRenderersWithoutControls = [
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
  EnumRenderer
];

export const renderersWithControls: JsonFormsRendererRegistryEntry[] = [
  ...elementRenderers,
  ...uiRenderersWithControls
];

export const renderersWithoutControls: JsonFormsRendererRegistryEntry[] = [
  ...uiRenderersWithoutControls,
  ...elementRenderers
];

