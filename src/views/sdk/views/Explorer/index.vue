<template>
  <ConsolePageLayout :tabs="navbar">
    <router-view />
  </ConsolePageLayout>
</template>

<script>
export default {
  data() {
    return {
      navbar: [
        {
          name: 'sdk_explorer__manage',
          title: '资源管理'
        },
        {
          name: 'sdk_explorer__logs',
          title: '资源分配日志'
        }
      ]
    }
  }
}
</script>
