import { takeEvery, put } from 'redux-saga/effects';
import { notification } from 'antd';
import axios from 'axios';

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from '../constants';
import { PAGINATION_LIMIT } from '../../constants/pagination';

function* getProductListSaga(action) {
  try {
    const { page, limit, categoryId, searchKey, isShowMore, sort } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        isDeleted: false,
        _page: page,
        _limit: limit,
        _expand: 'category',
        _embed: ['favorites', 'reviews'],
        categoryId,
        q: searchKey,
        ...(sort && {
          _sort: sort.split('.')[0],
          _order: sort.split('.')[1],
        }),
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          limit,
          total: parseInt(result.headers['x-total-count']),
        },
        isShowMore,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: 'category',
        _embed: ['favorites', 'optionGroups', 'optionItems'],
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    const productResult = yield axios.post(`http://localhost:4000/products`, {
      name: data.name,
      slug: data.slug,
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      categoryId: data.categoryId,
    });
    for (let i = 0; i < data.optionGroups?.length; i++) {
      const optionGroupData = data.optionGroups[i];
      const groupResult = yield axios.post(`http://localhost:4000/optionGroups`, {
        name: optionGroupData.name,
        productId: productResult.data.id,
      });
      for (let j = 0; j < optionGroupData.items.length; j++) {
        const optionItemData = optionGroupData.items[j];
        yield axios.post(`http://localhost:4000/optionItems`, {
          name: optionItemData.name,
          price: optionItemData.price,
          optionGroupId: groupResult.data.id,
          productId: productResult.data.id,
        });
      }
    }
    yield notification.success({ message: `Create ${data.name} success` });
    yield callback();
    yield put({ type: SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT) });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.CREATE_PRODUCT),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* updateProductSaga(action) {
  try {
    const {
      id,
      data: { optionGroups, initialOptionGroups, ...productData },
      callback,
    } = action.payload;
    console.log(
      '🚀 ~ file: product.saga.js:116 ~ function*updateProductSaga ~ initialOptionGroups',
      initialOptionGroups
    );
    const productResult = yield axios.patch(`http://localhost:4000/products/${id}`, productData);
    for (let i = 0; i < optionGroups.length; i++) {
      const optionGroupData = optionGroups[i];
      if (!optionGroupData.id) {
        const groupResult = yield axios.post(`http://localhost:4000/optionGroups`, {
          name: optionGroupData.name,
          productId: productResult.data.id,
        });
        for (let j = 0; j < optionGroupData.items.length; j++) {
          const optionItemData = optionGroupData.items[j];
          yield axios.post(`http://localhost:4000/optionItems`, {
            name: optionItemData.name,
            price: optionItemData.price,
            optionGroupId: groupResult.data.id,
            productId: productResult.data.id,
          });
        }
      } else {
        const groupResult = yield axios.patch(`http://localhost:4000/optionGroups/${optionGroupData.id}`, {
          name: optionGroupData.name,
          productId: productResult.data.id,
        });
        for (let j = 0; j < optionGroupData.items.length; j++) {
          const optionItemData = optionGroupData.items[j];
          if (!optionItemData.id) {
            yield axios.post(`http://localhost:4000/optionItems`, {
              name: optionItemData.name,
              price: optionItemData.price,
              optionGroupId: groupResult.data.id,
              productId: productResult.data.id,
            });
          } else {
            yield axios.patch(`http://localhost:4000/optionItems/${optionItemData.id}`, {
              name: optionItemData.name,
              price: optionItemData.price,
              optionGroupId: groupResult.data.id,
              productId: productResult.data.id,
            });
          }
        }
      }
    }
    // delete option group
    for (let i = 0; i < initialOptionGroups.length; i++) {
      const optionGroupData = initialOptionGroups[i];

      var groupIndex = optionGroups.findIndex((item) => {
        return item.id === optionGroupData.id;
      });
      if (groupIndex === -1) {
        yield axios.delete(`http://localhost:4000/optionGroups/${optionGroupData.id}`);
      }
    }
    yield notification.success({ message: `Update ${productData.name} success` });
    yield callback();
    yield put({ type: SUCCESS(PRODUCT_ACTION.UPDATE_PRODUCT) });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.UPDATE_PRODUCT),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id, callback, page } = action.payload;
    yield axios.patch(`http://localhost:4000/products/${id}`, {
      isDeleted: true,
    });
    yield callback();
    yield put({
      type: REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        page: page,
        limit: PAGINATION_LIMIT.ADMIN_TABLE,
      },
    });
    yield put({ type: SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT) });
  } catch (error) {
    yield put({
      type: FAIL(PRODUCT_ACTION.DELETE_PRODUCT),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL), getProductDetailSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.CREATE_PRODUCT), createProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT), updateProductSaga);
  yield takeEvery(REQUEST(PRODUCT_ACTION.DELETE_PRODUCT), deleteProductSaga);
}
