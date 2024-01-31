import { type JsonFormsRendererRegistryEntry } from "@jsonforms/core";

import CheckboxRendered from "./inputs/CheckboxRendered";
import EnumRenderer from "./inputs/EnumRenderer";
import TextInput from "./inputs/TextInput";
import CategorizationRenderer from "./layout/CategorizationRenderer";
import CategoryRenderer from "./layout/CategoryRenderer";
import GroupRenderer from "./layout/GroupRenderer";
import HorizontalLayout from "./layout/HorizontalLayoutRenderer";
import VerticalLayout from "./layout/VerticalLayoutRenderer";

import DateRenderer from "@/components/jsonforms/renderers/inputs/DateRenderer";
import NumberRenderer from "@/components/jsonforms/renderers/inputs/NumberRenderer";

const renderers: JsonFormsRendererRegistryEntry[] = [
  GroupRenderer,
  HorizontalLayout,
  CategorizationRenderer,
  CategoryRenderer,
  CheckboxRendered,
  VerticalLayout,
  TextInput,
  DateRenderer,
  NumberRenderer,
  EnumRenderer
];

export default renderers;

