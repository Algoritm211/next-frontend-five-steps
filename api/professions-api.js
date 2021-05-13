import {instanceAxios} from "./api-config";


export const professionsAPI = {
  getProfession: (professionData) => {
    return instanceAxios('api/professions/create', professionData)
      .then(data => data.data)
  },

  getProfessions: (professionId) => {
    return instanceAxios(`api/professions/one?professionId=${professionId}`)
      .then(data => data.data)
  }
}
