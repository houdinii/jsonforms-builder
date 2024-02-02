import React, { useState } from "react";
import Editor from "react-simple-code-editor";

import { type Layout } from "@jsonforms/core";
import { highlight, languages } from "prismjs";

import "prismjs/themes/prism.css";

import { useFormData } from "@/components/providers/FormDataProvider";
import { Button } from "@/components/ui/button";

export const UiSchemaCodeBlock = () => {
  const [error, setError] = useState<string>();

  const { changeUiSchema, uischema } = useFormData();

  const stringified = uischema ? JSON.stringify(uischema, null, 2) : "";

  const [code, setCode] = useState(stringified);

  const handleSave = () => {
    try {
      const parsedCode = JSON.parse(code) as Layout;

      if (uischema) {
        changeUiSchema({ ...uischema, ...parsedCode });
      }
    } catch (error) {
      setError("Invalid json");
    }
  };

  return (
    <div className="text-end bg-slate-50 p-5 rounded-sm">
      <Editor
        className="mb-2 text-sm"
        value={code}
        lang="json"
        onValueChange={(code) => {
          if (error) {
            setError(undefined);
          }
          setCode(code);
        }}
        highlight={(code) => highlight(code, languages.js, "json")}
        padding={10}
      />
      {error && (
        <p className="text-destructive text-sm text-start">Invalid json</p>
      )}
      <Button
        variant="outline"
        disabled={code === stringified}
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};
