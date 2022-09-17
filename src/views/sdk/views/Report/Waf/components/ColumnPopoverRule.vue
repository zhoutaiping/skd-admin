<style lang="scss">
.popover--wall-rule-id {
  cursor: pointer;
  line-height: 1;
  margin-right: 5px;
  margin-bottom: 5px;
  text-align: center;
  display: inline-block;
  border-bottom: 1px dotted $--color-primary;
  color: $--color-primary;
  &:last-child {
    margin-right: 0px;
  }
  &:hover {
    border-color: rgba(0, 0, 0, 0);
  }
}
</style>

<template>
  <el-popover
    :placement="placement"
    width="250"
    trigger="hover"
    @show="init"
  >
    <yd-loading v-if="loading" />
    <p
      v-if="message"
      style="text-align: center"
    >{{ message }}</p>
    <ColumnRules
      v-else
      :items="data"
    />
    <span
      slot="reference"
      class="popover--wall-rule-id"
    >
      {{ id }}
    </span>
  </el-popover>
</template>

<script>
import ColumnRules from '@/console/taichi-app/components/TableWAF/components/ColumnRules'

export default {
  components: { ColumnRules },

  props: {
    id: [String, Number],
    placement: {
      type: String,
      default: 'top'
    }
  },

  data() {
    return {
      data: [],
      loading: false,
      message: ''
    }
  },

  methods: {
    async init() {
      if (!this.id) return
      this.loading = true

      try {
        const data = await this.Fetch.get('V4/firewall.policy.get_code', { code: this.id })
        if (data && data.rules) {
          this.message = ''
          this.data = data.rules
        }
        this.loading = false
      } catch (e) {
        this.message = '策略不存在'
        this.loading = false
      }
    }
  }
}
</script>
