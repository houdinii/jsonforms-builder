import { JsonForms } from "@jsonforms/react";

import { FormInitializer } from "./FormInitializer/FormInitializer";
import { renderersWithControls } from "./jsonforms/renderers";
import { useFormData } from "./providers/FormDataProvider";

export const RightSide = () => {
  const { data, schema, uischema, changeData } = useFormData();

  return (
    <div>
      <h2 className="text-2xl text-center mb-4 text-slate-50">Form</h2>
      {!!uischema ? (
        <div className="p-5 bg-slate-50 rounded-md">
          <JsonForms
            key={JSON.stringify(uischema) + JSON.stringify(schema)}
            schema={schema}
            uischema={uischema}
            data={data}
            onChange={({ data: newData }) => {
              changeData(newData);
            }}
            renderers={renderersWithControls}
          />
        </div>
      ) : (
        <FormInitializer />
      )}
    </div>
  );
};
