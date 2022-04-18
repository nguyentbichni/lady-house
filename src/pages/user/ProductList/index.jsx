import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Slider, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getProductListAction, getCategoryListAction } from '../../../redux/actions';

const ProductListPage = () => {
  const [filterParams, setFilterParams] = useState({ categoryIds: [], keyword: '' });
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  console.log('🚀 ~ file: index.jsx ~ line 11 ~ ProductListPage ~ categoryList', categoryList);

  useEffect(() => {
    dispatch(
      getProductListAction({
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
        categoryIds: values,
        page: 1,
        limit: 4,
      })
    );
  }

  function handleFilterKeyword(values) {
    setFilterParams({ ...filterParams, keyword: values });
    dispatch(
      getProductListAction({
        keyword: values,
        page: 1,
        limit: 4,
      })
    );
  }

  function handleShowMore() {
    dispatch(
      getProductListAction({
        categoryIds: filterParams.categoryIds,
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
            <Slider range defaultValue={[20, 50]} />
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input.Search
                placeholder="input search text"
                onChange={(value) => handleFilterKeyword(value)}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={8}>
              <Select
                placeholder="Select a option and change input text above"
                // onChange={this.onGenderChange}
                allowClear
                style={{ width: '100%' }}
              ></Select>
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
