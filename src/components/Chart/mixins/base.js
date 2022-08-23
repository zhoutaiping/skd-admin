export default {
  props: {
    data: Object,
    tooltipVisible: {
      type: Boolean,
      default: true
    },
    legendVisible: {
      type: Boolean,
      default: true
    },
    dataEmpty: Boolean,
    height: {
      type: Number,
      default: 400
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    extend: {
      type: Object,
      default() {
        return {}
      }
    },
    loading: Boolean
  },

  data() {
    return {
      settings: {

      }
    }
  }
}
