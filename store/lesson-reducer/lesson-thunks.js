import {
	setCurrentLesson,
	setError,
	setLessonPage,
} from './lesson-reducer'
import { lessonAPI } from '../../api/lesson-api'
import { setCurrentCourse } from '../courses-reducer/courses-reducer'

export const createLesson = (lessonData) => async (dispatch) => {
	const data = await lessonAPI.createLesson(lessonData)
	dispatch(setCurrentLesson(data.lesson))
}

export const updateLesson = (lessonData) => async (dispatch) => {
	const data = await lessonAPI.updateLesson(lessonData)
	dispatch(setCurrentLesson(data.lesson))
}

export const loadLesson = (courseId, lessonNumber) => async (dispatch) => {
	try {
		dispatch(setCurrentLesson(null))
		dispatch(setError(null))
		const data = await lessonAPI.getLesson(courseId, lessonNumber)
		// console.log(data)
		if (data.message) {
			return
		}
		dispatch(setCurrentLesson(data.lesson))
		dispatch(setLessonPage(lessonNumber))
		dispatch(setCurrentCourse(data.course))
	} catch (error) {
		dispatch(setError('Error'))
	}

}
