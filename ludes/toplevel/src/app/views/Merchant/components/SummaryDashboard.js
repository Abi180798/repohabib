import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons"
import { MerchantAPI } from '../api/MerchantAPI'
import { thousandSeparator } from '../../../utils'
import Summary from '../../Dashboard/components/Summary'

function SummaryDashboard(props) {
  const [state,setState] = useState({
    data:null,
  })
  async function getData(){
    const params = {
      'dateRange[0]': props.filter.dateRange0,
      'dateRange[1]': props.filter.dateRange1,
    }
    const res = await MerchantAPI.getSummaryMerchant(props.id, params)
    setState({...state,data:res.data})
  }
  useEffect(() => {
    getData()
  }, [props.filter, props.id])
  return (
      <div className="card bg-2" style={{ padding: 60, height: 300 }}>
        <Row gutter={24}>
          <Summary span={8} title="Jumlah Transaksi" value={state.data && thousandSeparator(state.data.jumlahTransaksi)}/>
          <Summary span={8} title="Total Pendapatan (Rp)" value={state.data && thousandSeparator(parseFloat(state.data.totalPendapatan).toFixed(0))}/>
          <Summary span={8} title="Pendapatan Bersih" value={state.data && thousandSeparator(parseFloat(state.data.pendapatanBersih).toFixed(0))}/>
        </Row>        
      </div>
  )
}

export default SummaryDashboard