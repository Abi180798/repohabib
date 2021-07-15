import React, { useEffect, useState } from 'react'
import { Row, Col, AutoComplete, Input, DatePicker } from 'antd'
import SummaryDashboard from './components/SummaryDashboard'
import GraphTransaksi from './components/GraphTransaksi'
import DiagramPajak from './components/DiagramPajak'
import JumlahTransaksi from './components/JumlahTransaksi'
import MenuTerlaris from './components/MenuTerlaris'
import ProdukTerjual from './components/ProdukTerjual'
import { MerchantAPI } from './api/MerchantAPI'
import { USER } from '../../utils/constants'
import store from 'store'

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function Merchant({handleTabs}){
  const usr = store.get(USER);
  const parent = usr.topLevel.id;
  const logoMerchant = require("../../assets/img/icon/logo.png");
  const [range, setRange] = useState({
    dateRange0: null,
    dateRange1: null,
  })
  const [state, setState] = useState({
    tab: "Merchant",
    merchants: null,
    name: 'Merchant',
    id: parent
  });
  async function getData(){
    const res = await MerchantAPI.getDataMerchantByParent(parent)
    let data1 = res.data
    data1 = JSON.parse(JSON.stringify(data1).split('"name":').join('"value":'))
    setState({
      ...state,
      merchants:data1,
      id:data1[0].id,
      name:data1[0].value
    })
  }
  function handleTabs(key) {
    setState({ ...state, tab: key });
  }
  function handleChange(val, option) {
    setState({ 
      ...state, 
      name: option.value,
      id: option.id });
  }
  function handleFilter(params) {
    setRange({
      ...range,
      dateRange0: params[0],
      dateRange1: params[1],
    })
  }
  useEffect(()=>{
    handleTabs("Merchant")
    getData()
  },[])
  return(
    <div>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={12} offset={6} style={{ paddingRight: 10 }}>
              <div className="card card-filter">
                <AutoComplete
                  bordered={false}
                  style={{
                    width: '100%',
                  }}
                  allowClear={true}
                  options={state.merchants}
                  placeholder="Cari Merchant"
                  onSelect={(val, option) => handleChange(val, option)}
                  filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </div>
            </Col>
          </Row>
          <Row>
              <div className="title1" style={{ marginBottom: 20 }}>
                  <img src={logoMerchant} />
                  {state.name}
              </div>
          </Row>
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
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SummaryDashboard id={state.id} filter={range}/>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <GraphTransaksi id={state.id}/>
        </Col>
        <Col span={12}>
          <DiagramPajak id={state.id}/>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <JumlahTransaksi id={state.id}/>
        </Col>
        <Col span={12}>
          <MenuTerlaris id={state.id}/>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ProdukTerjual id={state.id} filter={range} name={state.name}/>
        </Col>
      </Row>
    </div>
  )
}

export default Merchant