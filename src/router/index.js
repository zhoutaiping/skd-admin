import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

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
    path: "/register",
    component: () => import("@/views/login/register"),
    hidden: true,
  },
  {
    path: "/network",
    component: () => import("@/views/login/login-network"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/icon",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "index",
        component: () => import("@/views/icons/index"),
        name: "Icons",
        meta: { title: "Icons", icon: "icon", noCache: true },
      },
    ],
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "Dashboard",
        meta: { title: "??????", icon: "shouye", affix: true },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: "/sdk",
    component: Layout,
    alwaysShow: true,
    meta: { title: "SDK??????", icon: "yingyong" },
    redirect: "/app-list",
    children: [
      {
        path: "app-list",
        component: () => import("@/views/sdk/views/MealList/index"),
        name: "SDK_app_list",
        meta: { title: "????????????", icon: "yingyong", noCache: true },
      },
      {
        path: "meal-open",
        hidden: true,
        component: () => import("@/views/sdk/views/MealList/Add"),
        name: "SDK_meal_open",
        meta: {
          title: "????????????-AccessKey",
          icon: "component",
          noCache: true,
          back: `SDK_app_list`,
        },
      },
      // ????????????
      {
        path: "business/:id",
        name: `sdk_business__id`,
        hidden: true,
        component: () => import("@/views/sdk/views/Business/Detail"),
        redirect: {
          name: `sdk_business__id__BusinessSecurity`,
        },
        meta: { title: "?????????" },
        children: [
          // {
          //   path: "applicationSecurity",
          //   name: `sdk_business__id__applicationSecurity`,
          //   component: () =>
          //     import("@/views/sdk/views/Business/ApplicationSecurity/index"),
          //   meta: { title: "????????????", back: `SDK_app_list` },
          // },
          // {
          //   path: "applicationAcceleration",
          //   name: `sdk_business__id__applicationAcceleration`,
          //   component: () =>
          //     import("@/views/sdk/views/Business/ApplicationAcceleration"),
          //   meta: { title: "????????????", back: `SDK_app_list` },
          // },
          {
            path: "businessSecurity",
            name: `sdk_business__id__BusinessSecurity`,
            component: () =>
              import("@/views/sdk/views/Business/BusinessSecurity"),
            meta: { title: "????????????", back: `SDK_app_list` },
          },
          // {
          //   path: "networkSecurity",
          //   name: `sdk_business__id__NetworkSecurity`,
          //   component: () =>
          //     import("@/views/sdk/views/Business/NetworkSecurity"),
          //   meta: { title: "????????????", back: `SDK_app_list` },
          // },
        ],
      },
      {
        path: "app-list/:id",
        name: `SDK_app_id`,
        hidden: true,
        component: () => import("@/views/sdk/views/MealList/Detail"),
        meta: { title: "????????????", back: `SDK_app_list` },
      },
      {
        path: "explorer/:id",
        name: `sdk_explorer`,
        hidden: true,
        component: () => import("@/views/sdk/views/Explorer/index"),
        redirect: {
          name: `sdk_explorer__manage`,
        },
        children: [
          {
            path: "manage",
            name: `sdk_explorer__manage`,
            component: () => import("@/views/sdk/views/Explorer/Manage"),
            meta: { title: "????????????", back: `SDK_app_list` },
          },
          {
            path: "logs",
            name: `sdk_explorer__logs`,
            component: () => import("@/views/sdk/views/Explorer/Logs"),
            meta: { title: "??????????????????", back: `SDK_app_list` },
          },
        ],
      },
      {
        path: "report",
        name: `sdk.router.report`,
        component: () => import("@/views/sdk/views/Report/index"),
        redirect: {
          name: "sdk.router.report__cc",
        },
        meta: { title: "????????????", icon: "fenxi" },
        children: [
          {
            path: "cc",
            name: `sdk.router.report__cc`,
            hidden: true,
            component: () => import("@/views/sdk/views/Report/CC"),
            meta: { title: "CC????????????" },
          },
          {
            path: "visit",
            hidden: true,
            name: `sdk.router.report__visit`,
            component: () => import("@/views/sdk/views/Report/Visit"),
            meta: { title: "????????????" },
          },
          // {
          //   path: 'waf',
          //   name: `sdk.router.report__waf`,
          //   component: () => import('@/views/sdk/views/Report/Waf/index'),
          //   meta: { title: '??????????????????' }
          // },
          // {
          //   path: 'waf/:id',
          //   name: `sdk.router.report__waf__id`,
          //   component: () => import('@/views/sdk/views/Report/Waf/Detail'),
          //   meta: { title: '??????????????????' }
          // }
        ],
      },
      {
        path: "logs",
        name: `SDK_Log`,
        hidden: true,
        component: () => import("@/views/sdk/views/Log/index"),
        meta: { title: "????????????", icon: "cz-jl" },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
