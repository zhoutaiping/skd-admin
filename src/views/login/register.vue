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
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
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
    <template>
  <div class="index-module__container">
    <div class="index-module__content">
      <div class="index-module__main">
        <div class="arco-spin">
          <div class="arco-spin-children">
            <div class="index-module__form">
              <el-form
                ref="form"
                :model="form"
                :rules="loginRules"
                class="login-form"
                autocomplete="on"
                label-position="left"
              >
                <div class="title-container">
                  <h3 class="title">
                    创建您的新网络命名
                    <p class="desc-box">网络是虚拟环境，您可以在其中管理对各个位置资源的远程访问</p>
                  </h3>
                </div>

                <el-form-item prop="tenant_name" label="网络名称">
                  <el-input
                    ref="tenant_name"
                    v-model="form.tenant_name"
                    placeholder="网络名称"
                    name="tenant_name"
                    type="text"
                    tabindex="1"
                    autocomplete="on"
                    style="border-radius: 8px"
                  />
                </el-form-item>
                <el-form-item prop="tenant_prefix" label="网络地址">
                  <el-input
                    ref="tenant_prefix"
                    v-model="form.tenant_prefix"
                    placeholder="网络地址(英文字母须小写)"
                    name="tenant_prefix"
                    tabindex="2"
                    autocomplete="on"
                    @keyup.native="checkCapslock"
                    @keyup.enter.native="handleLogin"
                    style="border-radius: 8px"
                  >
                    <template slot="append">{{tenant_prefix_url}}</template>
                  </el-input>
                </el-form-item>
                <div
                  v-if="false"
                  v-show="form.tenant_list &&form.tenant_list.length"
                  class="desc-box"
                  style="margin-bottom: 25px"
                >
                  <!-- <span style="color:red">此团队名称已被占用。如果您想访问现有的andao网络</span><br/> -->
                  请在此处登录：
                  <a
                    @click="handleReplace(form.tenant_list[0].tenant_prefix)"
                  >{{form.tenant_list && form.tenant_list[0].tenant_prefix}} {{tenant_prefix_url}}</a>
                </div>
                <el-button
                  v-show="form.tenant_list && form.tenant_list.length"
                  :loading="loading"
                  type="primary"
                  style="
                    width: 100px;
                    margin-bottom: 30px;
                    height: 48px;
                    border-radius: 8px;
                    background: #EEEEEE;
                    color: #000000;
                    border-color: #EEEEEE;
                  "
                  @click.native.prevent="handleBack"
                >返回登录</el-button>
                <el-button
                  :loading="loading"
                  type="primary"
                  style="
                    width: 140px;
                    margin-bottom: 30px;
                    height: 48px;
                    border-radius: 8px;
                    background: #3662ec;
                    float: right;
                  "
                  @click.native.prevent="handleLogin"
                >创建网络</el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
function getQueryVariable(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
import defaultSettings from '@public/settings';
export default {
  name: 'Login',
  components: {},
  data() {
    const validateNickname = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入英文网络名称'));
      } else {
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (!value) callback(new Error('请输入网络地址'));
      else callback();
    };
    // const tenant_prefix_url = defaultSettings.tenant_prefix_url;
    return {
      // tenant_prefix_url: tenant_prefix_url,
      form: {
        tenant_prefix: '',
        tenant_name: ''
      },
      loginRules: {
        tenant_name: [
          { required: true, trigger: 'blur', validator: validateNickname }
        ],
        tenant_prefix: [
          { required: true, trigger: 'blur', validator: validateEmail }
        ]
      },
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
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
    tenant_prefix_url() {
      return this.$store.getters.tenant_prefix_url;
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
      this.init();
    });
  },
  methods: {
    init() {
      this.$store.dispatch('user/getUserInfo', this.Token).then(res => {
        this.form = Object.assign({ email: '', nick_name: '' }, { ...res });

        const tenant_list = res.tenant_list || [];
        if (!tenant_list.length) {
          this.$message.warning('网络不存在，请创建！');
          this.$router.push('/register');
        }
      });
      // const user_info = Object.keys(this.userinfo).length
      //   ? this.userinfo
      //   : JSON.parse(localStorage.getItem('userinfo')) || {};
      // if (Object.keys(user_info).length) {
      //   this.form = Object.assign(
      //     { email: '', nick_name: '' },
      //     {
      //       ...user_info
      //     }
      //   );
      // } else {
      //   this.$store.dispatch('user/getUserInfo', this.Token);
      // }
    },
    handleReplace(url) {
      window.location.replace(
        window.location.protocol +
          '//' +
          url +
          this.tenant_prefix_url +
          '/?token=' +
          this.Token
      );
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= 'A' && key <= 'Z';
    },
    showPwd() {
      this.$nextTick(() => {
        this.$refs.nick_name.focus();
      });
    },

    handleBack() {
      this.$router.push({ path: '/network' });
    },
    handleLogin() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          const params = {
            tenant_name: this.form.tenant_name,
            id: this.form.id,
            tenant_prefix: this.form.tenant_prefix.toLowerCase(),
            token: this.Token
          };
          this.FetchAccount.post('/user/tenant/add', params)
            .then(res => {
              console.log(res);
              this.$message.success('创建成功!');
              const URL =
                res.tenant_prefix.toLowerCase() + this.tenant_prefix_url;
              this.loading = false;
              window.location =
                window.location.protocol + '//' + URL + '/?token=' + this.Token;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>
    
    <style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

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
  // color: $light_gray;
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
}
</style>
    