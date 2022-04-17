import { createReducer } from '@reduxjs/toolkit';
import { CATEGORY_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  categoryList: {
    data: [],
    loading: false,
    errors: null,
  },
};
const categoryReducer = createReducer(initialState, {
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state) => {
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryList: {
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.GET_CATEGORY_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      categoryList: {
        ...state.categoryList,
        loading: false,
        errors,
      },
    };
  },
});

export default categoryReducer;
