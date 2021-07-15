import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Dropdown, Input, Menu, Pagination, Space, Table } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import {
  filterStatusPegawai,
  listPegawai as dataSource,
} from "../../../assets/mock/mock";
import FormServis from "./FormServis";

function ContentServis() {
  const column = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: filterStatusPegawai,
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      sorter: (a, b) => a.status.length - b.status.length,
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
        <Menu.Item>Edit</Menu.Item>
        <Menu.Item>Hapus</Menu.Item>
      </Menu>
    );
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };
  function onSearch(value) {
    console.log("search: ", value);
  }
  return (
    <div className="ant-card ant-card-body">
      <Switch>
        <Route exact path="/dashboard/service/">
          <h2>
            Daftar Stok dan Kategori
            <div style={{ float: "right", marginRight: 10 }}>
              <Link to="/dashboard/service/form">
                <button
                  className="ant-btn background3 text-white"
                  style={{ borderRadius: "6px" }}
                >
                  + Tambah Kasir
                </button>
              </Link>
            </div>
          </h2>
          <div style={{ overflow: "auto", margin: "20px 0px" }}>
            <div style={{ float: "left" }}></div>
            <div style={{ float: "right", marginRight: 10 }}>
              <Input placeholder="Search" prefix={<SearchOutlined />} />
            </div>
          </div>
          <div className="ant-card">
            <Table
              columns={column}
              dataSource={dataSource}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              pagination={false}
              scroll={{ x: "max-content" }}
            />
            <Pagination
              style={{ marginTop: 10 }}
              total={dataSource.length}
              defaultPageSize={5}
              pageSizeOptions={[5, 10, 20]}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </Route>
        <Route path="/dashboard/service/form">
          <FormServis />
        </Route>
      </Switch>
    </div>
  );
}

export default ContentServis;
