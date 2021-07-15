import React, { Component } from 'react'
import { Input, Row, Col, DatePicker  } from 'antd'

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRange: null
    }
  }

  handleFilter(e) {
    this.setState({
      dateRange: e
    })
  }
  
  render() {
    return (
      <div>
        <Row>
          <Col span={8} offset={2}>
            <div className="card card-filter">
              <Input.Group compact>
                <RangePicker 
                  style={{ width: '100%' }}
                  bordered={false}
                  format={dateFormat}
                  onChange={(value, dateString) => this.handleFilter(dateString)}
                />
                {console.log()}
              </Input.Group>
            </div>
          </Col>
          {this.state.dateRange}
        </Row>
      </div>
    )
  }
}
