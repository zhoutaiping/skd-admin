const select = {
  state: {
    region: [],
    regionMap: {},
  },

  mutations: {
    SET_SELECT_REGION: (state, data) => {
      state.region = data;
    },

    SET_SELECT_REGION_MAP: (state, data) => {
      state.regionMap = data;
    },
  },

  actions: {},
};

export default select;
