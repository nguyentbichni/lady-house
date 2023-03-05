import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Button, Modal, Space, Table, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom';

import { ROUTER } from '../../../constants/routers';
import { getCategoryListAction, deleteCategoryAction } from '../../../redux/actions';

const AdminCategoryList = () => {
  const [deleteModalData, setDeleteModalData] = useState(null);
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  const tableData = categoryList.data.map((item) => {
    return {
      key: item.id,
      ...item,
    };
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number of Products',
      dataIndex: 'numberOfProducts',
      key: 'numberOfProducts',
      render: (_, item) => `${item.products?.length} SP`,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Space>
          <Link to={generatePath(ROUTER.ADMIN.UPDATE_CATEGORY, { id: item.id })}>
            <Button type="primary" ghost>
              Update
            </Button>
          </Link>
          <Button
            type="primary"
            danger
            ghost
            onClick={() =>
              setDeleteModalData({
                id: item.id,
                name: item.name,
              })
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <p>AdminCategoryList</p>
      <Link to={ROUTER.ADMIN.CREATE_CATEGORY}>
        <Button type="primary">Create</Button>
      </Link>
      <Table columns={columns} dataSource={tableData} pagination={false}></Table>
      <Modal
        title="Delete"
        open={!!deleteModalData}
        onCancel={() => setDeleteModalData(null)}
        onOk={() =>
          dispatch(
            deleteCategoryAction({
              id: deleteModalData.id,
              callback: () => setDeleteModalData(null),
            })
          )
        }
        okText="Yes"
        cancelText="No"
      >
        Bạn có chắc muốn xoá {deleteModalData?.name}
      </Modal>
    </>
  );
};
export default AdminCategoryList;
