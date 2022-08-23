<template>
  <div>
    <span v-if="data.action === 'create'" class="color--success">创建</span>
    <span v-if="data.action === 'edit'" class="color--warning">编辑</span>
    <span v-if="data.action === 'stop'" class="color--warning">暂停</span>
    <span v-if="data.action === 'open'" class="color--success">启用</span>
    <span v-if="data.action === 'close'" class="color--danger">关闭</span>
    <span v-if="data.action === 'del'" class="color--danger">删除</span>
    <span v-if="data.action === 'sort'" class="color--warning">排序</span>
  </div>
</template>

<script>
export default {
  props: {
    data: Object
  }
}
</script>
