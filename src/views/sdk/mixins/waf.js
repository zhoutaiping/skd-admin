import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    wafSelects: state => state.sdkWaf.selects,
    wafRules: state => state.sdkWaf.rules,
    wafLogics: state => state.sdkWaf.logics,
    wafLogicMap: state => state.sdkWaf.logicMap,
    wafLoadingSettings: state => state.sdkWaf.loadingSettings
  }),
  methods: {
    ...mapMutations({
      'PACKAGE_SET_ID': 'packages/SET_ID'
    }),
    ...mapActions({
      'wafFetchSettings': 'sdkWaf/fetchSettings'
    })
  }
}
