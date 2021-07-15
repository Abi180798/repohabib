import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { listFilters, listTransaction } from "../../../assets/mock/mock";
import { thousandSeparator } from "../../../utils";
import { USER } from "../../../utils/constants";
import { DashboardAPI } from "../api/DashboardAPI";
import moment from "moment";
import store from "store";

const dateFormat = "YYYY-MM-DD";

const { TabPane } = Tabs;

function SummaryGraph(props) {
  const [state, setState] = useState({
    tab: "Harian",
    data: null,
  });
  function handleTabs(key) {
    setState({ ...state, tab: key });
  }
  async function getStatisticGraph() {
    let periode;
    if (state.tab === "Harian") {
      periode = "Daily";
    } else if (state.tab === "Mingguan") {
      periode = "Weekly";
    } else if (state.tab === "Bulanan") {
      periode = "Monthly";
    }
    const bizAccountId = store.get(USER).bizStaff.bizAccountId;
    const r = await DashboardAPI.getStatisticGraph(bizAccountId, periode);
    setState({ ...state, data: r.data });
  }
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let payloads = payload ? payload[0].payload : null;
      return (
        payloads && (
          <div style={{ background: "#eee", maxWidth: "250px" }}>
            <p
              style={{
                padding: "0px 5px",
                margin: 0,
              }}
            >{`Tanggal : ${payloads.date}`}</p>
            <p
              style={{
                padding: "0px 5px",
              }}
            >{`Pendapatan : Rp.${thousandSeparator(payloads.pendapatan)}`}</p>
          </div>
        )
      );
    }

    return null;
  };
  useEffect(() => {
    getStatisticGraph();
  }, [state.tab, props.dateRange]);
  return (
    <div className="card cards" style={{ padding: 28 }}>
      <div className="title2">Jumlah Transaksi</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Tabs
          defaultActiveKey={`${state.tab}`}
          className="tabs"
          onChange={handleTabs}
        >
          {listFilters.data.map((i, index) => (
            <TabPane
              tab={
                <div
                  className={`tab-content-small ${
                    state.tab === i ? "active" : ""
                  }`}
                >
                  {i}
                </div>
              }
              key={i}
            />
          ))}
        </Tabs>
      </div>
      <div>
        {state.data && state.data.length > 0 ? (
          <ResponsiveContainer aspect={2.5}>
            <LineChart
              data={state.data && state.data}
              margin={{
                top: 5,
                right: 10,
                left: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                tickFormatter={(tick) => {
                  return "Rp." + thousandSeparator(tick);
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line
                name="Transaksi"
                type="monotone"
                dataKey="pendapatan"
                stroke="#007a34"
                activeDot={{ r: 8 }}
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
      <div></div>
    </div>
  );
}

export default SummaryGraph;
