import { createSlice } from '@reduxjs/toolkit'


const articlesReducer = createSlice({
	name: 'articlesReducer',
	initialState: {
		articles: [],
		page: 1,
		articlesCount: 0,
		filter: {
			video: true,
			article: true,
			podcast: true,
		},
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
		setFilter: (state, action) => {
			for (let filterParam in action.payload) {{
					if (action.payload.hasOwnProperty(filterParam)){
						state.filter[filterParam] = Boolean(action.payload[filterParam])
					}
				}
			}
		},


	},
})

export const { setArticles, addArticles, setPage, setFilter } = articlesReducer.actions

export default articlesReducer.reducer
