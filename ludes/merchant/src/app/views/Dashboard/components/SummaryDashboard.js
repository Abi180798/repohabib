import React, { useEffect, useState } from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import SummaryGraph from "./SummaryGraph";
import { DatePicker } from "antd";
import moment from "moment";
import { DashboardAPI } from "../api/DashboardAPI";
import store from "store";
import { USER } from "../../../utils/constants";
import { thousandSeparator } from "../../../utils";
import { useMediaQuery } from 'react-responsive';
import LaporanDay from "./LaporanDay";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD"

function SummaryDashboard(props) {
  const isTablet = useMediaQuery({ maxWidth: 1119 })
  const [state, setState] = useState({
    data: null,
    filterRange: [
      moment().format(dateFormat),
      moment().add("days", 1).format(dateFormat),
    ],
  });
  async function getStatistic() {
    const bizAccountId = store.get(USER).bizStaff.bizAccountId;
    const r = await DashboardAPI.getStatistic(bizAccountId, state.filterRange[0],state.filterRange[1]);
    setState({...state,data:r.data})
  }
  useEffect(() => {
    getStatistic();
    props.handleRangeParent(state.filterRange)
  }, [state.filterRange]);
  return (
    <div style={{ height: "100%" }}>
      <div className="card" style={{ padding: 28 }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }} className="title2">
            Jumlah Transaksi
          </div>
          <div style={{ flex: 1 }}>
            <RangePicker
            allowClear={false}
              style={{ display: "flex" }}
              defaultValue={[moment(state.filterRange[0], dateFormat), moment(state.filterRange[1], dateFormat)]}
              onChange={(e, date) => setState({ ...state, filterRange: date })}
            />
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <p className="note2">Kotor</p>
          <p className="title2">
            Rp.{" "}
            <span className="title1">
              {state.data?thousandSeparator(parseFloat(state.data.pendapatanKotor).toFixed(0)):0} 
              <CaretUpOutlined className="text-success" />
              </span>
            </p>
          <p className="note1">Bersih</p>
          <p className="title2">
            Rp.{" "}
            <span className="title1">
            {state.data?thousandSeparator(parseFloat(state.data.pendapatanBersih).toFixed(0)):0} 
            <CaretUpOutlined className="text-success" />
            {/* <CaretDownOutlined className="text-danger" /> */}
            </span>
          </p>
        </div>
      </div>
      {isTablet&&<LaporanDay/>}
      <SummaryGraph dateRange={state.filterRange}/>
    </div>
  );
}

export default SummaryDashboard;
