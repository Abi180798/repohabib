import { Col, Row, Input, DatePicker, Button } from 'antd'
import SummaryDashboard from './SummaryDashboard'
import React, { useEffect, useState } from 'react'
import GraphTransaksi from './GraphTransaksi'
import DiagramPajak from './DiagramPajak'
import JumlahTransaksi from './JumlahTransaksi'
import TransaksiTerbanyak from './TransaksiTerbanyak'
import MenuTerlaris from './MenuTerlaris'
import TingkatPenjualan from './TingkatPenjualan'
import store from 'store'
import { USER } from '../../../utils/constants'
import { Link } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons'


const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function ContentDashboard(props) {
  const usr = store.get(USER);
  const parent = usr.topLevel.id;
  const [range, setRange] = useState({
    dateRange0: null,
    dateRange1: null,
  })

  function handleFilter(params) {
    setRange({
      ...range,
      dateRange0: params[0],
      dateRange1: params[1],
    })
  }

  useEffect(() => {

  }, [])
  
  return (
      <div>
        <Row>
          <Col span={8} offset={2}>
            <div className="card card-filter">
              <Input.Group compact>
                <RangePicker 
                  style={{ width: '100%' }}
                  bordered={false}
                  format={dateFormat}
                  onChange={(value, dateString) => handleFilter(dateString)}
                  allowClear={false}
                />
              </Input.Group>
            </div>
          </Col>
          <Col span={14}>
            <Link to="/dashboard/Register" style={{ textAlign: "right", float: "right", paddingTop:"10px" }}>
              <Button type="primary" className="bg-2" icon={<PlusOutlined />}>
                Tambah Merchant
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <SummaryDashboard parent={parent} filter={range}/>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <GraphTransaksi parent={parent} />
          </Col>
          <Col span={12}>
            <DiagramPajak parent={parent} />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <JumlahTransaksi parent={parent} />
          </Col>
          <Col span={6}>
            <TransaksiTerbanyak parent={parent} />
          </Col>
          <Col span={6}>
            <MenuTerlaris parent={parent} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TingkatPenjualan parent={parent} filter={range}/>
          </Col>
        </Row>
      </div>
    )
}

export default ContentDashboard

