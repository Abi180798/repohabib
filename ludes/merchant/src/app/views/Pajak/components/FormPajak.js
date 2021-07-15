import React from "react";
import { Formik } from "formik";
import { Button, Checkbox, Form, Input, Radio, Select } from "antd";

const { Option } = Select;
const FormPajak = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h1>Pajak</h1>
      <Formik
        initialValues={{
          kategori: "",
          pajak: "",
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
              <label>Kategori</label>
              <Select
                placeholder="Pilih Kategori"
                // onChange={onKategoriChange}
                allowClear
              >
                <Option value="Makanan">Makanan</Option>
                <Option value="Minuman">Minuman</Option>
                <Option value="Snack">Snack</Option>
              </Select>
            </Form.Item>
            <Form.Item name="text">
              <label>Jumlah Pajak</label>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                style={{ borderRadius: "6px" }}
                className="ant-btn background3 text-white"
                type="primary"
                htmlType="submit"
              >
                Simpan
              </Button>
            </Form.Item>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormPajak;
