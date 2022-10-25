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
  let token = localStorage.getItem("token");
  let customer_user_id = getQueryVariable("customer_user_id");
  if (token) {
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
        await store.dispatch("user/getInfo");
        setRoute();
        next({ ...to, replace: true });
      }
    } else {
      redirectHost();
    }
  } else {
    token = getQueryVariable("token");
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
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        console.log("signIn----", signIn);
        store.dispatch("user/logout").then((res) => {
          window.location.href =
            signIn + "?redirect_url=" + window.location.origin;
        });
      }
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

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
  const default_host =
    (store.getters.default_host && store.getters.default_host) ||
    defaultSettings.default_host;
  const tenant_prefix_url =
    (store.getters.tenant_prefix_url && store.getters.tenant_prefix_url) ||
    defaultSettings.tenant_prefix_url;

  if (process.env.NODE_ENV === "development") return true;
  if (window.location.host === default_host) return true;
  const host = tenant_list.map(
    (i) => i.tenant_prefix.toLowerCase() + tenant_prefix_url
  );
  return host.includes(window.location.host) || false;
}

function redirecRouter(user_info, to, next) {
  const default_host =
    (store.getters.default_host && store.getters.default_host) ||
    defaultSettings.default_host;
  const tenant_prefix_url =
    (store.getters.tenant_prefix_url && store.getters.tenant_prefix_url) ||
    defaultSettings.tenant_prefix_url;
  if (user_info && user_info.tenant_list && user_info.tenant_list.length) {
    if (user_info.tenant_list && user_info.tenant_list.length === 1) {
      const tenant = user_info.tenant_list[0];
      if (window.location.host !== default_host) {
        localStorage.setItem("tenant_id", tenant.tenant_id);
        window.history.pushState(null, null, "/dashboard");
        // next("/dashboard");
        next();
      } else {
        store.dispatch("user/logout").then((res) => {
          window.location.replace(
            "https://" +
              tenant.tenant_prefix.toLowerCase() +
              tenant_prefix_url +
              "/?token=" +
              token
          );
        });
        next();
      }
    } else if (user_info.tenant_list && user_info.tenant_list.length > 1) {
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
    } else if (user_info.tenant_list && user_info.tenant_list.length === 0) {
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
