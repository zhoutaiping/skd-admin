<template>
  <ConsolePageLayout style="padding:12px;">
    <DmToolbar>
      <router-link :to="'/sdk/meal-open'">
        <el-button>添加应用</el-button>
      </router-link>
    </DmToolbar>
    <DmData
      ref="DmData"
      @init="fetchList"
    >
      <DmTable
        :loading="loading"
        min-height
      >
        <el-table :data="list">
          <el-table-column
            label="应用名称"
            prop="package_name"
            min-width="150"
          />
          <el-table-column
            label="AccessKey"
            min-width="150"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.access_key }}</span>
              <el-tooltip content="点击可复制到粘贴板">
                <el-button
                  type="text"
                  @click="copyAccessKey(scope.row)"
                ><i
                  class="el-icon-copy-document"
                  style="margin-left: 8px"
                /></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column
            label="到期时间"
            min-width="100"
          >
            <template slot-scope="scope">
              <ColumnExpireTime :expire-time="scope.row.expire_time" />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="200"
            align="right"
          >
            <template slot-scope="scope">
              <router-link :to="{name: `SDK_meal__id`, params: {id: scope.row.id}}">
                <el-button type="text">
                  管理
                </el-button>
              </router-link>
              <el-divider direction="vertical" />
              <router-link :to="{name: `sdk_explorer`, params: {id: scope.row.id}}">
                <el-button type="text">
                  资源管理
                </el-button>
              </router-link>
              <el-divider direction="vertical" />
              <router-link :to="{name: `sdk_business__id`, params: {id: scope.row.id}, query: {title: scope.row.package_name}}">
                <el-button type="text">
                  控制台
                </el-button>
              </router-link>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
  </ConsolePageLayout>
</template>

<script>
import consoleData from '@/mixins/consoleData'
import ColumnExpireTime from '@/components/Column/ColumnExpireTime'
import DmToolbar from '@/components/Dm/DmToolbar.vue'

export default {
  inject: ['ModuleId'],

  components: { ColumnExpireTime, DmToolbar },

  mixins: [consoleData],

  data() {
    return {
      API_INDEX: 'V4/tjkd.app.package.list',
      'list': [
        {
          'id': '401639',
          'member_email': 'tian5985@yeah.net',
          'member_id': '168163',
          'package_name': '无忧版',
          'expire_time': '2022-08-29 16:00:17',
          'access_key': '54e1973404cc1c369e126e317d4a3a4a',
          'status': '1',
          'created_at': '2022-07-15 16:00:17',
          'updated_at': '2022-07-27 13:51:04',
          'admin_user_id': '0',
          'admin_info': '',
          'ip_group_choose': '1',
          'flush_type': '1',
          'flush_rate': '0',
          'disp_ip_init_limit': '4',
          'log_level': 'info',
          'block_vm': '0',
          'rule_num': '1000',
          'remark': '',
          'disp_ip_init_limit_gaofang': '3',
          'disp_ip_init_limit_personal': '3',
          'disp_ip_init_limit_good': '3',
          'proxy_timeout': '1200',
          'proxy_connect_timeout': '5',
          'auto_listen': '1',
          'back_source': '0',
          'is_appstore': '0',
          'cname': null,
          'meal_flag': 'YD-SDK-001',
          'plan_name': '无忧版',
          'fake_request': '0',
          'bypass_client_ip': '0',
          'risk_control': '0',
          'need_real_ip': '0',
          'package_is_renew': '3',
          'speed_up_channel': '',
          'dns_domains': null,
          'static_level': '1',
          'preset_ips': null,
          'proxy_realip': '1',
          'block_root': '0',
          'block_debug': '0',
          'block_multiinst': '0',
          'block_groupctrl': '0',
          'block_hook': '0',
          'block_vpn': '0',
          'block_proxy': '0',
          'block_simulator': '0',
          'default_port': null,
          'check_rls': '0',
          'pool_uuid': '499bce00b98df98e35bc159da4bff5ab',
          'mudp_percent': '0',
          'dis_province_auto': '0',
          'dis_province_list': '[]',
          'domain_pool_uuid': '12912d0502c55088cf1d96013527600b',
          'udp_node': '',
          'console_dis_config': null,
          'expire_status': '0'
        }
      ]
    }
  },

  methods: {
    copyAccessKey(row) {
      this.Help.copyText(row.access_key)
      this.$message.success('复制成功')
    }
  }
}
</script>
