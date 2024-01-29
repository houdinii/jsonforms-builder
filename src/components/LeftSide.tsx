import { CodeBlock } from "react-code-blocks";

import { useFormData } from "./providers/FormDataProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export const LeftSide = () => {
  const { uischema, schema, data } = useFormData();

  return (
    <div>
      <h2 className="text-2xl text-center mb-4 text-slate-50">Data</h2>

      <Tabs defaultValue="schema" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schema">Schema</TabsTrigger>
          <TabsTrigger value="uiSchema">UiSchema</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>
        <TabsContent value="schema">
          <CodeBlock
            text={JSON.stringify(schema, null, 2)}
            language={"json"}
            showLineNumbers={true}
          />
        </TabsContent>
        <TabsContent value="uiSchema">
          <CodeBlock
            text={JSON.stringify(uischema, null, 2)}
            language={"json"}
            showLineNumbers={true}
          />
        </TabsContent>
        <TabsContent value="data">
          <CodeBlock
            text={JSON.stringify(data, null, 2)}
            language={"json"}
            showLineNumbers={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
