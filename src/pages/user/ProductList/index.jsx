import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getProductListAction } from '../../../redux/actions';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductListAction());
  }, []);

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
      <Row gutter={[16, 16]}>{renderProductList()}</Row>
    </div>
  );
};

export default ProductListPage;
