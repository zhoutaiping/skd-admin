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
    const tenant_prefix_url = defaultSettings.tenant_prefix_url;
    return {
      tenant_prefix_url: tenant_prefix_url,
      locale: zhCN,
      routes:['/','register','network'],
      hostList: ['console.axisnow.xyz'],
      Token:''
    }
  },
  watch:{
    $route:{
      handler(val) {
        if(this.routes.includes(this.$route.path)) {
          // this.signCallback()
        }
      },
      deep: true
    }
  },
  beforeMount(){
    if(this.routes.includes(this.$route.path)) {
      this.signCallback()
    }
  },
  methods:{
    async signCallback() {
      let Token = getQueryVariable('token')
      if (process.env.NODE_ENV === 'development') {
        if (Token) {
          setToken(Token)
          if(!localStorage.getItem('userinfo'))  this.$store.dispatch('user/getUserInfo',Token)
          await this.verifyToken(Token)
          return
        }
        Token = localStorage.getItem('token')
        if (!Token && defaultSettings.expireUrl) window.open(defaultSettings.expireUrl + '?redirect_url=' + window.location.origin,'_self');
        if(Token) {
          setToken(Token)
          if(!localStorage.getItem('userinfo'))  this.$store.dispatch('user/getUserInfo',Token)
          await this.verifyToken(Token)
        }
      } else {
        if (Token) {
          setToken(Token)
          if(!localStorage.getItem('userinfo'))  this.$store.dispatch('user/getUserInfo',Token)
          await this.verifyToken(Token)
          return
        }
        Token = localStorage.getItem('token')
        if (!Token && defaultSettings.expireUrl) {
          window.open(defaultSettings.expireUrl + '?redirect_url=' + window.location.origin,'_self');
        }
        if(Token) {
          setToken(Token)
          if(!localStorage.getItem('userinfo')){
            this.$store.dispatch('user/getUserInfo',Token)
          }
          await this.verifyToken(Token)
        }
      }
    },

    async verifyToken(Token) {
      this.Token = Token
      const host = window.location.host //当前域名
      const user_info = JSON.parse(localStorage.getItem('userinfo')) || {}
      if(user_info && Object.keys(user_info).length) {
        const {tenant_list = []} = user_info || {}
        if (host === 'console.axisnow.xyz') {
          this.consoleLink(tenant_list, Token)
        } else {
          if (process.env.NODE_ENV === 'development') {
            this.$router.push('/')
            return
          }
          this.linkUrl(tenant_list, Token)
        }
      }
    },
    consoleLink(tenant_list = [], Token) {
      if(!tenant_list.length){
        this.$router.push('/register')
      }else if(tenant_list.length === 1){
        const tenant = tenant_list[0]
        const host = window.location.host //当前域名
        const url = tenant.tenant_prefix + this.tenant_prefix_url
        if(!this.$route.path === 'network') return
        if (url !==host) {
          window.location.replace(
            "https://" +  tenant.tenant_prefix + this.tenant_prefix_url + "/dashboard?token=" + Token
          );
        }
        
      }else {
        this.$router.push('/network')
      }
    },
    linkUrl(tenant_list = [], Token) {
      const host = window.location.host
      const Index = tenant_list.find(i => {
        return host === i.tenant_prefix + this.tenant_prefix_url
      })
      if(Index && host !== 'console.axisnow.xyz') {
        // window.location.replace(
        //   "https://" +  Index.tenant_prefix + this.tenant_prefix_url + "/?token=" + Token
        // );
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/network')
      }
    }
  }

}


</script>
