import { createReducer } from '@reduxjs/toolkit';
import { DISCOUNT_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  discountList: {
    data: [],
    loading: false,
    errors: null,
  },
};
const discountReducer = createReducer(initialState, {
  [REQUEST(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state) => {
    return {
      ...state,
      discountList: {
        ...state.discountList,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      discountList: {
        data,
        loading: true,
        errors: null,
      },
    };
  },
  [FAIL(DISCOUNT_ACTION.GET_DISCOUNT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      discountList: {
        ...state.discountList,
        loading: false,
        errors,
      },
    };
  },
});
export default discountReducer;
