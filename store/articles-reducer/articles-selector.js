export const getArticles = (state) => {
  return state.articlesReducer.articles
}

export const getPage = (state) => {
  return state.articlesReducer.page
}

export const getArticlesCount = (state) => {
  return state.articlesReducer.articlesCount
}

export const getArticlesFilters = (state) => {
  return state.articlesReducer.filters
}
