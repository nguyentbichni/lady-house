import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS, FAIL, DISCOUNT_ACTION } from '../constants';

function* getDiscountListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/discounts`, {
      params: {
        isDeleted: false,
      },
    });
    yield put({
      type: SUCCESS(DISCOUNT_ACTION.GET_DISCOUNT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(DISCOUNT_ACTION.GET_DISCOUNT_LIST),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}
export default function* discountSaga() {
  yield takeEvery(REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_LIST), getDiscountListSaga);
}
