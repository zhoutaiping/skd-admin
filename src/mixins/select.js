import { mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    selectWallDomains: state => state.select.selectWallDomains,
    selectWallDomainsIdMap: state => state.select.wallDomainsIdMap
  }),
  methods: {
    ...mapActions(['fetchWallDomains'])
  }
}
