<template>
  <div class="dashboard-container">
    <adminDashboard />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import adminDashboard from './admin';
import defaultSettings from '@public/settings';
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
      const signIn = this.$store.getters.signIn || defaultSettings.signIn;
      if (signIn) {
        localStorage.clear();
        window.open(
          signIn + '?redirect_url=' + window.location.origin,
          '_self'
        );
      }
    } else {
      window.history.pushState(null, null, '/dashboard');
    }
  }
};
</script>
