import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Pagination,
  Space,
  Table,
} from "antd";
import store from "store";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import {
  filterListKategori,
  listLaporan as dataSource,
} from "../../../assets/mock/mock";
import Text from "antd/lib/typography/Text";
import { thousandSeparator } from "../../../utils";
import moment from "moment";
import { LaporanAPI } from "../api/LaporanAPI";
import { USER } from "../../../utils/constants";
import ExportData from "./ExportData";
import { KategoriAPI } from "../../Kategori/api/KategoriAPI";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";
import { DiskonAPI } from "../../Diskon/api/DiskonAPI";
import { StokAPI } from "../../Stok/api/StokAPI";
const { RangePicker } = DatePicker;

const dateFormat = "YYYY-MM-DD";

function ContentLaporan() {
  // const [selectionType, setSelectionType] = useState("checkbox");
  const [state, setState] = useState({
    // selected: [],
    data: null,
    datas: null,
    total: 0,
    filterRange: null,
    page: 1,
    limit: 5,
    loading: false,
  });
  const [cetak, setCetak] = useState({
    dataCetak: null,
    totalCetak: 0,
  });
  const [stok, setStok] = useState({
    data: null,
  });
  const [category, setCategory] = useState({
    categoryList: null,
    filterListKategori: null,
  });
  const [diskon, setDiskon] = useState({
    datas: [],
    totalsdot: 0,
  });
  const [diskonCetak, setDiskonCetak] = useState({
    datas: [],
    totalsdot: 0,
  });
  const column = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
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
      render: (text, record) => (
        <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>
      ),
    },
    {
      title: "Diskon(Rp)",
      dataIndex: "akumulasi_diskon",
      key: "akumulasi_diskon",
      sorter: (a, b) => a.akumulasi_diskon.length - b.akumulasi_diskon.length,
      render: (text, record) => (
        <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>
      ),
    },
    {
      title: "Terjual",
      dataIndex: "terjual",
      key: "terjual",
      sorter: (a, b) => a.terjual - b.terjual,
    },
    {
      title: "Stok",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Pendapatan Bersih",
      dataIndex: "pendapatan_bersih_discount",
      key: "pendapatan_bersih_discount",
      sorter: (a, b) => a.pendapatan_bersih_discount.length - b.pendapatan_bersih_discount.length,
      render: (text, record) => (
        <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>
      ),
    },
    // {
    //   title: "Total",
    //   dataIndex: "total",
    //   key: "total",
    //   sorter: (a, b) => a.total.length - b.total.length,
    //   render: (text, record) => (
    //     <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>
    //   ),
    // },
  ];
  async function getAllLaporan() {
    setState({ ...state, loading: true });
    const data = {
      id: store.get(USER).bizStaff.bizAccountId,
      pagination: {
        limit: state.limit,
        pageLocation: state.page - 1,
        order: ["nama", "ASC"],
      },
      search: "",
      dateRange: state.filterRange,
    };
    let r;
    if(state.filterRange!==null){
      r = await LaporanAPI.LaporanById(store.get(USER).bizStaff.bizAccountId,moment(state.filterRange[0]).startOf('day').format().split("+")[0],moment(state.filterRange[1]).endOf('day').format().split("+")[0]);
    }else{
      r = await LaporanAPI.LaporanById(store.get(USER).bizStaff.bizAccountId,null,null);
    }
    // let totals = 0;
    // let i;
    // if (r.data && r.data.total > 0) {
    //   for (i = 0; i < r.data.data.length; i++) {
    //     totals += parseFloat(r.data.data[i].total);
    //   }
    // }
    // setState({ ...state, data: r.data, total: totals, loading: false });
    setState({ ...state, data: r.data, loading: false });
  }
  // console.log("fiter",state.filterRange!==null&&moment(state.filterRange[0]).startOf('day'),moment(state.filterRange[1]).endOf('day'))
  async function getAllLaporanCetak() {
    const data = {
      id: store.get(USER).bizStaff.bizAccountId,
      pagination: {
        limit: state.data && state.data.total,
        pageLocation: state.page - 1,
        order: ["nama", "ASC"],
      },
      search: "",
      dateRange: state.filterRange,
    };
    let r;
    if(state.filterRange!==null){
      r = await LaporanAPI.LaporanById(store.get(USER).bizStaff.bizAccountId,moment(state.filterRange[0]).startOf('day').format().split("+")[0],moment(state.filterRange[1]).endOf('day').format().split("+")[0]);
    }else{
      r = await LaporanAPI.LaporanById(store.get(USER).bizStaff.bizAccountId,null,null);
    }
    let totals = 0;
    let i;
    if (r.data && r.data.length > 0) {
      for (i = 0; i < r.data.length; i++) {
        totals += parseFloat(r.data[i].pendapatan_bersih);
      }
      setCetak({ ...cetak, dataCetak: r.data, totalCetak: totals });
    }
  }
  async function getAllStok() {
    setStok({ ...stok, loading: true });
    const bizAccountId = store.get(USER).bizStaff.bizAccountId;
    const r = await StokAPI.getStokBy(bizAccountId);
    if (r.status === 400) {
      setStok({ ...stok, data: [], loading: false });
    } else if (r.status === 500) {
      setStok({ ...stok, data: [], loading: false });
      ShowNotify(
        "Cek Jaringan anda",
        notifyPosition.topCenter,
        notifyType.error
      );
    } else {
      setStok({ ...stok, data: r.data, loading: false });
    }
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
      setCategory({
        ...category,
        categoryList: r.data,
        filterListKategori: hasil,
      });
    }
  }
  async function getDiskon() {
    const data = {
      id_merchant: store.get(USER).bizStaff.bizAccountId,
      pagination: {
        limit: state.limit,
        pageLocation: state.page - 1,
      },
      search: state.search,
    };
    const r = await DiskonAPI.getDiscount(data);
    setDiskon({ ...diskon, totalsdot: r.data.total });
  }
  function handleFilterRange(date, dateString) {
    const dates = date !== null ? dateString : date;
    setState({ ...state, filterRange: dates });
  }
  async function getDiskonAll() {
    const data = {
      id_merchant: store.get(USER).bizStaff.bizAccountId,
      pagination: {
        limit: diskon.totalsdot,
        pageLocation: state.page - 1,
      },
      search: state.search,
    };
    const r = await DiskonAPI.getDiscount(data);
    console.log(r,"ini yg dicari")
    const result =
      r.data.data.length > 0
        ? r.data.data.filter((d) => {
            {
              var time = new Date(d.from_date).getTime();
              return (
                new Date(state.filterRange[0]) < time &&
                time < new Date(state.filterRange[1])
              );
            }
          })
        : [];
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        result[i].product = [];
      }
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].biz_product_id.length; j++) {
          result[i].product.push(
            stok.data.find((r) => r.id === result[i].biz_product_id[j])
          );
        }
      }
    }
    setDiskonCetak({ ...diskonCetak, datas: result });
  }
  function handlePagination(page, pageSize) {
    setState({ ...state, page: page, limit: pageSize });
  }
  useEffect(() => {
    getAllLaporan();
    if (state.filterRange && state.data) {
      getAllLaporanCetak();
      getDiskonAll();
    }
    getAllStok();
    getCategory();
    getDiskon();
  }, [state.filterRange, state.page, state.limit
    // , state.total
  ]);
  return (
    <div className="ant-card ant-card-body">
      <Switch>
        <Route exact path="/dashboard/laporan/">
          <h2>Laporan Data Penjualan</h2>
          <div style={{ overflow: "auto", margin: "20px 0px" }}>
            <div style={{ float: "right" }}>
              <RangePicker format={dateFormat} onChange={handleFilterRange} />
            </div>
            <div style={{ float: "right", marginRight: 10 }}>
              {state.filterRange && cetak.dataCetak && diskonCetak.datas && (
                <ExportData
                  data={cetak.dataCetak}
                  total={cetak.totalCetak}
                  dates={state.filterRange}
                  diskon={diskonCetak.datas}
                />
              )}
            </div>
          </div>
          <div className="ant-card">
            <Table
              columns={column}
              dataSource={state.data && state.data}
              pagination={{
                position: ["bottomLeft", "bottomLeft"],
                total: state.data&&state.data.length,
                defaultPageSize: [10],
                pageSizeOptions: [10, 20, 100],
                showSizeChanger: true,
                showQuickJumper: true,
                // showTotal: (total) => `Total ${total} items`,
              }}
              scroll={{ x: "max-content" }}
              loading={state.loading}
              summary={(pageData) => {
                // let totalNett = 0;
                let totals = 0;
                // let totalKeseluruhan = 0;

                // pageData.forEach(({ pendapatan_bersih }) => {
                //   totalNett += parseFloat(pendapatan_bersih);
                // });
                // pageData.forEach(({ total }) => {
                //   totalKeseluruhan += parseFloat(total);
                // });
                if(state.data)
                for (let i = 0; i < state.data.length; i++) {
                  totals += parseFloat(state.data[i].pendapatan_bersih_discount);
                }

                return (
                  <>
                    {state.filterRange && (
                      <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={6}>
                          Total Keseluruhan
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={1}>
                          <Text>Rp.{thousandSeparator(totals)}</Text>
                        </Table.Summary.Cell>
                        {/* <Table.Summary.Cell colSpan={1}>
                          <Text>Rp.{thousandSeparator(totalKeseluruhan)}</Text>
                        </Table.Summary.Cell> */}
                      </Table.Summary.Row>
                    )}
                  </>
                );
              }}
            />
            {/* <Pagination
              style={{ marginTop: 10 }}
              total={state.data && state.data.total}
              pageSize={state.limit}
              current={state.page}
              defaultPageSize={5}
              pageSizeOptions={[5, 10, 20]}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
              onChange={handlePagination}
            /> */}
          </div>
        </Route>
        {/* <Route path="/dashboard/pajak/form">
          <FormPajak />
        </Route> */}
      </Switch>
    </div>
  );
}

export default ContentLaporan;
