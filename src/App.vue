<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import { LocaleProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  name: 'App',
  components: { ALocaleProvider: LocaleProvider },
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
