import Vue from 'vue'
import { mapMutations, mapState, mapActions } from 'vuex'
import { deepClone } from '@/utils'

export default {
  data() {
    return {
      appEnv: 'sdk'
    }
  },

  created() {
    function envView(str) {
      return str ? str.replace('__companyEN__', 'SDK') : ''
    }

    Vue.filter('envView', envView)
  },

  computed: mapState({
    appLanguage: state => state.app.language,
    appName: state => state.app.name,
    appPermissions: state => state.app.permissions,
    appAssets: state => state.app.assets,
    appReady: state => state.app.ready,
    pageData: state => state.app.pageData,
    pagePagination: state => state.app.pagination,
    moduleLabel: state => state.app.moduleLabel,
    moduleSettings: state => state.app.moduleSettings
  }),

  methods: {
    ...mapMutations(['UPDATE_PAGE_BACK', 'SET_PAGE_DATA', 'SET_SIDEBAR_GROUP_ID', 'SET_PAGINATION', 'CLEAR_PAGINATION']),
    ...mapActions({
      'fetchModuleLabel': 'fetchModuleLabel'
    }),

    i18nSelects(list) {
      list.forEach(item => {
        item.label = item.label[this.appLanguage]
      })
      return list
    },

    envSelects(selects) {
      selects = deepClone(selects)
      selects.forEach(item => {
        item.label = typeof item.label === 'string' ? item.label.replace('__companyEN__', 'SDK') : item.label
      })
      return selects
    }
  }
}
