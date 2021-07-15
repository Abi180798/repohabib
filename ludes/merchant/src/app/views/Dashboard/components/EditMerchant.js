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
  Upload,
} from "antd";
// import { KategoriAPI } from "../api/KategoriAPI";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";
import * as Yup from "yup";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { DashboardAPI } from "../api/DashboardAPI";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}


const EditMerchant = (props) => {
  const [state, setState] = useState({
    loading: false,
    imageUrl: null,
    urlPhoto:null
  });
  const [url,setUrl] = useState({
    urlPhoto:props.mediaId?props.mediaId:null,
    urlFile:null
  })
  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  async function handleMerchant(data) {
    const finalValues = new FormData()
    finalValues.append("name",data.nama_merchant)
    finalValues.append("bizAccountMedia",data.foto_merchant)
    const r = await DashboardAPI.putAccountId(props.id&&props.id,finalValues);
    if (r.status === 200) {
      ShowNotify(
        `Berhasil edit data!`,
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          props.getAccount();
          props.handleCancel()
        }
      );
    } else if (r.status === 500) {
      ShowNotify("Network Error!", notifyPosition.topCenter, notifyType.error);
    } else {
      ShowNotify(
        `Gagal edit data!`,
        notifyPosition.topCenter,
        notifyType.error
      );
    }
  }
  return (
    <div>
      <Formik
      // enableReinitialize
        initialValues={{
          nama_merchant: props.name&&props.name||"",
          foto_merchant: "",
        }}
        validationSchema={Yup.object({
          nama_merchant: Yup.string().required("Harus diisi"),
        })}
        onSubmit={(values, { setSubmitting,resetForm }) => {
          setTimeout(() => {
            handleMerchant(values);
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
          setFieldValue
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <Form.Item name="text">
              <label>Nama Merchant</label>
              <Input
                name="nama_merchant"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_merchant}
              />
            </Form.Item>
            <small className="text-danger">
              {errors.nama_merchant &&
                touched.nama_merchant &&
                errors.nama_merchant}
            </small>
            <Form.Item name="text">
              <label>Foto Merchant</label>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={() => false}
                defaultFileList={url.urlPhoto&&[
                  {
                    url:url.urlPhoto
                  }
                ]}
                onChange={(e) => {
                  setFieldValue("foto_merchant",e.file)
                    getBase64(e.file, (imageUrl) =>{
                      setState({
                        imageUrl: imageUrl,
                        loading: false,
                      })
                    }
                  );
                }}
              >
                {state.imageUrl||url.urlPhoto ? (
                  <img
                  id="image-product"
                    src={!state.imageUrl?url.urlPhoto:state.imageUrl}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ margin: "5px", borderRadius: "6px", float: "right" }}
                className="ant-btn background3 text-white"
                type="primary"
                htmlType="submit"
                // onClick={(e) => props.handleCancel()}
              >
                Edit
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

export default EditMerchant;
