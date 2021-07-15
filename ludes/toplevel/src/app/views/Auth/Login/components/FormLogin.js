import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  TOKEN,
  WA,
  USER,
  PASS,
  REGION,
  CHECKED,
} from "../../../../utils/constants";
import * as Yup from "yup";
import { Formik } from "formik";
import { Button, Input, Select, Row, Col, Form, Checkbox } from "antd";
import FormikControl from "../../../../utils/form/FormikControl";
import { Link } from "react-router-dom";
import { kodeArea } from "../../../../assets/mock/mock";
import store from 'store';
import { Base64 } from 'js-base64';
import { LoginAPI } from '../api/LoginAPI';
import {
  ShowNotify,
  notifyPosition,
  notifyType,
} from "../../../../utils/notification";
const { Option } = Select;

function FormLogin() {
  const [selectedKA, setSelectedKA] = useState("+62");
  const [checkboxRM, setCheckboxRM] = useState(false);
  function handleKA(value) {
    setSelectedKA(value);
  }
  function handleRM(e) {
    setCheckboxRM(e.target.checked);
  }
  async function handleLogin(data) {
    const finalValues = {
      password: data.password,
      whatsapp: data.kode_area + data.wa,
    };
    const r = await LoginAPI.loginAccount(finalValues);
    if (r.status === 200 && r.data.user.topLevel.status === true && (r.data.user.bizStaff.isOwner === true || r.data.user.bizStaff.isAdmin === true)) {
      ShowNotify(
        "Succesfully login!",
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          if (checkboxRM) {
            store.set(CHECKED, checkboxRM);
            store.set(REGION, Base64.encode(data.kode_area));
            store.set(WA, Base64.encode(data.wa));
            store.set(PASS, Base64.encode(data.password));
          }
          Cookies.set(TOKEN, Base64.encode(r.data.token));
          Cookies.set(WA, Base64.encode(r.data.user.whatsapp))
          Cookies.set(USER, Base64.encode(r.data.user.name))
          store.set(USER, r.data.user);
          // history.replace("/");
          window.location.reload();
        }
      );
    } else if (r.status === 500) {
      ShowNotify("Network Error!", notifyPosition.topCenter, notifyType.error);
    } else {
      ShowNotify(
        "No whatsapp atau password salah!",
        notifyPosition.topCenter,
        notifyType.error
      );
    }
  }
  return (
    <div>
      <div className="have-account">
        <b>
          Belum punya akun?{" "}
          <Link to="/register/" className="text-success">
            Daftar
          </Link>
        </b>
      </div>
      <div className="text-center">
        <h1 className="titled-register">Masuk</h1>
      </div>
      <Formik
        initialValues={{
          kode_area: (store.get(REGION) && Base64.decode(store.get(REGION))) ||"+62",
          wa: (store.get(WA) && Base64.decode(store.get(WA))) || "",
          password: (store.get(PASS) && Base64.decode(store.get(PASS))) || ""
        }}
        validationSchema={Yup.object({
          wa: Yup.number()
            .typeError("Must be number")
            .required("Whatsapp number required"),
          password: Yup.string().required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleLogin(values);
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
              {errors.wa && touched.wa && errors.wa}
            </small>
            <br />
            <label>No. Whatsapp</label>
            <Input.Group>
              <Row gutter={10}>
                <Col span={5}>
                  <Select
                    className="select-base"
                    size="large"
                    defaultValue={selectedKA}
                    // style={{ width: 100 }}
                    name="kode_area"
                    onChange={(value) => {
                      handleKA();
                      setFieldValue("kode_area", value);
                    }}
                    disabled
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
              {errors.password && touched.password && errors.password}
            </small>
            <FormikControl
              control="password"
              // type="text"
              label="Kata Sandi"
              name="password"
            />
            <Form.Item name="remember">
              <div style={{ overflow: "auto" }}>
                <div style={{ float: "left" }}>
                  <Checkbox onChange={handleRM}>Ingat saya</Checkbox>
                </div>
                <div style={{ float: "right",cursor:"pointer" }} className="text-success">
                  Lupa kata sandi?
                </div>
              </div>
            </Form.Item>
            <div className="text-center btn-success">
              <Button htmlType="submit" disabled={isSubmitting}>
                Masuk
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormLogin;
