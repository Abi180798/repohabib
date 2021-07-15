import React from "react";
import history from "../../../utils/history";
import { Formik } from "formik";
import { Button, Checkbox, Form, Input, Radio, Select } from "antd";

const { Option } = Select;
const FormServis = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h1>Tambah Kasir</h1>
      <Formik
        initialValues={{
          nama_lengkap: "",
          status: "",
          nama_pengguna: "",
          kata_sandi: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
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
          /* and other goodies */
        }) => (
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item name="text">
              <label>Nama Lengkap</label>
              <Input />
            </Form.Item>

            <Form.Item name="text">
              <label>Status</label>
              <Select
                placeholder="Pilih Kategori"
                // onChange={onKategoriChange}
                allowClear
              >
                <Option value="male">admin</Option>
                <Option value="female">kasir</Option>
              </Select>
            </Form.Item>
            <Form.Item name="text">
              <label>Nama Pengguna</label>
              <Input />
            </Form.Item>
            <Form.Item name="text">
              <label>Kata Sandi</label>
              <Input.Password />
            </Form.Item>
            <Form.Item name="text">
              <label>Konfirmasi Kata Sandi</label>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  style={{ margin: "0px 5px 0px auto", borderRadius: "6px" }}
                  htmlType="submit"
                  onClick={(e) => history.back()}
                >
                  Batalkan
                </Button>
                <Button
                  style={{ margin: "0px auto 0px 5px", borderRadius: "6px" }}
                  className="ant-btn background3 text-white"
                  type="primary"
                  htmlType="submit"
                >
                  Tambahkan
                </Button>
              </div>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormServis;
