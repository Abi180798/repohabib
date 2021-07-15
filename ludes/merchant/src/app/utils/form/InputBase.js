import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import { Form, Input } from "antd";
// import TextError from "../../app/view/Pengguna/component/TextError";

function InputBase(props) {
    const { label, name, options, ...rest } = props;
  return (
    <Form.Item>
      <label>{label}</label>
      <Field name={name}>
        {(props) => {
          const { field, form, meta } = props;
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
