import React, { useState } from "react";
import history from "../../../utils/history";
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
import { KategoriAPI } from "../api/KategoriAPI";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";
import * as Yup from "yup";

const FormKategori = (props) => {
  async function handleCategory(data) {
    const finalValues = {
      name: data.nama_kategori,
    };
    const r = !props.nama_kategori?await KategoriAPI.postCategory(finalValues):await KategoriAPI.putCategoryById(props.nama_kategori&&props.nama_kategori.id,finalValues);
    if (r.status === 200) {
      ShowNotify(
        `Berhasil ${!props.nama_kategori?"tambah":"edit"} data!`,
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          props.getAllCategory();
          props.handleCancel()
        }
      );
    } else if (r.status === 500) {
      ShowNotify("Network Error!", notifyPosition.topCenter, notifyType.error);
    } else {
      ShowNotify(
        `Gagal ${!props.nama_kategori?"tambah":"edit"} data!`,
        notifyPosition.topCenter,
        notifyType.error
      );
    }
  }
  return (
    <div>
      <Formik
        initialValues={{
          nama_kategori: props.nama_kategori&&props.nama_kategori.name||"",
        }}
        validationSchema={Yup.object({
          nama_kategori: Yup.string().required("Harus diisi"),
        })}
        onSubmit={(values, { setSubmitting,resetForm }) => {
          setTimeout(() => {
            handleCategory(values);
            resetForm({})
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
          <form onSubmit={handleSubmit}>
            <Form.Item name="text">
              <label>Nama Kategori</label>
              <Input
                name="nama_kategori"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_kategori}
              />
            </Form.Item>
            <small className="text-danger">
              {errors.nama_kategori &&
                touched.nama_kategori &&
                errors.nama_kategori}
            </small>
            <Form.Item>
              <Button
                style={{ margin: "5px", borderRadius: "6px", float: "right" }}
                className="ant-btn background3 text-white"
                type="primary"
                htmlType="submit"
                // onClick={(e) => props.handleCancel()}
              >
                Tambahkan
              </Button>
              <Button
                style={{ margin: "5px", borderRadius: "6px", float: "right" }}
                onClick={(e) => props.handleCancel()}
              >
                Batalkan
              </Button>
            </Form.Item>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormKategori;
