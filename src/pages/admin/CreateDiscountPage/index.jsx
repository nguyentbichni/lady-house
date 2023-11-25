import React, { useEffect, useState, useMemo } from 'react';
import { Button, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link } from 'react-router-dom';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { createDiscountAction } from '../../../redux/actions';

const CreateDiscountPage = () => {
  const dispatch = useDispatch();
  const [createDiscountForm] = Form.useForm();

  const { createDiscountData } = useSelector((state) => state.discount);

  const handleCreateDiscount = (values) => {
    dispatch(
      createDiscountAction({
        data: values,
        callback: () => createDiscountForm.resetFields(),
      })
    );
  };

  return (
    <>
      <p>CreateDiscountPage</p>
      <Link to={ROUTER.ADMIN.DISCOUNT_LIST}>Discount List</Link>
      <Form form={createDiscountForm} onFinish={(values) => handleCreateDiscount(values)}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Select>
            <Select.Option value="percent">percent</Select.Option>
            <Select.Option value="cash">cash</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="code" label="Code">
          <Input />
        </Form.Item>
        <Form.Item name="requiredPrice" label="Required Price">
          <InputNumber />
        </Form.Item>
        <Form.Item name="value" label="Value">
          <InputNumber />
        </Form.Item>
        <Form.Item name="maxDiscount" label="Max Discount">
          <InputNumber />
        </Form.Item>
        <Form.Item name="startDate" label="startDate">
          <DatePicker />
        </Form.Item>
        <Form.Item name="endDate" label="endDate">
          <DatePicker />
        </Form.Item>
        <Button htmlType="submit" type="primary" loading={createDiscountData.loading}>
          Create
        </Button>
      </Form>
    </>
  );
};
export default CreateDiscountPage;
