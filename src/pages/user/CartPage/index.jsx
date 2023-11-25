import React, { useEffect, useState, useMemo } from 'react'
import { Row, Col, Card, Checkbox, Input, Select, Button, Modal, Space, Table, Pagination, InputNumber } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom'

import { PAGINATION_LIMIT } from '../../../constants/pagination'
import { ROUTER } from '../../../constants/routers'
import { updateCartAction, deleteCartAction } from '../../../redux/actions'

const CartPage = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const { cartList } = useSelector((state) => state.cart)

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
      render: (_, item) => (
        <Link to={generatePath(ROUTER.USER.PRODUCT_DETAIL, { id: `${item.slug}.${item.productId}` })}>{item.name}</Link>
      ),
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
      render: (_, item) => (
        <InputNumber
          min={1}
          value={item.quantity}
          onChange={(value) => dispatch(updateCartAction({ productId: item.productId, quantity: value }))}
        />
      ),
    },
    {
      title: 'Thành tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (_, item) => (item.price * item.quantity).toLocaleString(),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Button
          type="primary"
          danger
          ghost
          onClick={() => dispatch(deleteCartAction({ productId: item.productId, option: item.option }))}
        >
          Delete
        </Button>
      ),
    },
  ]

  const handleTotal = () => {
    let total = 0
    cartList.forEach((item) => {
      total = total + item.price * item.quantity
    })
    // const a = cartList.map((item) => item.price * item.quantity).reduce((total, num) => total + num);
    return <p>Tổng tiền: {total}</p>
  }

  return (
    <div>
      CartPage
      <Table columns={columns} dataSource={tableData} pagination={false} />
      {handleTotal()}
      <Button onClick={() => navigate(ROUTER.USER.CHECKOUT)} disabled={!cartList.length}>
        Checkout
      </Button>
    </div>
  )
}

export default CartPage
