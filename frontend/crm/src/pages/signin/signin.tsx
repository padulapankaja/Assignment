import { FC, useEffect } from "react";
import {
  Form,
  Input,
  message,
  Button,
  Row,
  Col,
  Typography,
  Layout,
} from "antd";

import { Link, useHistory } from "react-router-dom";

import signinbg from "../../assets/images/img-signin.jpg";
import "../../assets/styles/signin.css";

const { Title } = Typography;
const { Content } = Layout;
interface SignInProps {}

const SignIn: FC<SignInProps> = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log(values);
    if (
      values.email === "admin@gmail.com" &&
      values.password === "Default@123"
    ) {
      history.push("/dashboard");
    } else {
      form.resetFields();
      message.error({
        content: "Invalid user credentials",
      });
    }
  };
  return (
    <>
      <Layout className="layout-default layout-signin container">
        <Content className="signin" style={{ marginTop: "15%" }}>
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="mb-15">Sign In</Title>
              <Form
                onFinish={onFinish}
                layout="vertical"
                className="row-col"
                form={form}
              >
                <Form.Item
                  className="username"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The input is not valid e-mail!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>

                <Form.Item
                  className="username"
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password
                    placeholder="Password"
                    style={{
                      border: "1px solid #d9d9d9",
                      borderRadius: "6px",
                      padding: "0px 11px",
                    }}
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    SIGN IN
                  </Button>
                </Form.Item>
              </Form>
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 24 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="crm" />
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default SignIn;
