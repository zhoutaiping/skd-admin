<template>
  <DmTable
    :class="b()"
    :loading="loading"
    border
    add-button
    @click-add-button="handleAdd"
  >
    <el-table :data="list">
      <el-table-column
        width="300"
        label="类型"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.$edit">
            <yd-form-select
              v-model="scope.row.typeRaw"
              :selects="HEADER_LIST"
              :style="{ width: scope.row.typeRaw === 'custom' ? '100px' : '100%'}"
              @change="value => handleChangeTypeRaw(value, scope.row)"
            />
            <template v-if="scope.row.typeRaw === 'custom'">
              <el-tooltip
                content="自定义回源请求头类型由数字、大小写英文字符及特殊符 -_ 组成，长度为1 - 100个字符"
                placement="bottom"
              >
                <el-input
                  v-model="scope.row.type"
                  placeholder="回源HTTP请求头"
                  style="width: 170px; display: inline-block; margin-left: 8px"
                />
              </el-tooltip>
            </template>
          </template>
          <p v-else>{{ scope.row.type }}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="匹配内容（多个之间以 ',' 隔开）"
        prop="content"
        min-width="200"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.$edit">
            <el-input
              v-if="getHeaderSettings(scope.row.type).disabledEdit"
              v-model="scope.row.content"
              disabled
            />
            <el-input
              v-else
              v-model="scope.row.content"
              placeholder="请求头匹配内容长度为1-1000个字符，不支持中文"
            />
          </template>
          <p v-else>{{ scope.row.content || '未填写' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        min-width="100"
        label="备注"
        prop="remark"
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.$edit"
            v-model="scope.row.remark"
            placeholder="备注"
          />
          <p v-else>{{ scope.row.remark || '-' }}</p>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        align="right"
        label="操作"
      >
        <template slot-scope="scope">
          <template v-if="fetchSave && fetchDelete">
            <el-button
              v-if="scope.row.$edit"
              type="text"
              @click="handleRowCancle(scope.row, scope.$index)"
            >取消</el-button>
            <el-button
              v-else
              type="text"
              @click="handleRowEdit(scope.row)"
            >编辑</el-button>
            <el-divider direction="vertical"/>
            <el-button
              v-if="scope.row.$edit"
              type="text"
              @click="handleSave(scope.row)"
            >保存</el-button>
            <el-button
              v-else
              type="text"
              @click="handleRowDelete(scope)"
            >删除</el-button>
          </template>
          <el-button
            v-else
            type="text"
            @click="handleRowDelete(scope)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </DmTable>
</template>

<script>
import create from '@/utils/create-basic'
import consoleTable from '@/mixins/consoleTable'

const HEADERS = [
  {
    label: 'Accept-Encoding',
    value: 'Accept-Encoding',
    content: ''
  },
  {
    label: 'Accept-Language',
    value: 'Accept-Language',
    content: ''
  },
  {
    label: 'User-Agent',
    value: 'User-Agent',
    content: ''
  },
  {
    label: 'Content-Type',
    value: 'Content-Type',
    content: ''
  },
  {
    label: 'Access-Control-Expose-Headers',
    value: 'Access-Control-Expose-Headers',
    content: ''
  },
  {
    label: 'X-Real-port',
    value: 'X-Real-port',
    content: '$remote_port',
    disabledEdit: true
  },
  {
    label: 'X-Request-Id',
    value: 'X-Request-Id',
    content: '$request_id',
    disabledEdit: true
  },
  {
    label: 'X-Req-Start-Time',
    value: 'X-Req-Start-Time',
    content: '$request_start_time',
    disabledEdit: true
  },
  {
    label: 'Client-Ip',
    value: 'Client-Ip',
    content: '$remote_addr',
    disabledEdit: true
  },
  {
    label: 'Client-Scheme',
    value: 'Client-Scheme',
    content: '$scheme',
    disabledEdit: true
  }
]

export default create({
  name: 'TableSourceHeader',

  props: {
    fetchList: Function,
    fetchSave: Function,
    fetchDelete: Function
  },

  mixins: [consoleTable],

  data() {
    return {
      HEADER_LIST: HEADERS.concat({
        label: '自定义',
        value: 'custom'
      }),
      loading: true
    }
  },

  created() {
    this.init()
  },

  methods: {
    getHeaderSettings(value) {
      const item = this.HEADER_LIST.find(_ => _.value === value)
      return item || {}
    },

    handleChangeTypeRaw(value, row) {
      row.type = value === 'custom' ? '' : value
      const itemSettings = this.getHeaderSettings(value)
      row.content = itemSettings.content || ''
    },

    async init() {
      this.loading = true
      if (this.fetchList) {
        const list = await this.fetchList()
        this.setList(list)
      }
      this.loading = false
    },

    setList(list) {
      list.forEach(item => {
        item = Object.assign(item, item.value)
        item.typeRaw = this.HEADER_LIST.map(_ => _.value).includes(item.type) ? item.type : 'custom'
        item.$edit = false
      })
      this.list = list
    },

    getList() {
      return this.list
    },

    handleRowCancle(row, index) {
      const { id } = row
      if (id) {
        Object.assign(row, row.$cache)
        row.$edit = false
      } else {
        this.list.splice(index, 1)
      }
    },

    async handleSave(row) {
      if (this.fetchSave) await this.fetchSave(row)
      this.Message('ACTION_SUCCESS')
      row.$edit = false
      this.init()
    },

    async handleRowDelete({ row, $index }) {
      if (this.fetchDelete) {
        this.$confirm('确认删除?', '提示', {
          type: 'warning'
        }).then(async() => {
          await this.fetchDelete(row)
          this.Message('ACTION_SUCCESS')
          this.init()
        })
      } else {
        this.list.splice($index, 1)
      }
    },

    handleAdd() {
      if (this.fetchSave && this.fetchDelete && this.list.some(_ => _.$edit)) {
        this.$message.warning('请先保存')
        return
      }
      this.list.push({
        type: '',
        remark: '',
        content: '',
        $edit: true
      })
    }
  }
})
</script>
