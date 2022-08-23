<style lang="scss">
.SelectMultipleMany {
  &__popper {
    padding: 0px;

    .footer {
      border-top: 1px solid #EEE;
      text-align: center;
    }
  }
}
</style>

<template>
  <el-popover
    v-model="visible"
    :popper-class="b('popper')"
    placement="bottom-start"
    width="300"
    @after-enter="init"
  >
    <TransferItem
      ref="TransferItem"
      :size="size"
      v-model="value"
      :fetch-data="fetchData"
      style="margin-bottom: 12px"
      @update="handleUpdate"
    />
    <div
      style="padding: 16px"
      class="footer"
    >
      <el-button @click="visible = false">取消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit"
      >确定</el-button>
    </div>
    <el-button slot="reference">
      <template v-if="selectTotalView === 0">
        全部网站<i class="el-icon-arrow-down el-icon--right" />
      </template>
      <template v-else>
        已选择 [{{ selectTotalView }} / {{ total }}] <i class="el-icon-arrow-down el-icon--right" />
      </template>
    </el-button>
  </el-popover>
</template>

<script>
import create from '@/utils/create-basic'
import TransferItem from '@/components/Transfer/TransferItem'

export default create({
  name: 'SelectMultipleMany',

  components: { TransferItem },

  props: {
    value: {
      type: Array,
      default() {
        return []
      }
    },
    fetchData: Function,
    total: Number,
    selectTotal: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 1000
    }
  },

  data() {
    return {
      visible: false,
      selectTotalView: 0
    }
  },

  methods: {
    handleUpdate(e) {
      this.$emit('update', e)
    },

    initValue() {
      this.selectTotalView = 0
    },

    init() {
      setTimeout(() => {
        this.$refs.TransferItem.init()
      }, 50)
    },

    handleSubmit() {
      this.$emit('submit', this.value)
      this.selectTotalView = this.selectTotal ? this.selectTotal : this.value.length
      this.visible = false
    }
  }
})
</script>
