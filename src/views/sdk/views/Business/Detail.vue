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
          title: '应用加速',
          name: 'sdk_business__id__applicationAcceleration'
        },
        {
          title: '应用安全',
          name: 'sdk_business__id__applicationSecurity'
        },
        {
          title: '业务安全',
          name: 'sdk_business__id__BusinessSecurity'
        },
        {
          title: '网络安全',
          name: 'sdk_business__id__NetworkSecurity'
        }
      ]
    }
  }
}
</script>
