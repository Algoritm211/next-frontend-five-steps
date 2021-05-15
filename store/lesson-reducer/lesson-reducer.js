import { createSlice } from '@reduxjs/toolkit'

const lessonReducer = createSlice({
  name: 'lessonReducer',
  initialState: {
    currentLesson: null,
    lessonPage: 1,
    error: null,
  },
  reducers: {
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload
    },
    setLessonPage: (state, action) => {
      state.lessonPage = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    clearCurrentLesson: (state, action) => {
      state.currentLesson = null
    },
  },
})

export const { setCurrentLesson, setLessonPage, setError, clearCurrentLesson } =
	lessonReducer.actions
export default lessonReducer.reducer
