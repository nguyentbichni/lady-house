import { createReducer } from '@reduxjs/toolkit'
import { ORDER_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

const initialState = {
  orderProductData: {
    loading: false,
    error: null,
  },
  orderList: {
    loading: false,
    error: null,
    data: [],
  },
}

const orderReducer = createReducer(initialState, {
  [REQUEST(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    return {
      ...state,
      orderProductData: {
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    return {
      ...state,
      orderProductData: {
        loading: false,
        error: null,
      },
    }
  },
  [FAIL(ORDER_ACTION.ORDER_PRODUCT)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      orderProductData: {
        loading: false,
        errors,
      },
    }
  },
  // get order list
  [REQUEST(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      orderList: {
        ...state.orderList,
        data,
        loading: false,
        error: null,
      },
    }
  },
  [FAIL(ORDER_ACTION.GET_ORDER_LIST)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      orderList: {
        ...state.orderList,
        loading: false,
        errors,
      },
    }
  },
})
export default orderReducer
