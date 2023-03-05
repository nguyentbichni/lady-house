import React, { useEffect, useState, useMemo } from 'react';
import { Button, Form, Input, InputNumber, Select, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link } from 'react-router-dom';
import slugify from 'slugify';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { getCategoryListAction, createProductAction } from '../../../redux/actions';

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const [createProductForm] = Form.useForm();

  const { categoryList } = useSelector((state) => state.category);
  const { createProductData } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  const handleCreateProduct = (values) => {
    let minPrice = 0;
    let maxPrice = 0;
    if (!values.price || values.optionGroup?.length > 0) {
      values.optionGroups.forEach((group) => {
        group.items.forEach((item, index) => {
          if (item.price > maxPrice) {
            maxPrice = item.price;
          }
          if (index === 0) {
            minPrice = item.price;
          } else if (item.price < minPrice) {
            minPrice = item.price;
          }
        });
      });
    } else {
      minPrice = values.price;
      maxPrice = values.price;
    }

    dispatch(
      createProductAction({
        data: {
          ...values,
          slug: slugify(values.name, { lower: true }),
          minPrice,
          maxPrice,
        },
        callback: () => createProductForm.resetFields(),
      })
    );
  };

  const renderCategoryOptions = () => {
    return categoryList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  };

  const renderPriceField = ({ getFieldValue }) => {
    if (getFieldValue('optionGroups')?.length > 0) return null;
    return (
      <Form.Item name="price" label="Price" rules={[{ required: true, message: 'Missing price' }]}>
        <InputNumber />
      </Form.Item>
    );
  };

  return (
    <div>
      <Link to={ROUTER.ADMIN.PRODUCT_LIST}>Product List</Link>
      <Form form={createProductForm} onFinish={(values) => handleCreateProduct(values)}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Missing name product' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="Category" rules={[{ required: true, message: 'Missing category' }]}>
          <Select>{renderCategoryOptions()}</Select>
        </Form.Item>
        <Form.Item label="Phân loại hàng">
          <Form.List name="optionGroups">
            {(groupFields, groupCallback) => (
              <>
                {groupFields.map(({ key: groupKey, name: groupName, ...restGroupField }) => (
                  <Card key={groupKey} style={{ display: 'flex', marginBottom: 8 }}>
                    <Form.Item
                      {...restGroupField}
                      name={[groupName, 'name']}
                      label="Tên nhóm phân loại"
                      rules={[{ required: true, message: 'Missing group option name' }]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                    <Form.Item label="Các phân loại">
                      <Form.List {...restGroupField} name={[groupName, 'items']}>
                        {(itemFields, itemCallback) => (
                          <>
                            {itemFields.map(({ key: itemKey, name: itemName, ...restItemField }) => (
                              <Card key={itemKey}>
                                <Form.Item
                                  {...restItemField}
                                  name={[itemName, 'name']}
                                  label="Tên phân loại"
                                  rules={[{ required: true, message: 'Missing option name' }]}
                                >
                                  <Input placeholder="Name" />
                                </Form.Item>
                                <Form.Item
                                  {...restItemField}
                                  name={[itemName, 'price']}
                                  label="Giá"
                                  rules={[{ required: true, message: 'Missing price' }]}
                                >
                                  <InputNumber />
                                </Form.Item>
                                {itemFields.length > 1 && (
                                  <Button danger onClick={() => itemCallback.remove(itemName)}>
                                    Xoá
                                  </Button>
                                )}
                              </Card>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => itemCallback.add()} block icon={<PlusOutlined />}>
                                Thêm phân loại
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form.Item>
                    <Button danger onClick={() => groupCallback.remove(groupName)}>
                      Xoá
                    </Button>
                  </Card>
                ))}
                {groupFields.length < 1 && (
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() =>
                        groupCallback.add({
                          name: '',
                          items: [{ name: '', price: '' }],
                        })
                      }
                      block
                      icon={<PlusOutlined />}
                    >
                      Thêm nhóm phân loại
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {(formInstance) => renderPriceField(formInstance)}
        </Form.Item>
        <Button htmlType="submit" type="primary" loading={createProductData.loading}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateProductPage;
