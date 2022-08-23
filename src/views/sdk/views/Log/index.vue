<template>
  <ConsolePageLayout>
    <ToolbarLogCommon
      show-export
      @submit="handleSearch"
      @click-export="downloadLog(bindParams)"
    />
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
            label="操作时间"
            min-width="180"
            prop="create_at"
          />
          <el-table-column
            label="操作对象"
            min-width="300"
          >
            <template slot-scope="scope">
              <ColumnList :list="scope.row.targetData" />
            </template>
          </el-table-column>
          <el-table-column
            label="操作IP"
            min-width="150"
            prop="ip"
          >
            <template slot-scope="{ row }">
              {{ row.ip }}
              <span v-show="row.client_port">： {{ row.client_port }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作内容"
            min-width="300"
          >
            <template slot-scope="scope">
              <PopoverEllipsis
                v-model="scope.row.content"
                :url="false"
                :max-length="200"
                line-feed
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作结果"
            min-width="100"
            prop="result"
          />
        </el-table>
      </DmTable>
    </DmData>
  </ConsolePageLayout>
</template>

<script>
import consoleLog from '@/mixins/consoleLog'
import PopoverEllipsis from '@/components/Popover/PopoverEllipsis'
import ColumnList from '@/components/Column/ColumnList'
import ToolbarLogCommon from '@/components/Toolbar/ToolbarLogCommon'
import { downloadLog, formatTarget } from '@/api/oplog'

export default {
  components: { ColumnList, ToolbarLogCommon, PopoverEllipsis },

  mixins: [consoleLog],

  data() {
    return {
      API_INDEX: '../agw/oplog/console/user/oplog/list',
      bindParams: {
        biz_type: '安全加速sdk',
        data_key: ''
      },
      DATAJSON: {
        'data_key_map': {
          'ca_name': 'CA证书',
          'domain': '域名',
          'domains': '域名',
          'group_name': '群组',
          'identity_authentication': '身份认证',
          'package_name': '套餐',
          'policy_code': '策略',
          'policy_codes': '策略',
          'policy_group_code': '策略集',
          'policy_group_codes': '策略集',
          'tpl_name': '配置模板',
          'yunad_group': '云AD用户组',
          'yunad_organization': '云AD组织',
          'yunad_user': '云AD用户'
        },
        'list': [
          {
            '_id': '62f1120f98c972dd74fbec55',
            'biz_type': '安全加速SDK',
            'client_port': '2586',
            'content': 'IP 等于 1.2.1.1',
            'create_at': '2022-08-08 21:39:27',
            'data_key': {
              'admin_emails': [],
              'id': [
                8824157
              ],
              'package_id': [
                '402135'
              ],
              'package_name': [
                '无忧版'
              ],
              'policy_codes': [
                'R22080821381762F111C9275F4'
              ],
              'user_emails': [
                '1208010487@qq.com'
              ]
            },
            'id': 12662612,
            'ip': '183.193.164.245',
            'op_admin_email': '',
            'op_admin_id': 0,
            'op_admin_name': '',
            'op_data': [],
            'op_type': '删除',
            'op_uid': 108958,
            'op_user_email': '1208010487@qq.com',
            'op_username': '1208010487@qq.com',
            'params': {
              'ids': [
                8824157
              ],
              'product_flag': 'WEBAQJS'
            },
            'result': '成功',
            'subuser_id': 0,
            'subuser_name': '',
            'uid': 108958,
            'update_at': '2022-08-08 21:39:27',
            'url': '/V4/firewall.policy.delete?_route_=api%2FV4%2Ffirewall.policy.delete&command=firewall.policy.delete&route=%5CController%5CIndex%5Ccommand&user_id=108958&sub_user_id=0&fromadmin=0',
            'user_email': '1208010487@qq.com',
            'username': '1208010487@qq.com'
          },
          {
            '_id': '62f111c998c972dd74fbec54',
            'biz_type': '安全加速SDK',
            'client_port': '2586',
            'content': 'IP 等于 1.2.1.1',
            'create_at': '2022-08-08 21:38:17',
            'data_key': {
              'admin_emails': [],
              'id': [
                '8824157'
              ],
              'package_id': [
                '402135'
              ],
              'package_name': [
                '无忧版'
              ],
              'policy_codes': [
                'R22080821381762F111C9275F4'
              ],
              'user_emails': [
                '1208010487@qq.com'
              ]
            },
            'id': 12662611,
            'ip': '183.193.164.245',
            'op_admin_email': '',
            'op_admin_id': 0,
            'op_admin_name': '',
            'op_data': [],
            'op_type': '新增',
            'op_uid': 108958,
            'op_user_email': '1208010487@qq.com',
            'op_username': '1208010487@qq.com',
            'params': {
              'action': 'watch',
              'action_data': [],
              'app_ak': 'c18c19f876379d92be29b1f6e92e7691',
              'app_id': 402135,
              'from': '',
              'id': 0,
              'member_id': '108958',
              'remark': '',
              'rules': [
                {
                  'data': [
                    '1.2.1.1'
                  ],
                  'data_type': '',
                  'logic': 'equals',
                  'rule_type': 'ip'
                }
              ],
              'tjkd_app_id': 402135,
              'type': 'app',
              'use_type': 'app'
            },
            'result': '成功',
            'subuser_id': 0,
            'subuser_name': '',
            'uid': 108958,
            'update_at': '2022-08-08 21:38:17',
            'url': '/V4/firewall.policy.save?_route_=api%2FV4%2Ffirewall.policy.save&command=firewall.policy.save&route=%5CController%5CIndex%5Ccommand&user_id=108958&sub_user_id=0&fromadmin=0',
            'user_email': '1208010487@qq.com',
            'username': '1208010487@qq.com'
          }
        ],
        'total': 2
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.formatResponse(this.DATAJSON)
    })
  },
  methods: {
    downloadLog,

    formatResponse(response) {
      console.info({
        ...response
      })
      const { list = [], data_key_map } = response
      list.forEach(item => {
        const targetData = formatTarget(item.data_key, data_key_map)
        item.targetData = targetData.length ? targetData : ['-']
      })
      this.list = list
      this.$refs.DmData.init({ total: response.total })
      return response
    },

    async handleSearch(params) {
      const { start_time, end_time, keyword } = params
      this.bindParams.data_key = keyword
      this.bindParams.start_time = start_time
      this.bindParams.end_time = end_time
      this.$refs.DmData.initPage()
    }
  }
}
</script>
