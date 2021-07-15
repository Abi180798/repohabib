import React, { useState } from 'react'
import { Form, Button, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons'

export default function FormPegawai() {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');

    const onRequiredTypeChange = ({ requiredMark }) => {
        setRequiredMarkType(requiredMark);
    };
    const { Option } = Select;

    function onChange(value) {
        console.log(`selected ${value}`);
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
    }
    return (
        <div className="card">
            <Form
                form={form}
                style={{ marginTop: 40 }}
                layout="vertical"
                initialValues={{ requiredMark }}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark}
                >
                    <Form.Item label="Nama Pegawai" required tooltip="Pegawai yang ingin ditambahkan">
                        <div className="card-input">
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Pilih"
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                                <Option value="tom">Tom</Option>
                            </Select>
                        </div>
                    </Form.Item>
                    <Form.Item
                        label="Posisi"
                        tooltip={{ title: 'Posisi pegawai yang ingin ditambahkan', icon: <InfoCircleOutlined /> }}
                        required
                    >
                        <div className="card-input">
                            <Select placeholder="Pilih Posisi" style={{ width: '100%' }} onChange={handleChange}>
                                <Option value="jack">Kasir</Option>
                                <Option value="lucy">Admin Toko</Option>
                            </Select>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" style={{ float: 'right' }} className="bg-2" icon={<PlusOutlined />}>
                            Tambah Pegawai
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}
