import { mapState } from 'vuex'

export default {
  computed: mapState({
    consoleLabel: state => state.console.label
  })
}
