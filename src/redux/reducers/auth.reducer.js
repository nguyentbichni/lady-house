import { createReducer } from '@reduxjs/toolkit';
import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  userInfo: {
    data: {},
    loading: false,
    errors: null,
  },
  registerData: {
    loading: false,
    errors: null,
  },
};

const authReducer = createReducer(initialState, {
  [REQUEST(AUTH_ACTION.LOGIN)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    return state;
  },
  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    return state;
  },

  [REQUEST(AUTH_ACTION.REGISTER)]: (state) => {
    return {
      ...state,
      registerData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.REGISTER)]: (state, action) => {
    console.log('🚀 ~ file: auth.reducer.js ~ line 44 ~ [SUCCESS ~ action', action);
    return {
      ...state,
      registerData: {
        loading: false,
        errors: null,
      },
    };
  },
  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => {
    console.log('🚀 ~ file: auth.reducer.js ~ line 48 ~ [FAIL ~ action', action);
    const { errors } = action.payload;
    return {
      ...state,
      registerData: {
        loading: false,
        errors,
      },
    };
  },
});

export default authReducer;
