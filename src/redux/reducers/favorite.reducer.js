import { createReducer } from '@reduxjs/toolkit';
import { FAVORITE_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  favoriteList: {
    data: [],
    loading: false,
    errors: null,
  },
  favoriteProductData: {
    loading: false,
    errors: null,
  },
  unfavoriteProductData: {
    loading: false,
    errors: null,
  },
};

const favoriteReducer = createReducer(initialState, {
  [REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      favoriteList: {
        data,
        loading: true,
        error: null,
      },
    };
  },
  [FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(FAVORITE_ACTION.FAVORITE_PRODUCT)]: (state) => {
    return {
      ...state,
      favoriteProductData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.FAVORITE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      favoriteProductData: {
        ...state.favoriteProductData,
        loading: false,
      },
    };
  },
  [FAIL(FAVORITE_ACTION.FAVORITE_PRODUCT)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      favoriteProductData: {
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(FAVORITE_ACTION.UNFAVORITE_PRODUCT)]: (state) => {
    return {
      ...state,
      unfavoriteProductData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.UNFAVORITE_PRODUCT)]: (state, action) => {
    return {
      ...state,
      unfavoriteProductData: {
        ...state.unfavoriteProductData,
        loading: false,
      },
    };
  },
  [FAIL(FAVORITE_ACTION.UNFAVORITE_PRODUCT)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      unfavoriteProductData: {
        loading: false,
        errors,
      },
    };
  },
});

export default favoriteReducer;
