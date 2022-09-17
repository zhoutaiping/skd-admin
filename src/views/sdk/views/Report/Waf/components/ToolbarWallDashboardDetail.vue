<style lang="scss">
.toolbar-wall-dashboard-detail {
  .full-right {
    float: right;
    .wrapper {
      float: none;
      .el-button {
        display: none;
      }
    }
  }
  .select--action {
    width: 120px;
  }
  .input--search {
    width: 250px;
    margin-left: 6px;
  }
  .btn-search {
    margin-left: 6px;
  }
}
</style>
<template>
  <div class="toolbar-wall-dashboard-detail">
    <yd-form-select
      :selects="wafSelects.actionType"
      v-model="params.action_mode"
      default-text="全部"
      style="width: 120px"
    />
    <el-input
      v-model="params.request_ip"
      class="input--search"
      placeholder="根据访问IP进行搜索"
      icon="search"
    />
    <el-button
      class="btn-search"
      type="primary"
      @click="handleChange"
    >查询</el-button>
  </div>
</template>

<script>
import wafMixins from '@/console/taichi-app/mixins/waf'

export default {
  mixins: [wafMixins],

  props: {
    type: {
      type: String,
      default: 'firewall'
    }
  },

  data() {
    return {
      params: {
        action_mode: '',
        request_ip: ''
      }
    }
  },

  mounted() {
    this.emitInit()
  },

  methods: {
    emitInit() {
      this.$emit('init', this.params)
    },

    handleChange() {
      this.emitInit()
    }
  }
}
</script>
