import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import { notification } from 'antd'

import { REQUEST, SUCCESS, FAIL, AUTH_ACTION } from '../constants'

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post(`http://localhost:4000/login`, data)
    yield put({
      type: SUCCESS(AUTH_ACTION.LOGIN),
      payload: {
        data: result.data.user,
      },
    })
    yield localStorage.setItem('accessToken', result.data.accessToken)
    yield callback(result.data.user.role)
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.LOGIN),
      payload: {
        error: 'Email hoặc Password không chính xác',
      },
    })
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post(`http://localhost:4000/register`, data)
    yield put({
      type: SUCCESS(AUTH_ACTION.REGISTER),
      payload: {
        data: result.data,
      },
    })
    yield notification.success({ message: `Welcome ${data.name} to Ladyhouse` })
    yield callback()
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.REGISTER),
      payload: {
        error: e.response.data,
      },
    })
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios.get(`http://localhost:4000/users/${id}`)
    yield put({
      type: SUCCESS(AUTH_ACTION.GET_USER_INFO),
      payload: {
        data: result.data,
      },
    })
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.GET_USER_INFO),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}

function* changePasswordSaga(action) {
  try {
    const { data, callback } = action.payload
    const result = yield axios.post(`http://localhost:4000/login`, {
      email: data.email,
      password: data.password,
    })
    yield axios.patch(`http://localhost:4000/users/${data.id}`, {
      password: data.newPassword,
    })
    yield callback()
    yield notification.success({ message: 'Bạn đã đổi mật khẩu thành công' })
    yield put({
      type: SUCCESS(AUTH_ACTION.CHANGE_PASSWORD),
    })
  } catch (e) {
    yield put({
      type: FAIL(AUTH_ACTION.CHANGE_PASSWORD),
      payload: {
        error: 'Mật khẩu cũ không chính xác',
      },
    })
  }
}

export default function* authSaga() {
  yield takeEvery(REQUEST(AUTH_ACTION.LOGIN), loginSaga)
  yield takeEvery(REQUEST(AUTH_ACTION.REGISTER), registerSaga)
  yield takeEvery(REQUEST(AUTH_ACTION.GET_USER_INFO), getUserInfoSaga)
  yield takeEvery(REQUEST(AUTH_ACTION.CHANGE_PASSWORD), changePasswordSaga)
}
