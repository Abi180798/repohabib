import React, { useEffect, useState } from "react";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import SummaryGraph from "./SummaryGraph";
import store from "store"
import { Button, Dropdown, Input, Menu, Pagination, Space, Table } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import {
  filterListKategori,
  listLaporan as dataSource,
} from "../../../assets/mock/mock";
import Text from "antd/lib/typography/Text";
import { thousandSeparator } from "../../../utils/index";
import { USER } from "../../../utils/constants";
import { LaporanAPI } from "../../Laporan/api/LaporanAPI";
import moment from "moment"
import { KategoriAPI } from "../../Kategori/api/KategoriAPI";
import { notifyPosition, notifyType, ShowNotify } from "../../../utils/notification";

function LaporanDay() {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [state, setState] = useState({
    selected: [],
    data:null,
    page:1,
    limit:5
  });
  const [category,setCategory] = useState({
    categoryList:null,
    filterListKategori:null
  })
  const column = [
    {
      title: "Date",
      dataIndex: "updated_at",
      key: "updated_at",
      render : (text) => <div>{moment(text).format("DD/MM/YYYY hh:mm A")}</div>
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
      key: "kategori",
      filters: category.filterListKategori,
      filterMultiple: false,
      onFilter: (value, record) => record.kategori.indexOf(value) === 0,
      sorter: (a, b) => a.kategori.length - b.kategori.length,
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
      sorter: (a, b) => a.harga.length - b.harga.length,
      render: (text, record) => <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>,
    },
    {
      title: "Diskon",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.harga.length - b.harga.length,
      render: (text, record) => <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>,
    },
    {
      title: "Terjual",
      dataIndex: "terjual",
      key: "terjual",
      sorter: (a, b) => a.terjual - b.terjual,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Pendapatan Bersih",
      dataIndex: "pendapatan_bersih",
      key: "pendapatan_bersih",
      sorter: (a, b) => a.pendapatan_bersih.length - b.pendapatan_bersih.length,
      render: (text, record) => <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>,
    },
    // {
    //   title: "Total",
    //   dataIndex: "total",
    //   key: "total",
    //   sorter: (a, b) => a.total.length - b.total.length,
    //   render: (text, record) => <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>,
    // },
  ];
  for (let i = 0; i < dataSource.length; i++) {
    const key = { key: dataSource[i].id };
    Object.assign(dataSource[i], key);
  }
  async function getAllLaporan(){
    const formatDate = "YYYY-MM-DD"
    const now = [moment().format(formatDate),moment().add("days",1).format(formatDate)]
    const data = {
      id:store.get(USER).bizStaff.bizAccountId,
      pagination:{
        limit:state.limit,
        pageLocation:state.page-1,
        order:["updated_at","DESC"]
      },
      search:"",
      dateRange:now
    }
    const r = await LaporanAPI.postLaporan(data)
    setState({...state,data:r.data})
  }
  async function getCategory() {
    const r = await KategoriAPI.getAllCategory();
    if (r.status === 400) {
      setCategory({ ...category, categoryList: [] });
    } else if (r.status === 500) {
      ShowNotify(
        "Cek Jaringan anda",
        notifyPosition.topCenter,
        notifyType.error
      );
      setCategory({ ...category, categoryList: [] });
    } else {
      let hasil = [];
      for (let i = 0; i < r.data.length; i++) {
        const hasils = {
          id: r.data[i].id,
          value: r.data[i].name,
          text: r.data[i].name,
        };
        hasil.push(hasils);
      }
      setCategory({ ...category, categoryList: r.data,filterListKategori:hasil });
    }
  }
  function handlePagination(page,pageSize){
    setState({...state,page:page,limit:pageSize})
  }
  useEffect(()=>{
    getCategory()
  },[])
  useEffect(()=>{
    getAllLaporan()
  },[state.page,state.limit])
  return (
    <div className="ant-card ant-card-body">
      <h2>Laporan Penjualan Hari Ini</h2>
      <div>
        <Button
          style={state.selected.length === 0 ? { display: "none" } : {}}
          type="primary"
          onClick={(e) => {}}
          disabled={state.selected.length === 0}
        >
          Hapus
        </Button>
      </div>
      <div className="ant-card">
        <Table
          columns={column}
          dataSource={state.data&&state.data.data}
          pagination={false}
          scroll={{ x: "max-content" }}
          summary={(pageData) => {
            let totalNett = 0;
            // let totalKeseluruhan = 0;

            pageData.forEach(({ pendapatan_bersih }) => {
              totalNett += parseFloat(pendapatan_bersih);
            });
            // pageData.forEach(({ total }) => {
            //   totalKeseluruhan += parseFloat(total);
            // });

            return (
              <>
                <Table.Summary.Row>
                  <Table.Summary.Cell colSpan={7}>
                    Total Keseluruhan
                  </Table.Summary.Cell>
                  <Table.Summary.Cell colSpan={1}>
                    <Text>Rp.{thousandSeparator(totalNett)}</Text>
                  </Table.Summary.Cell>
                  {/* <Table.Summary.Cell colSpan={1}>
                    <Text>Rp.{thousandSeparator(totalKeseluruhan)}</Text>
                  </Table.Summary.Cell> */}
                </Table.Summary.Row>
              </>
            );
          }}
        />
        <Pagination
          style={{ marginTop: 10 }}
          total={state.data&&state.data.total}
          current={state.page}
          pageSize={state.limit}
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 20, 100]}
          showSizeChanger
          showQuickJumper
          showTotal={(total) => `Total ${total} items`}
          onChange={handlePagination}
        />
      </div>
    </div>
  );
}

export default LaporanDay;