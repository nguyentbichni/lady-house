import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Modal, Input, Rate, Space, Radio } from 'antd';
import { HeartOutlined, PlusOutlined, MinusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  getProductDetailAction,
  createReviewAction,
  getReviewListAction,
  deleteReviewAction,
  favoriteProductAction,
  unfavoriteProductAction,
  addToCartAction,
} from '../../../redux/actions';

const ProductDetailPage = () => {
  const [isShowReviewModal, setIsShowReviewModal] = useState(false);
  const [optionValue, setOptionValue] = useState('');
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const id = params.id?.split('.')[1];

  const [createReviewForm] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetailAction({ id }));
    dispatch(getReviewListAction({ productId: id }));
  }, [id]);

  const { productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);
  const { userInfo } = useSelector((state) => state.auth);
  const optionItems = productDetail.data.optionItems || [];

  const hasFavoriteData = productDetail.data.favorites?.find((favoriteItem) => {
    return favoriteItem.userId === userInfo.data.id;
  });

  const handleToggleFavorite = () => {
    if (hasFavoriteData) {
      dispatch(
        unfavoriteProductAction({
          id: hasFavoriteData.id,
          productId: productDetail.data.id,
        })
      );
    } else {
      dispatch(
        favoriteProductAction({
          data: {
            productId: productDetail.data.id,
            userId: userInfo.data.id,
          },
        })
      );
    }
  };

  const handleAddToCart = () => {
    if (optionItems.length && !optionValue) return alert('Chọn option');
    const optionData = optionItems.find((item) => item.id === optionValue);
    dispatch(
      addToCartAction({
        data: {
          id: productDetail.data.id,
          name: productDetail.data.name,
          price: optionData ? optionData.price : productDetail.data.minPrice,
          quantity: quantity,
          slug: productDetail.data.slug,
          option: optionData
            ? {
                id: optionValue,
                name: optionData.name,
              }
            : null,
        },
      })
    );
  };

  const renderPrice = () => {
    if (optionValue) {
      var item = optionItems.find((item) => item.id === optionValue);
      return <p>Price: {item.price}</p>;
    } else {
      return (
        <p>
          Price:
          {productDetail.data.minPrice === productDetail.data.maxPrice
            ? productDetail.data.minPrice
            : `${productDetail.data.minPrice} - ${productDetail.data.maxPrice}`}
        </p>
      );
    }
  };

  const renderAverageRating = () => {
    let total = 0;
    reviewList.data.forEach((item) => {
      total = total + item.rate;
    });
    return reviewList.data.length ? (total / reviewList.data.length).toFixed(1) : 0;
  };

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((reviewItem) => {
      return (
        <div key={reviewItem.id}>
          <p>Name: {reviewItem.user.name}</p>
          <p>Content: {reviewItem.reviewContent}</p>
          <div>
            Rate: <Rate disabled value={reviewItem.rate} />
          </div>
          <p>Time: {moment(reviewItem.createdAt).fromNow()}</p>
        </div>
      );
    });
  }, [reviewList.data]);

  const renderOptionsList = () => {
    return productDetail.data.optionGroups?.map((group) => {
      return (
        <div key={group.id}>
          <Space>
            <p>{group.name}:</p>
            <Radio.Group buttonStyle="solid" onChange={(e) => setOptionValue(e.target.value)}>
              {optionItems
                ?.filter((item) => item.optionGroupId === group.id)
                .map((item) => {
                  // if (item.optionGroupId !== group.id) return null;
                  return (
                    <Radio.Button value={item.id} key={item.id}>
                      {item.name}
                    </Radio.Button>
                  );
                })}
            </Radio.Group>
          </Space>
        </div>
      );
    });
  };

  return (
    <div>
      <h3>
        <span>{productDetail.data.name}</span> - <span>{renderAverageRating()}</span>
      </h3>
      {renderPrice()}
      {renderOptionsList()}
      {userInfo.data.id && (
        <Button type="text" icon={<HeartOutlined />} danger={!!hasFavoriteData} onClick={() => handleToggleFavorite()}>
          Like
        </Button>
      )}
      {`(${productDetail.data.favorites?.length} lượt thích)`}
      <Input.Group compact>
        <Button onClick={() => setQuantity(quantity - 1)} icon={<MinusOutlined />} />
        <Input value={quantity} style={{ width: 100 }} />
        <Button onClick={() => setQuantity(quantity + 1)} icon={<PlusOutlined />} />
      </Input.Group>
      <Button onClick={() => handleAddToCart()} icon={<ShoppingCartOutlined />}>
        Add to cart
      </Button>
      <br />
      {userInfo.data.id && <Button onClick={() => setIsShowReviewModal(true)}>Review</Button>}
      {renderReviewList}
      <Modal
        title="Review"
        open={!!isShowReviewModal}
        onOk={() => createReviewForm.submit()}
        onCancel={() => setIsShowReviewModal(null)}
      >
        <Form
          form={createReviewForm}
          onFinish={(values) =>
            dispatch(
              createReviewAction({
                data: {
                  userId: userInfo.data.id,
                  productId: productDetail.data.id,
                  reviewContent: values.content,
                  rate: values.rate,
                },
                callback: () => {
                  setIsShowReviewModal(false);
                  createReviewForm.resetFields();
                },
              })
            )
          }
        >
          <Form.Item name="content" rules={[{ required: true, message: 'Please input your review!' }]}>
            <Input.TextArea rows={4} placeholder="Input review" maxLength={6} />
          </Form.Item>
          <Form.Item name="rate" rules={[{ required: true, message: 'Please rating for product!' }]}>
            <Rate />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductDetailPage;
