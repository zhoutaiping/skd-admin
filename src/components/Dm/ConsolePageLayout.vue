<style lang="scss">
.ConsolePageLayout {
  position: relative;
  // background: rgb(242, 242, 242);
  padding: 0 12px;
  .el-main {
    padding: 16px;
  }

  .btn-back {
    display: inline-block;
    color: $--color-text-primary;
    font-weight: 500;
    line-height: 40px;
    width: 40px;
    text-align: center;
    margin-left: -12px;

    i {
      font-size: 18px;
    }

    &:active {
      opacity: 0.7;
    }
  }

  .PageHeader {
    margin-top: 16px;
    margin-bottom: 20px;
    padding: 0px 12px;
    color: $--color-text-primary;
    background: #fff;
    border: $--border-base;

    .title {
      position: relative;
      display: inline-block;
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      padding-left: 12px;
      height: 40px;
      line-height: 40px;

      &:after {
        content: "";
        position: absolute;
        background: $--color-primary;
        top: 10px;
        bottom: 10px;
        left: 0px;
        width: 3px;
      }
    }
  }
}
</style>

<template>
  <div :class="b()">
    <!-- 页标题 -->
    <div
      v-if="headerVisible"
      class="PageHeader"
    >
      <template v-if="$route.meta.back || routeTo">
        <router-link
          v-if="routeTo"
          :to="routeTo"
          class="btn-back"
        ><i class="el-icon-back" /></router-link>
        <router-link
          v-else
          :to="{name: $route.meta.back}"
          class="btn-back"
        ><i class="el-icon-back" /></router-link>
      </template>
      <h3 class="title">
        <span>{{ title || pageTitle }}</span>
      </h3>
      <slot name="header" />
      <NavbarPage
        v-if="tabs && tabs.length"
        :data="tabs"
      >
        <slot name="tab-item" />
      </NavbarPage>
    </div>
    <!-- Main -->
    <slot />
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import NavbarPage from '@/components/Navbar/NavbarPage'
export default create({
  name: 'ConsolePageLayout',

  components: { NavbarPage },

  props: {
    title: String,
    router: Object,
    breadcrumbVisible: {
      type: Boolean,
      default: true
    },
    routeTo: Object,
    headerVisible: {
      type: Boolean,
      default: true
    },
    tabs: Array
  },

  computed: {
    pageTitle() {
      const $route = this.$route
      if ($route.query.pageTitle) {
        return $route.query.pageTitle
      } else {
        if ($route.meta.tabs) {
          return this.$t($route.meta.tabs)
        } else {
          return $route.meta.title ? $route.meta.title : this.$t($route.name)
        }
      }
    }
  }
})
</script>
