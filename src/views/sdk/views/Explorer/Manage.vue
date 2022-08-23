<template>
  <div>
    <DmAlert>
      智能调度系统会根据设备信誉与资源适用访客类型以及响应速度等综合信息为终端设备分配边缘资源。
      <!-- <br>
      因设备信誉模型未全量上线，暂时隐藏提示信息“您可以通过
      <router-link :to="{name: `taichi-app.router.business__id__BusinessSecurity`, params: {id: $route.params.id}}">
        控制台-> 业务安全
      </router-link> 配置设备信誉模型，以便更加贴合自身业务情况。 -->
    </DmAlert>
    <DmData
      ref="DmData"
      @init="fetchList"
    >
      <DmTable
        :loading="loading"
        min-height
      >
        <el-table
          :data="list"
        >
          <el-table-column
            label="IP"
            prop="ip_string"
            min-width="150"
          />
          <el-table-column
            label="运营商/归属地"
            min-width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.isp }} / {{ scope.row.location }}
            </template>
          </el-table-column>
          <el-table-column
            label="适用访客类型"
            prop="type"
            min-width="120"
          />
          <el-table-column
            label="健康状态"
            min-width="100"
          >
            <template slot-scope="scope">
              <span :class="`color--${scope.row.monitor_status_color}`">{{ scope.row.monitor_status }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="连接延迟"
            min-width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.client_content_time }} s
            </template>
          </el-table-column>
          <el-table-column
            label="使用状态"
            min-width="100"
          >
            <template slot-scope="scope">
              <span :class="`color--${scope.row.status_color}`">{{ scope.row.status }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="状态码200"
            align="right"
            prop="status_200"
            min-width="100"
          /> -->
          <el-table-column
            label="独立访客数"
            align="right"
            prop="access_count"
            min-width="100"
          />
        </el-table>
      </DmTable>
    </DmData>
    <!-- <DialogRow
      ref="DialogRow"
      @init="fetchList"
    /> -->
  </div>
</template>

<script>
import consoleData from '@/mixins/consoleData'

export default {
  mixins: [consoleData],

  data() {
    return {
      API_INDEX: 'V4/tjkd.app.package.pool.ip.list',
      bindParams: {
        package_id: this.$route.params.id
      },
      RESDATA: {
        'status': { 'code': 1, 'message': '操作成功', 'create_at': '2022-08-11 22:49:07', 'api_time_consuming': '1167.0010089874ms', 'function_time_consuming': '1103.4400463104ms', 'dispatch_before_time_consuming': '38.79189491272ms' }, 'data': { 'total': '57', 'list': [{ 'ip_string': '121.199.*.190', 'isp': 'BGP', 'location': '浙江-杭州', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '39.108.*.22', 'isp': 'BGP', 'location': '广东-深圳', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '120.77.*.153', 'isp': 'BGP', 'location': '广东-深圳', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '120.24.*.144', 'isp': 'BGP', 'location': '广东-深圳', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '132.232.*.241', 'isp': 'BGP', 'location': '四川-成都', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '212.64.*.166', 'isp': 'BGP', 'location': '上海', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '47.100.*.117', 'isp': 'BGP', 'location': '上海', 'type': '优质', 'monitor_status': '异常', 'monitor_status_color': 'danger', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '148.70.*.126', 'isp': 'BGP', 'location': '四川-成都', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '118.25.*.27', 'isp': 'BGP', 'location': '上海', 'type': '优质', 'monitor_status': '异常', 'monitor_status_color': 'danger', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }, { 'ip_string': '120.78.*.94', 'isp': 'BGP', 'location': '广东-深圳', 'type': '优质', 'monitor_status': '正常', 'monitor_status_color': 'success', 'status': '启用', 'status_color': 'success', 'access_count': 0, 'client_content_time': 0 }] }
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      console.log('--init')
      this.formatResponse(this.RESDATA.data)
    })
  },
  methods: {
    formatResponse(response) {
      console.log('--init')
      const { list = [] } = response
      this.list = list
      this.$refs.DmData.init({ total: this.RESDATA.total })
      return response
    }
  }
}
</script>
