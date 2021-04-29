import {combineReducers, configureStore, createStore} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import appReducer from './app-reducer/app-reducer'
import authReducer from './auth-reducer/auth-reducer'

const rootReducer = combineReducers({
  appReducer: appReducer,
  authReducer: authReducer
})

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
    if (state.count) nextState.count = state.count // preserve count value on client side navigation
    return nextState
  } else {
    return rootReducer(state, action)
  }
}


// create a makeStore function
const makeStore = context => configureStore({
    reducer: rootReducer,
  });

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});
