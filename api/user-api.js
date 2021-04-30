import { instanceAxios } from './api-config'


export const userAPI = {
	uploadAvatar: (photoFile) => {
		const formData = new FormData()
		formData.append('photo', photoFile)
		return instanceAxios.post('user/avatar', formData)
			.then((data) => data.data)
	},
	deleteAvatar: () => {
		return instanceAxios.delete('user/avatar')
			.then((data) => data.data)
	},
	updateUser: (updateObj) => {
		return instanceAxios.patch('user/update/', updateObj)
			.then(data => data.data)
	},
	deleteAccount: () => {
		return instanceAxios.delete('user/')
			.then(data => data.data)
	}
}
