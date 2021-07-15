import React from "react";
import { Field } from "formik";
import { Form, Input } from "antd";
// import TextError from "../../app/view/Pengguna/component/TextError";

function InputBasePassword(props) {
    const { label, name } = props;
  return (
    <Form.Item>
      <label>{label}</label>
      <Field name={name}>
        {(props) => {
          const { field } = props;
          return (
            <div>
              <Input.Password className="input-base" size="large" type="Text" id={name} placeholder={label} {...field} />
            </div>
          );
        }}
      </Field>
    </Form.Item>
  );
}

export default InputBasePassword;
