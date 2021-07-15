import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { RegisterAPI } from '../api/RegisterAPI'
import {
    AutoComplete,
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

export default function FormOwner(props) {
    const [state, setState] = useState({
        data:null,
        whatsapp: null,
        id: null
    })
    function handleChange(val, option) {
        setState({ 
            ...state, 
            whatsapp: option.value,
            id: option.id 
        });
    }
    async function getNonPegawai() {
        const r = await RegisterAPI.getUserNonPegawai();
        let data1 = r.data
        data1 = JSON.parse(JSON.stringify(data1).split('"whatsapp":').join('"value":'))
        setState({...state,data:data1})
    }
    async function handleOwner() {
        const finalValues = {
            userId: state.id,
            bizAccountId: props.edit&&props.edit.id,
            isOwner: true,
            isAdmin: false,
            isCashier: false,
        };
        console.log(finalValues);
        const r = await RegisterAPI.addOwner(finalValues);
        console.log(r);
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
        getNonPegawai()
    }, []);
    return (
        <div>
            <Formik
                initialValues={{
                    userId: '',
                    bizAccountId: '',
                    isOwner: true,
                    isAdmin: false,
                    isCashier: false,
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        handleOwner(values);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                <form onSubmit={handleSubmit}>
                    <Form.Item name="text">
                        <label>Whatsapp</label>
                        <div>
                            <AutoComplete
                                showSearch
                                name="whatsapp"
                                allowClear={true}
                                style={{ width: "100%" }}
                                placeholder="Pilih Pengguna"
                                options={state.data}
                                onSelect={(val, option) => handleChange(val, option)}
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{ margin: "5px", borderRadius: "6px", float: "right" }}
                            className="ant-btn background3 text-white"
                            type="primary"
                            htmlType="submit"
                        >
                            Tambah
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
