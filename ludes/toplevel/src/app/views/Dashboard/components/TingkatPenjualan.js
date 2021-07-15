import { Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { SearchOutlined } from "@ant-design/icons";
import { DashboardAPI } from '../api/DashboardAPI'
import { thousandSeparator } from '../../../utils'
import Text from "antd/lib/typography/Text";
import ExportData from './ExportData';

function TingkatPenjualan(props) {
  const ribuan = (text, record) => <Text>{thousandSeparator(parseFloat(text).toFixed(0))}</Text>;
  const column = [
    {
      title: "MERCHANT",
      label: "Merchant",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "TRANSAKSI",
      label: "Transaksi",
      dataIndex: "transaksi",
      key: "transaksi",
    },
    {
      title: "PENDAPATAN",
      label: "Pendapatan",
      dataIndex: "pendapatan",
      key: "pendapatan",
      align: "right",
      render: ribuan
    },
    {
      title: "DISKON(RP)",
      label: "Diskon",
      dataIndex: "discount",
      key: "discount",
      align: "right",
      render: ribuan
    },
    {
      title: "PENDAPATAN BERSIH",
      label: "Pendapatan Bersih",
      dataIndex: "pendapatan_bersih",
      key: "pendapatan_bersih",
      align: "right",
      render: ribuan
    },
    {
      title: "MDR",
      label: "MDR",
      dataIndex: "mdr",
      key: "mdr",
      align: "right",
      render: ribuan
    },
    {
      title: "PAJAK",
      label: "Pajak",
      dataIndex: "pajak",
      key: "pajak",
      align: "right",
      render: ribuan
    },
    {
      title: "PROFIT",
      label: "Profit",
      dataIndex: "sharing_profit",
      key: "sharing_profit",
      align: "right",
      render: ribuan
    },
  ];
  const [state,setState] = useState({
    data: null,
    search: null
  })
  function handleSearch(e) {
    setState({ ...state, search: e })
  }
  async function getData(){
    const params = {
      'dateRange[0]': props.filter.dateRange0,
      'dateRange[1]': props.filter.dateRange1,
      search: state.search
    }
    const res = await DashboardAPI.getRankSales(props.parent, params)
    setState({...state,data:res.data})
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [state.search, props.filter])
  return (
    <div className="card" style={{ padding: 30, paddingLeft: 60, paddingRight: 60 }}>
      <div className="title2" style={{ marginBottom: 20 }}>Daftar Tingkat Penjualan</div>
      <div className="ant-card-body">
      <Table
        columns={column}
        dataSource={state.data}
        bordered
        title={() => 
          <div style={{ overflow: "auto", padding: 10 }}>
            <div style={{ float: "left", marginLeft: 10 }}>
              <ExportData
                data={state.data}
                dates={props.filter}/>
            </div>
            <div style={{ float: "right", marginRight: 10 }}>
              <Input placeholder="Search" allowClear={true} onChange={(e) => handleSearch(e.target.value)} prefix={<SearchOutlined />} />
            </div>
          </div>
        }
      />
      </div>
    </div>
  )
}

export default TingkatPenjualan