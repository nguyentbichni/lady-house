import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

import { notification } from 'antd';

import { REQUEST, SUCCESS, FAIL, AUTH_ACTION } from '../constants';

function* loginSaga(action) {
  try {
  } catch (error) {}
}

function* registerSaga(action) {
  try {
    yield axios.post('http://localhost:4000/register', action.payload);
    yield put({ type: SUCCESS(AUTH_ACTION.REGISTER) });
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

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga);
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga);
}
