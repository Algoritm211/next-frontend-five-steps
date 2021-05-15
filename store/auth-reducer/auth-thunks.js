import { setAppReady } from '../app-reducer/app-reducer'
import {
  registrationSuccess,
  setAuthError,
  setIsAuth,
  setRegistrationError,
  setUserAuthData,
  toggleIsLoading,
} from './auth-reducer'
import { authAPI } from '../../api/auth-api'
import { deleteCookie } from '../../components/util-funcs/remove-cookie'

export const registerUser = (userData) => async (dispatch) => {
  try {
    await authAPI.registration(userData)
    dispatch(loginUser(userData.email, userData.password))
    dispatch(registrationSuccess())
  } catch (error) {
    console.log(error.response.data.message)
    dispatch(setRegistrationError(error.response.data.message))
  }
}

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(setAppReady(false))
    const data = await authAPI.login(email, password)
    dispatch(setUserAuthData(data.user))
    window.location.assign('/')
    dispatch(setAppReady(true))
  } catch (error) {
    dispatch(setAuthError(error?.response?.data?.message))
    dispatch(setAppReady(true))
  }
}

export const authUser = () => async (dispatch) => {
  dispatch(toggleIsLoading(true))
  dispatch(setAppReady(false))
  const data = await authAPI.auth()
  if (data.message) {
    setAuthError(data.message)
    dispatch(setAppReady(true))
    deleteCookie('authToken')
    setIsAuth({ isAuth: false })
    dispatch(toggleIsLoading(false))
  } else {
    dispatch(setUserAuthData(data.user))
    dispatch(setAppReady(true))
    dispatch(toggleIsLoading(false))
  }
}

export const authGoogle = (userData) => async (dispatch) => {
  try {
    dispatch(setAppReady(false))
    dispatch(setUserAuthData(userData.user))
    dispatch(setAppReady(true))
  } catch (error) {
    console.log(error)
    deleteCookie('authToken')
    setIsAuth({ isAuth: false })
    setAuthError(error.response?.data?.message)
    // alert(error.response.data.message)
    dispatch(setAppReady(true))
  } finally {
    dispatch(setAppReady(true))
  }
}
