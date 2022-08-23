<style lang="scss">
.PopoverWallRuleId {
  &__text {
    cursor: pointer;
    text-align: center;
    display: inline-block;
    border-bottom: 1px dotted $--color-primary;
    color: $--color-primary;
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0);
  }

  &__popper{
    font-size: 12px;
  }
}
</style>

<template>
  <el-popover
    :placement="placement"
    :popper-class="b('popper')"
    width="250"
    trigger="hover"
    @show="init"
  >
    <yd-loading v-if="loading" />
    <p
      v-if="message"
      style="text-align: center"
    >{{ message }}</p>
    <columnRules
      v-else
      :items="data"
    />
    <span
      slot="reference"
      class="popover--wall-rule-id"
    >
      <a :class="b('text')">
        {{ id }}
      </a>
    </span>
  </el-popover>
</template>

<script>
import columnRules from '@/components/Column/ColumnRules'
import create from '@/utils/create-basic'

export default create({
  name: 'PopoverWallRuleId',

  components: { columnRules },

  props: {
    id: [String, Number],
    placement: {
      type: String,
      default: 'bottom'
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
})
</script>
