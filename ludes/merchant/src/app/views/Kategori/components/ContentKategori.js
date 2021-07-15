import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Dropdown, Input, Menu, Pagination, Space, Table, Button } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { listLaporan as dataSource } from "../../../assets/mock/mock";
import Modal from "antd/lib/modal/Modal";
import FormKategori from "./FormKategori";
import { KategoriAPI } from "../api/KategoriAPI";
import {
  notifyPosition,
  notifyType,
  ShowNotify,
} from "../../../utils/notification";
import { USER } from "../../../utils/constants";
import store from "store";
// import FormStok from "./FormStok";

function ContentKategori() {
  const [kategori, setKategori] = useState({
    mode: null,
    nama_kategori: null,
    filterListKategori: [],
  });
  const [isVisibleDel, setVisibleDel] = useState(false);
  const [isVisibleDelMul, setVisibleDelMul] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModalDel = () => {
    setVisibleDel(true);
  };
  const showModalDelMul = () => {
    setVisibleDelMul(true);
  };

  const handleCancelDel = () => {
    setVisibleDel(false);
  };
  const handleCancelDelMul = () => {
    setVisibleDelMul(false);
  };
  const [selectionType, setSelectionType] = useState("checkbox");
  const [state, setState] = useState({
    selectedId: null,
    selected: [],
    data: [],
    filterListKategori: null,
    page: 1,
    limit: 5,
    search: "",
  });
  const column = [
    {
      title: "Kategori",
      dataIndex: "name",
      key: "name",
      filters: state.filterListKategori,
      filterMultiple: false,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      width: "90%",
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
        <Menu.Item
          onClick={(e) => {
            showModal("edit");
            setKategori({ ...kategori, nama_kategori: record, mode: "edit" });
          }}
        >
          Edit
        </Menu.Item>
        {/* <Menu.Item
          onClick={(e) => {
            showModalDel();
            setState({ ...state, selectedId: record });
          }}
        >
          Hapus
        </Menu.Item> */}
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
  if (state.data) {
    for (let i = 0; i < state.data.length; i++) {
      const key = { key: state.data[i].id };
      Object.assign(state.data[i], key);
    }
  }
  async function deleteMultiple() {
    let data = [];
    if (state.selected) {
      for (let i = 0; i < state.selected.length; i++) {
        data.push(state.data[i].id);
      }
    }
    const r = await KategoriAPI.delMulCategoryById({
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
          getAllCategory();
          handleCancelDelMul();
          state.selected=[]
        }
      );
    }
  }
  async function getAllCategory() {
    const bizAccountId = store.get(USER).bizStaff.bizAccountId;
    const params = {
      page: state.page - 1,
      limit: state.limit,
      search: state.search === "" ? null : state.search,
    };
    const r = await KategoriAPI.getAllCategory();
    if (r.status === 400) {
      setState({ ...state, data: [] });
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
      setState({ ...state, data: r.data, filterListKategori: hasil });
    }
  }
  async function handleDelete(categoryId) {
    const r = await KategoriAPI.delCategoryById(categoryId);
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
          getAllCategory();
          handleCancelDel();
        }
      );
    }
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllCategory();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [state.page, state.limit, state.search]);
  return (
    <div className="ant-card ant-card-body">
      <Switch>
        <Route exact path="/dashboard/kategori/">
          <h2>
            Daftar Kategori
            <div style={{ float: "right", marginRight: 10 }}>
              {/* <button
                className="ant-btn background3 text-white"
                style={{ borderRadius: "6px" }}
                onClick={(e) => showModal("add")}
              >
                + Tambah Kategori
              </button> */}
            </div>
          </h2>
          <div style={{ overflow: "auto", margin: "20px 0px" }}>
            <div style={{ float: "left" }}>
              {/* <Button
                style={state.selected.length === 0 ? { display: "none" } : {}}
                type="primary"
                onClick={(e) => showModalDelMul()}
                disabled={state.selected.length === 0}
              >
                Hapus
              </Button> */}
            </div>
            <div style={{ float: "right", marginRight: 10, display: "none" }}>
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
              dataSource={state.data && state.data}
              // rowSelection={{
              //   type: "checkbox",
              //   ...rowSelection,
              // }}
              pagination={{
                position: ["bottomLeft", "bottomLeft"],
                total: state.data.length,
                defaultPageSize: [5],
                pageSizeOptions: [5, 10, 20],
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} items`,
              }}
              scroll={{ x: "max-content" }}
            />
            {/* <Pagination
              style={{ marginTop: 10 }}
              total={state.data && state.data.total}
              current={state.page}
              page={state.limit}
              defaultPageSize={5}
              pageSizeOptions={[5, 10, 20]}
              showSizeChanger
              showQuickJumper
              onShowSizeChange={(current,size)=>setState({...state,page:current,limit:size})}
              showTotal={(total) => `Total ${total} items`}
            /> */}
          </div>
        </Route>
        {/* <Route path="/dashboard/stok/form">
          <FormStok />
        </Route> */}
      </Switch>
      <Modal
        title={`${kategori.mode === "add" ? "Tambah" : "Edit"} Kategori`}
        visible={isModalVisible}
        closable={false}
        footer={false}
      >
        <FormKategori
          nama_kategori={
            kategori.mode === "edit" ? kategori.nama_kategori : null
          }
          handleCancel={handleCancel}
          getAllCategory={getAllCategory}
        />
      </Modal>
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

export default ContentKategori;
