import { articlesAPI } from '../../api/articles-api'
import { addArticles, setArticles, setPage } from './articles-reducer'

export const loadPageArticles = (page, filters) => async (dispatch) => {
  dispatch(setPage(page || 1))
  const data = await articlesAPI.getArticles(page, filters)
  dispatch(setArticles(data))
}

export const addNewArticles = (page) => async (dispatch) => {
  dispatch(setPage(page))
  const data = await articlesAPI.getArticles(page)
  dispatch(addArticles(data))
}
