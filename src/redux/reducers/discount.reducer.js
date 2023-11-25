import { createReducer } from '@reduxjs/toolkit'
import { DISCOUNT_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

const initialState = {
  discountList: {
    data: [],
    loading: false,
    error: null,
  },
  createDiscountData: {
    loading: false,
    error: null,
  },
}
const discountReducer = createReducer(initialState, {
  [REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state) => {
    return {
      ...state,
      discountList: {
        ...state.discountList,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      discountList: {
        data,
        loading: true,
        error: null,
      },
    }
  },
  [FAIL(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      discountList: {
        ...state.discountList,
        loading: false,
        errors,
      },
    }
  },
  [REQUEST(DISCOUNT_ACTION.CREATE_DISCOUNT)]: (state) => {
    return {
      ...state,
      createDiscountData: {
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(DISCOUNT_ACTION.CREATE_DISCOUNT)]: (state, action) => {
    return {
      ...state,
      createDiscountData: {
        ...state.createDiscountData,
        loading: false,
      },
    }
  },
  [FAIL(DISCOUNT_ACTION.CREATE_DISCOUNT)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      createDiscountData: {
        loading: false,
        errors,
      },
    }
  },
})
export default discountReducer
