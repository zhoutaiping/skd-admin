<style lang="scss">
.toolbar-wall-dashboard {
  overflow: hidden;
  .full-right {
    float: right;
  }
  .select--action {
    width: 120px;
    margin-right: 12px;
  }
  .yd-button-checkbox {
    position: absolute;
  }
}
</style>
<template>
  <div class="toolbar-wall-dashboard">
    <transition
      enter-active-class="animated faster fadeInDown"
      leave-active-class="animated faster fadeOutDown"
    >
      <yd-button-checkbox
        v-if="type === 'firewall'"
        key="firewall"
        v-model="selects"
        :checks="list"
        @submit="handleSelect"
      />
      <yd-button-checkbox
        v-else
        key="firewall_tcp"
        v-model="selects"
        :checks="list"
        item-name="套餐"
        @submit="handleSelect"
      />
    </transition>

    <div class="full-right">
      <el-select
        v-if="type === 'firewall'"
        v-model="params.action_mode"
        class="select--action"
        @change="emitInit"
      >
        <el-option
          value=""
          label="全部"
        />
        <el-option
          v-for="item in ACTION_TYPE"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-else
        v-model="params.action_mode"
        class="select--action"
        @change="emitInit"
      >
        <el-option
          value=""
          label="全部"
        />
        <el-option
          v-for="item in ACTION_TCP_TYPE"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <DateSelection
        custom-secound
        @timevalue="handleDateChange"
      />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Domain from '@/api/domain'
import Tjkd from '@/api/tjkd'

import { ACTION_TYPE, ACTION_TCP_TYPE } from '@/constants/cloud-wall'

import DateSelection from '@/components/DateSelect/DateSelection'
import SelectPackage from '@/components/Select/SelectPackage'

const DATE_FORMAT = 'YYYY-MM-DD'
const TODAY = moment().format(DATE_FORMAT)

export default {
  components: { DateSelection, SelectPackage },

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
      selectValue: [],
      domainList: [],
      packageList: [],
      list: [],
      selects: [],
      params: {
        start_time: TODAY,
        end_time: TODAY,
        package_id: [],
        sub_domain: [],
        action_mode: ''
      }
    }
  },

  watch: {
    type(val) {
      this.initList()
    }
  },

  mounted() {
    this.initList()
  },

  methods: {
    emitInit() {
      this.$emit('init', this.params)
    },

    async initList() {
      const params = {
        per_page: 1000
      }

      this.params.action_mode = ''

      let data
      if (this.type === 'firewall') {
        data = await Domain.allDomains(params)
      } else {
        data = await Tjkd.plusPackageAll(params)
      }

      if (data && data.list) {
        const { list } = data
        let nList = []
        if (this.type === 'firewall') {
          list.forEach(item => {
            const { domain } = item
            nList.push({
              label: domain,
              value: domain
            })
          })
        } else {
          nList = list.filter(item => item.flag === false)
        }
        this.list = nList
        this.selects = []
      }
    },

    handleSelect() {
      if (this.type === 'firewall') {
        this.params.sub_domain = this.selects
      } else {
        this.params.package_id = this.selects
      }

      this.emitInit()
    },

    handleDateChange(start_time, end_time) {
      this.params.start_time = start_time
      this.params.end_time = end_time

      this.emitInit()
    }
  }
}
</script>
