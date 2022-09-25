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
      locale: zhCN,
      routes:['/','/dashboard','register','network']
    }
  },
  watch:{
    $route:{
      handler(val) {
        if(this.routes.includes(this.$route.path)) {
          this.signCallback()
        }
      },
      deep: true
    }
  },
  beforeMount() {
    if(this.routes.includes(this.$route.path)) {
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
        localStorage.setItem('token',Token)
        if(!localStorage.getItem('userinfo')) this.$store.dispatch('user/getUserInfo',Token)
        return
      }
      const _token = getQueryVariable('token') // defaultSettings.code
      if(!_token) {
        removeToken()
        localStorage.clear()
        if (defaultSettings.expireUrl) window.open(defaultSettings.expireUrl + '?redirect_url=' + window.location.origin,'_self');
        return
      }
      Token = _token || Token
      await this.verifyToken(Token)
    },

    async verifyToken(Token, redirect_url) {
      try {
        Token = Token
        setToken(Token)
        const host = window.location.host
        this.$store.dispatch('user/verifyToken',Token)
        this.FetchAccount.get('/user/info',{token:Token}).then(res => {
          localStorage.setItem('userinfo', JSON.stringify(res))
          const hostList  = ['console.axisnow.xyz']
          console.log(hostList.includes(host))
          if(!hostList.includes(host)) {  
            if (process.env.NODE_ENV === 'development') {
              if(res.tenant_list && res.tenant_list.length) {
                this.$router.push('/network')
              }else {
                this.$router.push('/register')
              }
            }else {
              this.$router.push('/')
            }
          } else {
            if(res.tenant_list && res.tenant_list.length) {
              this.$router.push('/network')
            }else {
              this.$router.push('/register')
            }
          }
        }).catch(e =>{
          this.$router.push('/register')
        })
       } catch (error) {
        window.open(defaultSettings.expireUrl + '?redirect_url=' + window.location.origin,'_self');
       }
    }
  }
}


</script>
