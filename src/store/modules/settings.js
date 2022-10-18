import defaultSettings from "@public/settings";

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings;
import FetchAccount from "@/api/fetch-account";
import data from "@/constants/country-list";

const state = {
  theme: "#1664FF",
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  domain_suffix: "",
  tenant_prefix_url: "",
  default_host: "",
  signIn: "", //"https://account.axisnow.xyz/user/sign-in",
  signOutUrl: "", //"https://account.axisnow.xyz/user/sign-out",
};

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  },
  DOMAIN_SUFFIX: (state, domain_suffix) => {
    state.domain_suffix = domain_suffix;
    if (domain_suffix) {
      state.tenant_prefix_url = "." + domain_suffix;
      state.default_host = "console." + domain_suffix;
      state.signIn = "https://account." + domain_suffix + "/user/sign-in";
      state.signOutUrl = "https://account." + domain_suffix + "/user/sign-out";
    }
  },
};

const actions = {
  changeSetting({ commit }, data) {
    commit("CHANGE_SETTING", data);
  },
  async initSetting({ commit }, data) {
    try {
      const res = await FetchAccount.get("/global/setting", {});
      commit("DOMAIN_SUFFIX", res);
    } catch (error) {
      return;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
