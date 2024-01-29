import { type JsonFormsRendererRegistryEntry } from "@jsonforms/core";

import TextInput from "./inputs/TextInput";
import GroupRenderer from "./layout/GroupRenderer";

const renderers: JsonFormsRendererRegistryEntry[] = [TextInput, GroupRenderer];

export default renderers;

