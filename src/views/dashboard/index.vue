<template>
  <div class="dashboard-container">
    <component :is="'adminDashboard'" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'
import defaultSettings from '@/settings'
import { getToken, setToken, removeToken } from '@/utils/auth' 
function getQueryVariable(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ]),

    Token() {
      return localStorage.getItem('token') || getQueryVariable('token') || ''
    }
  },
  created() {
    if(!this.Token) {
      removeToken()
      localStorage.clear()
      if (defaultSettings.expireUrl) window.open(defaultSettings.expireUrl + '?redirect_url=' + window.location.origin,'_self')
    }
    if (!this.roles.includes('admin')) {
      this.currentRole = 'adminDashboard'
    }

  }
}
</script>
