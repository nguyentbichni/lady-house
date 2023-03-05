import React, { useEffect, useState, useMemo } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { updateCategoryAction, getCategoryDetailAction } from '../../../redux/actions';

const UpdateCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [updateCategoryForm] = Form.useForm();

  const { updateCategoryData, categoryDetail } = useSelector((state) => state.category);

  const initialValues = {
    name: categoryDetail.data.name,
  };

  useEffect(() => {
    dispatch(getCategoryDetailAction({ id }));
  }, [id]);

  useEffect(() => {
    if (categoryDetail.data.id) {
      updateCategoryForm.resetFields();
    }
  }, [categoryDetail.data]);

  const handleUpdateCategory = (values) => {
    dispatch(
      updateCategoryAction({
        data: values,
        id: categoryDetail.data.id,
        callback: () => navigate(ROUTER.ADMIN.CATEGORY_LIST),
      })
    );
  };

  return (
    <>
      <p>UpdateCategoryPage</p>
      <Link to={ROUTER.ADMIN.CATEGORY_LIST}>Category List</Link>
      <Form initialValues={initialValues} form={updateCategoryForm} onFinish={(values) => handleUpdateCategory(values)}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Button htmlType="submit" type="primary" loading={updateCategoryData.loading}>
          Update
        </Button>
      </Form>
    </>
  );
};
export default UpdateCategoryPage;
