import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Button, Modal, Space, Table, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom';

import { ROUTER } from '../../../constants/routers';
import { getUserListAction, deleteUserAction } from '../../../redux/actions';

const UserListPage = () => {
  const [deleteModalData, setDeleteModalData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);
  const { userList } = useSelector((state) => state.user);

  const tableData = userList.data.map((item) => {
    return {
      key: item.id,
      ...item,
    };
  });

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Space>
          <Link to={generatePath(ROUTER.ADMIN.UPDATE_USER, { id: item.id })}>
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
            deleteUserAction({
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
export default UserListPage;
