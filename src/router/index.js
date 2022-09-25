import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  {
    path: '/network',
    component: () => import('@/views/login/login-network'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/sdk',
    component: Layout,
    alwaysShow: true,
    meta: { title: 'SDK管理', icon: 'tab' },
    redirect: '/meal-list',
    children: [
      {
        path: 'meal-list',
        component: () => import('@/views/sdk/views/MealList/index'),
        name: 'SDK_meal_list',
        meta: { title: '应用列表', icon: 'component', noCache: true }
      },
      {
        path: 'meal-open',
        hidden: true,
        component: () => import('@/views/sdk/views/MealList/Add'),
        name: 'SDK_meal_open',
        meta: { title: '服务开通-AccessKey', icon: 'component', noCache: true, back: `SDK_meal_list` }
      },
      // 业务列表
      {
        path: 'business/:id',
        name: `sdk_business__id`,
        hidden: true,
        component: () => import('@/views/sdk/views/Business/Detail'),
        redirect: {
          name: `sdk_business__id__applicationAcceleration`
        },
        meta: { title: '控制台' },
        children: [
          {
            path: 'applicationSecurity',
            name: `sdk_business__id__applicationSecurity`,
            component: () => import('@/views/sdk/views/Business/ApplicationSecurity/index'),
            meta: { title: '应用安全', back: `SDK_meal_list` }
          },
          {
            path: 'applicationAcceleration',
            name: `sdk_business__id__applicationAcceleration`,
            component: () => import('@/views/sdk/views/Business/ApplicationAcceleration'),
            meta: { title: '应用加速', back: `SDK_meal_list` }
          },
          {
            path: 'businessSecurity',
            name: `sdk_business__id__BusinessSecurity`,
            component: () => import('@/views/sdk/views/Business/BusinessSecurity'),
            meta: { title: '业务安全', back: `SDK_meal_list` }
          },
          {
            path: 'networkSecurity',
            name: `sdk_business__id__NetworkSecurity`,
            component: () => import('@/views/sdk/views/Business/NetworkSecurity'),
            meta: { title: '网络安全', back: `SDK_meal_list` }
          }
        ]
      },
      {
        path: 'meal/:id',
        name: `SDK_meal__id`,
        hidden: true,
        component: () => import('@/views/sdk/views/MealList/Detail'),
        meta: { title: '管理', back: `SDK_meal_list` }
      },
      {
        path: 'explorer/:id',
        name: `sdk_explorer`,
        hidden: true,
        component: () => import('@/views/sdk/views/Explorer/index'),
        redirect: {
          name: `sdk_explorer__manage`
        },
        children: [
          {
            path: 'manage',
            name: `sdk_explorer__manage`,
            component: () => import('@/views/sdk/views/Explorer/Manage'),
            meta: { title: '资源管理', back: `SDK_meal_list` }
          },
          {
            path: 'logs',
            name: `sdk_explorer__logs`,
            component: () => import('@/views/sdk/views/Explorer/Logs'),
            meta: { title: '资源分配日志', back: `SDK_meal_list` }
          }
        ]
      },
      {
        path: 'report',
        name: `sdk.router.report`,
        component: () => import('@/views/sdk/views/Report/index'),
        redirect: {
          name: `sdk.router.report__visit`
        },
        alwaysShow: true,
        meta: { title: '数据报表',icon: 'component' },
        children: [
          // {
          //   path: 'cc',
          //   name: `sdk.router.report__cc`,
          //   component: () => import('@/views/sdk/views/Report/CC'),
          //   meta: { title: 'CC攻击统计' }
          // },
          {
            path: 'visit',
            name: `sdk.router.report__visit`,
            component: () => import('@/views/sdk/views/Report/Visit'),
            meta: { title: '访问分析'  }
          },
          // {
          //   path: 'waf',
          //   name: `sdk.router.report__waf`,
          //   component: () => import('@/views/sdk/views/Report/Waf/index'),
          //   meta: { title: '业务安全分析' }
          // },
          // {
          //   path: 'waf/:id',
          //   name: `sdk.router.report__waf__id`,
          //   component: () => import('@/views/sdk/views/Report/Waf/Detail'),
          //   meta: { title: '业务安全分析' }
          // }
        ]
      },
      {
        path: 'logs',
        name: `SDK_Log`,
        component: () => import('@/views/sdk/views/Log/index'),
        meta: { title: '操作记录', icon: 'component' }
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
