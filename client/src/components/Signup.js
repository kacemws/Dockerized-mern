import { Form, Input, Button, Checkbox } from "antd";
import { useHistory } from "react-router-dom";
import { signup } from "../api/connect.instance";
import Cookies from "js-cookie";

function Signin() {
  const history = useHistory();
  const onFinish = async (values) => {
    try {
      delete values.confirm;
      const answ = await signup(values);
      console.log(answ.data);
      var in15minutes = new Date(new Date().getTime() + 900000);
      Cookies.set("accessToken", answ.data.accessToken, {
        expires: in15minutes,
      });
      localStorage.setItem("refreshToken", answ.data.refreshToken);

      history.push("/");
    } catch (err) {
      console.log({ err });
    }
  };
  return (
    <div className="auth-container">
      <Form name="normal_login" className="auth-form" onFinish={onFinish}>
        <h2 className="container_title">SignUp</h2>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="firstName"
          label="First name"
          rules={[
            {
              required: true,
              message: "Please input your First name!",
            },
          ]}
        >
          <Input placeholder="first name" />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last name"
          rules={[
            {
              required: true,
              message: "Please input your Last name!",
            },
          ]}
        >
          <Input placeholder="last name" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Sign up
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
              history.push("/");
            }}
          >
            Login{" "}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Signin;
