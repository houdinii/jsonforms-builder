// src/components/RightSide.tsx
import {JsonForms} from "@jsonforms/react";

import {FormInitializer} from "./FormInitializer/FormInitializer";
import {renderersWithControls} from "./jsonforms/renderers";
import {useFormData} from "./providers/FormDataProvider";

export const RightSide = () => {
    const {data, schema, uischema, changeData} = useFormData();

    return (
        <div className="h-full mr-4">
            <h2 className="text-xl text-center mb-2 text-slate-50">Form</h2>
            {!!uischema ? (
                <div className="p-2 bg-slate-50 rounded-md h-[calc(100%-4rem)] overflow-y-auto">
                    <JsonForms
                        key={JSON.stringify(uischema) + JSON.stringify(schema)}
                        schema={schema}
                        uischema={uischema}
                        data={data}
                        onChange={({data: newData}) => {
                            changeData(newData);
                        }}
                        renderers={renderersWithControls}
                    />
                </div>
            ) : (
                <FormInitializer/>
            )}
        </div>
    );
};