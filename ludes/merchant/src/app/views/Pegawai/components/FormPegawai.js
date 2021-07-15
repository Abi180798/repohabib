import React, { useEffect, useState } from "react";
import history from "../../../utils/history";
import { Formik } from "formik";
import { Button, Checkbox, Form, Input, Radio, Select } from "antd";
import { listPegawai } from "../../../assets/mock/mock";
import { PegawaiAPI } from "../api/PegawaiAPI";
import { USER } from "../../../utils/constants";
import store from "store";
import * as Yup from "yup";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";

const { Option } = Select;
const FormPegawai = (props) => {
  const [state, setState] = useState({
    data: null,
    posisi: {
      isOwner: false,
      isAdmin: true,
      isCashier: false,
    },
  });
  const [dataNoRole, setNoRole] = useState({
    data: null,
  });

  function onPosisiChange(value) {
    let role;
    if (value === "Admin") {
      role = {
        isOwner: false,
        isAdmin: true,
        isCashier: false,
      };
    } else if (value === "Kasir") {
      role = {
        isOwner: false,
        isAdmin: false,
        isCashier: true,
      };
    }
    return role;
  }
  function onPosisi(value) {
    let roleAdmin = {
      isOwner: false,
      isAdmin: true,
      isCashier: false,
    };
    let roleCashier = {
      isOwner: false,
      isAdmin: false,
      isCashier: true,
    };
    if (value === roleAdmin) {
      return roleAdmin;
    } else if (value === roleCashier) {
      return roleCashier;
    }
  }
  async function handlePegawai(data, resetForm) {
    if(dataNoRole.data&&dataNoRole.data.find(r=>`${r.whatsapp}`===data.nama_lengkap)){
    const finalValues = {
      userId: dataNoRole.data&&dataNoRole.data.find(r=>`${r.whatsapp}`===data.nama_lengkap).id,
      bizAccountId: store.get(USER).bizStaff.bizAccountId,
      isAdmin: data.posisi.isAdmin,
      isCashier: data.posisi.isCashier,
      isOwner: data.posisi.isOwner,
    };
    const r = !props.peg
      ? await PegawaiAPI.postPegawai(finalValues)
      : await PegawaiAPI.putPegawaiById(
          props.peg && props.peg.bizStaff.id,
          finalValues
        );
    if (r.status === 200) {
      ShowNotify(
        `Berhasil ${!props.peg ? "tambah" : "edit"} data!`,
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          props.handleCancel();
          props.getAllPegawai();
          resetForm({});
        }
      );
    } else if (r.status === 500) {
      ShowNotify("Network Error!", notifyPosition.topCenter, notifyType.error);
    } else {
      ShowNotify(
        `Gagal ${!props.peg ? "tambah" : "edit"} data!`,
        notifyPosition.topCenter,
        notifyType.error
      );
    }
    }else{
      ShowNotify(
        `Tidak bisa menambahkan pegawai karena user belum terdaftar!`,
        notifyPosition.topCenter,
        notifyType.error
      );
    }
  }
  async function getStaffNoRole() {
    const r = await PegawaiAPI.getPegawaiNoRole();
    setNoRole({ ...dataNoRole, data: r.data });
  }
  useEffect(() => {
    getStaffNoRole();
  }, []);
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          nama_lengkap: (props.peg && props.peg.bizStaff.userId) || "",
          posisi: (props.peg && props.peg.status) || "",
        }}
        validationSchema={Yup.object({
          nama_lengkap: Yup.string().required("Harus diisi"),
          posisi: Yup.string().required("Harus diisi"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            const value = {
              nama_lengkap: values.nama_lengkap,
              posisi: onPosisiChange(values.posisi),
            };
            handlePegawai(value, resetForm);
            props.setPeg();
            getStaffNoRole();
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
          <form name="basic" onSubmit={handleSubmit}>
            <Form.Item name="text">
              <label>Nama(Whatsapp)</label>
              <div>
              <Input
                name="nama_lengkap"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.nama_lengkap}
              />
                {/* <Select
                  showSearch
                  name="nama_lengkap"
                  style={{ width: "100%" }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={(value) => setFieldValue("nama_lengkap", value)}
                  value={values.nama_lengkap}
                >
                  {props.peg && (
                    <Option value={props.peg.bizStaff.userId}>
                      {props.peg.name}({props.peg.whatsapp})
                    </Option>
                  )}
                  {dataNoRole.data &&
                    dataNoRole.data.map((r) => (
                      <Option value={r.id}>
                        {r.name}({r.whatsapp})
                      </Option>
                    ))}
                </Select> */}
                <small className={!values.nama_lengkap.includes("+62")?"text-danger":"text-success"}>
                  *Awalan harus +62
                </small><br/>
                <small>
                  {dataNoRole.data&&dataNoRole.data.find(r=>`${r.whatsapp}`===values.nama_lengkap)?<text className="text-success">*Data User Ditemukan</text>:<text className="text-danger">*Data User Tidak Ditemukan</text>}
                </small><br/>
                <small className="text-danger">
                  {errors.nama_lengkap &&
                    touched.nama_lengkap &&
                    `*${errors.nama_lengkap}`}
                </small>
              </div>
            </Form.Item>
            <Form.Item name="text">
              <label>Posisi</label>
              <Select
                name="posisi"
                placeholder="Pilih Posisi"
                onChange={(e) => {
                  setFieldValue("posisi", e);
                }}
                value={values.posisi}
                allowClear
              >
                <Option value="Admin">Admin</Option>
                <Option value="Kasir">Kasir</Option>
                {/* <Option value="No Role">No Role</Option> */}
              </Select>
              <small className="text-danger">
                {errors.posisi && touched.posisi && errors.posisi}
              </small>
            </Form.Item>
            <Form.Item>
              <Button
                style={{ float: "right", margin: "5px", borderRadius: "6px" }}
                htmlType="button"
                onClick={(e) => props.handleCancel()}
              >
                Batalkan
              </Button>
              <Button
                style={{ float: "right", margin: "5px", borderRadius: "6px" }}
                className="ant-btn background3 text-white"
                type="primary"
                htmlType="submit"
              >
                {props.peg ? "Simpan" : "Tambahkan"}
              </Button>
            </Form.Item>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormPegawai;
