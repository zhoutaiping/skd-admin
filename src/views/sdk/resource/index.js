import axios from 'axios'
import Interceptor, { BASE_URL } from '@/config/interceptor'

axios.defaults.timeout = 35000

const resources = {
  MealResource: axios.create({
    baseURL: BASE_URL
  }),
  ReportResource: axios.create({
    baseURL: BASE_URL
  })
}

const interceptor = new Interceptor({ errorMessage: true })

for (const key of Object.keys(resources)) {
  resources[key].interceptors.request.use(...interceptor.beforeRequest)
  resources[key].interceptors.response.use(...interceptor.afterResponse)
}

export const { MealResource, ReportResource } = resources
