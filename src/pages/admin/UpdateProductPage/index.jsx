import React, { useEffect, useState, useMemo } from 'react';
import { Button, Form, Input, InputNumber, Select, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link, useParams } from 'react-router-dom';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { getCategoryListAction, updateProductAction, getProductDetailAction } from '../../../redux/actions';

const UpdateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateProductForm] = Form.useForm();

  const { categoryList } = useSelector((state) => state.category);
  const { productDetail, updateProductData } = useSelector((state) => state.product);

  const initialOptionGroups = productDetail.data.optionGroups?.map((group) => ({
    id: group.id,
    name: group.name,
    items: productDetail.data.optionItems
      ?.filter((item) => item.optionGroupId === group.id)
      .map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
  }));
  const initialValues = {
    name: productDetail.data.name,
    categoryId: productDetail.data.categoryId,
    optionGroups: initialOptionGroups,
    ...(!productDetail.data.optionGroups?.length && {
      price: productDetail.data.minPrice,
    }),
  };

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductDetailAction({ id }));
  }, [id]);

  useEffect(() => {
    if (productDetail.data.id) {
      updateProductForm.resetFields();
    }
  }, [productDetail.data]);

  const handleUpdateProduct = (values) => {
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
      updateProductAction({
        id: productDetail.data.id,
        data: {
          ...values,
          minPrice,
          maxPrice,
          initialOptionGroups,
        },
        callback: () => navigate(ROUTER.ADMIN.PRODUCT_LIST),
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

  const renderPriceField = (formInstance) => {
    const {getFieldValue } = formInstance
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
      <Form initialValues={initialValues} form={updateProductForm} onFinish={(values) => handleUpdateProduct(values)}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="categoryId" label="Category">
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
        <Button htmlType="submit" type="primary" loading={updateProductData.loading}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateProductPage;
