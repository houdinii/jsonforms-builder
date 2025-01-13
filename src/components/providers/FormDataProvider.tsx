// src/components/providers/FormDataProvider.tsx
import React, {type FC, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState} from "react";

import {type ControlElement, type JsonFormsCore, type Layout} from "@jsonforms/core";

interface IFormDataContext {
    data: Record<string, unknown>;
    schema: JsonFormsCore["schema"];
    uischema: Layout | ControlElement | null;
    changeData: (newData: JsonFormsCore["data"]) => void;
    changeSchema: (newSchema: JsonFormsCore["schema"]) => void;
    changeUiSchema: (newUiSchema: Layout | ControlElement | null) => void;
}

const FormDataContext = React.createContext<IFormDataContext | null>(null);

const parseStoredJson = <T, >(key: string, defaultValue: T): T => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) as T : defaultValue;
    } catch {
        return defaultValue;
    }
};

export const FormDataProvider: FC<PropsWithChildren> = ({children}) => {
    const [schema, setSchema] = useState<JsonFormsCore["schema"]>(() =>
        parseStoredJson('form_schema', {type: 'object', properties: {}})
    );

    const [uischema, setUiSchema] = useState<Layout | ControlElement | null>(() =>
        parseStoredJson('form_uischema', null)
    );

    const [data, setData] = useState<Record<string, unknown>>(() =>
        parseStoredJson('form_data', {})
    );

    useEffect(() => {
        localStorage.setItem('form_schema', JSON.stringify(schema));
        if (uischema) localStorage.setItem('form_uischema', JSON.stringify(uischema));
        localStorage.setItem('form_data', JSON.stringify(data));
    }, [schema, uischema, data]);

    const changeUiSchema = useCallback((newUiSchema: Layout | ControlElement | null) => {
        setUiSchema(newUiSchema);
    }, []);

    const changeSchema = useCallback((newSchema: JsonFormsCore["schema"]) => {
        setSchema(newSchema);
    }, []);

    const changeData = useCallback((newData: Record<string, unknown>) => {
        setData(newData);
    }, []);

    const value = useMemo(() => ({
        schema,
        uischema,
        data,
        changeData,
        changeSchema,
        changeUiSchema
    }), [schema, uischema, data, changeData, changeSchema, changeUiSchema]);

    return (
        <FormDataContext.Provider value={value}>
            {children}
        </FormDataContext.Provider>
    );
};

export const useFormData = () => {
    const context = useContext(FormDataContext);
    if (context === null) {
        throw new Error("useFormData must be used within a FormDataProvider");
    }
    return context;
};