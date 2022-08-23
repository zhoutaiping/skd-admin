<template>
  <div>
    <DmTable
      add-button
      border
      @click-add-button="handleRowAdd"
    >
      <el-table :data="list">
        <el-table-column
          label="IP"
          min-width="200px"
        >
          <template slot-scope="scope">
            <ColumnForm
              :ref="`id-${scope.$index}`"
              :rules="rowRules"
              :model="scope.row"
              prop="id"
            >
              <yd-form-select
                :selects="selectList"
                v-model="scope.row.id"
                style="width: 100%"
              />
            </ColumnForm>
          </template>
        </el-table-column>
        <el-table-column
          label="线路"
          width="140"
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
    }
  },

  data() {
    return {
      IP_VIEW,
      selectList: [],
      rowKey: ['id'],
      row: {
        id: '',
        backup: 1
      },
      ipMap: {},
      rowRules: {
        id: [
          {
            required: true,
            message: ' ',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const ipMap = {}
      this.packageChannelList.forEach(_ => {
        ipMap[_.id] = _.ip
      })
      this.ipMap = ipMap
      this.selectList = this.packageChannelList.map(_ => {
        return {
          label: `${_.channel_name} [${_.ip}]`,
          value: Number(_.id)
        }
      })
    },

    async setList(list) {
      this.list = list
    },

    async getList() {
      try {
        await this.handleCheckList()
      } catch (e) {
        throw new Error()
      }
      const list = this.list.map(_ => {
        return {
          id: _.id,
          ip: this.ipMap[_.id],
          backup: _.backup
        }
      })

      const ids = list.map(_ => _.id)

      if (ids.length !== new Set(ids).size) {
        this.$message.warning('加速通道有重复项')
        throw new Error()
      }

      if (list.length === 0) {
        this.$message.warning('请配置加速通道')
        throw new Error()
      }
      if (!list.map(_ => _.backup).includes(1)) {
        this.$message.warning('加速通道至少需要一条主线路')
        throw new Error()
      }
      return list
    }
  }
}
</script>
