<style lang="scss">
  .PopoverConfirm{
    &__content{
      margin-bottom: 16px;
    }
  }
</style>

<template>
  <el-popover
    :title="title"
    v-model="visible"
    :popper-class="b('popper')"
    placement="top"
    width="160"
  >
    <div :class="b('content')">
      {{ content }}
    </div>
    <div style="text-align: right; margin: 0">
      <el-button
        size="mini"
        type="text"
        @click="visible = false"
      >取消</el-button>
      <el-button
        type="primary"
        size="mini"
        @click="handleSubmit"
      >确定</el-button>
    </div>
    <template slot="reference">
      <slot/>
    </template>
  </el-popover>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'PopoverConfirm',

  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: '确认执行？'
    },
    buttenText: {
      type: String,
      default: '删除'
    },
    loading: Boolean
  },

  data() {
    return {
      visible: false
    }
  },

  methods: {
    handleSubmit() {
      this.visible = false
      this.$emit('submit')
    }
  }
})
</script>

