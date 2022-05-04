import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from '../constants';

function* getProductListSaga(action) {
  try {
    const { categoryIds, page, limit, more, keyword, price, order } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products`, {
      params: {
        categoryId: categoryIds,
        q: keyword,
        price_gte: price[0],
        price_lte: price[1],
        ...(order && {
          _sort: 'price',
          _order: order,
        }),
        _page: page,
        _limit: limit,
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          page,
          total: parseInt(result.headers['x-total-count']),
        },
        more,
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

export default function* productSaga() {
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
}
