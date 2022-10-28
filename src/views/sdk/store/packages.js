import Fetch from "@/api/fetch-account";

const state = {
  id: "",
  info: {},
  list: [],
  channelList: [],
};

const mutations = {
  SET_ID(state, id) {
    state.id = id;
  },

  SET_INFO(state, data) {
    state.info = data;
  },

  SET_LIST(state, data) {
    state.list = data;
  },

  SET_CHANNEL_LIST(state, data) {
    state.channelList = data;
  },
};

const actions = {
  async fetchList({ commit, state }) {
    const params = {
      page: 1,
      page_size: 9999,
    };
    const data = await Fetch.get("/sdk/list", params);
    console.log("-----package_list", data);
    commit("SET_LIST", data.list);
  },

  async fetchInfo({ commit, state }) {
    const params = {};
    const data = await Fetch.get("V4/tjkd.app.domain.info", params);
    commit("SET_INFO", data);
  },

  async fetchChannel({ commit, state }) {
    const params = {
      package_id: state.id,
    };
    console.log("fetchChannel", params);
    // const data = await Fetch.get('V4/tjkd.app.package.channel.list', params)
    const data = {
      list: [],
    };
    commit("SET_CHANNEL_LIST", data.list);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
