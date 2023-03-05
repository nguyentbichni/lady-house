import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Checkbox, Input, Select, Slider, Button, Tag, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, generatePath, Link } from 'react-router-dom';

import { PAGINATION_LIMIT } from '../../../constants/pagination';
import { ROUTER } from '../../../constants/routers';
import { getProductListAction, getCategoryListAction } from '../../../redux/actions';

const ProductListPage = () => {
  const [filterParams, setFilterParams] = useState({ categoryId: [], searchKey: '', sort: undefined });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListAction({ limit: PAGINATION_LIMIT.PRODUCT_LIST, page: 1 }));
  }, []);

  const { categoryList } = useSelector((state) => state.category);
  const { productList } = useSelector((state) => state.product);

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PAGINATION_LIMIT.PRODUCT_LIST,
        isShowMore: true,
      })
    );
  };

  const handleFilterProducts = (key, value) => {
    setFilterParams({ ...filterParams, [key]: value });
    dispatch(
      getProductListAction({
        ...filterParams,
        [key]: value,
        page: 1,
        limit: PAGINATION_LIMIT.PRODUCT_LIST,
      })
    );
  };

  const handleClearCategoryFilter = (id) => {
    const newCategoryId = filterParams.categoryId.filter((item) => item !== id);
    handleFilterProducts('categoryId', newCategoryId);
  };

  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col span={24} key={item.id}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      );
    });
  }, [categoryList.data]);

  const renderAverageRating = (data) => {
    let total = 0;
    data.forEach((item) => {
      total = total + item.rate;
    });
    return data.length ? (total / data.length).toFixed(1) : 0;
  };

  const renderCategoryTags = () => {
    return filterParams.categoryId.map((item) => {
      const categoryData = categoryList.data.find((cateItem) => {
        return cateItem.id === item;
      });
      return (
        <Tag closable key={item} onClose={() => handleClearCategoryFilter(item)}>
          {categoryData.name}
        </Tag>
      );
    });
  };

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col key={item.id} className="gutter-row" span={6}>
          <Link to={generatePath(ROUTER.USER.PRODUCT_DETAIL, { id: `${item.slug}.${item.id}` })}>
            <p>Product name: {item.name}</p>
            <p>Price: {item.minPrice === item.maxPrice ? item.minPrice : `${item.minPrice} - ${item.maxPrice}`}</p>
            <p>Lượt thích: {item.favorites?.length}</p>
            <p>Đánh giá: {renderAverageRating(item.reviews)}</p>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <div>
      ProductListPage
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Danh muc" style={{ marginBottom: 16 }}>
            <Checkbox.Group
              value={filterParams.categoryId}
              onChange={(values) => handleFilterProducts('categoryId', values)}
            >
              <Row>{renderCategoryList}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input.Search
                placeholder="input search text"
                style={{ width: '100%' }}
                value={filterParams.searchKey}
                onChange={(e) => handleFilterProducts('searchKey', e.target.value)}
              />
            </Col>
            <Col span={8}>
              <Select
                placeholder="Select a option and change input text above"
                allowClear
                style={{ width: '100%' }}
                onChange={(value) => handleFilterProducts('sort', value)}
              >
                <Select.Option value="name.asc">Ten A-Z</Select.Option>
                <Select.Option value="name.desc">Ten Z-A</Select.Option>
                <Select.Option value="minPrice.asc">Gia tang dan</Select.Option>
                <Select.Option value="minPrice.desc">Gia giam dan</Select.Option>
              </Select>
            </Col>
          </Row>
          {renderCategoryTags()}
          {filterParams.searchKey.trim() && (
            <Tag closable onClose={() => handleFilterProducts('searchKey', '')}>
              Search key: {filterParams.searchKey}
            </Tag>
          )}
          <Row gutter={[16, 16]}>{renderProductList}</Row>
          {productList.data.length !== productList.meta.total && (
            <Button type="primary" onClick={() => handleShowMore()}>
              Show More
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductListPage;
