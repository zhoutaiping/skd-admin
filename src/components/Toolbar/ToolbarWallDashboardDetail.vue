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
  .btn-search{
    margin-left: 6px;
  }
}
</style>
<template>
  <div class="toolbar-wall-dashboard-detail">
    <el-select v-if="type === 'firewall'" v-model="params.action_mode" class="select--action">
      <el-option value="" label="全部"/>
      <el-option v-for="item in ACTION_TYPE" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-select v-else v-model="params.action_mode" class="select--action">
      <el-option value="" label="全部"/>
      <el-option v-for="item in ACTION_TCP_TYPE" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
    <el-input v-model="params.request_ip" class="input--search" placeholder="根据访问IP进行搜索" icon="search"/>
    <el-button class="btn-search" type="primary" @click="handleChange">查询</el-button>
  </div>
</template>

<script>
import DateSelection from '@/components/DateSelect/date-selection'
import { ACTION_TYPE, ACTION_TCP_TYPE } from '@/constants/cloud-wall'

export default {

  components: { DateSelection },
  props: {
    type: {
      type: String,
      default: 'firewall'
    }
  },

  data() {
    return {
      ACTION_TYPE,
      ACTION_TCP_TYPE,
      params: {
        // start_time: TODAY,
        // end_time: TODAY,
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
    },
    handleDateChange(start_time, end_time) {
      this.params.start_time = start_time
      this.params.end_time = end_time
      // this.emitInit()
    }
  }
}
</script>
