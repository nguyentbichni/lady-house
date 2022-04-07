import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button } from 'antd';

import { registerAction } from '../../redux/actions';
import { ROUTER } from '../../constants/routers';

const RegisterPage = () => {
  const [registerForm] = Form.useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { registerData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registerData.errors?.length) {
      registerForm.setFields([
        {
          name: 'email',
          errors: registerData.errors,
        },
      ]);
    }
  }, [registerData.errors]);

  const handleRegister = (values) => {
    dispatch(
      registerAction({
        data: {
          email: values.email,
          name: values.name,
          password: values.password,
          role: 'user',
        },
        callback: {
          goToLogin: () => navigate(ROUTER.LOGIN),
        },
      })
    );
  };

  return (
    <>
      <Form
        form={registerForm}
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={(values) => handleRegister(values)}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

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
          label="confirmPassword"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        ></Form.Item>
      </Form>
      <Button type="primary" htmlType="button" loading={registerData.loading} onClick={() => registerForm.submit()}>
        Submit
      </Button>
    </>
  );
};

export default RegisterPage;
