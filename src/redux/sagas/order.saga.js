import { takeEvery, put } from 'redux-saga/effects'
import axios from 'axios'

import { REQUEST, SUCCESS, FAIL, ORDER_ACTION, CART_ACTION } from '../constants'

function* orderProductSaga(action) {
  try {
    const {
      data: { products, ...rest },
      callback,
    } = action.payload
    // const orderList = yield axios.get('http://localhost:4000/orders', {
    //   params: {
    //     userId: 1,
    //     _embed: ['orderDetails'],
    //   },
    // })
    // console.log('🚀 ~ file: order.saga.js:17 ~ function*orderProductSaga ~ orderList:', orderList)
    const result = yield axios.post(`http://localhost:4000/orders`, rest)
    for (let i = 0; i < products.length; i++) {
      yield axios.post(`http://localhost:4000/orderDetails`, {
        orderId: result.data.id,
        ...products[i],
      })
    }
    yield callback()
    yield put({ type: SUCCESS(ORDER_ACTION.ORDER_PRODUCT) })
    yield put({ type: REQUEST(CART_ACTION.CLEAR_CART) })
  } catch (errors) {
    yield put({
      type: FAIL(ORDER_ACTION.ORDER_PRODUCT),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}
function* getOrderListSaga(action) {
  try {
    const { userId } = action.payload
    const result = yield axios.get('http://localhost:4000/orders', {
      params: {
        userId: userId,
        _embed: ['orderDetails'],
      },
    })
    yield put({ type: SUCCESS(ORDER_ACTION.GET_ORDER_LIST), payload: { data: result.data } })
  } catch (errors) {
    yield put({
      type: FAIL(ORDER_ACTION.GET_ORDER_LIST),
      payload: {
        error: 'Lỗi không xác định',
      },
    })
  }
}

export default function* locationSaga() {
  yield takeEvery(REQUEST(ORDER_ACTION.ORDER_PRODUCT), orderProductSaga)
  yield takeEvery(REQUEST(ORDER_ACTION.GET_ORDER_LIST), getOrderListSaga)
}
