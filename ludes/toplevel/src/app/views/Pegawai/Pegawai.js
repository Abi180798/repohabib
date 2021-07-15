import React from 'react'
import DaftarPegawai from './components/DaftarPegawai'
import FormPegawai from './components/FormPegawai'
import { Row, Col } from 'antd'

export default function Pegawai() {
    return (
        <div>
            <div className="card" style={{ padding: 40, paddingTop: 20, width: '100%' }}>
                <Row gutter={24}>
                    <Col span={14}>
                        <h2>Daftar Pegawai</h2>
                        <DaftarPegawai />
                    </Col>
                    <Col span={10}>
                        <h2>Tambah Pegawai</h2>
                        <FormPegawai />
                    </Col>
                </Row>
            </div>
        </div>
    )
}
