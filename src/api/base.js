export default function(request) {
  return {
    post(url, data, params) {
      return request({
        url,
        method: 'POST',
        data,
        params
      })
    },
    get(url, params) {
      return request({
        url,
        method: 'GET',
        params
      })
    },
    put(url, data) {
      return request({
        url,
        method: 'put',
        data
      })
    },
    delete(url, data) {
      return request({
        url,
        method: 'delete',
        data
      })
    },
    upload(url, data) {
      return request({
        url,
        method: 'post',
        data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
  }
}
