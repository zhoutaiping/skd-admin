<template>
  <span>
    <span
      v-if="Number(data.status) === 0"
      class="color--default"
      text="关闭"
    >关闭</span>
    <span
      v-if="Number(data.status) === 1"
      class="color--success"
      text="启用"
    >启用</span>
    <span
      v-if="Number(data.status) === 2"
      class="color--warning"
      text="暂停"
    >暂停</span>
    <span
      v-if="Number(data.status) === 3"
      class="color--danger"
      text="已到期"
    >已到期</span>
    <span
      v-if="Number(data.status) === 4"
      class="color--default"
      text="降级"
    >降级</span>
  </span>
</template>

<script>
export default {
  name: 'ColumnRulesStatus',
  props: {
    data: Object
  }
}
</script>
