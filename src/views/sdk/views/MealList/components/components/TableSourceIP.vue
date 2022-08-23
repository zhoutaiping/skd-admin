<template>
  <div>
    <DmTable
      add-button
      border
      @click-add-button="handleRowAdd"
    >
      <el-table :data="list">
        <el-table-column
          :label="sourceType === 1 ? 'IP' : '域名'"
          min-width="150px"
        >
          <template slot-scope="scope">
            <ColumnForm
              v-if="sourceType === 1"
              :ref="`ip-${scope.$index}`"
              :rules="rowRules"
              :model="scope.row"
              prop="ip"
            >
              <el-input
                v-model="scope.row.ip"
                placeholder="8.8.8.8"
              />
            </ColumnForm>
            <ColumnForm
              v-if="sourceType === 2"
              :ref="`domain-${scope.$index}`"
              :rules="rowRules"
              :model="scope.row"
              prop="domain"
            >
              <el-input
                v-model="scope.row.domain"
                placeholder="www.demo.com"
              />
            </ColumnForm>
          </template>
        </el-table-column>
        <el-table-column
          v-if="showPort"
          label="端口"
          min-width="100px"
        >
          <template slot-scope="scope">
            <!-- :rules="rowRules" -->
            <ColumnForm
              :ref="`port-${scope.$index}`"
              :model="scope.row"
              prop="port"
            >
              <el-input
                v-model="scope.row.port"
                placeholder="8080"
              />
            </ColumnForm>
          </template>
        </el-table-column>
        <el-table-column
          label="线路"
          width="140px"
        >
          <template slot-scope="scope">
            <yd-form-select
              v-model="scope.row.backup"
              :selects="IP_VIEW"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          label="操作"
          width="80px"
        >
          <template slot-scope="scope">
            <ColumnAction>
              <el-button
                type="text"
                @click="handleRowDelete(scope.$index)"
              >删除</el-button>
            </ColumnAction>
          </template>
        </el-table-column>
      </el-table>
    </DmTable>
  </div>
</template>

<script>
import consoleTable from '@/mixins/consoleTable'
import RULE from '@/utils/verify'
import ColumnForm from '@/components/Column/ColumnForm'
import packagesMixins from '../../../../mixins/packages'

const IP_VIEW = [
  {
    label: '主线路',
    value: 1
  },
  {
    label: '备线路',
    value: 2
  }
]

export default {
  components: { ColumnForm },

  mixins: [consoleTable, packagesMixins],

  props: {
    sourceType: {
      type: Number,
      default: 1
    },
    showPort: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      IP_VIEW,
      rowKey: ['ip', 'domain', 'port'],
      row: {
        ip: '',
        domain: '',
        port: '',
        backup: 1
      },
      rowRules: {
        ip: [
          {
            required: true,
            pattern: RULE.ipReg,
            message: ' ',
            trigger: 'blur'
          }
        ],
        domain: [
          {
            required: true,
            pattern: RULE.domain,
            message: ' ',
            trigger: 'blur'
          }
        ],
        port: [
          {
            required: true,
            pattern: RULE.port,
            message: ' ',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    async setList(list) {
      this.$nextTick(() => {
        this.list = list
      })
    },

    async getList() {
      try {
        await this.handleCheckList()
      } catch (e) {
        throw new Error()
      }

      const list = this.list.map(_ => {
        const item = {
          ip: Number(this.sourceType) === 1 ? _.ip : _.domain,
          backup: _.backup
        }
        if (this.showPort) item.port = _.port
        return item
      })

      if (list.length === 0) {
        this.$message.warning('请配置源数据')
        throw new Error()
      }
      if (!list.map(_ => _.backup).includes(1)) {
        this.$message.warning('至少需要一条主线路')
        throw new Error()
      }

      return list
    }
  }
}
</script>
