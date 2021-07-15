import React, { useEffect, useState } from "react";
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
  Tag,
  Upload,
} from "antd";
import * as Yup from "yup";
import store from "store";
import moment from "moment"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import { DiskonAPI } from "../api/DiskonAPI";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";
import { StokAPI } from "../../Stok/api/StokAPI";
import { USER } from "../../../utils/constants";

const { Option } = Select;

const dateFormat = "YYYY-MM-DD"

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const FormDiskon = (props) => {
  const [size, setSize] = useState("default");
  const [product, setProduct] = useState({
    data: null,
  });
  async function handleDiscount(data,resetForm) {
    const finalValues = {
      title: data.nama_diskon,
      percentOff: data.percentOff,
      fromDate: data.tgl_mulai,
      untilDate: data.tgl_selesai,
      bizProductId: data.produk_diskon,
      discountType: "Discount Price",
      status: "Live",
    };
    let r;
    if (props.dataDiscount) {
        r = await DiskonAPI.putDiscountById(
          props.dataDiscount.id,
          finalValues
        );
      
    } else {
      r = await DiskonAPI.postDiscount(finalValues);
    }
    if (r.status === 500) {
      ShowNotify("Network error!", notifyPosition.topCenter, notifyType.error);
    } else if (r.status === 200) {
      ShowNotify(
        `Berhasil ${!props.dataDiscount?"tambah":"edit"} diskon!`,
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          props.getAllDiskon();
          getAllStok()
          resetForm({})
        }
      );
    } else {
      ShowNotify(
        "Cek kembali formulir anda!",
        notifyPosition.topCenter,
        notifyType.error
      );
    }
  }
  async function getAllStok() {
    const r = await StokAPI.getStokBy(store.get(USER).bizStaff.bizAccountId);
    if (r.status === 400) {
      setProduct({ ...product, data: [] });
    } else if (r.status === 500) {
      setProduct({ ...product, data: [] });
      ShowNotify(
        "Cek Jaringan anda",
        notifyPosition.topCenter,
        notifyType.error
      );
    } else {
      if(r.data.length>0){
        setProduct({ ...product, data: r.data.filter(r=>r.discounts.length===0) });
      }else{
        setProduct({ ...product, data: r.data });
      }
    }
  }
  useEffect(() => {
    getAllStok();
  }, []);
  return (
    <div>
      <h2>Diskon</h2>
      <Formik
        enableReinitialize
        initialValues={{
          nama_diskon: (props.dataDiscount && props.dataDiscount.title) || "",
          percentOff: (props.dataDiscount && props.dataDiscount.percent_off) || "",
          tgl_mulai: (props.dataDiscount && moment(props.dataDiscount.from_date).format(dateFormat)) || "",
          tgl_selesai:
            (props.dataDiscount && moment(props.dataDiscount.until_date).format(dateFormat)) || "",
          produk_diskon:
            (props.dataDiscount && props.dataDiscount.biz_product_id) ||
            [],
        }}
        validationSchema={Yup.object({
          nama_diskon: Yup.string().required("Harus diisi"),
          percentOff: Yup.number()
            .typeError("Berupa angka")
            .required("Jumlah pajak harus terisi"),
          produk_diskon: Yup.array().required().min(1),
          tgl_mulai: Yup.string().required("Harus diisi"),
          tgl_selesai: Yup.string().required("Harus diisi"),
        })}
        onSubmit={(values, { setSubmitting,resetForm }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            handleDiscount(values,resetForm);
            props.resetForm()
            props.resetMode()
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
          <form onSubmit={handleSubmit}>
            <Form.Item name="text">
              <label>Nama Diskon</label>
              <Input
                name="nama_diskon"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_diskon}
              />
              <small className="text-danger">
                {errors.nama_diskon &&
                  touched.nama_diskon &&
                  errors.nama_diskon}
              </small>
            </Form.Item>
            <Form.Item name="text">
              <label>Diskon(%)</label>
              <Input
                name="percentOff"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.percentOff}
              />
              <small className="text-danger">
                {errors.percentOff &&
                  touched.percentOff &&
                  errors.percentOff}
              </small>
            </Form.Item>
            <div style={{ display: "flex" }}>
              <Form.Item
                name="text"
                style={{ margin: "0px 5px 0px auto", flex: 1 }}
              >
                <label>Tanggal Mulai</label>
                <div>
                  <DatePicker
                  name="tgl_mulai"
                    style={{ width: "100%" }}
                    value={values.tgl_mulai&&moment(values.tgl_mulai)}
                    onChange={(e, date) => setFieldValue("tgl_mulai", date)}
                  />
                </div>
                <div>
                  <small className="text-danger">
                    {errors.tgl_mulai && touched.tgl_mulai && errors.tgl_mulai}
                  </small>
                </div>
              </Form.Item>
              <Form.Item
                name="text"
                style={{ margin: "0px auto 0px 5px", flex: 1 }}
              >
                <label>Tanggal Selesai</label>
                <div>
                  <DatePicker
                  name="tgl_selesai"
                    style={{ width: "100%" }}
                    value={values.tgl_selesai&&moment(values.tgl_selesai)}
                    onChange={(e, date) => setFieldValue("tgl_selesai", date)}
                  />
                </div>
                <div>
                  <small className="text-danger">
                    {errors.tgl_selesai &&
                      touched.tgl_selesai &&
                      errors.tgl_selesai}
                  </small>
                </div>
              </Form.Item>
            </div>
            <br />
            <Form.Item name="text">
              <label>Produk Diskon</label>
              <Select
                name="produk_diskon"
                placeholder="Pilih Produk"
                onChange={(value) => setFieldValue("produk_diskon", value)}
                value={values.produk_diskon}
                mode="tags"
                size={size}
                style={{ width: "100%" }}
              >
                {product.data &&
                  product.data.map((value) => (
                    <Option value={value.id}>{value.name}</Option>
                  ))}
              </Select>
              <div>
                <small className="text-danger">
                  {errors.produk_diskon &&
                    touched.produk_diskon &&
                    errors.produk_diskon}
                </small>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ float: "right", borderRadius: "6px" }}
                className="ant-btn background3 text-white"
                type="primary"
                htmlType="submit"
              >
                {props.dataDiscount?"Simpan":"Tambahkan"}
              </Button>
              <Button
                onClick={props.resetForm}
                style={{ float: "right", borderRadius: "6px", marginRight: 10 }}
                className="ant-btn background3 text-white"
                type="primary"
              >
                Reset
              </Button>
            </Form.Item>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormDiskon;
