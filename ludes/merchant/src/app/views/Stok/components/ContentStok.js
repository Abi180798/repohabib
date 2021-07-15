import React, { useEffect, useState } from "react";
import store from "store";
import { Switch, Route, Link } from "react-router-dom";
import { Dropdown, Input, Menu, Pagination, Space, Table, Button } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { listLaporan as dataSource } from "../../../assets/mock/mock";
import FormStok from "./FormStok";
import { StokAPI } from "../api/StokAPI";
import { USER } from "../../../utils/constants";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";
import Text from "antd/lib/typography/Text";
import ContentForm from "./ContentForm";
import Modal from "antd/lib/modal/Modal";
import { thousandSeparator } from "../../../utils";
import { KategoriAPI } from "../../Kategori/api/KategoriAPI";
import { DashboardAPI } from "../../Dashboard/api/DashboardAPI";

function ContentStok() {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [state, setState] = useState({
    selectedId: null,
    selected: [],
    data: [],
    page: 1,
    limit: 5,
    search: "",
    loading: false,
  });
  const [category, setCategory] = useState({
    categoryList: null,
    filterListKategori: null,
  });
  const [isVisibleDel, setVisibleDel] = useState(false);
  const [isVisibleDelMul, setVisibleDelMul] = useState(false);
  const showModalDel = () => {
    setVisibleDel(true);
  };

  const handleCancelDel = () => {
    setVisibleDel(false);
  };
  const showModalDelMul = () => {
    setVisibleDelMul(true);
  };
  const handleCancelDelMul = () => {
    setVisibleDelMul(false);
  };
  const column = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Kategori",
      dataIndex: "categoryId",
      key: "categoryId",
      filters: category.filterListKategori,
      filterMultiple: false,
      onFilter: (value, record) =>
        category.categoryList &&
        category.categoryList.find((r) => r.id === record.categoryId).name ===
          value,
      sorter: (a, b) => a.categoryId - b.categoryId,
      render: (text) => {
        const data =
          category.categoryList &&
          category.categoryList.find((r) => r.id === text);
        return <div>{data && data.name}</div>;
      },
    },
    {
      title: "Harga",
      dataIndex: "sellPrice",
      key: "sellPrice",
      sorter: (a, b) => a.sellPrice.length - b.sellPrice.length,
      render: (text, record) => (
        <Text>Rp.{thousandSeparator(parseFloat(text))}</Text>
      ),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (text, record) => (
        <Space
          size="middle"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Dropdown overlay={getActionMenus(record)}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      ),
    },
  ];
  function getActionMenus(record) {
    return (
      <Menu>
        <Menu.Item>
          <Link to={`/dashboard/stok/form/${record.id}`}>Edit</Link>
        </Menu.Item>
        <Menu.Item
          onClick={(e) => {
            setState({ ...state, selectedId: record });
            showModalDel();
          }}
        >
          Hapus
        </Menu.Item>
      </Menu>
    );
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({
        ...state,
        selected: selectedRows,
      });
    },
    getCheckboxProps: (record) => ({
      disabled: record.id === "Disabled User",
      // Column configuration not to be checked
      id: record.id,
    }),
  };
  async function deleteMultiple() {
    let data = [];
    if (state.selected) {
      for (let i = 0; i < state.selected.length; i++) {
        data.push(state.data.data[i].id);
      }
    }
    const r = await StokAPI.delMulStokById({
      ids: data,
    });
    if (r.status === 400) {
      ShowNotify(
        "Gagal Hapus data",
        notifyPosition.topCenter,
        notifyType.error
      );
    } else if (r.status === 500) {
      ShowNotify(
        "Gagal Hapus data",
        notifyPosition.topCenter,
        notifyType.error
      );
    } else {
      ShowNotify(
        "Berhasil Hapus data",
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          getAllStok();
          handleCancelDelMul();
          state.selected = [];
        }
      );
    }
  }
  if (state.data && state.data.data) {
    for (let i = 0; i < state.data.data.length; i++) {
      const key = { key: state.data.data[i].id };
      Object.assign(state.data.data[i], key);
    }
  }
  async function handleDelete(idProduct) {
    const r = await StokAPI.delStokById(idProduct);
    if (r.status === 400) {
      ShowNotify(
        "Gagal hapus data",
        notifyPosition.topCenter,
        notifyType.error
      );
    } else if (r.status === 500) {
      ShowNotify(
        "Cek Jaringan anda",
        notifyPosition.topCenter,
        notifyType.error
      );
    } else {
      ShowNotify(
        "Berhasil hapus data",
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          getAllStok();
          handleCancelDel();
        }
      );
    }
  }
  async function getAllStok() {
    const bizAccountId = store.get(USER).bizStaff.bizAccountId;
    const res = await DashboardAPI.getAccount(bizAccountId);
    setState({ ...state, loading: true });
    const params = {
      page: state.page - 1,
      limit: state.limit,
      search: state.search,
      bizAccountId: bizAccountId,
      isOpen: res.data.isOpen,
      stockzero: true
    };
    const r = await StokAPI.getStok(params);
    if (r.status === 400) {
      setState({ ...state, data: [], loading: false });
    } else if (r.status === 500) {
      setState({ ...state, data: [], loading: false });
      ShowNotify(
        "Cek Jaringan anda",
        notifyPosition.topCenter,
        notifyType.error
      );
    } else {
      setState({ ...state, data: r.data, loading: false });
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
  useEffect(() => {
    getCategory();
  }, []);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllStok();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [state.page, state.limit, state.search]);
  return (
    <div className="ant-card ant-card-body">
      <Switch>
        <Route exact path="/dashboard/Stok/">
          <h2>
            Daftar Stok dan Kategori
            <div style={{ float: "right", marginRight: 10 }}>
              <Link to="/dashboard/Stok/form">
                <button
                  className="ant-btn background3 text-white"
                  style={{ borderRadius: "6px" }}
                >
                  + Tambah Barang
                </button>
              </Link>
            </div>
          </h2>
          <div style={{ overflow: "auto", margin: "20px 0px" }}>
            <div style={{ float: "left" }}>
              <div>
                <Button
                  style={state.selected.length === 0 ? { display: "none" } : {}}
                  type="primary"
                  onClick={(e) => showModalDelMul()}
                  disabled={state.selected.length === 0}
                >
                  Hapus
                </Button>
              </div>
            </div>
            <div style={{ float: "right", marginRight: 10 }}>
              <Input
                onChange={(e) => setState({ ...state, search: e.target.value })}
                placeholder="Search"
                prefix={<SearchOutlined />}
              />
            </div>
          </div>
          <div className="ant-card">
            <Table
              columns={column}
              dataSource={state.data && state.data.data}
              rowSelection={{
                type: selectionType,
                ...rowSelection,
              }}
              pagination={false}
              // pagination={{
              //   position: ["bottomLeft", "bottomLeft"],
              //   total: state.data.length,
              //   defaultPageSize: [5],
              //   pageSizeOptions: [5, 10, 20],
              //   showSizeChanger: true,
              //   showQuickJumper: true,
              //   showTotal: (total) => `Total ${total} items`,
              // }}
              scroll={{ x: "max-content" }}
              loading={state.loading}
            />
            <Pagination
              onChange={(current, size) => {setState({ ...state, page: current, limit: size })}}
              style={{ marginTop: 10 }}
              total={state.data && state.data.totalItems}
              current={state.page}
              page={state.limit}
              defaultPageSize={5}
              pageSizeOptions={[5, 10, 20]}
              showSizeChanger
              showQuickJumper
              // onShowSizeChange={(current, size) =>{console.log("current",size);
              //   setState({ ...state, page: current, limit: size })
              // }
              // }
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </Route>
        <Route path="/dashboard/Stok/form">
          <ContentForm />
        </Route>
        <Route path="/dashboard/Stok/form/:id">
          <ContentForm />
        </Route>
      </Switch>
      <Modal
        title={`Apakah anda yakin hapus "${
          state.selectedId && state.selectedId.name
        }"?`}
        visible={isVisibleDel}
        closable={false}
        footer={false}
      >
        <div>
          <div style={{ overflow: "auto" }}>
            <Button
              className="ant-btn background3 text-white"
              type="primary"
              style={{ margin: "5px 5px 5px 0px" }}
              onClick={(e) =>
                state.selectedId && handleDelete(state.selectedId.id)
              }
            >
              Ya
            </Button>
            <Button style={{ margin: 5 }} onClick={handleCancelDel}>
              Tidak
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        title={`Apakah anda yakin hapus data?`}
        visible={isVisibleDelMul}
        closable={false}
        footer={false}
      >
        <div>
          <div style={{ overflow: "auto" }}>
            <Button
              className="ant-btn background3 text-white"
              type="primary"
              style={{ margin: "5px 5px 5px 0px" }}
              onClick={(e) => deleteMultiple()}
            >
              Ya
            </Button>
            <Button style={{ margin: 5 }} onClick={handleCancelDelMul}>
              Tidak
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ContentStok;
