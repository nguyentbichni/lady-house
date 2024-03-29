import { createReducer } from '@reduxjs/toolkit'
import { USER_ACTION, REQUEST, SUCCESS, FAIL } from '../constants'

const initialState = {
  userList: {
    data: [],
    loading: false,
    error: null,
  },
}
const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.GET_USER_LIST)]: (state) => {
    return {
      ...state,
      userList: {
        ...state.userList,
        loading: true,
        error: null,
      },
    }
  },
  [SUCCESS(USER_ACTION.GET_USER_LIST)]: (state, action) => {
    const { data } = action.payload
    return {
      ...state,
      userList: {
        data,
        loading: true,
        error: null,
      },
    }
  },
  [FAIL(USER_ACTION.GET_USER_LIST)]: (state, action) => {
    const { errors } = action.payload
    return {
      ...state,
      userList: {
        ...state.userList,
        loading: false,
        errors,
      },
    }
  },
})
export default userReducer
