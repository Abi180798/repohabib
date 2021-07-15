import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { listFilter, listFilterProduct, listTerlaris } from '../../../assets/mock/mock'
import { CaretUpOutlined } from "@ant-design/icons"
import { DashboardAPI } from '../api/DashboardAPI';
import { USER } from '../../../utils/constants';
import store from "store"
import moment from "moment"
import { StokAPI } from '../../Stok/api/StokAPI';

const dateFormat = "YYYY-MM-DD"

const { TabPane } = Tabs;
const crown = require("../../../assets/img/crown.svg")
const pizza = require("../../../assets/img/pizza.png")

function SellsProduct(props) {
  const [state, setState] = useState({
    tab: "Hari ini",
    data:[]
  })
  const [product, setProduct] = useState({
    data: null
  })
  function handleTabs(key) {
    setState({ ...state, tab: key })
  }
  async function getStatisticTerlaris(){
    let date;
    if(state.tab==="Hari ini"){
      date=[
        moment().format(dateFormat),
        moment().add("days", 1).format(dateFormat),
      ]
    }else if(state.tab==="Minggu ini"){
      date=[
        moment().day(0).add("days",1).format(dateFormat),
        moment().day(7).add("days",1).format(dateFormat),
      ]
    }else if(state.tab==="Bulan ini"){
      date=[
        moment().month(0).format(dateFormat),
        moment().month(0).endOf("month").format(dateFormat),
      ]
    }else if(state.tab==="Range"){
      date=[
        props.filterRange[0],
        props.filterRange[1]
      ]
    }
    const bizAccountId = store.get(USER).bizStaff.bizAccountId
    const r = await DashboardAPI.getStatisticTerlaris(bizAccountId,date[0],date[1])
    setState({...state,data:r.data})

    if(r.data.length>0){
      const res = await StokAPI.getStokById(r.data[0].product_id+1)
      console.log("ini yg dicari",res.data)
      setProduct({...product,data:res.data.urlImage})
    }
  }
  useEffect(()=>{
    getStatisticTerlaris()
  },[state.tab,props.filterRange])
  return (
    <div className="card" style={{ padding: 28,height:"100%" }}>
      <div className="title2">Penjualan Produk</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tabs defaultActiveKey={`${state.tab}`} className="tabs" onChange={handleTabs}>
          {listFilterProduct.data.map((i, index) => (
            <TabPane tab={<div className={`tab-content-small ${state.tab === i ? "active" : ""}`}>{i}</div>} key={i} />
          ))}
        </Tabs>
      </div>
      <div>
        <Tabs defaultActiveKey={`${state.tab}`} className="tabs" onChange={handleTabs} tabPosition="left">
          {listFilter.data.map((i, index) => (
            <TabPane tab={<div className={`tab-content-small ${state.tab === i ? "active" : ""}`}>{i}</div>} key={i}>
              <div style={{ textAlign: "center" }}>
                <div style={{ paddingBottom: 8 }}>
                  {state.data.length>0&&
                  <img src={crown} />
                  }
                </div>
                {state.data.length>0?state.data.slice(0, 1).map((row, i) => (
                  <div key={i}>
                    <div><img className="imgproduk" src={product.data!==null?product.data.path:pizza} style={{ paddingBottom: 8 }} /></div>
                    <div className="title2 text-primary">{row.product_name}{" "}<span>{" "}<CaretUpOutlined className="text-success" />{" "}{row.transaksi}</span></div>
                  </div>
                )):
                <div style={{height:300,display:"flex",justifyContent:"center",alignItems:"center"}}>Belum ada produk yang laris</div>}
              </div>
            </TabPane>
          ))}
        </Tabs>
      </div>
      <div style={{ textAlign: "right", paddingTop:70 }}>
        {state.data.length>0&&state.data.slice(1, 3).map((row, i) => (
          <div key={i}>
            <div className="note3 text-primary" style={{padding:"8px 0px"}}>{row.product_name}{" "}<span>{" "}<CaretUpOutlined className="text-success" />{" "}{row.transaksi}</span></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SellsProduct