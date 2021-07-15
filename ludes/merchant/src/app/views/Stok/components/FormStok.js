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
import qs from "qs"
import { useLocation, useRouteMatch } from "react-router-dom";
import * as Yup from "yup";
import store from "store";
import { StokAPI } from "../api/StokAPI";
import { USER } from "../../../utils/constants";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { KategoriAPI } from "../../Kategori/api/KategoriAPI";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";

const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

const FormStok = (props) => {
  const bizProductId = window.location.pathname.split("form/")[1];
  let location = useLocation();
  const [state, setState] = useState({
    loading: false,
    imageUrl: null,
    categoryList: [],
    urlPhoto:null
  });
  const [url,setUrl] = useState({
    urlPhoto:null,
    urlFile:null
  })
  const [product, setProduct] = useState({
    data: null,
  });
  const uploadButton = (
    <div>
      {state.loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  function beforeUpload(file) {
    // setState({...state,imageUrl:file})
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   alert('You can only upload JPG/PNG file!');
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   alert('Image must smaller than 2MB!');
    // }
    // return isJpgOrPng && isLt2M;
  }
  function handleChangePhoto(e) {
    getBase64(e.file, (imageUrl) =>
      setState({
        imageUrl: imageUrl,
        loading: false,
      })
    );
  }
  async function getCategory() {
    const r = await KategoriAPI.getAllCategory();
    if (r.status === 400) {
      setState({ ...state, categoryList: [] });
    } else if (r.status === 500) {
      ShowNotify(
        "Cek Jaringan anda",
        notifyPosition.topCenter,
        notifyType.error
      );
      setState({ ...state, categoryList: [] });
    } else {
      setState({ ...state, categoryList: r.data });
    }
  }
  async function getStokById() {
    const r = await StokAPI.getStokById(bizProductId);
    if (r.status === 400) {
      setProduct({ ...product, data: null });
    } else if (r.status === 500) {
      ShowNotify(
        "Cek Jaringan anda",
        notifyPosition.topCenter,
        notifyType.error
      );
      setProduct({ ...product, data: null });
    } else {
      setProduct({ ...product, data: r.data });
    }
  }
  async function getMediaImage(mediaId){
    const r = await StokAPI.getMedia(mediaId)
    setUrl({...url,urlPhoto:r})
  }
  function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  function toDataURL(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function() {
      var reader = new FileReader();
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  async function handleStok(data) {
    const finalValue = new FormData()
    finalValue.append("name",data.nama_produk)
    finalValue.append("description",data.deskripsi)
    finalValue.append("nettPrice",data.harga_pokok)
    finalValue.append("sellPrice",data.harga_jual)
    finalValue.append("bizAccountId",store.get(USER).bizStaff.bizAccountId)
    finalValue.append("categoryId",data.kategori)
    finalValue.append("stock",data.stok)
    finalValue.append("bizProductMedia",data.foto_produk)
    const r = !bizProductId?await StokAPI.postStok(finalValue):await StokAPI.putStokById(bizProductId,finalValue);
    if(r.status===400){
      ShowNotify(`Gagal ${!bizProductId?"tambah":"edit"} data`,notifyPosition.topCenter,notifyType.error)
    }else if(r.status===500){
      ShowNotify("Cek Jaringan anda",notifyPosition.topCenter,notifyType.error)
    }else{
      ShowNotify(`Berhasil ${!bizProductId?"tambah":"edit"} data`,notifyPosition.topCenter,notifyType.success,()=>{
        window.location.replace("/dashboard/Stok/")
      })
    }
  }
  console.log(url.urlPhoto,"ini dia")
  const urlToObject= async()=> {
    // toDataURL(url.urlPhoto&&url.urlPhoto,async (img)=>{
    //   const response = await fetch(img);
    // // here image is url/location of image
    // const blob = await response.blob();
    // const file = new File([blob], url.urlPhoto.split("media/")[1], {type: "image/png"});
    // setUrl({...url,urlFile:file})
    // })
  }
  useEffect(async()=>{
    if(props.product){
      getMediaImage(props.product.mediaId)
    }
  },[])
  useEffect(() => {
    if (bizProductId) {
      getStokById();
    }
    getCategory();
  }, []);
  useEffect(async ()=>{
    if(url.urlPhoto){
      await urlToObject()
      // toDataURL(url.urlPhoto,(im)=>setUrl({...url,urlbase:im}))
    }
  },[url.urlPhoto])
  return (
    <div>
      <h1>{!bizProductId ? "Tambah" : "Edit"} Produk</h1>
      <Formik
      enableReinitialize
        initialValues={{
          nama_produk: (props.product && props.product.name) || "",
          kategori: (props.product && props.product.categoryId) || "",
          deskripsi: (props.product && props.product.description) || "",
          harga_pokok: (props.product && props.product.nettPrice) || 0,
          harga_jual: (props.product && props.product.sellPrice) || 0,
          stok: (props.product && props.product.stock) || "",
          // tgl_kadaluarsa: state.productData.expiredDate||"",
          foto_produk: (props.product && props.product.urlImage && props.product.urlImage.path) || "",
        }}
        validationSchema={Yup.object({
          nama_produk: Yup.string().required("Harus diisi"),
          kategori: Yup.string().required("Harus diisi"),
          harga_pokok: Yup.number()
            .typeError("Berupa angka")
            .required("Harga pokok harus terisi"),
          stok: Yup.number()
            .typeError("Berupa angka")
            .required("Stok harus terisi"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            handleStok(values);
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
          <form
            onSubmit={handleSubmit}
            name="basic"
            initialValues={{ remember: true }}
          >
            <Form.Item name="text">
              <label>Nama Produk</label>
              <Input
                name="nama_produk"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_produk}
              />
              <small className="text-danger">
                {errors.nama_produk &&
                  touched.nama_produk &&
                  errors.nama_produk}
              </small>
            </Form.Item>
            <Form.Item name="text">
              <label>Kategori</label>
              <Select
                name="kategori"
                placeholder="Pilih Kategori"
                onChange={(value) => setFieldValue("kategori", value)}
                value={values.kategori}
                // onChange={onKategoriChange}
                allowClear
              >
                {state.categoryList &&
                  state.categoryList.map((r) => (
                    <Option value={r.id}>{r.name}</Option>
                  ))}
              </Select>
              <small className="text-danger">
                {errors.kategori && touched.kategori && errors.kategori}
              </small>
            </Form.Item>
            <Form.Item name="text">
              <label>Deskripsi(Opsional)</label>
              <Input
                name="deskripsi"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.deskripsi}
              />
              <small className="text-danger">
                {errors.deskripsi && touched.deskripsi && errors.deskripsi}
              </small>
            </Form.Item>
            <Form.Item name="text">
              <label>Harga Pokok</label>
              <Input
                name="harga_pokok"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.harga_pokok}
              />
              <small className="text-danger">
                {errors.harga_pokok &&
                  touched.harga_pokok &&
                  errors.harga_pokok}
              </small>
            </Form.Item>
            <Form.Item name="text">
              <label>Harga Jual</label>
              <Input
                name="harga_jual"
                onChange={handleChange}
                onBlur={handleBlur}
                value={
                  (values.harga_jual =
                    parseInt(values.harga_pokok) + values.harga_pokok * 0.2)
                }
                disabled
              />
              <small className="text-danger">
                {errors.harga_jual && touched.harga_jual && errors.harga_jual}
              </small>
            </Form.Item>
            <Form.Item name="text">
              <label>Stok</label>
              <Input
                name="stok"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.stok}
              />
              <small className="text-danger">
                {errors.stok && touched.stok && errors.stok}
              </small>
            </Form.Item>
            {/* <Form.Item name="text">
              <label>Tanggal Kadaluarsa</label>
              <div>
                <DatePicker
                // onChange={onChange}
                />
              </div>
              <small className="text-danger">
                {errors.tgl_kadaluarsa &&
                  touched.tgl_kadaluarsa &&
                  errors.tgl_kadaluarsa}
              </small>
            </Form.Item> */}
            <Form.Item name="text">
              <label>Foto Produk</label>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={() => false}
                defaultFileList={values.foto_produk&&[
                  {
                    url:values.foto_produk
                  }
                ]}
                onChange={(e) => {
                  setFieldValue("foto_produk",e.file)
                    getBase64(e.file, (imageUrl) =>{
                      setState({
                        imageUrl: imageUrl,
                        loading: false,
                      })
                    }
                  );
                }}
              >
                {state.imageUrl||values.foto_produk ? (
                  <img
                  id="image-product"
                    src={!state.imageUrl?values.foto_produk:state.imageUrl}
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
                  {!bizProductId ? "Tambahkan" : "Simpan"}
                </Button>
              </div>
            </Form.Item>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormStok;
