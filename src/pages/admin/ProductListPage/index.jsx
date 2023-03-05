import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Button, Modal, Space, Table, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { getProductListAction, deleteProductAction } from '../../../redux/actions';

const AdminProductListPage = () => {
  const [deleteModalData, setDeleteModalData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListAction({ limit: PAGINATION_LIMIT.ADMIN_TABLE, page: 1 }));
  }, []);

  const { productList } = useSelector((state) => state.product);

  const handleChangePage = (page) => {
    dispatch(getProductListAction({ page, limit: PAGINATION_LIMIT.ADMIN_TABLE }));
  };

  const tableData = productList.data.map((item) => {
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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => category.name,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (_, item) => (item.minPrice === item.maxPrice ? item.minPrice : `${item.minPrice} - ${item.maxPrice}`),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Space>
          <Link to={generatePath(ROUTER.ADMIN.UPDATE_PRODUCT, { id: item.id })}>
            <Button type="primary" ghost>
              Update
            </Button>
          </Link>
          <Button type="primary" danger ghost onClick={() => setDeleteModalData({ id: item.id, name: item.name })}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      AdminProductListPage
      <Link to={ROUTER.ADMIN.CREATE_PRODUCT}>
        <Button type="primary">Create</Button>
      </Link>
      <Table columns={columns} dataSource={tableData} pagination={false} />
      <Pagination
        current={productList.meta.page}
        total={productList.meta.total}
        pageSize={PAGINATION_LIMIT.ADMIN_TABLE}
        onChange={(page) => handleChangePage(page)}
      />
      <Modal
        title="Delete"
        open={!!deleteModalData}
        onOk={() =>
          dispatch(
            deleteProductAction({
              id: deleteModalData.id,
              page: productList.meta.page,
              callback: () => setDeleteModalData(null),
            })
          )
        }
        onCancel={() => setDeleteModalData(null)}
        okText="Yes"
        cancelText="No"
      >
        Bạn có chắc muốn xoá {deleteModalData?.name} này?
      </Modal>
    </div>
  );
};

export default AdminProductListPage;
