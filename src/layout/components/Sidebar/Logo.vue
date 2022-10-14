<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/dashboard">
        <!-- <img v-if="logo" :src="badge" class="sidebar-logo" /> -->
        <svg-icon icon-class="logo" class="sidebar-logo" style="margin-left:5px;color: #1e212a;" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/dashboard">
        <svg-icon
          icon-class="logo"
          class="sidebar-logo"
          style="margin-left:16px;margin-right: 0px;color: #1e212a;"
        />
        <el-divider clsss="divider-box" direction="vertical" />
        <h1 class="sidebar-title">{{ tanant || '--' }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import defaulSetting from '@public/settings';
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    user_info() {
      return JSON.parse(localStorage.getItem('userinfo'));
    },
    tanant() {
      const tanant_id = localStorage.getItem('tenant_id');
      const find = this.user_info.tenant_list.find(i => {
        return Number(i.tenant_id) === Number(tanant_id);
      });
      return find ? find.tenant_name : window.location.host;
    }
  },
  data() {
    return {
      title: defaulSetting.title,
      logo: defaulSetting.logo
    };
  }
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 50px;
      height: 50px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      //color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      width: 50px;
      height: 50px;
      margin-right: 0px;
    }
  }
}
.divider-box {
  background-color: #1e212a;
  height: 30px;
  margin-left: 0;
}
</style>
