import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'antd'
import { getOrderListAction } from '../../../../redux/actions'

const OrderHistories = () => {
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)
  const { orderList } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(getOrderListAction({ userId: userInfo.data.id }))
  }, [userInfo.data.id])

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'SL Sản phẩm',
      dataIndex: 'orderDetails',
      key: 'orderDetails',
      render: (orderDetails) => orderDetails.length,
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Địa chỉ nhận hàng',
      dataIndex: 'address',
      key: 'address',
      render: (address, item) => `${item.address}, ${item.wardName}, ${item.districtName}, ${item.cityName}`,
    },
  ]

  const tableData = orderList.data.map((item) => {
    return {
      key: item.id,
      ...item,
    }
  })

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      pagination={false}
      expandable={{
        expandedRowRender: (item) => {
          return (
            <ul>
              {item.orderDetails.map((orderDetail) => (
                <li key={orderDetail.id}>{orderDetail.name}</li>
              ))}
            </ul>
          )
        },
      }}
    />
  )
}

export default OrderHistories
