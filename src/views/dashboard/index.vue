<template>
  <div class="dashboard-container">
    <adminDashboard />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import adminDashboard from './admin';
import defaultSettings from '@/settings';
import { removeToken } from '@/utils/auth';
function getQueryVariable(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    };
  },
  computed: {
    ...mapGetters(['roles']),

    Token() {
      return localStorage.getItem('token') || getQueryVariable('token') || '';
    }
  },
  created() {
    if (!this.Token) {
      removeToken();
      localStorage.clear();
      if (defaultSettings.expireUrl)
        window.open(
          defaultSettings.expireUrl + '?redirect_url=' + window.location.origin,
          '_self'
        );
    } else {
      window.history.pushState(null, null, '/dashboard');
    }
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'adminDashboard'
    // }
  }
};
</script>
