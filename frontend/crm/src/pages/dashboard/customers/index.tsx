import { FC } from "react";
import { Row, Col, Layout, Typography } from "antd";
import AllCustomers from "./allcustomers";

const { Content } = Layout;
const { Title } = Typography;
interface Customer {}

const CustomerComponent: FC<Customer> = () => {
  return (
    <>
      <Layout className="layout-default layout-signin">
        <Content className="signin" style={{ paddingTop: "0px" }}>
          <Title style={{ fontSize: "18px" }}>Customers</Title>
          <Row>
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 24, offset: 0 }}
              md={{ span: 24, offset: 0 }}
            >
              <AllCustomers />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default CustomerComponent;
