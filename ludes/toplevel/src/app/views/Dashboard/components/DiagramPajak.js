import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Bar, Legend, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { listFilter, listTransaction } from '../../../assets/mock/mock'
import { abbreviate, thousandSeparator } from '../../../utils';
import { DashboardAPI } from '../api/DashboardAPI'
const { TabPane } = Tabs;

function DiagramPajak(props) {
  const [state, setState] = useState({
    tab: "Bulanan",
    data: null,
  })
  function handleTabs(key) {
    setState({ ...state, tab: key })
  }
  async function getData(){
    let periode;
    if (state.tab === "Harian") {
      periode = "Daily";
    } else if (state.tab === "Mingguan") {
      periode = "Weekly";
    } else if (state.tab === "Bulanan") {
      periode = "Monthly";
    }
    const params = {
      periode: periode
    }
    const res = await DashboardAPI.getTotalPajakGraph(props.parent, params)
    setState({...state,data:res.data})
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let payloads = payload ? payload[0].payload : null;
      return (
        payloads && (
          <div style={{ background: "#eee" }}>
            <p
              style={{
                padding: "0px 5px",
                margin: 0,
              }}
            >{`Tanggal : ${payloads.date}`}</p>
            <p
              style={{
                padding: "0px 5px",
                color: "#007A34"
              }}
            >{`Pajak : Rp.${thousandSeparator(payloads.pajak)}`}</p>
          </div>
        )
      );
    }
    return null;
  };
  useEffect(() => {
    getData()
  }, [state.tab])
  return (
    <div className="card" style={{ padding: 28, marginBottom: 20 }}>
      <div className="title2">Jumlah Pajak Terkumpul</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Tabs defaultActiveKey={`${state.tab}`} className="tabs" onChange={handleTabs}>
            {listFilter.data.map((i, index) => (
              <TabPane tab={<div className={`tab-content-small ${state.tab === i ? "active" : ""}`}>{i}</div>} key={i} />
            ))}
            </Tabs>
        </div>
      <div>
      {state.data && state.data.length > 0 ? (
      <ResponsiveContainer aspect={2.5}>
        <BarChart 
          margin={{
            top: 5,
            right: 5,
            left: 40,
          }} 
          data={state.data}
        >
          <XAxis dataKey="date" />
          <YAxis 
            tickFormatter={tick => {
              return 'Rp.' + abbreviate(tick);
            }} 
            domain={['auto', 'auto']}
          />
          <Tooltip content={<CustomTooltip />}/>
          <Legend verticalAlign="top" height={36}/>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar name="Pajak" dataKey="pajak" fill="#007a34" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
      ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color:"#007a34",
              height:100
            }}
          >
            Tidak ada transaksi
          </div>
        )}</div>
      <div>
      </div>
    </div>
  )
}

export default DiagramPajak