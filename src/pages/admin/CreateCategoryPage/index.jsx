import React, { useEffect, useState, useMemo } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link } from 'react-router-dom';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { createCategoryAction } from '../../../redux/actions';

const CreateCategoryPage = () => {
  const dispatch = useDispatch();
  const [createCategoryForm] = Form.useForm();

  const { createCategoryData } = useSelector((state) => state.category);

  const handleCreateCategory = (values) => {
    dispatch(
      createCategoryAction({
        data: values,
        callback: () => createCategoryForm.resetFields(),
      })
    );
  };

  return (
    <>
      <p>CreateCategoryPage</p>
      <Link to={ROUTER.ADMIN.CATEGORY_LIST}>Category List</Link>
      <Form form={createCategoryForm} onFinish={(values) => handleCreateCategory(values)}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Button htmlType="submit" type="primary" loading={createCategoryData.loading}>
          Create
        </Button>
      </Form>
    </>
  );
};
export default CreateCategoryPage;
