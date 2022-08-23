import { Message } from 'element-ui'

class Interceptor {
  constructor({ beforeRequest = [], afterResponse = [], errorMessage = false } = {}) {
    this.beforeRequest = [
      config => {
        if (beforeRequest[0]) {
          beforeRequest[0](config)
        } else {
          return config
        }
      },
      error => {
        if (beforeRequest[1]) {
          beforeRequest[1](error)
        } else {
          return Promise.reject(error)
        }
        errorMessage &&
          Message.error(error.message)
      }
    ]

    this.afterResponse = [
      response => {
        if (afterResponse[0]) {
          afterResponse[0](response)
        } else {
          if (response.data.status) {
            if (response.data.status.code === 16149) {
              const error = response.data.status
              // TODO ACCESS
              console.warn(response.data)
              // window.location.href = '/login'
              return Promise.reject(error)
            }
            if (response.data.status.code === 16161 || response.data.status.code === 1124) {
              const error = response.data.status
              return Promise.reject(error)
            }
            if (response.data.status.code === 100044) {
              const error = response.data
              return Promise.reject(error)
            }
            if (response.data.status.code !== 1) {
              const error = response.data.status
              Message.warning(error.message)
              return Promise.reject(error)
            } else {
              return response
            }
          } else {
            return response
          }
        }
      },
      error => {
        if (afterResponse[1]) {
          afterResponse[1](error)
        } else {
          return Promise.reject(error)
        }
        errorMessage && Message.error(error.message)
      }
    ]
  }
}

const BASE_URL = '/api'
const GAME_URL = '/game_api'
const CLOUD_URL = '/cloud_api'
const PRECEPTION_URL = '/perception_api'
const NORMAL_API = '/normal_api'
const NODE_API = '/node_api'

export { BASE_URL, GAME_URL, CLOUD_URL, PRECEPTION_URL, NORMAL_API, NODE_API }
export default Interceptor
