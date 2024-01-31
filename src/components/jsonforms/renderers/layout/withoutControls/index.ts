import CategorizationRenderer from "@/components/jsonforms/renderers/layout/withoutControls/CategorizationRenderer";
import CategoryRenderer from "@/components/jsonforms/renderers/layout/withoutControls/CategoryRenderer";
import GroupRenderer from "@/components/jsonforms/renderers/layout/withoutControls/GroupRenderer";
import HorizontalLayoutRenderer from "@/components/jsonforms/renderers/layout/withoutControls/HorizontalLayoutRenderer";
import VerticalLayoutRenderer from "@/components/jsonforms/renderers/layout/withoutControls/VerticalLayoutRenderer";

export const renderersWithoutControls = [
  HorizontalLayoutRenderer,
  VerticalLayoutRenderer,
  CategorizationRenderer,
  CategoryRenderer,
  GroupRenderer
];
