<template>
  <div>
    <ItemNumber
      v-model="value"
      :title="options.title"
      :unit="options.unit"
      :height="height"
      :loading="loading"
    />
  </div>
</template>

<script>
import ItemNumber from '@/components/Item/ItemNumber'

export default {
  components: { ItemNumber },

  props: {
    height: [String, Number],
    options: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  data() {
    return {
      value: 0,
      unit: '',
      loading: true
    }
  },

  methods: {
    updateOptions(data) {
      this.unit = data.unit
    },

    startLoading() {
      this.loading = true
    },

    updateValue(data) {
      this.startLoading()
      if (typeof data === 'object') {
        this.value = data.value
        this.unit = data.unit
      } else {
        this.value = data
      }
      setTimeout(() => { this.loading = false }, 500)
    }
  }
}
</script>
