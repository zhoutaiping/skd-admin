import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
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
  console.log("---------3",to.path)

  if (hasToken) {
    console.log("---------4")
    if (to.path === '/login') {
      console.log(5)
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      console.log(6)
      const hasGetUserInfo = store.getters.user_id
      if (hasGetUserInfo) {
        const accessRoutes = await store.dispatch('permission/generateRoutes', ['admin'])
        router.addRoutes(accessRoutes)
        next()
        next()
      } else {
        console.log(8)
        try {
          // get user info
          // await store.dispatch('user/getInfo')
          console.log(9)
          const accessRoutes = await store.dispatch('permission/generateRoutes', ['admin'])
          router.addRoutes(accessRoutes)
          next()
        } catch (error) {
          console.log(10)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          next(`/dashboard`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
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