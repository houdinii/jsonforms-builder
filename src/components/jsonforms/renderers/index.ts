import { type JsonFormsRendererRegistryEntry } from "@jsonforms/core";

import TextInput from "./inputs/TextInput";
import GroupRenderer from "./layout/GroupRenderer";
import HorizontalLayout from "./layout/HorizontalLayout";
import VerticalLayout from "./layout/VerticalLayout";

const renderers: JsonFormsRendererRegistryEntry[] = [
  GroupRenderer,
  HorizontalLayout,
  VerticalLayout,
  TextInput
];

export default renderers;

