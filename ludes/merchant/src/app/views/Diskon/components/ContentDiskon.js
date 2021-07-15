import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Button, Dropdown, Input, Menu, Pagination, Space, Table } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import store from "store";
import moment from "moment";
import {
  filterListKategori,
  listDiskon as dataSource,
} from "../../../assets/mock/mock";
import { DiskonAPI } from "../api/DiskonAPI";
import { USER } from "../../../utils/constants";
import FormDiskon from "./FormDiskon";
import { notifyPosition, notifyType, ShowNotify } from "../../../utils/notification";
import Modal from "antd/lib/modal/Modal";
import { thousandSeparator } from "../../../utils";
// import FormStok from "./FormStok";

const dateFormat = "DD-MM-YYYY";

function ContentDiskon() {
  const [selectionType, setSelectionType] = useState("checkbox");
  const [state, setState] = useState({
    selectedId: null,
    selectedIdit: null,
    selected: [],
    data: null,
    page: 1,
    limit: 5,
    search: "",
    mode:null
  });
  const [isVisibleDel, setVisibleDel] = useState(false);
  const showModalDel = () => {
    setVisibleDel(true);
  };

  const handleCancelDel = () => {
    setVisibleDel(false);
  };
  const column = [
    {
      title: "Nama Diskon",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Diskon(%)",
      dataIndex: "percent_off",
      key: "percent_off",
      sorter: (a, b) => a.amount.length - b.amount.length,
      render: (text) => <div>{text}%</div>
    },
    {
      title: "Tanggal Mulai",
      dataIndex: "from_date",
      key: "from_date",
      sorter: (a, b) => parseInt(a.from_date.split("-")[1]) - parseInt(b.from_date.split("-")[1]),
      render: (text) => <div>{moment(text).format(dateFormat)}</div>,
    },
    {
      title: "Tanggal Selesai",
      dataIndex: "until_date",
      key: "until_date",
      sorter: (a, b) =>parseInt(a.until_date.split("-")[1]) - parseInt(b.until_date.split("-")[1]),
      render: (text) => <div>{moment(text).format(dateFormat)}</div>,
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
        onClick={e=>{
          setState({ ...state, selectedIdit: record,mode:"edit" });
          setMode("edit")
        }}
        >Edit</Menu.Item>
        <Menu.Item
          onClick={(e) => {
            showModalDel();
            setState({ ...state, selectedId: record });
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
  const [mode,setMode] = useState()
  function resetMode() {
    setMode(null)
  }
  for (let i = 0; i < dataSource.length; i++) {
    const key = { key: dataSource[i].id };
    Object.assign(dataSource[i], key);
  }
  function resetForm(){
    setState({...state,selectedIdit:null,mode:null})
  }
  async function handleDelete(id) {
    const r = await DiskonAPI.delDiscountById(id);
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
          getAllDiskon();
          handleCancelDel();
        }
      );
    }
  }
  async function getAllDiskon() {
    const data = {
      id_merchant: store.get(USER).bizStaff.bizAccountId,
      pagination: {
        limit: state.limit,
        pageLocation: state.page - 1,
      },
      search: state.search,
    };
    const r = await DiskonAPI.getDiscount(data);
    setState({ ...state, data: r.data });
  }
  function handlePagination(page,pageSize){
    setState({...state,page:page,limit:pageSize})
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getAllDiskon();
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [state.limit, state.page, state.search]);
  return (
    <div>
      <div className="ant-card" style={{ marginBottom: "20px" }}>
        <div style={{ padding: "25px" }}>
          <FormDiskon getAllDiskon={getAllDiskon} dataDiscount={mode==="edit"?state.selectedIdit:null} resetForm={resetForm} resetMode={resetMode}/>
        </div>
      </div>
      <div className="ant-card ant-card-body">
        <Switch>
          <Route exact path="/dashboard/diskon/">
            <h2>Daftar Diskon</h2>
            <div style={{ overflow: "auto", margin: "20px 0px" }}>
              <div style={{ float: "left" }}>
                <Button
                  style={state.selected.length === 0 ? { display: "none" } : {}}
                  type="primary"
                  onClick={(e) => {}}
                  disabled={state.selected.length === 0}
                >
                  Hapus
                </Button>
              </div>
              <div style={{ float: "right", marginRight: 10 }}>
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={(e) =>
                    setState({ ...state, search: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="ant-card">
              <Table
                columns={column}
                dataSource={state.data && state.data.data}
                // rowSelection={{
                //   type: "checkbox",
                //   ...rowSelection,
                // }}
                pagination={false}
                // pagination={{
                //   position:["bottomLeft","bottomLeft"],
                //   total:dataSource.length,
                //   defaultPageSize:[5],
                //   pageSizeOptions:[5, 10, 20],
                //   showSizeChanger:true,
                //   showQuickJumper:true,
                //   showTotal:(total) => `Total ${total} items`
                // }}
                scroll={{ x: "max-content" }}
              />
              <Pagination
              onChange={handlePagination}
                style={{ marginTop: 10 }}
                current={state.page}
                total={state.data && state.data.total}
                pageSize={state.limit}
                defaultPageSize={5}
                pageSizeOptions={[5, 10, 20]}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
              />
            </div>
          </Route>
          {/* <Route path="/dashboard/stok/form">
          <FormStok />
        </Route> */}
        </Switch>
      </div>
      <Modal
        title={`Apakah anda yakin hapus "${
          state.selectedId && state.selectedId.title
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
    </div>
  );
}

export default ContentDiskon;
