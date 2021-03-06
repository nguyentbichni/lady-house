import { createReducer } from '@reduxjs/toolkit';
import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    errors: null,
  },
  productDetail: {
    data: {},
    loading: false,
    errors: null,
  },
};
const productReducer = createReducer(initialState, {
  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state) => {
    return {
      ...state,
      productList: {
        ...state.productList,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { data, meta, more } = action.payload;
    return {
      ...state,
      productList: {
        data: more ? [...state.productList.data, ...data] : data,
        meta,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state) => {
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      productDetail: {
        data: data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      productDetail: {
        ...state.productDetail,
        loading: false,
        errors,
      },
    };
  },
});

export default productReducer;
