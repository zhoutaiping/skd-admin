<template>
  <ConsolePageLayout>
    <DmToolbar>
      <el-button
        type="primary"
        @click="$refs.DialogRowWeb.handleOpen()"
      >添加规则</el-button>
      <el-button
        type="primary"
        @click="$refs.DialogRowWeb.handleOpen({}, {batch: true})"
      >批量添加</el-button>
      <el-button
        :disabled="multipleActionDisable"
        type="primary"
        @click="handleBatchEdit"
      >批量编辑</el-button>
      <el-button
        v-if="packageChannelList.length > 0"
        :disabled="multipleActionDisable"
        type="primary"
        @click="handleChannelBatchEdit"
      >批量编辑加速通道</el-button>
      <el-button
        :disabled="multipleActionDisable"
        @click="handleBatchDelete"
      >删除</el-button>
      <div slot="right">
        <InputSearch
          v-model="bindParams.search_source_ip_port"
          placeholder="源IP / 端口 / 备注"
          @submit="handleSearch"
        />
      </div>
    </DmToolbar>
    <DmData
      ref="DmData"
      :page-sizes="[10, 50, 200, 1000]"
      @init="fetchList"
    >
      <DmTable
        :loading="loading"
        min-height
      >
        <el-table
          :data="list"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="端口"
            prop="domain"
            min-width="200"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.domain">
                {{ scope.row.domain }}<br>
              </template>
              {{ scope.row.port }}
            </template>
          </el-table-column>
          <el-table-column
            label="源IP/源端口"
            min-width="200"
          >
            <template slot-scope="scope">
              <ColumnListIp :list="scope.row.sourceView" />
            </template>
          </el-table-column>
          <el-table-column
            v-if="packageChannelList.length > 0"
            label="加速通道"
            min-width="200"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.channel_status">
                <ColumnListIp :list="scope.row.channelView" />
              </template>
              <template v-else>
                未启用
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="loading_name"
            label="负载均衡规则"
            min-width="150"
          />
          <el-table-column
            prop="remark"
            label="备注信息"
            min-width="100"
          />
          <el-table-column
            label="操作"
            align="right"
            width="80"
          >
            <template slot-scope="scope">
              <ColumnAction>
                <el-button
                  type="text"
                  @click="handleRowEdit(scope.row)"
                >编辑</el-button>
              </ColumnAction>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <DialogRowWeb
      ref="DialogRowWeb"
      @init="fetchList"
    />
    <DialogRowWebChannel
      ref="DialogRowWebChannel"
      @init="fetchList"
    />
  </ConsolePageLayout>
</template>

<script>
import consoleData from '@/mixins/consoleData'
import { labelView } from '@/utils/filter'
import ColumnListIp from '@/components/Column/ColumnListIp'
import DialogRowWeb from './components/DialogRowWeb'
import DialogRowWebChannel from './components/DialogRowWebChannel'
import Label from '../../constants/label'
import packagesMixins from '../../mixins/packages'

