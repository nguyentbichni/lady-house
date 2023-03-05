import { createReducer } from '@reduxjs/toolkit';
import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from '../constants';

const initialState = {
  userInfo: {
    data: {},
    loading: true,
    errors: null,
  },
  registerData: {
    loading: false,
    errors: null,
  },
  loginData: {
    loading: false,
    errors: null,
  },
};

const authReducer = createReducer(initialState, {
  [REQUEST(AUTH_ACTION.LOGIN)]: (state) => {
    return {
      ...state,
      loginData: {
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      loginData: {
        ...state.loginData,
        loading: false,
      },
      userInfo: {
        ...state.userInfo,
        data,
        loading: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      loginData: {
        loading: false,
        errors,
      },
    };
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
    return {
      ...state,
      registerData: {
        ...state.registerData,
        loading: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      registerData: {
        loading: false,
        errors,
      },
    };
  },

  [REQUEST(AUTH_ACTION.GET_USER_INFO)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
        errors: null,
      },
    };
  },
  [SUCCESS(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
        loading: false,
      },
    };
  },
  [FAIL(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { errors } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
        errors,
      },
    };
  },
  [REQUEST(AUTH_ACTION.LOGOUT)]: (state) => {
    localStorage.removeItem('accessToken');
    return {
      ...state,
      userInfo: {
        data: {},
        loading: false,
        errors: null,
      },
    };
  },
});

export default authReducer;
