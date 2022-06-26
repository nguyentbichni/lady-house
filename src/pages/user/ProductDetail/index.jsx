import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';

import {
  getProductDetailAction,
  createCommentAction,
  getCommentListAction,
  deleteCommentAction,
} from '../../../redux/actions';

const ProductDetailPage = () => {
  const [commentForm, setCommentForm] = useState({ comment: '', rate: '' });

  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);
  const { commentList } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getProductDetailAction({ id }));
    dispatch(getCommentListAction({ productId: parseInt(id) }));
  }, []);

  const handleChangeComment = (e) => {
    const { name, value } = e.target;
    setCommentForm({ ...commentForm, [name]: value });
  };

  const handleSubmitComment = () => {
    console.log(commentForm);
    dispatch(createCommentAction({ productId: parseInt(id), userId: userInfo.data.id, ...commentForm }));
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentAction({ id: commentId, productId: parseInt(id) }));
  };

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

  const renderCommentList = () => {
    if (commentList.loading) return <div>Loading...</div>;
    return commentList.data.map((item) => {
      return (
        <div key={item.id}>
          <p>{item.user.name}</p>
          <p>{item.comment}</p>
          <p>{item.rate}</p>
          {userInfo.data.id === item.user.id && <Button onClick={() => handleDeleteComment(item.id)}>Delete</Button>}
        </div>
      );
    });
  };

  return (
    <div>
      {renderProductDetail()}
      {userInfo.data.id && (
        <>
          <input type="text" name="comment" onChange={(e) => handleChangeComment(e)} />
          <input type="text" name="rate" onChange={(e) => handleChangeComment(e)} />
          <Button onClick={() => handleSubmitComment()}>Submit</Button>
        </>
      )}
      {renderCommentList()}
    </div>
  );
};

export default ProductDetailPage;
