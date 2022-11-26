<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>-->
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar :src="account_th" size="medium" />
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>{{ name }}</el-dropdown-item>
          <el-dropdown-item v-if="is_console" @click.native="handleOpen('/register')" divided>创建网络</el-dropdown-item>
          <el-dropdown-item v-if="is_console" @click.native="handleOpen('/network')" divided>网络切换</el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>
            <span style="display:block;">退 出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import Screenfull from '@/components/Screenfull';
import th_default from '@/assets/images/th.jpg';
import defaultSettings from '@public/settings';
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  data() {
    return {
      th_default
    };
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'device']),
    is_console() {
      // const customer_user_id = localStorage.getItem('customer_user_id') || null;
      // return !!customer_user_id ? false : true;
      return true;
    },
    tenant_prefix_url() {
      return this.$store.getters.tenant_prefix_url;
    },
    account_th() {
      return this.avatar || th_default;
    }
  },
  methods: {
    handleOpen(type) {
      if (!type) return;
      const Token = localStorage.getItem('token');
      if (process.env.NODE_ENV === 'development') {
        this.$router.push(type);
        return;
      }
      let url =
        'https://' +
        this.$store.getters.default_host +
        type +
        '?token=' +
        Token +
        '&setting=true';
      const customer_user_id = localStorage.getItem('customer_user_id') || null;
      if (!!customer_user_id) {
        url = url + '&customer_user_id=' + Number(customer_user_id);
      }
      window.location.replace(url, '_self');
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    logout() {
      this.$store.dispatch('user/logout').then(res => {
        if (this.$store.getters.signOutUrl)
          window.location.replace(this.$store.getters.signOutUrl, '_self');
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
