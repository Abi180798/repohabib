import React, { useEffect, useState } from 'react'
import Modal from "antd/lib/modal/Modal";
import FormRegister from './FormRegister'
import FormOwner from './FormOwner'
import { Dropdown, Input, Menu, Space, Table, Button, Popconfirm } from "antd";
import { MoreOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { RegisterAPI } from '../api/RegisterAPI'
import {
  ShowNotify,
  notifyPosition,
  notifyType,
} from "../../../utils/notification";
import { USER } from '../../../utils/constants';
import store from 'store'

export default function DaftarMerchant() {
    const usr = store.get(USER);
    const parent = usr.topLevel.id;
    const [state, setState] = useState({
        data: null,
    });
    const [merchant, setMerchant] = useState({
        mode: null,
        selected: [],
    });
    const [owner, setOwner] = useState({
        mode: null,
        merchant: null,
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalOwnerVisible, setIsModalOwnerVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const showModalOwner = () => {
        setIsModalOwnerVisible(true);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalOwnerVisible(false)
    };
    const column = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            width: '25%',
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: '25%',
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: '10%',
        },
        {
            title: "Action",
            key: "action",
            fixed: "right",
            width: '5%',
            render: (text, record, index) => (
                <Space
                    size="middle"
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Dropdown overlay={getActionMenus(record)}>
                        <MoreOutlined />
                    </Dropdown>
                </Space>
            ),
        },
    ];
    function getActionMenus(record) {
        return (
        <Menu>
            <Menu.Item 
                onClick={ e =>{
                    showModal("edit");
                    setMerchant({
                        selected:record,
                        mode:"edit"
                    })
                }}
            >Edit</Menu.Item>
            <Menu.Item>
                <Popconfirm 
                    title="Yakin ingin menghapus?" 
                    onConfirm={() => deleteData(record.id)}
                    okText="Ya"
                    cancelText="Tidak"
                >
                    Hapus
                </Popconfirm>
            </Menu.Item>
            <Menu.Item
                onClick={e => {
                    showModalOwner();
                    setOwner({
                        merchant:record,
                        mode:"add"
                    })
                }}    
            >
                Owner
            </Menu.Item>
        </Menu>
        );
    }
    async function getData() {
        const r = await RegisterAPI.getMerchants(parent);
        setState({ ...state, data: r.data });
    }
    async function deleteData(id) {
        const r = await RegisterAPI.deleteMerchant(id)
        console.log(r);
        if (r.status === 400) {
            ShowNotify(
                "Gagal hapus data",
                notifyPosition.topCenter,
                notifyType.error
            );
        } else if (r.status === 500) {
            ShowNotify(
                "Cek Jaringan anda",
                notifyPosition.topCenter,
                notifyType.error
            );
        } else {
            ShowNotify(
                "Berhasil hapus data",
                notifyPosition.topCenter,
                notifyType.success,
                () => {
                    getData();
                }
            );
        }
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <h2>
                Daftar Merchant
                <div style={{ float: "right", marginRight: 10 }}>
                    <Link to="/dashboard/Register">
                        <Button 
                            onClick={e => {
                                showModal();
                                setMerchant({mode:"add"})
                                }
                            } 
                            type="primary" 
                            className="bg-2" 
                            icon={<PlusOutlined />}
                        >
                            Tambah Merchant
                        </Button>
                    </Link>
                </div>
            </h2>
            <div className="ant-card">
                <div className="ant-card-body">
                    <Table
                        columns={column}
                        dataSource={state.data}
                        bordered
                        title={() => 
                        <div style={{ overflow: "auto", margin: "10px 20px" }}>
                            <div style={{ float: "right", marginRight: 10 }}>
                            <Input placeholder="Search" allowClear={true} 
                                // onChange={(e) => handleSearch(e.target.value)}
                                prefix={<SearchOutlined />} />
                            </div>
                        </div>
                        }
                    />
                </div>
            </div>
            <Modal
                title={`${ merchant.mode === "add" ? "Tambah" : "Edit" } Merchant`}
                visible={isModalVisible}
                closable={false}
                footer={false}
            >
                <FormRegister
                    handleCancel={handleCancel}
                    getData={getData}
                    edit={merchant.selected}
                />
            </Modal>
            <Modal
                title={`Owner ${owner.merchant&&owner.merchant.name}`}
                visible={isModalOwnerVisible}
                closable={false}
                footer={false}
            >
                <FormOwner
                    handleCancel={handleCancel}
                    getData={getData}
                    edit={owner.merchant}
                />
            </Modal>
        </div>
    )
}
