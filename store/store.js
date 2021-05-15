import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import appReducer from './app-reducer/app-reducer'
import authReducer from './auth-reducer/auth-reducer'
import coursesReducer from './courses-reducer/courses-reducer'
import articlesReducer from './articles-reducer/articles-reducer'
import lessonReducer from './lesson-reducer/lesson-reducer'

const rootReducer = combineReducers({
  appReducer: appReducer,
  authReducer: authReducer,
  coursesReducer: coursesReducer,
  articlesReducer: articlesReducer,
  lessonReducer: lessonReducer,
})

// create a makeStore function
const makeStore = (context) =>
  configureStore({
    reducer: rootReducer,
  })

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: false })
