import React from "react";
import { Col, Row } from "antd";
import { Logo } from "../../../assets/img/icon/icon";
import FormLogin from "./components/FormLogin";

function Login() {
  return (
    <div>
      <Row>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
            <img src={Logo.bg} className="bg-register" alt={Logo.bg}/>
            <div>
            <img src={Logo.img} className="logo-register" alt={Logo.img} />
            <img src={Logo.title} className="title-register" alt={Logo.title} />
            </div>
        </Col>
        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <div className="form-regis">
          <FormLogin />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
