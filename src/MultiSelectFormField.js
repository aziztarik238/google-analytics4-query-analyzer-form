import React from "react";
import { Formik, Form, Field } from "formik";
import Select from "react-select";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" }
];

function MultiSelectFormField() {
  return (
    <Formik
      initialValues={{ options: [] }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Field
            name="options"
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                isMulti
                onChange={(selectedOptions) =>
                  setFieldValue(field.value, selectedOptions)
                }
              />
            )}
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default MultiSelectFormField;
