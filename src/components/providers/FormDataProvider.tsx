import React, {
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

import { type JsonFormsCore, type Layout } from "@jsonforms/core";

import { type ElementWithBreadcrumbs } from "../jsonforms/renderers/types";

interface IFormDataContext {
  data: Record<string, unknown>;
  schema: JsonFormsCore["schema"] | undefined;
  uischema: Layout | undefined;
  changeData: (newData: JsonFormsCore["data"]) => void;
  changeSchema: (newSchema: JsonFormsCore["schema"] | undefined) => void;
  changeUiSchema: (
    newUiSchema: ElementWithBreadcrumbs<Layout> | undefined
  ) => void;
}

const FormDataContext = React.createContext<IFormDataContext | null>(null);

export const FormDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [schema, setSchema] = useState<IFormDataContext["schema"]>();
  const [uischema, setUiSchema] = useState<IFormDataContext["uischema"]>();
  const [data, setData] = useState<IFormDataContext["data"]>({});

  const changeUiSchema = useCallback(
    (newUiSchema: IFormDataContext["uischema"] | undefined) => {
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
