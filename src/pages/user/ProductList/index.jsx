import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Slider, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getProductListAction, getCategoryListAction } from '../../../redux/actions';

const ProductListPage = () => {
  const [filterParams, setFilterParams] = useState({
    categoryIds: [],
    keyword: '',
    price: [0, 50000000],
    order: undefined,
  });
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  console.log('🚀 ~ file: index.jsx ~ line 11 ~ ProductListPage ~ categoryList', categoryList);

  useEffect(() => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: 4,
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  function handleFilterCategory(values) {
    setFilterParams({ ...filterParams, categoryIds: values });
    dispatch(
      getProductListAction({
        ...filterParams,
        categoryIds: values,
        page: 1,
        limit: 4,
      })
    );
  }

  function handleFilterKeyword(e) {
    setFilterParams({ ...filterParams, keyword: e.target.value });
    dispatch(
      getProductListAction({
        ...filterParams,
        keyword: e.target.value,
        page: 1,
        limit: 4,
      })
    );
  }

  function handleFilterPrice(value) {
    setFilterParams({ ...filterParams, price: value });
    dispatch(
      getProductListAction({
        ...filterParams,
        price: value,
        page: 1,
        limit: 4,
      })
    );
  }

  function handleFilterOrder(value) {
    setFilterParams({ ...filterParams, order: value });
    dispatch(
      getProductListAction({
        ...filterParams,
        order: value,
        page: 1,
        limit: 4,
      })
    );
  }

  function handleShowMore() {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: 4,
        more: true,
      })
    );
  }

  const categoryOptions = categoryList.data.map((item) => {
    return { label: item.name, value: item.id };
  });

  const renderProductList = () => {
    if (productList.loading) return <div>Loading...</div>;
    return productList.data.map((productItem) => {
      return (
        <Col key={productItem.id} span={6}>
          <Card size="small" title={productItem.name}>
            <p>{productItem.price}</p>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div>
      ProductListPage
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Danh muc" style={{ marginBottom: 16 }}>
            <Checkbox.Group options={categoryOptions} onChange={(values) => handleFilterCategory(values)} />
          </Card>
          <Card title="Khoang gia">
            <Slider
              range
              onChange={(value) => handleFilterPrice(value)}
              min={0}
              max={50000000}
              step={1000000}
              value={filterParams.price}
              tipFormatter={(value) => value.toLocaleString()}
            />
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input.Search
                placeholder="input search text"
                onChange={(e) => handleFilterKeyword(e)}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={8}>
              <Select
                placeholder="Select a option and change input text above"
                onChange={(value) => handleFilterOrder(value)}
                allowClear
                style={{ width: '100%' }}
              >
                <Select.Option value="asc">Tang dan</Select.Option>
                <Select.Option value="desc">Giam dan</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>{renderProductList()}</Row>
          {productList.meta.total !== productList.data.length && (
            <Row justify="center">
              <Button onClick={() => handleShowMore()}>Hien thi them</Button>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductListPage;
