import { type JsonFormsRendererRegistryEntry } from "@jsonforms/core";

import TextInput from "./inputs/TextInput";
import CategorizationRenderer from "./layout/CategorizationRenderer";
import CategoryRenderer from "./layout/CategoryRenderer";
import GroupRenderer from "./layout/GroupRenderer";
import HorizontalLayout from "./layout/HorizontalLayoutRenderer";
import VerticalLayout from "./layout/VerticalLayoutRenderer";

const renderers: JsonFormsRendererRegistryEntry[] = [
  GroupRenderer,
  HorizontalLayout,
  CategorizationRenderer,
  CategoryRenderer,
  VerticalLayout,
  TextInput
];

export default renderers;

