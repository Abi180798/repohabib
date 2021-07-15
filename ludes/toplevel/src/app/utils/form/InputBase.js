import React from "react";
import { Field } from "formik";
import { Form, Input } from "antd";

function InputBase(props) {
    const { label, name } = props;
  return (
    <Form.Item>
      <label>{label}</label>
      <Field name={name}>
        {(props) => {
          const { field } = props;
          return (
            <div>
              <Input className="input-base" size="large" type="Text" id={name} placeholder={label} {...field} />
            </div>
          );
        }}
      </Field>
    </Form.Item>
  );
}

export default InputBase;
