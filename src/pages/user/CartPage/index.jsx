import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Button, Modal, Space, Table, Pagination, InputNumber } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { getProductListAction } from '../../../redux/actions';

const CartPage = () => {
  const dispatch = useDispatch();

  const { cartList } = useSelector((state) => state.cart);
  console.log('🚀 ~ file: index.jsx:14 ~ CartPage ~ cartList:', cartList);

  const tableData = cartList.map((item) => {
    return {
      ...item,
      key: item.id,
    };
  });
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
      render: (quantity) => <InputNumber min={1} value={quantity} onChange={(value) => console.log(value)} />,
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
        <Button type="primary" danger ghost onClick={() => null}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      CartPage
      <Table columns={columns} dataSource={tableData} pagination={false} />
    </div>
  );
};

export default CartPage;
