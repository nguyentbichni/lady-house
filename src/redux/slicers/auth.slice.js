import { createSlice } from "@reduxjs/toolkit";

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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //login
    loginRequest: (state, action) => {
      state.loginData.loading = true;
      state.loginData.error = null;
    },
    loginSuccess: (state, action) => {
      const { data } = action.payload;
      state.loginData.loading = false;
      state.userInfo.loading = false;
      state.userInfo.data = data;
    },
    loginFail: (state, action) => {
      const { error } = action.payload
      state.loginData.loading = false
      state.loginData.error = error
    },
    //register
    registerRequest: (state, action) => {
      state.registerData.loading = true
      state.registerData.error = null
    },
    registerSuccess: (state, action) => {
      state.registerData.loading = false
    },
    registerFail: (state, action) => {
      const { error } = action.payload
      state.registerData.loading = false
      state.registerData.error = error
    },
    //user info
    getUserInfoRequest: (state) =>{
      state.userInfo.loading = true;
      state.userInfo.error = null;
    },
    getUserInfoSuccess: (state, action) =>{
      const { data } = action.payload
      state.userInfo.loading = false;
      state.userInfo.data = data
    },
    getUserInfoFail: (state, action) =>{
      const { error } = action.payload
      state.userInfo.loading = false;
      state.userInfo.error = error
    },
  }
})

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  registerRequest,
  registerSuccess,
  registerFail,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFail
} = authSlice.action

export default authSlice.reducer;