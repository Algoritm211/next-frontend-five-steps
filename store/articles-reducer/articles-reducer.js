import { createSlice } from '@reduxjs/toolkit'

const articlesReducer = createSlice({
  name: 'articlesReducer',
  initialState: {
    articles: [],
    page: 1,
    articlesCount: 0,
    filters: [],
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload.articles
      state.articlesCount = action.payload.articlesCount
    },
    addArticles: (state, action) => {
      state.articles.push(...action.payload.articles)
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    setFilters: (state, action) => {
      state.filters = [...action.payload]
    },
  },
})

export const { setArticles, addArticles, setPage, setFilters } = articlesReducer.actions

export default articlesReducer.reducer
