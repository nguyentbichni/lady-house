import { createReducer } from '@reduxjs/toolkit';
import { CATEGORY_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  categoryList: {
    data: [],
    loading: false,
    errors: null,
  },
  categoryDetail: {
    data: {},
    loading: false,
    errors: null,
  },
  createCategoryData: {
    loading: false,
    errors: null,
  },
  updateCategoryData: {
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
  [REQUEST(CATEGORY_ACTION.GET_CATEGORY_DETAIL)]: (state) => {
    return {
      ...state,
      categoryDetail: {
        ...state.categoryDetail,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.GET_CATEGORY_DETAIL)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      categoryDetail: {
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.GET_CATEGORY_DETAIL)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      categoryDetail: {
        ...state.categoryDetail,
        loading: false,
        errors,
      },
    };
  },
  [REQUEST(CATEGORY_ACTION.CREATE_CATEGORY)]: (state) => {
    return {
      ...state,
      createCategoryData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.CREATE_CATEGORY)]: (state, action) => {
    return {
      ...state,
      createCategoryData: {
        ...state.createCategoryData,
        loading: false,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.CREATE_CATEGORY)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      createCategoryData: {
        loading: false,
        errors,
      },
    };
  },
  [REQUEST(CATEGORY_ACTION.UPDATE_CATEGORY)]: (state) => {
    return {
      ...state,
      updateCategoryData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(CATEGORY_ACTION.UPDATE_CATEGORY)]: (state, action) => {
    return {
      ...state,
      updateCategoryData: {
        ...state.updateCategoryData,
        loading: false,
      },
    };
  },
  [FAIL(CATEGORY_ACTION.UPDATE_CATEGORY)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      updateCategoryData: {
        loading: false,
        errors,
      },
    };
  },
});

export default categoryReducer;
