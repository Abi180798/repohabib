import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { listFilter, listTransaction } from '../../../assets/mock/mock'
import { abbreviate, thousandSeparator } from '../../../utils';
import { MerchantAPI } from '../api/MerchantAPI'
const { TabPane } = Tabs;

function SummaryGraph(props) {
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
    const res = await MerchantAPI.getPendapatanMerchant(props.id, params)
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
            >{`Pendapatan : Rp.${thousandSeparator(payloads.pendapatan)}`}</p>
          </div>
        )
      );
    }
    return null;
  };
  useEffect(() => {
    getData()
  }, [state.tab, props.id])
  return (
    <div className="card" style={{ padding: 28, marginBottom: 20 }}>
      <div className="title2">Total Pendapatan</div>
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
          <LineChart
            data={state.data}
            margin={{
                top: 5,
                right: 5,
                left: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis 
              tickFormatter={tick => {
                return 'Rp.' + abbreviate(tick);
              }} 
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />}/>
            <Legend verticalAlign="top" height={36}/>
            <Line
                name="Pendapatan"
                type="monotone"
                dataKey="pendapatan"
                stroke="#007a34"
                activeDot={{ r: 5 }}
                strokeWidth={2}
            />
          </LineChart>
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
        )}
      </div>
    </div>
  )
}

export default SummaryGraph