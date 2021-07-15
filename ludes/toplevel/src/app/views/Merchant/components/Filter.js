import { Row, Col, AutoComplete, Input, DatePicker } from 'antd'
import React from 'react'
import { SearchOutlined } from "@ant-design/icons"

function Filter() {
  const options = [
    { value: 'Burns Bay Road' },
    { value: 'Downing Street' },
    { value: 'Wall Street' },
  ];
  const suffix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  const logoMerchant = require("../../../assets/img/icon/logo.png");
  return (
    <div>
      <Row>
        <Col span={12} offset={6} style={{ paddingRight: 10 }}>
          <div className="card card-filter">
            <AutoComplete
              style={{
                width: '100%',
              }}
              suffix={suffix}
              options={options}
              placeholder="Cari Merchant"
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
              }
            />
          </div>
        </Col>
      </Row>
      <Row>
          <div className="title1" style={{ marginBottom: 20 }}>
              <img src={logoMerchant} />
              Kedai Ramen Ichiraku
          </div>
      </Row>
      <Row>
        <Col span={8} offset={2}>
          <div className="card card-filter">
            <Input.Group compact>
              <DatePicker.RangePicker style={{ width: '100%' }} />
            </Input.Group>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Filter