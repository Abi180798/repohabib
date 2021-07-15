import React from "react";
import InputBase from "./InputBase";
import InputBasePassword from "./InputBasePassword";
// import SelectBase from "./SelectBase";
// import { Input } from "reactstrap";
// import { Button, Form Label,FormText } from 'reactstrap';
// import Select from "./components/Select";
// import InputLainnya from "./components/InputLainnya";
// import RadioButton from "./components/RadioButton";

function FormikControl(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <InputBase {...rest} />;
    case "password":
      return <InputBasePassword {...rest} />;
    // case "select":
    //   return <SelectBase {...rest} />;
    // case "input1":
    //   return <InputLainnya {...rest} />;
    // case "textarea":
    // // return <TextArea {...rest}/>
    // case "radio":
    //   return <RadioButton {...rest} />;
  }
}
export default FormikControl;
