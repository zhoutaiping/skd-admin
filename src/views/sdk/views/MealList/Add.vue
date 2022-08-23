<template>
  <ConsolePageLayout>
    <el-row gutter="12">
      <el-col :span="6">
        <el-card shadow="hover">
          <template slot="header">
            商业版 - $599
          </template>
          <div>
            <p>
              共享IP: 59
            </p>
            <p>
              独享IP: 50
            </p>
            <p>
              线路地: 国内、海外
            </p>
            ....
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template slot="header">
            VIP - $2999
          </template>
          <div>
            <p>
              共享IP: 509
            </p>
            <p>
              独享IP: 不限
            </p>
            <p>
              线路地: 国内、海外
            </p>
            ....
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template slot="header">
            定制版 - $599+
            <div style="display:inline-block; float:right"><a>咨询商务</a> </div>
          </template>
          <div>
            <p>
              共享IP: 不限
            </p>
            <p>
              独享IP: 不限
            </p>
            <p>
              线路地: 国内、海外
            </p>
            ...
          </div>
        </el-card>
      </el-col>
    </el-row>
    <p style="margin-top:15px">
      <router-link :to="'/sdk/meal-list'">
        <el-button type="primary">服务开通</el-button>
      </router-link>
    </p>
  </ConsolePageLayout>
</template>

<script>
export default {
  name: 'AddMeal',
  data() {
    return {
      form: {}
    }
  },
  methods: {
    name() {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
