import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST, SUCCESS, FAIL, USER_ACTION } from '../constants'
import { PAGINATION_LIMIT } from '../../constants/pagination'

function* getUserListSaga(action) {
  try {
    const result = yield axios.get(`http://localhost:4000/users`, {
      params: {
        isDeleted: false,
      },
    })
    yield put({
      type: SUCCESS(USER_ACTION.GET_USER_LIST),
      payload: {
        data: result.data,
      },
    })
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.GET_USER_LIST),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}
function* deleteUserListSaga(action) {
  try {
    const { id, callback, page } = action.payload
    yield axios.patch(`http://localhost:4000/users/${id}`, {
      isDeleted: true,
    })
    yield callback()
    yield put({
      type: REQUEST(USER_ACTION.GET_USER_LIST),
      payload: {
        page: page,
        limit: PAGINATION_LIMIT.ADMIN_TABLE,
      },
    })
    yield put({ type: SUCCESS(USER_ACTION.DELETE_USER) })
  } catch (error) {
    yield put({
      type: FAIL(USER_ACTION.DELETE_USER),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}
export default function* userSaga() {
  yield takeEvery(REQUEST(USER_ACTION.GET_USER_LIST), getUserListSaga)
  yield takeEvery(REQUEST(USER_ACTION.DELETE_USER), deleteUserListSaga)
}
