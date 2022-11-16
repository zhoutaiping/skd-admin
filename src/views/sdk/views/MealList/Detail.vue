<template>
  <ConsolePageLayout>
    <DmToolbar>
      <el-button type="primary" @click="$refs.DialogRowWeb.handleOpen()">添加规则</el-button>
      <!-- <el-button
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
      >批量编辑加速通道</el-button>-->
      <!-- <el-button
        :disabled="multipleActionDisable"
        @click="handleBatchDelete"
      >删除</el-button>-->
      <div slot="right">
        <InputSearch
          v-model="bindParams.search_source_ip_port"
          placeholder="源IP / 端口 / 备注"
          @submit="handleSearch"
        />
      </div>
    </DmToolbar>
    <DmData ref="DmData" :page-sizes="[10, 50, 200, 1000]" @init="fetchList">
      <DmTable :loading="loading" min-height>
        <el-table :data="list" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
          <el-table-column label="域名/端口" prop="domain" min-width="200">
            <template slot-scope="scope">
              <template v-if="scope.row.domain">
                {{ scope.row.domain }}
                <br />
              </template>
              {{ scope.row.port }}
            </template>
          </el-table-column>
          <el-table-column label="源IP/源端口" min-width="200">
            <template slot-scope="scope">
              <ColumnListIp :list="scope.row.sourceView" />
            </template>
          </el-table-column>
          <el-table-column v-if="packageChannelList.length > 0" label="加速通道" min-width="200">
            <template slot-scope="scope">
              <template v-if="scope.row.channel_status">
                <ColumnListIp :list="scope.row.channelView" />
              </template>
              <template v-else>未启用</template>
            </template>
          </el-table-column>
          <el-table-column prop="loading_name" label="负载均衡规则" min-width="150" />
          <el-table-column prop="remark" label="备注信息" min-width="100" />
          <el-table-column label="操作" align="right" width="180">
            <template slot-scope="scope">
              <ColumnAction>
                <el-button type="text" @click="handleRowEdit(scope.row)">编辑</el-button>

                <el-button type="text" @click="handleBatchDelete(scope.row)">删除</el-button>
              </ColumnAction>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <DialogRowWeb ref="DialogRowWeb" @init="fetchList" />
    <DialogRowWebChannel ref="DialogRowWebChannel" @init="fetchList" />
  </ConsolePageLayout>
</template>

<script>
import consoleData from '@/mixins/consoleData';
import { labelView } from '@/utils/filter';
import ColumnListIp from '@/components/Column/ColumnListIp';
import DialogRowWeb from './components/DialogRowWeb';
import DialogRowWebChannel from './components/DialogRowWebChannel';
import Label from '../../constants/label';
import packagesMixins from '../../mixins/packages';

export default {
  components: { ColumnListIp, DialogRowWeb, DialogRowWebChannel },

  mixins: [consoleData, packagesMixins],

  data() {
    return {
      Label,
      API_INDEX: '/sdk_rule/list',
      bindParams: {
        search_source_ip_port: '',
        sdk_id: this.$route.params.id,
        user_id: JSON.parse(localStorage.getItem('user')).id,
        token: localStorage.getItem('token')
      }
    };
  },

  created() {
    this.PACKAGE_SET_ID(this.$route.params.id);
    this.packageFetchChannel();
  },
  mounted() {
    this.$nextTick(() => {
      this.formatResponse({ list: this.list });
    });
  },
  methods: {
    formatResponse(response) {
      if (response.list && response.list.length) {
        response.list.forEach(item => {
          item.loading = Number(item.load_balance_type);
          item.loading_name = labelView(item.loading, Label.loading);
          const source_list =
            (item.source_list && JSON.parse(item.source_list)) || [];
          // console.log(item.source_list, source_list)
          const channel_source_list =
            (item.channel_source_list &&
              JSON.parse(item.channel_source_list)) ||
            [];
          item.sourceView = source_list.map(_ => {
            return {
              value: _.ip,
              port: _.port,
              view: Number(_.backup) === 1 ? 'primary' : 'secound'
            };
          });
          item.channelView = channel_source_list.map(_ => {
            return {
              value: _.ip,
              view: Number(_.backup) === 1 ? 'primary' : 'secound'
            };
          });
          source_list.forEach(_ => {
            _.domain = _.ip;
          });

          item.originIpsArray = source_list.map(item => item.ip);
        });
      }

      return response;
    },

    handleRowEdit(form) {
      form = {
        id: form.id,
        rule_id: form.rule_id,
        domain: form.domain,
        port: form.port,
        load_balance_type: form.load_balance_type,
        channel_loading: form.channel_loading,
        source_type: form.source_type,
        remark: form.remark,
        source_list: (form.source_list && JSON.parse(form.source_list)) || [],
        channel_source_list: form.channel_source_list,
        channel_status: form.channel_status,
        source_port: form.source_port,
        source_port_type: form.source_port_type,
        is_using_center_pool: form.is_using_center_pool
      };

      this.$refs.DialogRowWeb.handleOpen(form, { mode: 'Edit' });
    },
    // 批量配置加速通道
    handleChannelBatchEdit() {
      const list = this.multipleSelection;
      const form = {
        ...list[0]
      };

      const listView = this.formatBathList(list);
      form.ids = list.map(_ => _.id);
      this.$refs.DialogRowWebChannel.handleOpen(form, {
        batch: true,
        mode: 'Edit',
        listView
      });
    },

    formatBathList(list) {
      return list.map(_ => {
        return `${labelView(_.protocol, Label.protocol)}: ${_.port} ${
          _.domain ? '[' + _.domain + ']' : ''
        }`;
      });
    },

    // 批量编辑
    handleBatchEdit() {
      const list = this.multipleSelection;
      const form = {
        ...list[0]
      };

      form.port = this.multipleSelection.map(_ => _.port).join(',');
      form.ids = this.multipleSelection.map(_ => _.id);

      const listView = this.formatBathList(list);
      this.$refs.DialogRowWeb.handleOpen(form, {
        batch: true,
        mode: 'Edit',
        listView
      });
    },

    handleBatchDelete(data) {
      this.$confirm('确认删除规则操作', '提示', {
        type: 'warning'
      }).then(() => {
        this.fetchDelete(data);
      });
    },

    async fetchDelete(data) {
      // const ids = []
      // this.multipleSelection.forEach(item => {
      //   ids.push(item.id)
      // })

      const form = {
        rule_id: data.rule_id,
        sdk_id: data.sdk_id,
        user_id: JSON.parse(localStorage.getItem('user')).id,
        token: localStorage.getItem('token')
      };
      try {
        await this.FetchAccount.post('/sdk_rule/delete', form);
      } catch (e) {
        return;
      }
      this.Message('ACTION_SUCCESS');
      this.fetchList();
    }
  }
};
</script>
