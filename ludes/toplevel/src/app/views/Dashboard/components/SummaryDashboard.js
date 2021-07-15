import React, { useEffect, useState } from 'react'
import { Col, Row, Button } from 'antd'
import { Link } from "react-router-dom";
import { PlusOutlined, ShopOutlined } from '@ant-design/icons'
import { DashboardAPI } from '../api/DashboardAPI'
import { thousandSeparator } from '../../../utils'
import Summary from './Summary'

function SummaryDashboard(props) {
  const [state,setState] = useState({
    data:null,
  })
  async function getData(){
    const params = {
      'dateRange[0]': props.filter.dateRange0,
      'dateRange[1]': props.filter.dateRange1,
    }
    const res = await DashboardAPI.getTransactionData(props.parent, params)
    setState({...state,data:res.data})
  }
  useEffect(() => {
    getData()
  }, [props.filter])
  return (
    <div>
      <div className="card bg-2" style={{ padding: 60, height: 300 }}>
        <Row gutter={24}>
          <Summary span={8} title={'Jumlah Transaksi'} value={state.data && thousandSeparator(state.data.jumlahTransaksi)}/>
          <Summary span={8} title={'Total Pendapatan (Rp)'} value={state.data && thousandSeparator(parseFloat(state.data.totalPendapatan).toFixed(0))}/>
          <Summary span={8} title={'Pendapatan Bersih'} value={state.data && thousandSeparator(parseFloat(state.data.pendapatanBersih).toFixed(0))}/>
        </Row>
      </div>
      <div className="card bg-2" style={{ padding: 60, height: 300 }}>
        <Row gutter={24}>
          <Summary span={8} title={'MDR'} value={state.data && thousandSeparator(parseFloat(state.data.mdr).toFixed(0))}/>
          <Summary span={8} title={'Profit'} value={state.data && thousandSeparator(parseFloat(state.data.sharingProfit).toFixed(0))}/>
          <Summary span={8} title={'Total Pajak terkumpul'} value={state.data && thousandSeparator(parseFloat(state.data.totalPajak).toFixed(0))}/>
        </Row>
      </div>
      {/* <Row gutter={24}>
        <Col span={16}>
          <div className="card bg-2" style={{ padding: 60, height: 300}}>
            <Row gutter={24}>
              <Summary span={12} title={'Sharing Profit 20%'} value={state.data && thousandSeparator(parseFloat(state.data.sharingProfit).toFixed(0))}/>
              <Summary span={12} title={'Total Pajak terkumpul'} value={state.data && thousandSeparator(parseFloat(state.data.totalPajak).toFixed(0))}/>
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <div className="card" style={{ padding: 60, height: 300}}>
            <ShopOutlined style={{ fontSize: 50, color: '#007a34' }} />
            <div className="title2" style={{ marginTop:20, marginBottom:20 }}>Register Merchant</div>
            <Link to="/dashboard/Register">
              <Button type="primary" className="bg-2" icon={<PlusOutlined />}>
                Tambah Merchant
              </Button>
            </Link>
          </div>
        </Col>
      </Row> */}
    </div>
  )
}

export default SummaryDashboard
