import { createReducer } from '@reduxjs/toolkit';
import { COMMENT_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  commentList: {
    data: [],
    loading: false,
    errors: null,
  },
  createCommentData: {
    loading: true,
    errors: null,
  },
  deleteCommentData: {
    loading: true,
    errors: null,
  },
};
const commentReducer = createReducer(initialState, {
  [REQUEST(COMMENT_ACTION.GET_COMMENT_LIST)]: (state) => {
    return {
      ...state,
      commentList: {
        ...state.commentList,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      commentList: {
        data,
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(COMMENT_ACTION.GET_COMMENT_LIST)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      commentList: {
        ...state.commentList,
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(COMMENT_ACTION.CREATE_COMMENT)]: (state) => {
    return {
      ...state,
      createCommentData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.CREATE_COMMENT)]: (state, action) => {
    return {
      ...state,
      createCommentData: {
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(COMMENT_ACTION.CREATE_COMMENT)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      createCommentData: {
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(COMMENT_ACTION.DELETE_COMMENT)]: (state) => {
    return {
      ...state,
      deleteCommentData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(COMMENT_ACTION.DELETE_COMMENT)]: (state, action) => {
    return {
      ...state,
      deleteCommentData: {
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(COMMENT_ACTION.DELETE_COMMENT)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      deleteCommentData: {
        loading: false,
        errors,
      },
    };
  },
});

export default commentReducer;
