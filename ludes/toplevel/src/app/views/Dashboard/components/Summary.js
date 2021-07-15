import React from 'react'
import { Col } from 'antd'

export default function Summary(props) {
    return (
        <Col span={props.span}>
            <div className="title2" style={{ marginBottom: 90 }}>{props.title}</div>
            <div className="title1">{props.value}</div>
        </Col>
    )
}
