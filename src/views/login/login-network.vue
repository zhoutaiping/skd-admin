<template>
  <div class="index-module__container">
    <div class="index-module__content">
      <div class="index-module__main">
        <div class="arco-spin">
          <div class="arco-spin-children">
            <div class="index-module__form">
              <el-form
                v-loading="loading"
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                class="login-form"
                autocomplete="on"
                label-position="left"
              >
                <div class="title-container">
                  <h3 class="title">
                    登录一个已存在的网络
                    <!-- <p class="desc-box">
                          告诉我们一些您的信息，以完成您的账号注册
                    </p>-->
                  </h3>
                </div>
                <div
                  v-for="tenant in loginForm.tenant_list"
                  :key="tenant.tenant_id"
                  class="network-box"
                  style="position: relative; display: flex"
                >
                  <div style="width: 450px; padding: 5px 20px">
                    <span class="name-box">{{ tenant.tenant_name }}</span>
                    <br />
                    <span class="url-box">{{ tenant.tenant_prefix }}{{ tenant_prefix_url }}</span>
                  </div>
                  <el-button
                    size="mini"
                    type="primary"
                    style="position: absolute; right: 7px; top: 13px"
                    @click="handleUrl(tenant.tenant_prefix, tenant.tenant_id)"
                  >登录</el-button>
                </div>
                <el-divider>or</el-divider>
                <div class="desc-box" style="margin-bottom: 25px; color: #3d3d3d">
                  <!-- 新用户?<br /> -->
                  <router-link
                    :to="{
                      path: '/register',
                      query: {
                      },
                    }"
                  >创建一个新的网络--></router-link>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import defaultSettings from '@/settings';
function getQueryVariable(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
export default {
  name: 'Login',
  components: {},
  data() {
    const tenant_prefix_url = defaultSettings.tenant_prefix_url;
    return {
      tenant_prefix_url: tenant_prefix_url,
      routes: ['/', 'register', 'network'],
      hostList: ['console.axisnow.xyz'],
      loginForm: {
        email: '',
        nick_name: '',
        tenant_list: []
      },
      loginRules: {
        nick_name: [],
        email: []
      },
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
      // Token: "",
    };
  },
  computed: {
    userinfo() {
      return (
        JSON.parse(localStorage.getItem('userinfo')) ||
        this.$store.state.user.userinfo ||
        {}
      );
    },
    Token() {
      return localStorage.getItem('token') || getQueryVariable('token');
    }
  },
  watch: {
    userinfo: {
      handler(val) {
        // this.init();
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.Token) {
        this.init();
      }
    });
  },
  methods: {
    init() {
      this.loading = true;
      this.$store
        .dispatch('user/getUserInfo', this.Token)
        .then(res => {
          this.loading = false;
          this.loginForm = Object.assign(
            { email: '', nick_name: '' },
            { ...res }
          );

          const tenant_list = res.tenant_list || [];
          if (!tenant_list.length) {
            this.$message.warning('网络不存在，请创建！');
            this.$router.push('/register');
          }
        })
        .catch(e => {
          this.loading = false;
        });
    },

    handleUrl(url, tenant_id) {
      if (url) {
        const URL = url + this.tenant_prefix_url;
        const token =
          getQueryVariable('token') || localStorage.getItem('token') || '';
        if (window.location.host !== URL) {
          if (process.env.NODE_ENV === 'development') {
            localStorage.setItem('tenant_id', tenant_id);
            this.$router.push('/dashboard');
          } else {
            if (!token) return;
            this.$store.dispatch('user/logout').then(res => {
              window.location.replace(
                (window.location.href = 'https://' + URL + '/?token=' + token)
              );
            });
          }
        } else {
          this.$router.push('/?token=' + this.Token);
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.index-module__container {
  height: 100vh;
  min-height: 500px;
}
.index-module__content {
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  min-height: 100%;
}
.index-module__banner_new {
  background: 50% / cover no-repeat
    url(//res.volccdn.com/obj/volc-console-fe/vconsole-auth/static/media/banner_new.18ef2e41.jpg);
}
.index-module__banner {
  width: 538px;
  position: relative;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  -webkit-transition: margin-left 1.5s ease;
  -o-transition: margin-left 1.5s ease;
  -moz-transition: margin-left 1.5s ease;
  transition: margin-left 1.5s ease;
}
.index-module__banner_wrapper {
  position: absolute;
  top: 30.5%;
  padding-left: 77px;
}
.index-module__intro {
  margin-top: 59px;
}
.index-module__tips {
  opacity: 0.6;
  font-size: 16px;
  line-height: 22px;
  color: #fafbfc;
  div {
    margin-bottom: 16px;
    display: -webkit-flex;
    display: -moz-box;
    display: flex;
    -webkit-align-items: center;
    -moz-box-align: center;
    align-items: center;
  }
  div:before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 4px solid hsla(0, 0%, 100%, 0.3);
    -moz-border-radius: 50%;
    border-radius: 50%;
    background-color: transparent;
    margin-right: 12px;
  }
}
.index-module__footer {
  position: absolute;
  left: 80px;
  bottom: 32px;
  font-size: 12px;
  line-height: 22px;
  color: hsla(0, 0%, 100%, 0.5);
  letter-spacing: 0.2px;
  text-align: left;
}
.index-module__badge {
  height: 12px;
  width: 12px;
  margin: 4px 4px 0 0;
  float: left;
}
.index-module__main {
  -webkit-flex: 1 1;
  -moz-box-flex: 1;
  flex: 1 1;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -webkit-flex-direction: column;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  // -webkit-justify-content: center;
  -moz-box-pack: center;
  margin-top: 150px;
  // justify-content: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  background: #fff;
}
.container-spin {
  width: 100%;
  height: 100%;
  position: relative;
}

.arco-spin {
  display: inline-block;
}
.arco-spin-children {
  position: relative;
}
.index-module__form {
  width: 500px;
}
::v-deep .el-input__inner {
  height: 48px;
  line-height: 1;
}
</style>
<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
    
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
::v-deep .el-input__inner {
  border-radius: 8px;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
.title {
  font-size: 26px;
  text-align: center;
  margin: 0px auto 40px auto;
  font-weight: bold;
}
.desc-box {
  font-family: 'Roboto-Regular';
  font-size: 14px;
  font-weight: normal;
  letter-spacing: 0em;
  color: #9e9e9e;
  margin-top: 18px;
  text-align: center;
}
.network-box {
  margin: 0 auto 23px;
  width: 100%;
  height: 56px;
  border-radius: 8px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #bfbfbf;
}
.name-box {
  height: 16px;
  font-family: SourceHanSansCN-Bold;
  font-size: 12px;
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  letter-spacing: 0px;
  color: #1a1a1a;
}
.url-box {
  height: 24px;
  font-family: Roboto-Regular;
  font-size: 16px;
  font-weight: normal;
  line-height: 24px;
  letter-spacing: 0px;
  color: #767676;
}
</style>
    