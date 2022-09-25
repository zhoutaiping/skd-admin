import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, removeToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/network','/register','/login','/news'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
      const account_console = store.getters.account_console
      if (account_console && account_console.length > 0) {
        next()
      } else {
        try {
         
          await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', ['admin'])
          router.addRoutes(accessRoutes)
          next()
        } catch (error) {
          removeToken()
          localStorage.clear()
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          next(`/dashboard`)
          NProgress.done()
        }
      }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})



function getQueryVariable(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}