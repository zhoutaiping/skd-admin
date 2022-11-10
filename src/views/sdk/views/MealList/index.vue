<template>
  <ConsolePageLayout style="padding: 12px">
    <DmToolbar>
      <div slot="right">
        <InputSearch
          v-model="bindParams.app_name"
          placeholder="应用名称"
          style="width: 200px;"
          @submit="handleSearch()"
        />
      </div>
      <el-button type="primary" @click="$refs.Add.handleOpen()">添加应用</el-button>
    </DmToolbar>
    <DmData ref="DmData" @init="fetchList">
      <DmTable :loading="loading" min-height>
        <el-table :data="list">
          <el-table-column label="应用名称" prop="app_name" min-width="150">
            <template slot-scope="{ row }">{{ row.app_name || "--" }}</template>
          </el-table-column>
          <el-table-column label="AccessKey" min-width="150">
            <template slot-scope="scope">
              <span>{{ scope.row.access_key }}</span>
              <el-tooltip content="点击可复制到粘贴板">
                <el-button type="text" @click="copyAccessKey(scope.row,'access_key')">
                  <i class="el-icon-copy-document" style="margin-left: 8px" />
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="UUID" width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-tooltip content="点击可复制到粘贴板">
                <el-button type="text" @click="copyAccessKey(scope.row,'uuid')">
                  copy-uuid
                  <i class="el-icon-copy-document" style="margin-left: 8px" />
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" prop="created_at">
            <template slot-scope="{row}">{{formartTime(row.created_at)}}</template>
          </el-table-column>
          <el-table-column v-if="false" label="更新时间" min-width="100">
            <template slot-scope="scope">
              {{ scope.row.updated_at }}
              <ColumnExpireTime :expire-time="scope.row.updated_at" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140" fixed="right" align="right">
            <template slot-scope="{row}">
              <el-dropdown
                type="primary"
                @command="
                  (e) => {
                    handleOption(e, row);
                  }
                "
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-more" />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="edit">编辑</el-dropdown-item>
                  <el-dropdown-item command="rule">规则管理</el-dropdown-item>
                  <el-dropdown-item command="delete">
                    <span style="color: red">删除</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="console">控制台</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <Add ref="Add" @init="$refs.DmData.initPage()" />
  </ConsolePageLayout>
</template>

<script>
import consoleData from '@/mixins/consoleData';
import ColumnExpireTime from '@/components/Column/ColumnExpireTime';
import DmToolbar from '@/components/Dm/DmToolbar.vue';
import Add from './components/add.vue';

export default {
  // inject: ['ModuleId'],

  components: { ColumnExpireTime, DmToolbar, Add },

  mixins: [consoleData],

  data() {
    return {
      API_INDEX: '/sdk/list',
      bindParams: {
        tenant_id: localStorage.getItem('tenant_id'),
        token: localStorage.getItem('token'),
        user_id: JSON.parse(localStorage.getItem('user')).id
      }
    };
  },
  computed: {
    tenant_id() {
      return localStorage.getItem('tenant_id')
        ? Number(localStorage.getItem('tenant_id') || 0)
        : 0;
    },
    user_id() {
      return (
        (JSON.parse(localStorage.getItem('user')) &&
          JSON.parse(localStorage.getItem('user')).id) ||
        0
      );
    },
    token() {
      return localStorage.getItem('token') || '';
    }
  },

  methods: {
    copyAccessKey(row, type) {
      if (type === 'access_key') {
        this.Help.copyText(row[type]);
        this.$message.success('复制成功');
      } else if (type === 'uuid') {
        this.FetchAccount.get('/sdk/builtin_config', {
          sdk_id: row.sdk_id,
          tenant_id: row.tenant_id
        })
          .then(res => {
            this.Help.copyText(res.uuid);
            this.$message.success('复制成功');
          })
          .catch(e => {
            this.$message.warning('复制失败');
          });
      }
    },
    handleOption(key, data) {
      const optionMap = {
        edit: val => this.$refs.Add.handleOpen(val, { mode: 'Edit' }),
        delete: val => this.del(data),
        rule: val => {
          return this.$router.push({
            name: `SDK_app_id`,
            params: { id: val.sdk_id }
          });
        },
        console: val => {
          return this.$router.push({
            name: `sdk_business__id`,
            params: { id: val.sdk_id },
            query: { title: val.app_name }
          });
        }
      };

      return optionMap[key](data);
    },
    async del(data) {
      if (!data.sdk_id) return;
      try {
        await this.FetchAccount.post('/sdk/delete', {
          sdk_id: data.sdk_id,
          tenant_id: this.tenant_id,
          user_id: JSON.parse(localStorage.getItem('user')).id,
          token: localStorage.getItem('token')
        });
        await this.$refs.DmData.initPage();
        this.Message('ACTION_SUCCESS');
      } catch (error) {
        this.Message('ACTION_ERROR');
        return;
      }
    }
  }
};
</script>
