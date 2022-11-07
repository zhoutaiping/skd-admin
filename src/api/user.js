import request from '@/service/request-account'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}
export function getInfo(token) {
  return request({
    url: '/user/verifyToken',
    method: 'get',
    params: { token }
  })
}
export function verifyToken(token) {
  return request({
    url: '/user/verifyToken',
    method: 'get',
    params: { token }
  })
}
export function logout(data) {
  return request({
    url: '/user/logout',
    method: 'post',
    data
  })
}


export function signOut(token) {
  return request({
    url: '/user/sign-out',
    method: 'get',
    params: { token }
  })
}