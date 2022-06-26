import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS, FAIL, COMMENT_ACTION } from '../constants';

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/comments`, {
      params: {
        productId: action.payload.productId,
        _expand: 'user',
      },
    });
    yield put({
      type: SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* createCommentSaga(action) {
  try {
    const result = yield axios.post(`http://localhost:4000/comments`, action.payload);
    yield put({
      type: SUCCESS(COMMENT_ACTION.CREATE_COMMENT),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        productId: action.payload.productId,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.CREATE_COMMENT),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* deleteCommentSaga(action) {
  try {
    const { id, productId } = action.payload;
    const result = yield axios.delete(`http://localhost:4000/comments/${id}`);
    yield put({
      type: SUCCESS(COMMENT_ACTION.DELETE_COMMENT),
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: REQUEST(COMMENT_ACTION.GET_COMMENT_LIST),
      payload: {
        productId: action.payload.productId,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(COMMENT_ACTION.DELETE_COMMENT),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

export default function* categorySaga() {
  yield takeEvery(REQUEST(COMMENT_ACTION.GET_COMMENT_LIST), getCategoryListSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.CREATE_COMMENT), createCommentSaga);
  yield takeEvery(REQUEST(COMMENT_ACTION.DELETE_COMMENT), deleteCommentSaga);
}
