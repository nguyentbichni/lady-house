import React, { useEffect, useState, useMemo } from 'react'
import { Row, Col, Card, Radio, Input, Select, Button, Modal, Space, Table, Pagination, InputNumber, Form } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom'

import { PAGINATION_LIMIT } from '../../../constants/pagination'
import { ROUTER } from '../../../constants/routers'
import {
  updateCartAction,
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  orderProductAction,
} from '../../../redux/actions'

const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cartList } = useSelector((state) => state.cart)
  const { userInfo } = useSelector((state) => state.auth)
  const { cityList, districtList, wardList } = useSelector((state) => state.location)
  const [checkoutForm] = Form.useForm()

  const tableData = cartList.map((item) => {
    return {
      ...item,
      key: `${item.productId}${item.option ? `-${item.option.id}` : ''}`,
    }
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Option',
      dataIndex: 'option',
      key: 'option',
      render: (option) => option?.name,
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price) => price.toLocaleString(),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_, item) => (item.price * item.quantity).toLocaleString(),
    },
  ]

  const initialValues = {
    name: userInfo.data.name,
    phone: userInfo.data.phone,
    email: userInfo.data.email,
    address: userInfo.data.address,
  }

  useEffect(() => {
    dispatch(getCityListAction())
  }, [])

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields()
    }
  }, [userInfo.data])

  const renderLocationOptions = (options) => {
    return options.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      )
    })
  }

  const handleSubmitCheckout = (values) => {
    const cityData = cityList.data.find((item) => item.code === values.cityCode)
    const districtData = districtList.data.find((item) => item.code === values.districtCode)
    const wardData = wardList.data.find((item) => item.code === values.wardCode)
    dispatch(
      orderProductAction({
        data: {
          ...values,
          userId: userInfo.data.id,
          totalPrice: cartList.reduce((total, item) => total + item.totalPrice, 0),
          status: 'pending',
          products: cartList,
          cityName: cityData?.name,
          districtName: districtData?.name,
          wardName: wardData?.name,
        },
        callback: () => navigate(ROUTER.USER.HOME),
      })
    )
  }

  return (
    <div>
      <p>Checkout</p>
      <Row gutter={16} className="checkout_row">
        <Col span={16} className="checkout_left">
          <Form
            layout="vertical"
            form={checkoutForm}
            initialValues={initialValues}
            onFinish={(values) => handleSubmitCheckout(values)}
          >
            <Card title="Thông tin giao hàng" className="checkout_info">
              <Form.Item label="Họ và tên" name="name">
                <Input />
              </Form.Item>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Email" name="email">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Tỉnh/Thành phố" name="cityCode">
                    <Select
                      allowClear
                      onChange={(value) => {
                        dispatch(getDistrictListAction({ parentCode: value }))
                        checkoutForm.setFieldValue('districtCode', undefined)
                        checkoutForm.setFieldValue('wardCode', undefined)
                      }}
                    >
                      {renderLocationOptions(cityList.data)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Quận/Huyện" name="districtCode">
                    <Select
                      allowClear
                      onChange={(value) => {
                        dispatch(getWardListAction({ parentCode: value }))
                        checkoutForm.setFieldValue('wardCode', undefined)
                      }}
                      disabled={!checkoutForm.getFieldValue('cityCode')}
                    >
                      {renderLocationOptions(districtList.data)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Phường/Xã" name="wardCode">
                    <Select allowClear disabled={!checkoutForm.getFieldValue('districtCode')}>
                      {renderLocationOptions(wardList.data)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Địa chỉ" name="address">
                <Input />
              </Form.Item>
            </Card>
            <Card title="Thông tin thanh toán" className="checkout_bank">
              <Form.Item label="Phương thức thanh toán" name="paymentMethod">
                <Radio.Group>
                  <Space direction="vertical">
                    <Radio value="atm">ATM</Radio>
                    <Radio value="cod">COD</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Card>
          </Form>
        </Col>
        <Col span={8} className="checkout_right">
          <Table columns={columns} dataSource={tableData} size="small" pagination={false} />
          <Button type="primary" onClick={() => checkoutForm.submit()} style={{ marginTop: 10 }}>
            Submit
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Checkout
