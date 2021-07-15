import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Tabs, Row } from "antd";
import { listTabsMenu } from "../../assets/mock/mock";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Merchant from "../Merchant/Merchant";
import ContentDashboard from "./components/ContentDashboard";
import { useMediaQuery } from "react-responsive";
import { DownOutlined } from "@ant-design/icons";
import Pegawai from "../Pegawai/Pegawai";
import { TOKEN, USER, WA } from "../../utils/constants";
import Cookies from "js-cookie";
import { Base64 } from 'js-base64';
import Register from "../Register/Register";

const { TabPane } = Tabs;

const avatarImg = require("../../assets/img/avatar.jpg");
const logoImg = require("../../assets/img/icon/logo.png");

function Dashboard() {
  const user = {
    name: Base64.decode(Cookies.get(USER)),
    wa: Base64.decode(Cookies.get(WA))
  } 
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  let { path } = useRouteMatch();
  const [state, setState] = useState({
    tab: "Dashboard",
    toggle: false,
    menu: false,
  });
  function handleTabs(key) {
    setState({ ...state, tab: key });
  }
  useEffect(() => {
    if (isMobile && state.toggle) {
      setState({ ...state, toggle: false });
    }
  }, []);
  
  const menuLogout = (e, index) => {
    return (
      <Menu>
        <Menu.Item key={index}
        onClick={(e) => {
            Cookies.remove(TOKEN);
            window.location.reload();
          }}
        >Logout</Menu.Item>
      </Menu>
    );
  };

  return (
    <div>
      <Row>
        <div className="layout1" style={{ width: '100%' }}>
          <div
            className="layout2"
            style={state.toggle === true && isMobile ? { opacity: 0.5 } : {}}
          >
            <div className="title1">
              <img src={logoImg} />
              Patra Park Food Culinary
              <div className="card">
                <Dropdown overlay={menuLogout}>
                  <span style={{ fontSize: 14 }}>
                    <DownOutlined className="dropdownBg" />
                  </span>
                </Dropdown>
                <img src={logoImg} />
                <div className="name">
                  <div className="title3" >{user.name}</div>
                  <div className="note1">{user.wa}</div>
                </div>
              </div>
            </div>
            <div>
              <Tabs
                className="tabs tab-menu"
                onChange={handleTabs}
              >
                {listTabsMenu.data.map((i, index) => (
                  <TabPane
                    tab={
                      <Link
                        to={`${path}${index !== 0 ? i : ""}`}
                        className={`tab-content ${state.tab === i ? "active" : ""}`}
                      >
                        {i}
                      </Link>
                    }
                    key={i}
                  />
                ))}
              </Tabs>
              <Switch>
                <Route exact path={path}>
                  <ContentDashboard />
                </Route>
                <Route path={`${path}Merchant/`}>
                  <Merchant handleTabs={handleTabs} />
                </Route>
                {/* <Route path={`${path}Pegawai/`}>
                  <Pegawai handleTabs={handleTabs} />
                </Route> */}
                <Route path={`${path}Register/`}>
                  <Register handleTabs={handleTabs} />
                </Route>
              </Switch>
            </div>
          </div>
        </div>  
      </Row>
      <Row>
        <div className="footer" style={{ textAlign: 'center', width: '100%', padding: 40 }}>
          &copy; Copyright {new Date().getFullYear()} Lumbung Inovasi. All Right Reserved
        </div>
      </Row>
    </div>
  );
}

export default Dashboard;
