import { setAppReady } from '../app-reducer/app-reducer'
import {
  registrationSuccess,
  setAuthError,
  setIsAuth,
  setRegistrationError,
  setUserAuthData, setUserData, toggleIsLoading,
} from './auth-reducer'
import {authAPI} from "../../api/auth-api";
import {deleteCookie} from "../../components/util-funcs/remove-cookie";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const data = await authAPI.registration(userData)

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
    await localStorage.setItem('authToken', data.token)
    dispatch(setUserAuthData(data.user))
    window.location.assign('/')
    // document.cookie = `authToken=${data.token}; Expires=${new Date(Date.now() + 86400e3)}; Path=/; Domain=localhost;`
    dispatch(setAppReady(true))
  } catch (error) {
    dispatch(setAuthError(error.response.data.message))
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
    await localStorage.removeItem('authToken')
    deleteCookie('authToken')
    setIsAuth({ isAuth: false })
    dispatch(toggleIsLoading(false))
  } else {
    dispatch(setUserAuthData(data.user))
    localStorage.setItem('authToken', data.token)
    dispatch(setAppReady(true))
    dispatch(toggleIsLoading(false))
  }
}

export const authGoogle = (userData) => async (dispatch) => {
  try {
    dispatch(setAppReady(false))
    dispatch(setUserAuthData(userData.user))
    localStorage.setItem('authToken', userData.token)
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
