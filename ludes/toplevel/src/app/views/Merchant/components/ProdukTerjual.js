import { Input, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { SearchOutlined } from "@ant-design/icons";
import { MerchantAPI } from '../api/MerchantAPI';
import { thousandSeparator } from '../../../utils'
import Text from "antd/lib/typography/Text";
import ExportData from './ExportData';

export default function ProdukTerjual(props) {
  const ribuan = (text, record) => <Text>{thousandSeparator(text)}</Text>;
  const column = [
    {
      title: "NAME",
      dataIndex: "name",
      label: "Nama",
      key: "name",
    },
    {
      title: "KATEGORI",
      label: "Kategori",
      dataIndex: "kategori",
      key: "kategori",
    },
    {
      title: "TERJUAL",
      label: "Terjual",
      dataIndex: "terjual",
      key: "terjual",
    },
    {
      title: "DISKON(Rp)",
      label: "akumulasi_diskon",
      dataIndex: "akumulasi_diskon",
      key: "akumulasi_diskon",
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
      title: "PENDAPATAN BERSIH",
      label: "Pendapatan Bersih",
      dataIndex: "pendapatan_bersih_discount",
      key: "pendapatan_bersih_discount",
      align: "right",
      render: ribuan
    },
    {
      title: "SHARING PROFIT",
      label: "Sharing Profit",
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
    const res = await MerchantAPI.getRankSalesMerchant(props.id, params)
    setState({...state,data:res.data})
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [state.search, props.id, props.filter])
  return (
    <div className="card" style={{ padding: 30, paddingLeft: 60, paddingRight: 60 }}>
      <div className="title2" style={{ marginBottom: 20 }}>Daftar Produk Terjual</div>
      <div className="ant-card-body">
      
      <Table
        columns={column}
        dataSource={state.data}
        bordered
        title={() => 
          <div style={{ overflow: "auto", padding: 10 }}>
            <div style={{ float: "left", marginLeft: 10 }}>
              <ExportData
                name={props.name}
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
