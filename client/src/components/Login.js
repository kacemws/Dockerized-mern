import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { login } from "../api/connect.instance";
import Cookies from "js-cookie";

function Login() {
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      console.log("Received values of form: ", values);
      const answ = await login(values);
      console.log(answ);
      var in15minutes = new Date(new Date().getTime() + 900000);
      Cookies.set("accessToken", answ.data.accessToken, {
        expires: in15minutes,
      });
      localStorage.setItem("refreshToken", answ.data.refreshToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth-container">
      <Form name="normal_login" className="auth-form" onFinish={onFinish}>
        <h2 className="container_title">Login</h2>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Login
          </Button>
          <span
            style={{
              margin: "0 1rem",
            }}
          >
            {" "}
            Or
          </span>{" "}
          <Button
            type="link"
            onClick={(_) => {
              history.push("/signup");
              console.log("lien signup clicked");
            }}
          >
            {" "}
            SignUp now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
