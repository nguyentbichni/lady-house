import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { REQUEST, SUCCESS, FAIL, CATEGORY_ACTION } from '../constants';

function* getCategoryListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/categories`, {
      params: {
        isDeleted: false,
        _embed: 'products',
      },
    });
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* getCategoryDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/categories/${id}`);
    yield put({
      type: SUCCESS(CATEGORY_ACTION.GET_CATEGORY_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CATEGORY_ACTION.GET_CATEGORY_DETAIL),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* createCategorySaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:4000/categories`, data);
    yield callback();
    yield put({
      type: SUCCESS(CATEGORY_ACTION.CREATE_CATEGORY),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CATEGORY_ACTION.CREATE_CATEGORY),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* updateCategorySaga(action) {
  try {
    const { id, data, callback } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/categories/${id}`, data);
    yield callback();
    yield put({
      type: SUCCESS(CATEGORY_ACTION.UPDATE_CATEGORY),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
    yield put({
      type: FAIL(CATEGORY_ACTION.UPDATE_CATEGORY),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

function* deleteCategorySaga(action) {
  try {
    const { id, callback } = action.payload;
    yield axios.patch(`http://localhost:4000/categories/${id}`, {
      isDeleted: true,
    });
    yield callback();
    yield put({ type: REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST) });
    yield put({ type: SUCCESS(CATEGORY_ACTION.DELETE_CATEGORY) });
  } catch (error) {
    yield put({
      type: FAIL(CATEGORY_ACTION.DELETE_CATEGORY),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}
export default function* categorySaga() {
  yield takeEvery(REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST), getCategoryListSaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.GET_CATEGORY_DETAIL), getCategoryDetailSaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.DELETE_CATEGORY), deleteCategorySaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.CREATE_CATEGORY), createCategorySaga);
  yield takeEvery(REQUEST(CATEGORY_ACTION.UPDATE_CATEGORY), updateCategorySaga);
}
