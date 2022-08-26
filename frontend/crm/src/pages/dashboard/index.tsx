import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import "../../assets/styles/dashboard.css";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { Layout, Menu, Button as ButtonAnt, PageHeader } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

import Customers from "./customers/index";
import SingleCustomer from "./customers/singleCustomer";

const Dashboard = () => {
  const { Header, Sider, Content } = Layout;

  useEffect(() => {});
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();
  return (
    <div style={{ margin: "12px" }}>
      <Row style={{ paddingRight: "0px", paddingLeft: "0px" }}>
        <Col lg={12}>
          <Header className="p-0 h-auto">
            <div className="site-page-header-ghost-wrapper">
              <PageHeader
                style={{ background: "#dfe4ea" }}
                className="page-header-dark"
                ghost={false}
                title="CRM"
                extra={[
                  <ButtonAnt
                    key="1"
                    className="cus-btn1"
                    type="primary"
                    onClick={() => {
                      history.push("/");
                    }}
                  >
                    Signout
                  </ButtonAnt>,
                ]}
              />
            </div>
          </Header>
          <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="logo" />
              <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
                  <Link to="/dashboard" style={{ textDecoration: "none" }}>
                    <span>Customers</span>
                  </Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{ paddingLeft: "10px" }}
              >
                {React.createElement(
                  collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                  {
                    className: "trigger",
                    onClick: () => setCollapsed(!collapsed),
                  }
                )}
              </Header>
              <Content
                className="site-layout-background"
                style={{
                  padding: 12,
                  minHeight: 280,
                }}
              >
                <Switch>
                  <Route path="/dashboard" exact={true}>
                    {" "}
                    <Customers />{" "}
                  </Route>
                  <Route path="/dashboard/customer/:id" exact={true}>
                    {" "}
                    <SingleCustomer />{" "}
                  </Route>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
