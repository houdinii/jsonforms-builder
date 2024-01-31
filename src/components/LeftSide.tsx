import { CodeBlock } from "react-code-blocks";

import { type Layout, type UISchemaElement } from "@jsonforms/core";
import { JsonForms } from "@jsonforms/react";

import { useFormData } from "./providers/FormDataProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

import { renderersWithoutControls } from "@/components/jsonforms/renderers";
import { type ElementWithBreadcrumbs } from "@/components/jsonforms/renderers/types";

const isLayoutElement = (
  element: Layout | UISchemaElement
): element is Layout => {
  return element.hasOwnProperty("elements");
};

const cleanBreadcrumbs = (
  uiSchema:
    | ElementWithBreadcrumbs<Layout | UISchemaElement>
    | Layout
    | UISchemaElement
) => {
  // @ts-expect-error -- in the name of shipping fast
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { breadcrumbs: _, ...rest } = uiSchema;

  if (isLayoutElement(rest)) {
    rest.elements = rest.elements.map((element) => cleanBreadcrumbs(element));
  }

  return rest;
};

export const LeftSide = () => {
  const { uischema, schema, data, changeData } = useFormData();

  return (
    <div>
      <h2 className="text-2xl text-center mb-4 text-slate-50">Shapes</h2>

      <Tabs defaultValue="uiSchema" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="uiSchema">UiSchema</TabsTrigger>
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="form">Clean form</TabsTrigger>
        </TabsList>
        <TabsContent value="schema">
          {schema ? (
            <CodeBlock
              text={JSON.stringify(schema, null, 2)}
              language={"json"}
              showLineNumbers={true}
            />
          ) : (
            <p className="text-slate-50 text-center">
              Add a schema element to your form
            </p>
          )}
        </TabsContent>
        <TabsContent value="uiSchema">
          {uischema ? (
            <CodeBlock
              text={JSON.stringify(cleanBreadcrumbs(uischema), null, 2)}
              language={"json"}
              showLineNumbers={true}
            />
          ) : (
            <p className="text-slate-50 text-center">
              Add a ui element to your form
            </p>
          )}
        </TabsContent>
        <TabsContent value="data">
          <CodeBlock
            text={JSON.stringify(data, null, 2)}
            language={"json"}
            showLineNumbers={true}
          />
        </TabsContent>
        <TabsContent value="form">
          {uischema ? (
            <div className="p-2 bg-slate-50 rounded-sm">
              <JsonForms
                key={JSON.stringify(uischema) + JSON.stringify(schema)}
                schema={schema}
                uischema={uischema}
                data={data}
                onChange={({ data: newData }) => {
                  changeData(newData);
                }}
                renderers={renderersWithoutControls}
              />
            </div>
          ) : (
            <p className="text-slate-50 text-center">
              Add elements to your form
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
