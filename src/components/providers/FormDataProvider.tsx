import React, {
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

import {
  type ControlElement,
  type JsonFormsCore,
  type Layout
} from "@jsonforms/core";

interface IFormDataContext {
  data: Record<string, unknown>;
  schema: JsonFormsCore["schema"] | undefined;
  uischema: Layout | ControlElement | undefined;
  changeData: (newData: JsonFormsCore["data"]) => void;
  changeSchema: (newSchema: JsonFormsCore["schema"] | undefined) => void;
  changeUiSchema: (newUiSchema: Layout | ControlElement | undefined) => void;
}

const FormDataContext = React.createContext<IFormDataContext | null>(null);

export const FormDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [schema, setSchema] = useState<IFormDataContext["schema"]>();
  const [uischema, setUiSchema] = useState<Layout | ControlElement>();
  const [data, setData] = useState<IFormDataContext["data"]>({});

  const changeUiSchema = useCallback(
    (newUiSchema: Layout | ControlElement | undefined) => {
      setUiSchema(newUiSchema);
    },
    []
  );

  const changeSchema = useCallback(
    (newSchema: IFormDataContext["schema"] | undefined) => {
      setSchema(newSchema);
    },
    []
  );

  const changeData = useCallback((newData: IFormDataContext["data"]) => {
    setData(newData);
  }, []);

  const value = useMemo(
    () => ({
      schema,
      uischema,
      data,
      changeData,
      changeSchema,
      changeUiSchema
    }),
    [uischema, schema, data, changeData, changeSchema, changeUiSchema]
  );

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
