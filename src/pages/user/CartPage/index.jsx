import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Button, Modal, Space, Table, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { getProductListAction, deleteProductAction } from '../../../redux/actions';

const CartPage = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProductListAction({ limit: PAGINATION_LIMIT.ADMIN_TABLE, page: 1 }));
  // }, []);

  // const { productList } = useSelector((state) => state.product);

  // const handleChangePage = (page) => {
  //   dispatch(getProductListAction({ page, limit: PAGINATION_LIMIT.ADMIN_TABLE }));
  // };

  // const tableData = productList.data.map((item) => {
  //   return {
  //     ...item,
  //     key: item.id,
  //   };
  // });

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
      render: (_, item) => (item.minPrice === item.maxPrice ? item.minPrice : `${item.minPrice} - ${item.maxPrice}`),
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
      <Table columns={columns} dataSource={[]} pagination={false} />
    </div>
  );
};

export default CartPage;