export default {
  components: { ColumnListIp, DialogRowWeb, DialogRowWebChannel },

  mixins: [consoleData, packagesMixins],

  data() {
    return {
      Label,
      API_INDEX: 'V4/tjkd.app.domain.list',
      bindParams: {
        search_source_ip_port: '',
        package_id: this.$route.params.id
      },
      list: [
        {
          'id': 153283,
          'package_id': 401639,
          'member_id': 168163,
          'domain': 'proxy.gf.com',
          'port': 20002,
          'loading': 1,
          'source_list': [
            {
              'ip': '121.196.166.78',
              'backup': 1,
              'port': 10899
            },
            {
              'ip': '47.97.66.87',
              'backup': 1,
              'port': 10899
            }
          ],
          'status': 1,
          'remark': '',
          'created_at': '2022-08-08 20:32:35',
          'updated_at': '2022-08-08 20:32:35',
          'channel_loading': 1,
          'channel_source_list': [],
          'channel_status': 0,
          'source_type': 1,
          'protocol': 1,
          'rule_type': 0
        },
        {
          'id': 153281,
          'package_id': 401639,
          'member_id': 168163,
          'domain': 'tea.gf.com',
          'port': 20003,
          'loading': 1,
          'source_list': [
            {
              'ip': '114.55.0.51',
              'backup': 1,
              'port': 9101
            },
            {
              'ip': '114.55.0.51',
              'backup': 1,
              'port': 9102
            },
            {
              'ip': '114.55.0.51',
              'backup': 1,
              'port': 9103
            },
            {
              'ip': '114.55.0.51',
              'backup': 1,
              'port': 9104
            }
          ],
          'status': 1,
          'remark': '',
          'created_at': '2022-07-18 17:20:17',
          'updated_at': '2022-07-18 17:20:17',
          'channel_loading': 1,
          'channel_source_list': [],
          'channel_status': 0,
          'source_type': 1,
          'protocol': 1,
          'rule_type': 0
        },
        {
          'id': 153279,
          'package_id': 401639,
          'member_id': 168163,
          'domain': 'api.gf.com',
          'port': 20005,
          'loading': 1,
          'source_list': [
            {
              'ip': '47.97.197.67',
              'backup': 1,
              'port': 20001
            },
            {
              'ip': '47.97.197.67',
              'backup': 1,
              'port': 20002
            }
          ],
          'status': 1,
          'remark': '',
          'created_at': '2022-07-18 17:19:15',
          'updated_at': '2022-07-18 17:19:15',
          'channel_loading': 1,
          'channel_source_list': [],
          'channel_status': 0,
          'source_type': 1,
          'protocol': 1,
          'rule_type': 0
        },
        {
          'id': 153277,
          'package_id': 401639,
          'member_id': 168163,
          'domain': 'res.gf.com',
          'port': 20004,
          'loading': 1,
          'source_list': [
            {
              'ip': '121.196.239.155',
              'backup': 1,
              'port': 8082
            }
          ],
          'status': 1,
          'remark': '',
          'created_at': '2022-07-18 17:18:16',
          'updated_at': '2022-07-18 17:18:16',
          'channel_loading': 1,
          'channel_source_list': [],
          'channel_status': 0,
          'source_type': 1,
          'protocol': 1,
          'rule_type': 0
        },
        {
          'id': 153269,
          'package_id': 401639,
          'member_id': 168163,
          'domain': 'proxy.dt.com',
          'port': 10002,
          'loading': 1,
          'source_list': [
            {
              'ip': '47.106.213.172',
              'backup': 1,
              'port': 10899
            },
            {
              'ip': '120.77.180.129',
              'backup': 1,
              'port': 10899
            }
          ],
          'status': 1,
          'remark': 'proxy',
          'created_at': '2022-07-15 16:53:34',
          'updated_at': '2022-07-18 13:12:59',
          'channel_loading': 0,
          'channel_source_list': [],
          'channel_status': 0,
          'source_type': 1,
          'protocol': 1,
          'rule_type': 0
        },
        {
          'id': 153267,
          'package_id': 401639,
          'member_id': 168163,
          'domain': 'tea.dt.com',
          'port': 10003,
          'loading': 1,
          'source_list': [
            {
              'ip': '120.78.195.98',
              'backup': 1,
              'port': 9102
            },
            {
              'ip': '120.78.195.98',
              'backup': 1,
              'port': 9103
            },
            {
              'ip': '120.78.195.98',
              'backup': 1,
              'port': 9104
            },
            {
              'ip': '120.24.46.194',
              'backup': 1,
              'port': 9101
            },
            {
              'ip': '120.24.46.194',
              'backup': 1,
              'port': 9102
            },
            {
              'ip': '119.23.231.211',
              'backup': 1,
              'port': 9101
            },
            {
              'ip': '119.23.231.211',
              'backup': 1,
              'port': 9102
            },
            {
              'ip': '119.23.231.211',
              'backup': 1,
              'port': 9103
            },
            {
              'ip': '119.23.231.211',
              'backup': 1,
              'port': 9104
            }
          ],
          'status': 1,
          'remark': 'socket',
          'created_at': '2022-08-08 14:13:49',
          'updated_at': '2022-08-08 14:13:49',
          'channel_loading': 0,
          'channel_source_list': [],
          'channel_status': 0,
          'source_type': 1,
          'protocol': 1,
          'rule_type': 0
        },
        {
          'id': 153265,
          'package_id': 401639,
          'member_id': 168163,
          'domain': 'res.dt.com',
          'port': 10004,
          'loading': 1,
          'source_list': [
            {
              'ip': '120.79.146.3',
              'backup': 1,
              'port': 8082
            }
          ],
          'status': 1,
          'remark': 'res',
          'created_at': '2022-07-15 16:52:54',
          'updated_at': '2022-07-18 13:12:59',
          'channel_loading': 0,
          'channel_source_list': [],
          'channel_status': 0,
          'source_type': 1,
          'protocol': 1,
          'rule_type': 0
        },
        {
          'id': 153263,
          'package_id': 401639,
          'member_id': 168163,
          'domain': 'api.dt.com',
          'port': 10005,
          'loading': 1,
          'source_list': [
            {
              'ip': '39.108.102.14',
              'backup': 1,
              'port': 20001
            },
            {
              'ip': '39.108.102.14',
              'backup': 1,
              'port': 20002
            }
          ],
          'status': 1,
          'remark': 'api',
          'created_at': '2022-07-15 16:53:10',
          'updated_at': '2022-07-18 13:12:59',
          'channel_loading': 0,
          'channel_source_list': [],
          'channel_status': 0,
          'source_type': 1,
          'protocol': 1,
          'rule_type': 0
        }
      ]
    }
  },

  created() {
    this.PACKAGE_SET_ID(this.$route.params.id)
    this.packageFetchChannel()
  },
  mounted() {
    this.$nextTick(() => {
      this.formatResponse({ list: this.list })
    })
  },
  methods: {
    formatResponse(response) {
      response.list.forEach(item => {
        item.loading = Number(item.loading)
        item.loading_name = labelView(item.loading, Label.loading)

        item.sourceView = item.source_list.map(_ => {
          return {
            value: _.ip,
            port: _.port,
            view: Number(_.backup) === 1 ? 'primary' : 'secound'
          }
        })

        item.channelView = item.channel_source_list.map(_ => {
          return {
            value: _.ip,
            view: Number(_.backup) === 1 ? 'primary' : 'secound'
          }
        })

        item.source_list.forEach(_ => {
          _.domain = _.ip
        })

        item.originIpsArray = item.source_list.map(item => item.ip)
      })
      return response
    },

    handleRowEdit(form) {
      form = {
        id: form.id,
        domain: form.domain,
        port: form.port,
        loading: form.loading,
        channel_loading: form.channel_loading,
        source_type: form.source_type,
        remark: form.remark,
        source_list: form.source_list,
        channel_source_list: form.channel_source_list,
        channel_status: form.channel_status
      }

      this.$refs.DialogRowWeb.handleOpen(form, { mode: 'Edit' })
    },
    // 批量配置加速通道
    handleChannelBatchEdit() {
      const list = this.multipleSelection
      const form = {
        ...list[0]
      }

      const listView = this.formatBathList(list)
      form.ids = list.map(_ => _.id)
      this.$refs.DialogRowWebChannel.handleOpen(form, { batch: true, mode: 'Edit', listView })
    },

    formatBathList(list) {
      return list.map(_ => {
        return `${labelView(_.protocol, Label.protocol)}: ${_.port} ${_.domain ? '[' + _.domain + ']' : ''}`
      })
    },

    // 批量编辑
    handleBatchEdit() {
      const list = this.multipleSelection
      const form = {
        ...list[0]
      }

      form.port = this.multipleSelection.map(_ => _.port).join(',')
      form.ids = this.multipleSelection.map(_ => _.id)

      const listView = this.formatBathList(list)
      this.$refs.DialogRowWeb.handleOpen(form, { batch: true, mode: 'Edit', listView })
    },

    handleBatchDelete() {
      this.$confirm('确认操作', '提示', {
        type: 'warning'
      }).then(() => {
        this.fetchDelete()
      })
    },

    async fetchDelete() {
      const ids = []
      this.multipleSelection.forEach(item => {
        ids.push(item.id)
      })

      const form = {
        ids
      }
      try {
        await this.Fetch.delete('V4/tjkd.app.domain.del', form)
      } catch (e) {
        return
      }
      this.Message('ACTION_SUCCESS')
      this.fetchList()
    }
  }
}
</script>
