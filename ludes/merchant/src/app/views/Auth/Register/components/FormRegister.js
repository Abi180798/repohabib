import React, { useState } from "react";
import history from "../../../../utils/history";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Input, Select, Row, Col } from "antd";
import FormikControl from "../../../../utils/form/FormikControl";
import { Link } from "react-router-dom";
import { kodeArea } from "../../../../assets/mock/mock";
import { RegisterAPI } from "../api/RegisterAPI";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../../utils/notification";
const { Option } = Select;

function FormRegister() {
  const [selectedKA, setSelectedKA] = useState("+62");
  function handleKA(value) {
    setSelectedKA(value);
  }
  async function handleRegister(data) {
    const r = await RegisterAPI.registerAccount(data);
    if (r.status === 200) {
      ShowNotify(
        "Succesfully register!",
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          history.replace("/login/");
          window.location.reload();
        }
      );
    } else if (r.status === 500) {
      ShowNotify("Network Error!", notifyPosition.topCenter, notifyType.error);
    } else {
      ShowNotify(
        "Check your form again!",
        notifyPosition.topCenter,
        notifyType.error
      );
    }
  }
  return (
    <div>
      <div className="have-account">
        <b>
          Sudah punya akun?{" "}
          <Link to="/login/" className="text-success">
            Masuk
          </Link>
        </b>
      </div>
      <div className="text-center">
        <h1 className="titled-register">Daftar</h1>
      </div>
      <Formik
        initialValues={{
          fullname: "",
          kode_area: "+62",
          wa: "",
          password1: "",
          password2: "",
        }}
        validationSchema={Yup.object({
          fullname: Yup.string().required("Fullname is required"),
          wa: Yup.number()
            .typeError("Must be number")
            .required("Whatsapp number required"),
          password1: Yup.string().required("Password is required"),
          password2: Yup.string().oneOf(
            [Yup.ref("password1"), null],
            "Passwords must match"
          ),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const finalValues = {
              name: values.fullname,
              password: values.password1,
              status: "Live",
              whatsapp: values.kode_area + values.wa,
            };
            handleRegister(finalValues);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form className="form-register" onSubmit={handleSubmit}>
            <small className="text-danger">
              {errors.fullname && touched.fullname && errors.fullname}
            </small>
            <FormikControl
              control="input"
              // type="text"
              label="Nama Lengkap"
              name="fullname"
            />
            <small className="text-danger">
              {errors.wa && touched.wa && errors.wa}
            </small>
            {errors.wa && <br />}
            <label>No. Whatsapp</label>
            <Input.Group>
              <Row gutter={10}>
                <Col span={5}>
                  <Select
                    className="select-base"
                    size="large"
                    defaultValue={selectedKA}
                    // style={{ width: 100 }}
                    disabled
                    name="kode_area"
                    onChange={(value) => {
                      handleKA();
                      setFieldValue("kode_area", value);
                    }}
                  >
                    {kodeArea.map((r) => (
                      <Option key={r.code} value={r.dial_code}>
                        {r.dial_code}
                        {/* {r.name} ({r.code}) */}
                      </Option>
                    ))}
                  </Select>
                </Col>
                <Col span={19}>
                  <FormikControl
                    control="input"
                    type="text"
                    // label="No. Whatsapp"
                    name="wa"
                  />
                </Col>
                <Col></Col>
              </Row>
            </Input.Group>
            <small className="text-danger">
              {errors.password1 && touched.password1 && errors.password1}
            </small>
            <FormikControl
              control="password"
              // type="text"
              label="Kata Sandi"
              name="password1"
            />
            <small className="text-danger">
              {errors.password2 && touched.password2 && errors.password2}
            </small>
            <FormikControl
              control="password"
              // type="text"
              label="Ulangi Kata Sandi"
              name="password2"
            />

            <div className="text-center btn-success">
              <Button htmlType="submit" disabled={isSubmitting}>
                Daftar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormRegister;
