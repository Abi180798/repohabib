import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import ContentLaporan from "../../Laporan/components/ContentLaporan";
import LaporanDay from "./LaporanDay";
import SellsProduct from "./SellsProduct";
import SummaryDashboard from "./SummaryDashboard";
import SummaryGraph from "./SummaryGraph";
import { useMediaQuery } from 'react-responsive';

function ContentDashboard() {
  const isLaptop = useMediaQuery({ minWidth: 1200 })
  const [state,setState] = useState({
    filterRange:null
  })
  function handleRange(value){
    setState({...state,filterRange:value})
  }
  useEffect(()=>{
  },[state.filterRange])
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xxl={14} xl={14} lg={24} md={24} sm={24} xs={24}>
          <SummaryDashboard handleRangeParent={handleRange}/>
        </Col>
        <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24}>
          <SellsProduct filterRange={state.filterRange}/>
        </Col>
        {isLaptop&&
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <LaporanDay />
        </Col>
        }
      </Row>
    </div>
  );
}

export default ContentDashboard;
