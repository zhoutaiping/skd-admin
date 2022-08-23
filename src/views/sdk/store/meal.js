import * as types from '../constants/ActionTypes'
import MealResource from '../resource/MealResource'

const state = {
  // meal list
  list: [],
  total: 0,
  loading: false,
  name: '',

  // rule list
  rule: {
    list: [],
    total: 0,
    loading: false,

    // rule dialog
    dialog: {
      // add || edit
      mode: 'add',
      visible: false,
      loading: false,
      params: {},
      info: {}
    }
  }
}

const actions = {
  getMealList({ commit }, params) {
    commit(types.MEAL_LIST_LOADING, { loading: true })
    return MealResource.getMealList(params)
      .then(response => {
        const { list, total } = response.data.data
        commit(types.RECEIVE_MEAL_LIST, { list, total })
        commit(types.MEAL_LIST_LOADING, { loading: false })
      })
      .catch(() => {
        commit(types.MEAL_LIST_LOADING, { loading: false })
      })
  },
  changeMealName({ commit }, { name }) {
    commit(types.MEAL_NAME_CHANGE, { name })
  },
  getRuleList({ commit }, params) {
    commit(types.FORWARD_RULE_LIST_LOADING, { loading: true })
    return MealResource.getRuleList(params)
      .then(response => {
        const { list, total } = response.data.data

        list.forEach(row => {
          row.fold = false
          const arr = []
          row.records.forEach(row2 => {
            arr.push(row2.value)
          })
          row.originIpsArray = arr
        })

        commit(types.RECEIVE_FORWARD_RULE_LIST, { list, total })
        commit(types.FORWARD_RULE_LIST_LOADING, { loading: false })
      })
      .catch(() => {
        commit(types.FORWARD_RULE_LIST_LOADING, { loading: false })
      })
  },
  triggerRuleDialogVisible({ dispatch, commit }, { visible, mode, params }) {
    if (mode === 'edit' && params) {
      params.source_type = parseInt(params.source_type, 10)
    }

    commit(types.RULE_DIALOG_VISIBLE, { visible })
    commit(types.RULE_DIALOG_MODE, { mode })
    commit(types.RECEIVE_RULE_DIALOG_PARAMS, { params })
  },
  getRuleInfo({ commit }, params) {
    commit(types.RULE_DIALOG_LOADING, { loading: true })
    return MealResource.getRuleInfo(params)
      .then(response => {
        commit(types.RECEIVE_RULE_DIALOG_INFO, { info: response.data.data })
        commit(types.RULE_DIALOG_LOADING, { loading: false })
      })
      .catch(() => {
        commit(types.RULE_DIALOG_LOADING, { loading: false })
      })
  },
  saveRule({ commit, dispatch }, params) {
    commit(types.RULE_DIALOG_LOADING, { loading: true })
    return MealResource.saveRule(params)
      .then(response => {
        commit(types.RULE_DIALOG_LOADING, { loading: false })
        dispatch('triggerRuleDialogVisible', { visible: false })
        dispatch('getRuleList', {
          package_id: params.package_id,
          page: 1,
          per_page: 10
        })
      })
      .catch(() => {
        commit(types.RULE_DIALOG_LOADING, { loading: false })
      })
  },
  deleteRule({ commit, dispatch }, params) {
    commit(types.RULE_DIALOG_LOADING, { loading: true })
    return MealResource.deleteRule(params)
      .then(response => {
        commit(types.RULE_DIALOG_LOADING, { loading: false })
        dispatch('getRuleList', {
          package_id: params.package_id,
          page: 1,
          per_page: 10
        })
      })
      .catch(() => {
        commit(types.RULE_DIALOG_LOADING, { loading: false })
      })
  }
}

const mutations = {
  [types.RECEIVE_MEAL_LIST](state, { list, total }) {
    state.list = list
    state.total = Number(total)
  },
  [types.MEAL_LIST_LOADING](state, { loading }) {
    state.loading = loading
  },
  [types.MEAL_NAME_CHANGE](state, { name }) {
    state.name = name
  },
  [types.RECEIVE_FORWARD_RULE_LIST](state, { list, total }) {
    state.rule.list = []
    state.rule.list = list
    state.rule.total = Number(total)
  },
  [types.FORWARD_RULE_LIST_LOADING](state, { loading }) {
    state.rule.loading = loading
  },
  [types.RULE_DIALOG_MODE](state, { mode }) {
    state.rule.dialog.mode = mode
  },
  [types.RULE_DIALOG_VISIBLE](state, { visible }) {
    state.rule.dialog.visible = visible
  },
  [types.RULE_DIALOG_LOADING](state, { loading }) {
    state.rule.dialog.loading = loading
  },
  [types.RECEIVE_RULE_DIALOG_PARAMS](state, { params }) {
    state.rule.dialog.params = params
  },
  [types.RECEIVE_RULE_DIALOG_INFO](state, { info }) {
    state.rule.dialog.info = info
  }
}

export default {
  state,
  actions,
  mutations
}
