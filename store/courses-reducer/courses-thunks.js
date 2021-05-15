import { coursesAPI } from '../../api/courses-api'
import {
  deleteCourse,
  setAllCourses,
  setCurrentCourse,
  setUserAuthorCourses,
  setUserCourses,
  toggleIsLoading,
  updateCourse,
} from './courses-reducer'
import { setUserData } from '../auth-reducer/auth-reducer'
import { clearCurrentLesson } from '../lesson-reducer/lesson-reducer'

export const createCourse = (courseData) => async (dispatch) => {
  dispatch(clearCurrentLesson())
  dispatch(toggleIsLoading(true))
  const data = await coursesAPI.createCourse(courseData)
  dispatch(setCurrentCourse(data.course))
  dispatch(toggleIsLoading(false))
}

export const getAllCourses = (page, filters) => async (dispatch) => {
  dispatch(toggleIsLoading(true))
  const data = await coursesAPI.getAllCourses(page, filters)
  dispatch(setAllCourses(data))
  dispatch(toggleIsLoading(false))
  dispatch(setCurrentCourse(null))
}

export const getUserCourses = () => async (dispatch) => {
  dispatch(toggleIsLoading(true))
  const data = await coursesAPI.getUserCourses()
  dispatch(setUserCourses(data))
  dispatch(toggleIsLoading(false))
}

export const getUserAuthorCourses = () => async (dispatch) => {
  dispatch(toggleIsLoading(true))
  const data = await coursesAPI.getUserAuthorCourses()
  dispatch(setUserAuthorCourses(data))
  dispatch(toggleIsLoading(false))
}

export const loadCurrentCourse = (courseId) => async (dispatch) => {
  const data = await coursesAPI.getCourse(courseId)
  dispatch(setCurrentCourse(data.course))
}

export const subscribeToCourse = (courseId) => async (dispatch) => {
  const data = await coursesAPI.subscribeToCourse(courseId)
  dispatch(setUserData(data.user))
  dispatch(setCurrentCourse(data.course))
}

export const unsubscribeCourse = (courseId) => async (dispatch) => {
  const data = await coursesAPI.unsubscribeCourse(courseId)
  dispatch(setUserData(data.user))
  dispatch(setCurrentCourse(data.course))
}

export const toggleLikeCourse = (courseId) => async (dispatch) => {
  const data = await coursesAPI.toggleLikeCourse(courseId)
  dispatch(setUserData(data.user))
  dispatch(updateCourse(data.course))
}

export const toggleDeleteCourse = (courseId) => async (dispatch) => {
  const data = await coursesAPI.toggleDeleteCourse(courseId)
  dispatch(setUserData(data.user))
  dispatch(deleteCourse(data.course))
}
