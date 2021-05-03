import { createSlice } from '@reduxjs/toolkit'
import {deleteCookie} from "../../components/util-funcs/remove-cookie";

const authReducer = createSlice({
  name: 'auth',
  initialState: {
    userData: {},
    isAuth: false,
    authError: null,
    registrationError: null,
    isLoading: false
  },
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload.isAuth
    },
    setUserAuthData(state, action) {
      state.userData = action.payload
      state.isAuth = true
      state.authError = null
    },
    setUserData(state, action) {
      state.userData = action.payload
    },
    logout(state) {
      state.userData = {}
      state.isAuth = false
      deleteCookie('authToken')
    },
    setAuthError(state, action) {
      state.authError = action.payload
    },
    setRegistrationError(state, action) {
      state.registrationError = action.payload
    },
    registrationSuccess(state, action) {
      state.registrationError = null
    },
    toggleIsLoading(state, action) {
      state.isLoading = action.payload
    }
  },
})

export const {
  setIsAuth,
  logout,
  setUserData,
  setAuthError,
  setUserAuthData,
  registrationSuccess,
  setRegistrationError,
  toggleIsLoading
} = authReducer.actions

export default authReducer.reducer
