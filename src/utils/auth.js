import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const USER_ID = 'USER_ID'
const USER_TYPE = 'USER_TYPE'
const USER_ROOT_ID = 'USER_ROOT_ID'

export function setUserType(type) {
  localStorage.setItem(USER_TYPE, type)
}

export function getUserstore() {
  const userId = localStorage.getItem(USER_ID)
  const userRootId = localStorage.getItem(USER_ROOT_ID)
  const userType = localStorage.getItem(USER_TYPE)
  return { userType, userId, userRootId }
}

export function rmUserstore() {
  localStorage.removeItem(USER_ID)
  localStorage.removeItem(USER_ROOT_ID)
  localStorage.removeItem(USER_TYPE)
}

export function setUserStore(data) {
  localStorage.setItem(USER_ID, data.id)
  if (data.member_id) {
    setUserType('child')
    localStorage.setItem(USER_ROOT_ID, data.member_id)
  } else {
    setUserType('root')
  }
}
