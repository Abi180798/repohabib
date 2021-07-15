import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Dropdown, Input, Menu, Pagination, Space, Table } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import {
  filterListKategori,
  listLaporan as dataSource,
} from "../../../assets/mock/mock";
import FormSupplier from "./FormSupplier";

function ContentSupplier() {
  const column = [
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
      key: "kategori",
      filters: filterListKategori,
      filterMultiple: false,
      onFilter: (value, record) => record.kategori.indexOf(value) === 0,
      sorter: (a, b) => a.kategori.length - b.kategori.length,
    },
    {
      title: "Harga",
      dataIndex: "harga",
      key: "harga",
      sorter: (a, b) => a.harga.length - b.harga.length,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock.length - b.stock.length,
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
        <Route exact path="/dashboard/supplier/">
          <h2>
            Daftar Stok dan Kategori
            <div style={{ float: "right", marginRight: 10 }}>
              <Link to="/dashboard/supplier/form">
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
        <Route path="/dashboard/supplier/form">
          <FormSupplier />
        </Route>
      </Switch>
    </div>
  );
}

export default ContentSupplier;
