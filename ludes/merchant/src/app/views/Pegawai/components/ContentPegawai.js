import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import {
  Dropdown,
  Input,
  Menu,
  Pagination,
  Space,
  Table,
  Modal,
  Button,
} from "antd";
import store from "store";
import {
  MoreOutlined,
  SearchOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  filterStatusPegawai,
  listPegawai as dataSource,
} from "../../../assets/mock/mock";
import FormPegawai from "./FormPegawai";
import { PegawaiAPI } from "../api/PegawaiAPI";
import { USER } from "../../../utils/constants";
import {
  ShowNotify,
  notifyPosition,
  notifyType,
} from "../../../utils/notification";

function ContentPegawai() {
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

  const handleCancelDel = () => {
    setVisibleDel(false);
  };
  const showModalDelMul = () => {
    setVisibleDelMul(true);
  };
  const handleCancelDelMul = () => {
    setVisibleDelMul(false);
  };
  function handlePeg() {
    setPeg({ ...peg, peg: null });
  }
  const [selectionType, setSelectionType] = useState("checkbox");
  const [state, setState] = useState({
    selectedId: null,
    selected: [],
    data: [],
    page: 1,
    limit: 5,
    search: "",
    loading:false
  });
  const [peg, setPeg] = useState({
    mode: "add",
    peg: null,
  });
  const column = [
    {
      title: "Nama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Whatsapp",
      dataIndex: "whatsapp",
      key: "whatsapp",
    },
    {
      title: "Role",
      dataIndex: "status",
      key: "status",
      filters: filterStatusPegawai,
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => <div>{text}</div>,
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
            setPeg({
              ...peg,
              mode: "edit",
              peg: record,
            });
            showModal();
          }}
        >
          Edit
        </Menu.Item>
        {store.get(USER).id !== record.bizStaff.userId && (
          <Menu.Item
            onClick={(e) => {
              setState({ ...state, selectedId: record });
              showModalDel();
            }}
          >
            Hapus
          </Menu.Item>
        )}
      </Menu>
    );
  }
  async function handleDeletePegawai(id) {
    const r = await PegawaiAPI.delPegawaiById(id);
    if (r.status === 500) {
      ShowNotify("Network Error", notifyPosition.topCenter, notifyType.error);
    } else if (r.status === 400) {
      ShowNotify(
        "Gagal hapus pegawai",
        notifyPosition.topCenter,
        notifyType.error
      );
    } else if (r.status === 200) {
      ShowNotify(
        "Berhasil hapus pegawai",
        notifyPosition.topCenter,
        notifyType.success,
        () => {
          getAllPegawai();
          handleCancelDel();
        }
      );
    }
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
  if(state.data&&state.data.data){
    for (let i = 0; i < state.data.data.length; i++) {
      const key = { key: state.data.data[i].bizStaff.id };
      Object.assign(state.data.data[i], key);
    }
  }
  async function deleteMultiple() {
    let data = [];
    if (state.selected) {
      for (let i = 0; i < state.selected.length; i++) {
        data.push(state.data.data[i].bizStaff.id);
      }
    }
    const r = await PegawaiAPI.delMulPegawaiById({
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
          getAllPegawai();
          handleCancelDelMul();
          state.selected=[]
        }
      );
    }
  }
  function handlePagination(page, pageSize) {
    setState({ ...state, page: page, limit: pageSize });
  }
  async function getAllPegawai() {
    setState({...state,loading:true})
    const bizAccountId = store.get(USER).bizStaff.bizAccountId;
    const params = {
      page: state.page - 1,
      limit: state.limit,
      search: state.search
    };
    const r = await PegawaiAPI.getPegawai(bizAccountId, params);
    let i;
    for (i = 0; i < r.data.data.length; i++) {
      if (r.data.data[i].bizStaff.isOwner === true) {
        Object.assign(r.data.data[i], { status: "Owner" });
      } else if (r.data.data[i].bizStaff.isAdmin === true) {
        Object.assign(r.data.data[i], { status: "Admin" });
      } else if (r.data.data[i].bizStaff.isCashier === true) {
        Object.assign(r.data.data[i], { status: "Kasir" });
      } else {
        Object.assign(r.data.data[i], { status: "Belum ada role" });
      }
    }
    setState({ ...state, data: r.data,loading:false });
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllPegawai();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [state.page, state.limit, state.search]);
  return (
    <div className="ant-card ant-card-body">
      <Switch>
        <Route exact path="/dashboard/pegawai/">
          <h2>
            Daftar Pegawai
            <div style={{ float: "right", marginRight: 10 }}>
              {/* <Link to="/dashboard/pegawai/form"> */}
              <button
                className="ant-btn background3 text-white"
                style={{ borderRadius: "6px" }}
                onClick={showModal}
              >
                + Tambah Pegawai
              </button>
              {/* </Link> */}
            </div>
          </h2>
          <div style={{ overflow: "auto", margin: "20px 0px" }}>
            <div style={{ float: "left" }}>
              <Button
                style={state.selected.length === 0 ? { display: "none" } : {}}
                type="primary"
                onClick={(e) => showModalDelMul()}
                disabled={state.selected.length === 0}
              >
                Hapus
              </Button>
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
                type: "checkbox",
                ...rowSelection,
              }}
              pagination={false}
              scroll={{ x: "max-content" }}
              loading={state.loading}
            />
            <Pagination
              style={{ marginTop: 10 }}
              total={state.data && state.data.totalItems}
              current={state.page}
              pageSize={state.limit}
              defaultPageSize={5}
              pageSizeOptions={[5, 10, 20]}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
              onChange={handlePagination}
            />
          </div>
        </Route>
        {/* <Route path="/dashboard/pegawai/form">
          <FormPegawai />
        </Route> */}
      </Switch>
      <Modal
        title={`${peg.mode === "add" ? "Tambah" : "Edit"} Pegawai`}
        visible={isModalVisible}
        closable={false}
        footer={false}
      >
        <FormPegawai
          getAllPegawai={getAllPegawai}
          handleCancel={handleCancel}
          peg={peg.mode === "edit" && peg.peg ? peg.peg : null}
          setPeg={handlePeg}
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
                state.selectedId &&
                handleDeletePegawai(state.selectedId.bizStaff.id)
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

export default ContentPegawai;
