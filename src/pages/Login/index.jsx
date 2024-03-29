import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';

import { loginAction } from '../../redux/actions/';
import { ROUTER } from '../../constants/routers';

const LoginPage = () => {
  const [loginForm] = Form.useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { loginData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (loginData.errors) {
      loginForm.setFields([
        {
          name: 'email',
          errors: [' '],
        },
        {
          name: 'password',
          errors: [loginData.errors],
        },
      ]);
    }
  }, [loginData.errors]);

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: values,
        callback: (role) => (role === 'admin' ? navigate(ROUTER.ADMIN.PRODUCT_LIST) : navigate(ROUTER.USER.HOME)),
      })
    );
  };

  return (
    <Form
      form={loginForm}
      name="basic"
      layout="vertical"
      initialValues={{
        remember: true,
      }}
      onFinish={(values) => handleLogin(values)}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loginData.loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
