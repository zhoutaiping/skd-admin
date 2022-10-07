import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken, removeToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";
import defaultSettings from "@/settings";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = []; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);
  let token = localStorage.getItem("token");
  if (token) {
    const account_console = store.getters.account_console;
    if (account_console && account_console.length > 0) {
      if ("console.axisnow.xyz" === window.location.host) {
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
    token = getQueryVariable("token");
    if (token) {
      const user_info = await store.dispatch("user/getUserInfo", token);
      await store.dispatch("user/verifyToken", token);
      await store.dispatch("user/getInfo");
      setRoute();
      console.log("setting------", getQueryVariable("setting"));
      if (
        getQueryVariable("setting") === true ||
        getQueryVariable("setting") === "true"
      ) {
        next(to.path);
        NProgress.done();
      } else {
        if (
          user_info &&
          user_info.tenant_list &&
          user_info.tenant_list.length
        ) {
          if (user_info.tenant_list && user_info.tenant_list.length === 1) {
            const tenant = user_info.tenant_list[0];
            if (window.location.host !== "console.axisnow.xyz") {
              localStorage.setItem("tenant_id", tenant.tenant_id);
              window.history.pushState(null, null, "/dashboard");
              // next("/dashboard");
              next();
            } else {
              store.dispatch("user/logout").then((res) => {
                window.location.replace(
                  "https://" +
                    tenant.tenant_prefix +
                    defaultSettings.tenant_prefix_url +
                    "/?token=" +
                    token
                );
              });
              next();
            }
          } else if (
            user_info.tenant_list &&
            user_info.tenant_list.length > 1
          ) {
            const find = user_info.tenant_list.find(
              (i) =>
                i.tenant_prefix + defaultSettings.tenant_prefix_url ===
                window.location.host
            );
            if (window.location.host !== "console.axisnow.xyz" && find) {
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
            if (window.location.host === "console.axisnow.xyz") {
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
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        store.dispatch("user/logout").then((res) => {
          window.location.href =
            defaultSettings.expireUrl +
            "?redirect_url=" +
            window.location.origin;
        });
      }
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});

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
