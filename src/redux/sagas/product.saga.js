import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS, FAIL, PRODUCT_ACTION } from '../constants';

function* getProductListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/products`);
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
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
