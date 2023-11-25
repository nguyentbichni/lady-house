import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST, SUCCESS, FAIL, DISCOUNT_ACTION } from '../constants'

function* getDiscountListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/discounts`, {
      params: {
        isDeleted: false,
      },
    })
    yield put({
      type: SUCCESS(DISCOUNT_ACTION.GET_DISCOUNT_LIST),
      payload: {
        data: result.data,
      },
    })
  } catch (error) {
    yield put({
      type: FAIL(DISCOUNT_ACTION.GET_DISCOUNT_LIST),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}
function* createDiscountSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post(`http://localhost:4000/discounts`, data)
    yield callback()
    yield put({
      type: SUCCESS(DISCOUNT_ACTION.CREATE_DISCOUNT),
      payload: {
        data: result.data,
      },
    })
  } catch (error) {
    yield put({
      type: FAIL(DISCOUNT_ACTION.CREATE_DISCOUNT),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}
function* deleteDiscountSaga(action) {
  try {
    const { id, callback } = action.payload
    yield axios.patch(`http://localhost:4000/discounts/${id}`, {
      isDeleted: true,
    })
    yield callback()
    yield put({ type: REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_LIST) })
    yield put({ type: SUCCESS(DISCOUNT_ACTION.DELETE_DISCOUNT) })
  } catch (error) {
    yield put({
      type: FAIL(DISCOUNT_ACTION.DELETE_DISCOUNT),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}
export default function* discountSaga() {
  yield takeEvery(REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_LIST), getDiscountListSaga)
  yield takeEvery(REQUEST(DISCOUNT_ACTION.CREATE_DISCOUNT), createDiscountSaga)
  yield takeEvery(REQUEST(DISCOUNT_ACTION.DELETE_DISCOUNT), deleteDiscountSaga)
}
