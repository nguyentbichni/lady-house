import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { notification } from 'antd';

import { REQUEST, SUCCESS, FAIL, AUTH_ACTION } from '../constants';

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:4000/login`, data);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    yield localStorage.setItem('accessToken', result.data.accessToken);
    yield callback(result.data.user.role);
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        errors: 'Email hoặc Password không chính xác',
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post(`http://localhost:4000/register`, data);
    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    });
    yield notification.success({ message: `Welcome ${data.name} to Ladyhouse` });
    yield callback();
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        errors: e.response.data,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  const { id } = action.payload;
  try {
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        errors: ['Lỗi không xác định'],
      },
    });
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga);
}
