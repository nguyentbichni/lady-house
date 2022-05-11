import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getProductDetailAction } from '../../../redux/actions';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetailAction({ id }));
  }, []);

  const renderProductDetail = () => {
    if (productDetail.loading) return <div>Loading...</div>;
    return (
      <div key={productDetail.data.id}>
        <h1>{productDetail.data.name}</h1>
        <img src={productDetail.data.image} alt={productDetail.data.name} />
        <p>{productDetail.data.description}</p>
        <p>{productDetail.data.price}</p>
      </div>
    );
  };

  return <div>{renderProductDetail()}</div>;
};

export default ProductDetailPage;
