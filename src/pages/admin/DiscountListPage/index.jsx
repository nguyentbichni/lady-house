import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Button, Modal, Space, Table, Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom';

import { ROUTER } from '../../../constants/routers';
import { getDiscountListAction, deleteDiscountAction } from '../../../redux/actions';

const DiscountListPage = () => {
  const [deleteModalData, setDeleteModalData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDiscountListAction());
  }, []);
  const { discountList } = useSelector((state) => state.discount);

  const tableData = discountList.data.map((item) => {
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
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Required Price',
      dataIndex: 'requiredPrice',
      key: 'requiredPrice',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, item) => (
        <Space>
          <Link to={generatePath(ROUTER.ADMIN.UPDATE_DISCOUNT, { id: item.id })}>
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
      <Link to={ROUTER.ADMIN.CREATE_DISCOUNT}>
        <Button type="primary">Create</Button>
      </Link>
      <Table columns={columns} dataSource={tableData} pagination={false}></Table>
      <Modal
        title="Delete"
        open={!!deleteModalData}
        onCancel={() => setDeleteModalData(null)}
        onOk={() =>
          dispatch(
            deleteDiscountAction({
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
export default DiscountListPage;
