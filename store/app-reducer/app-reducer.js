import { createSlice } from '@reduxjs/toolkit'

const appReducer = createSlice({
  name: 'appReducer',
  initialState: {
    isReady: false,
  },
  reducers: {
    setAppReady: (state, action) => {
      state.isAppReady = action.payload
    },
  },
})

export const { setAppReady } = appReducer.actions
export default appReducer.reducer
