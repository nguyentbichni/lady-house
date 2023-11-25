import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST, SUCCESS, FAIL, LOCATION_ACTION } from '../constants'

function* getCityListSaga(action) {
  try {
    const result = yield axios.get('http://localhost:4000/cities')
    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_CITY_LIST),
      payload: {
        data: result.data,
      },
    })
  } catch (errors) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_CITY_LIST),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}

function* getDistrictListSaga(action) {
  try {
    const { parentCode } = action.payload
    const result = yield axios.get(`http://localhost:4000/districts?parentcode=${parentCode}`)
    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_DISTRICT_LIST),
      payload: {
        data: result.data,
      },
    })
  } catch (errors) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_DISTRICT_LIST),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}

function* getWardListSaga(action) {
  const { parentCode } = action.payload
  try {
    const result = yield axios.get(`http://localhost:4000/wards?parentcode=${parentCode}`)
    yield put({
      type: SUCCESS(LOCATION_ACTION.GET_WARD_LIST),
      payload: {
        data: result.data,
      },
    })
  } catch (errors) {
    yield put({
      type: FAIL(LOCATION_ACTION.GET_WARD_LIST),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}

export default function* locationSaga() {
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_CITY_LIST), getCityListSaga)
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_DISTRICT_LIST), getDistrictListSaga)
  yield takeEvery(REQUEST(LOCATION_ACTION.GET_WARD_LIST), getWardListSaga)
}
