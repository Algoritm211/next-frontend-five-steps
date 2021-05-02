import { instanceAxios } from './api-config'


export const articlesAPI = {
	getArticles: (page, filters) => {
		return instanceAxios.get(`/article?page=${page}&filters=${filters.join(',')}`)
			.then(data => data.data)
	}
}
