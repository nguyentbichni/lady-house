import { Form, Input, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { changePasswordAction } from '../../../../redux/actions'
import { useEffect } from 'react'
const ChangePassword = () => {
  const [changePasswordForm] = Form.useForm()
  const { userInfo, changePasswordData } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    if (changePasswordData.errors) {
      changePasswordForm.setFields([
        {
          name: 'password',
          errors: [changePasswordData.errors],
        },
      ])
    }
  }, [changePasswordData])

  return (
    <>
      <Form
        form={changePasswordForm}
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={(values) =>
          dispatch(
            changePasswordAction({
              data: {
                password: values.password,
                newPassword: values.newPassword,
                email: userInfo.data.email,
                id: userInfo.data.id,
              },
              callback: () => changePasswordForm.resetFields(),
            })
          )
        }
      >
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
          label="New Password"
          name="newPassword"
          dependencies={['password']}
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
          label="Confirm New Password"
          name="confirmNewPassword"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve()
                }

                return Promise.reject(new Error('The two passwords that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default ChangePassword
