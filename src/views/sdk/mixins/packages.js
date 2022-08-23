import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: mapState({
    packageId: state => state.packages.id,
    packageList: state => state.packages.list,
    packageInfo: state => state.packages.info,
    packageChannelList: state => state.packages.channelList
  }),
  methods: {
    ...mapMutations({
      'PACKAGE_SET_ID': 'packages/SET_ID'
    }),
    ...mapActions({
      'packageFetchList': 'packages/fetchList',
      'packageFetchInfo': 'packages/fetchInfo',
      'packageFetchChannel': 'packages/fetchChannel'
    })
  }
}
