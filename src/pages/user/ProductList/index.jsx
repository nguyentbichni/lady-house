import React, { useEffect } from 'react';
import { Row, Col, Card, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getProductListAction, getCategoryListAction } from '../../../redux/actions';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  console.log('🚀 ~ file: index.jsx ~ line 11 ~ ProductListPage ~ categoryList', categoryList);

  useEffect(() => {
    dispatch(getProductListAction({}));
    dispatch(getCategoryListAction());
  }, []);

  function handleFilterCategory(values) {
    dispatch(getProductListAction({ categoryIds: values }));
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
        <Col span={8}>
          <Card title="Danh muc">
            <Checkbox.Group options={categoryOptions} onChange={(values) => handleFilterCategory(values)} />
          </Card>
        </Col>
        <Col span={16}>
          <Row gutter={[16, 16]}>{renderProductList()}</Row>
        </Col>
      </Row>
    </div>
  );
};

export default ProductListPage;
