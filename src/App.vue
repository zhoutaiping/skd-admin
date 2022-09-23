<template>
  <div id="app">
    <a-locale-provider :locale="locale">
      <router-view />
    </a-locale-provider>
  </div>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { getToken, setToken, removeToken } from '@/utils/auth' 
import defaultSettings from '@/settings'
function getQueryVariable(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
export default {
  name: 'App',
  components: { ALocaleProvider: ConfigProvider },
  data() {
    return {
      locale: zhCN
    }
  },
  watch:{
    $route:{
      handler(val) {
        if(['/login', '/', '/dashboard'].includes(this.$route.path)) {s
          this.signCallback()
        }else {
          const _token = getQueryVariable('token')
          const redirect_url = process.env.NODE_ENV !== 'development' ?  'http://console.axisnow.xyz' : 'http://localhost:8080'
          if(_token) this.verifyToken(_token, redirect_url)
        }
        console.log('route', val)
      },
      deep: true
    }
  },
  beforeMount() {
    if(['/login', '/', '/dashboard'].includes(this.$route.path)) {
      this.signCallback()
    }
  },
  methods:{
    async signCallback() {

      let Token
      if (process.env.NODE_ENV !== 'development') {
        Token = localStorage.getItem('token')
      } else {
        Token = localStorage.getItem('token')
      }

      if (Token) {
        setToken(Token)
        this.$router.push({ path: '/dashboard' })
        return
      }
      const _token = getQueryVariable('token') // defaultSettings.code
      const redirect_url = process.env.NODE_ENV !== 'development' ?  'http://console.axisnow.xyz' : 'http://localhost:8080/dashboard'
      if(!_token) {
        removeToken()
        localStorage.clear()
        if (defaultSettings.expireUrl) window.open(defaultSettings.expireUrl + '?redirect_url=' + redirect_url,'_self');
        return
      }
      Token = _token || Token
      await this.verifyToken(Token)
    },

    async verifyToken(Token, redirect_url) {
      try {
        Token = Token
        setToken(Token)
        this.$store.dispatch('user/verifyToken',Token).then(res =>{
          this.$router.push({ path: '/dashboard' })
        })
       } catch (error) {
        window.open(defaultSettings.expireUrl + '?redirect_url=' + redirect_url,'_self');
       }
    }
  }
}


</script>
