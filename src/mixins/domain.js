import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      domainId: state => state.domain.id,
      domainInfo: state => state.domain.info,
      domainInfoReady: state => state.domain.infoReady,
      domainSettings: state => state.domain.settings,
      domainSettingsLoading: state => state.domain.settingsLoading,
      domainPlanInfo: state => state.domain.planInfo,
      domainMirrorInfo: state => state.domain.mirrorInfo,
      domainPlanInfoReady: state => state.domain.planInfoReady,
      domainPlanConfig: state => state.domain.planConfig
    })
  },

  methods: {
    ...mapMutations({
      'DOMAIN_SET_ID': 'domain/SET_ID'
    }),
    ...mapActions({
      'domainFetchInfo': 'domain/fetchInfo',
      'domainFetchSettings': 'domain/fetchSettings',
      'domainSaveSettings': 'domain/saveSettings',
      'domainFetchPlanInfo': 'domain/fetchPlanInfo'
    })
  }
}
