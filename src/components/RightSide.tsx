import { JsonForms } from "@jsonforms/react";

import { FormInitializer } from "./FormInitializer/FormInitializer";
import renderers from "./jsonforms/renderers";
import { useFormData } from "./providers/FormDataProvider";

export const RightSide = () => {
  const { data, schema, uischema, changeData } = useFormData();

  return (
    <div>
      <h2 className="text-2xl text-center mb-4 text-slate-50">Form</h2>
      {!!uischema ? (
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          onChange={({ data: newData }) => {
            changeData(newData);
          }}
          renderers={renderers}
        />
      ) : (
        <FormInitializer />
      )}
    </div>
  );
};
