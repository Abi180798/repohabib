import React, { useEffect, useState } from "react";
import { Dropdown, Menu, Tabs, Button } from "antd";
import store from "store";
import { listTabsMenu } from "../../assets/mock/mock";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Laporan from "../Laporan/Laporan";
import Stok from "../Stok/Stok";
import Kategori from "../Kategori/Kategori";
import ContentDashboard from "./components/ContentDashboard";
import { useMediaQuery } from "react-responsive";
import { DownOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons";
import Pegawai from "../Pegawai/Pegawai";
import Pajak from "../Pajak/Pajak";
import Servis from "../Servis/Servis";
import Diskon from "../Diskon/Diskon";
import Supplier from "../Supplier/Supplier";
import Modal from "antd/lib/modal/Modal";
import { TOKEN, USER } from "../../utils/constants";
import Cookies from "js-cookie";
import { DashboardAPI } from "./api/DashboardAPI";
import EditMerchant from "./components/EditMerchant";
import { StokAPI } from "../Stok/api/StokAPI";

const { TabPane } = Tabs;

const avatarImg = require("../../assets/img/avatar.jpg");
const iconPegawai = require("../../assets/img/clarity_employee-group-line.svg");
const iconSupplier = require("../../assets/img/Vector.svg");
const iconPajak = require("../../assets/img/heroicons-outline_receipt-tax.svg");
const iconService = require("../../assets/img/carbon_help-desk.svg");
const iconPegawais = require("../../assets/img/clarity_employee-group-line-white.svg");
const iconSuppliers = require("../../assets/img/Vector white.svg");
const iconPajaks = require("../../assets/img/heroicons-outline_receipt-tax-white.svg");
const iconServices = require("../../assets/img/carbon_help-desk-white.svg");

const tabdefault = window.location.pathname.split("/")[2];

function Dashboard() {
  const isTablet = useMediaQuery({ query: "(min-width: 576px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 576px)" });
  let { path, url } = useRouteMatch();
  const [state, setState] = useState({
    tab: tabdefault === "" ? "Dashboard" : tabdefault,
    toggle: false,
    menu: false,
    akun: null,
  });
  const [toko, setToko] = useState({
    open: false,
  });
  const [urls, setUrl] = useState({
    urlPhoto: null,
    urlFile: null,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };

  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
  };
  const handleOpenToko = async () => {
    const bizAccountId = store.get(USER).bizStaff.bizAccountId;
    const data = {
      isOpen: !toko.open,
    };
    const r = await DashboardAPI.putAccountId(bizAccountId, data);
    // setToko({...toko,open:r.data})
    setToko({ ...toko, open: r.data.isOpen });
  };
  function handleTabs(key) {
    setState({ ...state, tab: key });
  }
  function getRole() {
    if (store.get(USER).bizStaff.isOwner === true) {
      return "Owner";
    } else if (store.get(USER).bizStaff.isAdmin === true) {
      return "Admin";
    } else if (store.get(USER).bizStaff.isCashier === true) {
      return "Kasir";
    } else {
      return "Belum ada role";
    }
  }
  async function getAccount() {
    const bizAccountId = store.get(USER).bizStaff.bizAccountId;
    const r = await DashboardAPI.getAccount(bizAccountId);
    setState({ ...state, akun: r.data });
    setToko({ ...toko, open: r.data.isOpen });
    if (r.data.mediaId) {
      await getMediaImage(r.data.mediaId);
    }
  }
  async function getMediaImage(mediaId) {
    const r = await StokAPI.getMedia(mediaId);
    setUrl({ ...urls, urlPhoto: r });
  }
  function toDataURL(urls, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", urls);
    xhr.responseType = "blob";
    xhr.send();
  }
  const urlToObject = async () => {
    toDataURL(urls.urlPhoto && urls.urlPhoto, async (img) => {
      const response = await fetch(img);
      // here image is url/location of image
      const blob = await response.blob();
      const file = new File([blob], urls.urlPhoto.split("media/")[1], {
        type: "image/png",
      });
      setUrl({ ...urls, urlFile: file });
    });
  };
  useEffect(() => {
    if (isMobile && state.toggle) {
      setState({ ...state, toggle: false });
    }
  }, []);
  useEffect(() => {
    getAccount();
  }, []);
  useEffect(async () => {
    if (url.urlPhoto) {
      await urlToObject();
    }
  }, [url.urlPhoto]);
  const menuLogout = (e) => {
    return (
      <Menu>
        <Menu.Item onClick={showModal}>
          {!toko.open ? "Buka" : "Tutup"} Toko/Merchant
        </Menu.Item>
        <Menu.Item onClick={showModalEdit}>Edit Toko/Merchant</Menu.Item>
        <Menu.Item
          onClick={(e) => {
            Cookies.remove(TOKEN);
            window.location.reload();
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <div className="layout1">
      <div
        className="layout2"
        style={state.toggle === true && isMobile ? { opacity: 0.5 } : {}}
      >
        <div className="title1">
          {state.akun && state.akun.name}
          <span
            style={
              !isMobile
                ? { display: "none" }
                : { float: "right", marginRight: 20 }
            }
            onClick={(e) => setState({ ...state, toggle: !state.toggle })}
          >
            <MenuOutlined />
          </span>
        </div>
        <div>
          <Tabs
            defaultActiveKey={`${state.tab}`}
            className="tabs"
            onChange={handleTabs}
          >
            {listTabsMenu.data.map((i, index) => (
              <TabPane
                tab={
                  <Link
                    to={`${path}${index !== 0 ? i : ""}`}
                    className={`tab-content ${state.tab === i ? "active" : ""}`}
                    style={
                      state.tab === i
                        ? { borderBottom: "2px solid #007a34" }
                        : {}
                    }
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
            <Route path={`${path}laporan/`}>
              <Laporan handleTabs={handleTabs} tab={state.tab} />
            </Route>
            <Route path={`${path}stok/`}>
              <Stok handleTabs={handleTabs} />
            </Route>
            <Route path={`${path}kategori/`}>
              <Kategori handleTabs={handleTabs} />
            </Route>
            <Route path={`${path}diskon/`}>
              <Diskon handleTabs={handleTabs} />
            </Route>
            <Route path={`${path}pegawai/`}>
              <Pegawai handleTabs={handleTabs} />
            </Route>
            <Route path={`${path}supplier/`}>
              <Supplier handleTabs={handleTabs} />
            </Route>
            <Route path={`${path}pajak/`}>
              <Pajak handleTabs={handleTabs} />
            </Route>
            <Route path={`${path}service/`}>
              <Servis handleTabs={handleTabs} />
            </Route>
          </Switch>
        </div>
      </div>
      <div
        className="layout3"
        style={
          state.toggle !== isMobile
            ? {
                height: "100%",
                position: "fixed",
                right: "-400px",
                transition: "all .3s ease-in-out",
              }
            : isMobile
            ? {
                height: "100%",
                position: "fixed",
                right: "0px",
                transition: "all .3s ease-in-out",
              }
            : {}
        }
      >
        {isMobile && (
          <div className="title2">
            <span
              style={{ float: "right", margin: "60px 60px 0px 0px" }}
              onClick={(e) => setState({ ...state, toggle: !state.toggle })}
            >
              <MenuOutlined />
            </span>
          </div>
        )}
        <div className="layout4">
          <div className="card">
            <div className="avatar-profil">
              <img
                style={{ height: "100px", width: "100px" }}
                src={urls.urlPhoto ? urls.urlPhoto : avatarImg}
              />
              <div
                className="title2"
                style={{
                  padding: "0px 20px 0px 35px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div>{store.get(USER).name}</div>
                
                  {/* <Dropdown overlay={menuLogout} placement="bottomLeft">
                    <b
                      onMouseOver={(e) => setState({ ...state, menu: true })}
                      onMouseLeave={(e) => setState({ ...state, menu: false })}
                    >
                      {!state.menu ? (
                        <span style={{ fontSize: 14 }}>
                          <RightOutlined />
                        </span>
                      ) : (
                        <span style={{ fontSize: 14 }}>
                          <DownOutlined />
                        </span>
                      )}
                    </b>
                  </Dropdown> */}
                {/* </div> */}
              </div>
              <div style={{fontSize:12}}>
                  <div onClick={showModal}>
                    {!toko.open ? "Buka" : "Tutup"} Toko/Merchant
                  </div>
                  <div onClick={showModalEdit}>Edit Toko/Merchant</div>
                  <div
                    onClick={(e) => {
                      Cookies.remove(TOKEN);
                      window.location.reload();
                    }}
                  >
                    Logout
                  </div>
                  </div>
              <div className="note1">{getRole()}</div>
              <div className="btnnya">
                <p>{toko.open ? "Sedang Buka" : "Sedang Tutup"}</p>
                {/* <Link to="/dashboard/service/">
                  <button className="ant-btn background3 text-white">
                    + Tambah Kasir
                  </button>
                </Link> */}
              </div>
            </div>
          </div>
          <Link to={`${path}Pegawai`} className="text-primary">
            <div
              className="card"
              style={
                state.tab === "Pegawai"
                  ? { backgroundColor: "#007A34", color: "white" }
                  : {}
              }
            >
              <div className="submenuact">
                <div className="content1">
                  <img
                    src={state.tab === "Pegawai" ? iconPegawais : iconPegawai}
                  />
                </div>
                <div className="content2">Pegawai</div>
                <div className="content3 title3">
                  <RightOutlined />
                </div>
              </div>
            </div>
          </Link>
          {/* <Link to={`${path}Supplier`} className="text-primary">
            <div
              className="card"
              style={
                state.tab === "Supplier"
                  ? { backgroundColor: "#007A34", color: "white" }
                  : {}
              }
            >
              <div className="submenuact">
                <div className="content1">
                  <img
                    src={
                      state.tab === "Supplier" ? iconSuppliers : iconSupplier
                    }
                  />
                </div>
                <div className="content2">Supplier</div>
                <div className="content3 title3">
                  <RightOutlined />
                </div>
              </div>
            </div>
          </Link>
          <Link to={`${path}Pajak`} className="text-primary">
            <div
              className="card"
              style={
                state.tab === "Pajak"
                  ? { backgroundColor: "#007A34", color: "white" }
                  : {}
              }
            >
              <div className="submenuact">
                <div className="content1">
                  <img src={state.tab === "Pajak" ? iconPajaks : iconPajak} />
                </div>
                <div className="content2">Pajak</div>
                <div className="content3 title3">
                  <RightOutlined />
                </div>
              </div>
            </div>
          </Link>
          <Link to={`${path}Service`} className="text-primary">
            <div
              className="card"
              style={
                state.tab === "Service"
                  ? { backgroundColor: "#007A34", color: "white" }
                  : {}
              }
            >
              <div className="submenuact">
                <div className="content1">
                  <img
                    src={state.tab === "Service" ? iconServices : iconService}
                  />
                </div>
                <div className="content2">Service</div>
                <div className="content3 title3">
                  <RightOutlined />
                </div>
              </div>
            </div>
          </Link> */}
        </div>
      </div>
      <Modal
        title="Status Merchant"
        visible={isModalVisible}
        closable={false}
        footer={false}
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <h2>Apakah anda yakin?</h2>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{ margin: "0px 5px 0px auto", borderRadius: "6px" }}
              htmlType="submit"
              onClick={handleCancel}
            >
              Batalkan
            </Button>
            <Button
              style={{ margin: "0px auto 0px 5px", borderRadius: "6px" }}
              className="ant-btn background3 text-white"
              type="primary"
              htmlType="submit"
              onClick={async (e) => {
                await handleOpenToko();
                handleCancel();
              }}
            >
              Yakin
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Edit Merchant"
        visible={isModalVisibleEdit}
        closable={false}
        footer={false}
      >
        <EditMerchant
          name={state.akun && state.akun.name}
          id={state.akun && state.akun.id}
          mediaId={urls.urlPhoto && urls.urlPhoto}
          handleCancel={handleCancelEdit}
          getAccount={getAccount}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;
