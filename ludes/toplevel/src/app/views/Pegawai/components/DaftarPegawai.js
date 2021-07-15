import { Input, Table, Pagination } from 'antd'
import React from 'react'
import { listPegawai as dataSource } from "../../../assets/mock/mock";
import { SearchOutlined } from "@ant-design/icons";

function DaftarPegawai() {
    const column = [
    {
      title: "NAME",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "USERNAME",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
    },
  ];
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
  return (
    <div className="ant-card">
        <div className="ant-card-body">
          <div style={{ overflow: "auto", margin: "10px 20px" }}>
              <div style={{ float: "right", marginRight: 10 }}>
                  <Input placeholder="Search" prefix={<SearchOutlined />} />
              </div>
          </div>
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
        </div>
        <Pagination
            size="small"
            total={dataSource.length}
            defaultPageSize={5}
            pageSizeOptions={[5, 10, 20]}
            showSizeChanger
        />
    </div>
  );
}

export default DaftarPegawai