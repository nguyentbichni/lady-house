import { createReducer } from '@reduxjs/toolkit';
import { REVIEW_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  reviewList: {
    data: [],
    loading: false,
    errors: null,
  },
  createReviewData: {
    loading: false,
    errors: null,
  },
  deleteReviewData: {
    loading: false,
    errors: null,
  },
};
const reviewReducer = createReducer(initialState, {
  [REQUEST(REVIEW_ACTION.GET_REVIEW_LIST)]: (state) => {
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      reviewList: {
        data,
        loading: true,
        error: null,
      },
    };
  },
  [FAIL(REVIEW_ACTION.GET_REVIEW_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      reviewList: {
        ...state.reviewList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(REVIEW_ACTION.CREATE_REVIEW)]: (state) => {
    return {
      ...state,
      createReviewData: {
        loading: true,
        errors: false,
      },
    };
  },
  [SUCCESS(REVIEW_ACTION.CREATE_REVIEW)]: (state, action) => {
    return {
      ...state,
      createReviewData: {
        ...state.createReviewData,
        loading: false,
      },
    };
  },
  [FAIL(REVIEW_ACTION.CREATE_REVIEW)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      createReviewData: {
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(REVIEW_ACTION.DELETE_REVIEW)]: (state) => {
    return {
      ...state,
    };
  },
  [SUCCESS(REVIEW_ACTION.DELETE_REVIEW)]: (state, action) => {
    return {
      ...state,
    };
  },
  [FAIL(REVIEW_ACTION.DELETE_REVIEW)]: (state, action) => {
    return {
      ...state,
    };
  },
});

export default reviewReducer;
