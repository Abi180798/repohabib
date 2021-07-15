import React, { useEffect, useState } from 'react'
import { Formik } from "formik";
import * as Yup from "yup";
import { RegisterAPI } from '../api/RegisterAPI'
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
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";
import store from 'store'
import { USER } from '../../../utils/constants'
const { TextArea } = Input;

export default function FormRegister(props) {
    const usr = store.get(USER);
    const parent = usr.topLevel.id;
    async function handleMerchant(data) {
        const finalValues = {
            name: data.name,
            address: data.address,
            description: data.description,
            phone: data.phone,
            status: data.status,
            parentId: parent
        };
        const r = !props.edit?await RegisterAPI.addMerchant(finalValues):await RegisterAPI.updateMerchant(props.edit&&props.edit.id, finalValues);
        if (r.status === 200) {
            ShowNotify(
                `Berhasil ${!props.edit?"tambah":"edit"} data!`,
                notifyPosition.topCenter,
                notifyType.success,
                () => {
                    props.getData();
                    props.handleCancel()
                }
            );
        } else if (r.status === 500) {
            ShowNotify("Network Error!", notifyPosition.topCenter, notifyType.error);
        } else {
            ShowNotify(
                `Gagal ${!props.edit?"tambah":"edit"} data!`,
                notifyPosition.topCenter,
                notifyType.error
            );
        }
    }
    useEffect(() => {

    }, []);
    return (
        <div>
        <Formik
            initialValues={{
                name: !props.edit ? "" : props.edit.name,
                address: !props.edit ? "" : props.edit.address,
                description: !props.edit ? "" : props.edit.description,
                phone: !props.edit ? "" : props.edit.phone,
                status: "Live"
            }}
            validationSchema={Yup.object({
                name: Yup.string().required("Nama arus diisi"),
                address: Yup.string().required("Alamat harus diisi"),
                phone: Yup.string().required("Telpon harus diisi"),
            })}
            onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
                handleMerchant(values);
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
                    <label>Nama</label>
                    <Input
                        bordered={true}
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    <small className="text-danger">
                    {errors.name &&
                        touched.name &&
                        errors.name}
                    </small>
                </Form.Item>
                <Form.Item name="address">
                    <label>Alamat</label>
                    {/* TextArea harusnya */}
                    <Input
                        autoSize
                        bordered={true}
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                    />
                    <small className="text-danger">
                    {errors.address &&
                        touched.address &&
                        errors.address}
                    </small>
                </Form.Item>
                <Form.Item name="description">
                    <label>Deskripsi</label>
                    <Input
                        autoSize
                        bordered={true}
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                    />
                    <small className="text-danger">
                    {errors.description &&
                        touched.description &&
                        errors.description}
                    </small>
                </Form.Item>
                <Form.Item name="phone">
                    <label>Telpon</label>
                    <Input
                        bordered={true}
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                    />
                    <small className="text-danger">
                    {errors.phone &&
                        touched.phone &&
                        errors.phone}
                    </small>
                </Form.Item>
                <Form.Item>
                    <Button
                        style={{ margin: "5px", borderRadius: "6px", float: "right" }}
                        className="ant-btn background3 text-white"
                        type="primary"
                        htmlType="submit"
                    >
                        {!props.edit?"Tambahkan": "Edit"}
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
    )
}
