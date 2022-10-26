import router, { resetRouter } from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, removeToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import defaultSettings from "@public/settings";
import { Message } from "element-ui";
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = []; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);
  let token = null;
  const signIn =
    (store.getters.signIn && store.getters.signIn) || defaultSettings.signIn;
  let local_token = localStorage.getItem("token");
  let url_token = getQueryVariable("token");
  if (!url_token && !local_token) {
    store.dispatch("user/logout").then((res) => {
      window.location.href = signIn + "?redirect_url=" + window.location.origin;
    });
    return;
  }

  if (url_token) {
    if (!local_token) {
      console.log(1, local_token, url_token);
      _url_route_init(to, from, next);
    } else {
      console.log(4, local_token, url_token);
      if (local_token === url_token) {
        return link_route_init(to, from, next);
      } else {
        return _url_route_init(to, from, next);
      }
    }
    return;
  } else {
    if (local_token) {
      console.log(2, local_token, url_token);
      return _token_route_init(to, from, next);
    } else {
      store.dispatch("user/logout").then((res) => {
        window.location.href =
          signIn + "?redirect_url=" + window.location.origin;
      });
      return;
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

async function _url_route_init(to, from, next) {
  localStorage.clear();
  removeToken();
  const token = getQueryVariable("token");
  const customer_user_id = getQueryVariable("customer_user_id");
  if (customer_user_id) {
    localStorage.setItem("customer_user_id", customer_user_id);
  }
  const default_host =
    (store.getters.default_host && store.getters.default_host) ||
    defaultSettings.default_host;
  const tenant_prefix_url =
    (store.getters.tenant_prefix_url && store.getters.tenant_prefix_url) ||
    defaultSettings.tenant_prefix_url;
  const signIn =
    (store.getters.signIn && store.getters.signIn) || defaultSettings.signIn;
  if (token) {
    localStorage.setItem("token", token);
    const user_info = await store.dispatch("user/getUserInfo", token);
    await store.dispatch("user/verifyToken", token);
    await store.dispatch("user/getInfo");
    setRoute();
    if (
      getQueryVariable("setting") === true ||
      getQueryVariable("setting") === "true"
    ) {
      if (checkHost((user_info.tenant_list && user_info.tenant_list) || [])) {
        next(to.path);
        NProgress.done();
      } else {
        redirectHost();
      }
    } else {
      const is_inner =
        (!!user_info.logged_user_info && user_info.logged_user_info.is_inner) ||
        false;
      if (
        is_inner &&
        customer_user_id &&
        window.location.host !== default_host
      ) {
        localStorage.setItem("tenant_id", getQueryVariable("tenant_id"));
        next("/");
      } else {
        if (checkHost((user_info.tenant_list && user_info.tenant_list) || [])) {
          if (
            user_info &&
            user_info.tenant_list &&
            user_info.tenant_list.length
          ) {
            if (user_info.tenant_list && user_info.tenant_list.length === 1) {
              const tenant = user_info.tenant_list[0];
              if (window.location.host !== default_host) {
                localStorage.setItem("tenant_id", tenant.tenant_id);
                window.history.pushState(null, null, "/dashboard");
                // next("/dashboard");
                next();
              } else {
                let url =
                  "https://" +
                  tenant.tenant_prefix.toLowerCase() +
                  tenant_prefix_url +
                  "/?token=" +
                  token;
                if (customer_user_id) {
                  url = url + "&customer_user_id=" + customer_user_id;
                }
                store.dispatch("user/logout").then((res) => {
                  window.location.replace(url);
                });
                next();
              }
            } else if (
              user_info.tenant_list &&
              user_info.tenant_list.length > 1
            ) {
              const find = user_info.tenant_list.find(
                (i) =>
                  i.tenant_prefix.toLowerCase() + tenant_prefix_url ===
                  window.location.host
              );
              if (window.location.host !== default_host && find) {
                localStorage.setItem("tenant_id", find.tenant_id);
                next("/dashboard");
              } else {
                if (to.path) {
                  next(to.path);
                } else {
                  next("/network");
                }
              }
            } else if (
              user_info.tenant_list &&
              user_info.tenant_list.length === 0
            ) {
              if (window.location.host === default_host) {
                next("/register");
              } else {
                // next('dashboard')
                next({ ...to, replace: true });
              }
            }
          } else {
            next("/register");
          }
        } else {
          redirectHost();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      store.dispatch("user/logout").then((res) => {
        window.location.href =
          signIn + "?redirect_url=" + window.location.origin;
      });
    }
  }
}
function _token_route_init(to, from, next) {
  const account_console = store.getters.account_console;
  const user_info = JSON.parse(localStorage.getItem("userinfo"));
  const default_host =
    (store.getters.default_host && store.getters.default_host) ||
    defaultSettings.default_host;
  if (checkHost(user_info.tenant_list || [])) {
    if (account_console && account_console.length > 0) {
      if (window.location.host === default_host) {
        if (["/register", "/network"].includes(to.path)) {
          next();
        } else {
          next("/network");
        }
      } else {
        next();
      }
    } else {
      store.dispatch("user/getInfo");
      setRoute();
      next({ ...to, replace: true });
    }
  } else {
    redirectHost();
  }
}
async function link_route_init(to, from, next) {
  const account_console = store.getters.account_console;
  const user_info = JSON.parse(localStorage.getItem("userinfo"));
  const default_host =
    (store.getters.default_host && store.getters.default_host) ||
    defaultSettings.default_host;
  const is_checkHost = checkHost(
    (user_info.tenant_list && user_info.tenant_list) || []
  );
  if (is_checkHost) {
    if (account_console && account_console.length > 0) {
      if (window.location.host === default_host) {
        if (["/register", "/network"].includes(to.path)) {
          next();
        } else {
          next("/network");
        }
      } else {
        next();
      }
    } else {
      store.dispatch("user/getInfo");
      setRoute();
      next({ ...to, replace: true });
    }
  } else {
    redirectHost();
  }
}

function redirectHost() {
  Message.warning("当前账号未注册当前网络，请登录正确的账号！");
  localStorage.clear();
  const signOutUrl =
    (store.getters.signOutUrl && store.getters.signOutUrl) ||
    defaultSettings.signOutUrl;
  const domain_suffix =
    (store.getters.domain_suffix && store.getters.domain_suffix) ||
    defaultSettings.domain_suffix;

  store.dispatch("user/logout").then((res) => {
    if (signOutUrl)
      window.location.replace(
        signOutUrl + "?redirect_url=" + "https://www." + domain_suffix,
        "_self"
      );
  });
}
function checkHost(tenant_list = []) {
  const customer_user_id =
    localStorage.getItem("customer_user_id") ||
    getQueryVariable("customer_user_id") ||
    null;
  const user_info = JSON.parse(localStorage.getItem("userinfo")) || null;
  // 管理员跳转  不校验
  if (!!customer_user_id && user_info && !!user_info.logged_user_info) {
    return user_info.logged_user_info.is_inner || false;
  }

  const default_host =
    (store.getters.default_host && store.getters.default_host) ||
    defaultSettings.default_host;
  const tenant_prefix_url =
    (store.getters.tenant_prefix_url && store.getters.tenant_prefix_url) ||
    defaultSettings.tenant_prefix_url;
  // 当前 host 不校验
  if (window.location.host === default_host) return true; // 开发环境 不校验
  if (process.env.NODE_ENV === "development") return true;
  // 其他 校验
  const host = tenant_list.map(
    (i) => i.tenant_prefix.toLowerCase() + tenant_prefix_url
  );

  return host.includes(window.location.host) || false;
}

async function setRoute() {
  const accessRoutes = await store.dispatch(
    "permission/generateRoutes",
    window.location.host
  );
  router.addRoutes(accessRoutes);
}

function getQueryVariable(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
