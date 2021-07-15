import React, { useState } from "react";
import history from "../../../utils/history"
import { Formik } from "formik";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Radio,
  Select,
  Upload,
} from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

// function getBase64(img, callback) {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

// function beforeUpload(file) {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// }

const FormSupplier = () => {
  const [state, setState] = useState({
    loading: false,
    imageUrl: null,
  });
  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <h1>Tambah Produk</h1>
      <Formik
        initialValues={{
          nama_produk: "",
          supplier: "",
          kategori: "",
          deskripsi: "",
          harga_pokok: "",
          harga_jual: "",
          stok: "",
          tgl_kadaluarsa: "",
          foto_produk: "",
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
              <label>Nama Produk</label>
              <Input />
            </Form.Item>
            <Form.Item name="text">
              <label>Supplier</label>
              <Select
                placeholder="Pilih"
                // onChange={onKategoriChange}
                allowClear
              >
                <Option value="Supplier1">Supplier1</Option>
                <Option value="Supplier2">Supplier2</Option>
                <Option value="Supplier3">Supplier3</Option>
              </Select>
            </Form.Item>
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
              <label>Deskripsi(Opsional)</label>
              <Input />
            </Form.Item>
            <Form.Item name="text">
              <label>Harga Pokok</label>
              <Input />
            </Form.Item>
            <Form.Item name="text">
              <label>Harga Jual</label>
              <Input />
            </Form.Item>
            <Form.Item name="text">
              <label>Stok</label>
              <Input />
            </Form.Item>
            <Form.Item name="text">
              <label>Tanggal Kadaluarsa</label>
              <div>
                <DatePicker
                // onChange={onChange}
                />
              </div>
            </Form.Item>
            <Form.Item name="text">
              <label>Foto Produk</label>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                // onChange={this.handleChange}
              >
                {state.imageUrl ? (
                  <img
                    src={state.imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  style={{ margin: "0px 5px 0px auto", borderRadius: "6px" }}
                  htmlType="submit"
                  onClick={e=>history.back()}
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

export default FormSupplier;
