import { Formik, Field, ErrorMessage } from "formik";
import React from "react";
import { Form, Select } from 'antd';
const {Option} = Select

function SelectBase(props) {
  const { label, name, value, onChange, options, ...rest } = props;
  function handlecok(v){
    console.log(v)
  }
  return (
    <Form.Item>
      <label>{label}</label>
      <Field as="select" id={name} name={name}>
        {(props) => {
          const { field, form, meta } = props;
          return (
            <div>{console.log(value)}
              <Select id={name} name={name} onChange={handlecok} {...rest} {...field}>
                {options.map((option) => {
                  return (
                    <Option key={option.code} value={option.dial_code} onClick={e=>console.log("here")}>
                      {option.dial_code} {option.name} ({option.code})
                    </Option>
                  );
                })}
              </Select>
            </div>
          );
        }}
      </Field>
    </Form.Item>
  );
}
export default SelectBase;
