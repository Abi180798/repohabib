import { Tabs, List, Avatar, Typography } from 'antd'
import React, { useState } from 'react'
import { transaksiTerbanyak } from '../../../assets/mock/mock'
const { TabPane } = Tabs;

function TransaksiTerbanyak() {
  const { Text, Paragraph } = Typography;
  return (
    <div className="card" style={{ padding: 28, marginBottom: 20 }}>
      <div className="title2">Transaksi Terbanyak</div>
      <List
        itemLayout="horizontal"
        dataSource={transaksiTerbanyak.data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape="square" src={require("../../../assets/img/icon/"+item.avatar)} />}
              title={<Text type="secondary">{item.rank}</Text>}
              description={<Paragraph ellipsis>{item.nama}</Paragraph>}
            />
          </List.Item>
        )}
      />,
    </div>
  )
}

export default TransaksiTerbanyak