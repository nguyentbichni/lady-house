import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { notification } from 'antd';

import { REQUEST, SUCCESS, FAIL, AUTH_ACTION } from '../constants';

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post('http://localhost:4000/login', data);
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    });
    yield localStorage.setItem('accessToken', result.data.accessToken);
    if (callback) yield callback.goToHome();
    notification.success({ message: 'Login success' });
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        errors: [error.response.data],
      },
    });
    notification.error({
      message: 'Đăng nhập thất bại',
      description: 'Sai email hoặc mật khẩu',
    });
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post('http://localhost:4000/register', data);
    yield put({ type: SUCCESS(AUTH_ACTION.REGISTER) });
    if (callback) yield callback.goToLogin();
    notification.success({ message: 'Register success' });
  } catch (error) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        errors: [error.response.data],
      },
    });
    notification.error({
      message: 'Đăng ký thất bại',
      description: 'Email đã tồn tại',
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    });
  } catch (error) {
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
