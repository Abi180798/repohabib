import { List, Avatar, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { DashboardAPI } from '../api/DashboardAPI'
import { transaksiTerbanyak } from '../../../assets/mock/mock'

function MenuTerlaris(props) {
  const { Text, Paragraph } = Typography;
  const [state,setState] = useState({
    data: [
      { 
        "avatar":"1st.png",
        "nama":"Kedai Ramen Ichiraku",
        rank: 1,
      }
    ]
  })
  async function getData(){
    const res = await DashboardAPI.getRankProduct(props.parent)
    setState({...state,data:res.data})
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="card" style={{ padding: 28, marginBottom: 20 }}>
      <div className="title2">Menu Terlaris</div>
      <List
        itemLayout="horizontal"
        dataSource={state.data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape="square" src={require("../../../assets/img/icon/"+item.rank+".png")} />}
              title={<Text type="secondary">Peringkat {item.rank}</Text>}
              description={<Paragraph ellipsis>{item.product_name}</Paragraph>}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default MenuTerlaris