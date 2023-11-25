import { createReducer } from '@reduxjs/toolkit'
import { AUTH_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

const initialState = {
  userInfo: {
    data: {},
    loading: true,
    error: null,
  },
  registerData: {
    loading: false,
    error: null,
  },
  loginData: {
    loading: false,
    error: null,
  },
  changePasswordData: {
    loading: false,
    error: null,
  },
}

const authReducer = createReducer(initialState, {
  [REQUEST(AUTH_ACTION.LOGIN)]: (state) => {
    return {
      ...state,
      loginData: {
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload
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
    }
  },
  [FAIL(AUTH_ACTION.LOGIN)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      loginData: {
        loading: false,
        errors,
      },
    }
  },

  [REQUEST(AUTH_ACTION.REGISTER)]: (state) => {
    return {
      ...state,
      registerData: {
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(AUTH_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        ...state.registerData,
        loading: false,
      },
    }
  },
  [FAIL(AUTH_ACTION.REGISTER)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      registerData: {
        loading: false,
        errors,
      },
    }
  },

  [REQUEST(AUTH_ACTION.GET_USER_INFO)]: (state) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data,
        loading: false,
      },
    }
  },
  [FAIL(AUTH_ACTION.GET_USER_INFO)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
        errors,
      },
    }
  },
  [REQUEST(AUTH_ACTION.LOGOUT)]: (state) => {
    localStorage.removeItem('accessToken')
    return {
      ...state,
      userInfo: {
        data: {},
        loading: false,
        error: null,
      },
    }
  },
  // change password
  [REQUEST(AUTH_ACTION.CHANGE_PASSWORD)]: (state) => {
    return {
      ...state,
      changePasswordData: {
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    return {
      ...state,
      changePasswordData: {
        ...state.changePasswordData,
        loading: false,
      },
    }
  },
  [FAIL(AUTH_ACTION.CHANGE_PASSWORD)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      changePasswordData: {
        loading: false,
        errors,
      },
    }
  },
})

export default authReducer
