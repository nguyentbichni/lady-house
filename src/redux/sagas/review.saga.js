import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST, SUCCESS, FAIL, REVIEW_ACTION } from '../constants'

function* getReviewListSaga(action) {
  try {
    const { productId } = action.payload
    const result = yield axios.get(`http://localhost:4000/reviews`, {
      params: {
        productId,
        _expand: 'user',
      },
    })
    yield put({
      type: SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        data: result.data,
      },
    })
  } catch (errors) {
    yield put({
      type: FAIL(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}

function* createReviewSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post(`http://localhost:4000/reviews`, data)
    yield callback()
    yield put({
      type: REQUEST(REVIEW_ACTION.GET_REVIEW_LIST),
      payload: {
        productId: data.productId,
      },
    })
    yield put({
      type: SUCCESS(REVIEW_ACTION.CREATE_REVIEW),
      payload: {
        data: result.data,
      },
    })
  } catch (errors) {
    yield put({
      type: FAIL(REVIEW_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}

function* deleteReviewSaga(action) {}

export default function* categorySaga() {
  yield takeEvery(REQUEST(REVIEW_ACTION.GET_REVIEW_LIST), getReviewListSaga)
  yield takeEvery(REQUEST(REVIEW_ACTION.CREATE_REVIEW), createReviewSaga)
  yield takeEvery(REQUEST(REVIEW_ACTION.DELETE_REVIEW), deleteReviewSaga)
}
