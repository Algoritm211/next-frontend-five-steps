import { instanceAxios } from './api-config'


export const articlesAPI = {
	getArticles: (page, filterObj) => {
		return instanceAxios.get(`/article?article=${filterObj?.article || ''}&page=${page || ''}&podcast=${filterObj?.podcast || ''}&video=${filterObj?.video || ''}`)
			.then(data => data.data)
	}
}
