<template>
  <DmDialog
    ref="Dialog"
    :fetch-submit="fetchSubmit"
    :mode="options.mode"
    width="700px"
    title-label="规则"
    @submit="handleSubmit"
  >
    <DmAlert v-if="options.listView && options.listView.length">
      已选择：
      <ColumnListMore v-model="options.listView" />
    </DmAlert>
    <el-form
      ref="Form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="150px"
    >
      <el-form-item
        v-if="form.protocol === 1 && (options.batch === false || (options.batch === true && options.mode==='Create'))"
        prop="domain"
        label="域名"
      >
        <el-input
          v-model="form.domain"
          :placeholder="options.batch ? 'www.demo.com，多个域名以“，”隔开' : 'www.demo.com'"
          style="width: 280px"
          type="textarea"
        />
      </el-form-item>
      <el-form-item
        prop="port"
        label="转发端口"
      >
        <el-input
          v-if="options.batch"
          v-model="form.port"
          :disabled="options.mode === 'Edit'"
          type="textarea"
          placeholder="多个端口以“，”隔开（支持端口范围 eg: 1000-1020，单次最多添加1000条）"
          style="width: 280px"
        />
        <el-input
          v-else
          v-model="form.port"
          placeholder="端口"
          style="width: 280px"
        />
      </el-form-item>
      <el-form-item label="负载均衡模式">
        <yd-form-radio
          v-model="form.loading"
          :radios="Label.loading"
        />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          placeholder="备注"
          type="textarea"
          style="width: 280px"
        />
      </el-form-item>
      <el-form-item label="源类型">
        <yd-form-radio-button
          v-model="form.source_type"
          :radios="Label.sourceType"
        />
      </el-form-item>
      <el-form-item label="源配置">
        <TableSourceIP
          ref="TableSourceIP"
          :source-type="form.source_type"
        />
      </el-form-item>
      <!-- 加速通道 -->
      <template v-if="packageChannelList.length > 0">
        <el-form-item>
          <el-checkbox
            v-model="form.channel_status"
            :true-label="1"
            :false-label="0"
          >启用加速通道</el-checkbox>
        </el-form-item>
        <template v-if="form.channel_status === 1">
          <el-form-item label="加速通道负载均衡模式">
            <yd-form-radio
              v-model="form.channel_loading"
              :radios="Label.loading"
            />
          </el-form-item>
          <el-form-item label="加速通道">
            <TableChannel ref="TableChannel" />
          </el-form-item>
        </template>
      </template>
    </el-form>
  </DmDialog>
</template>

<script>
import createDialog from '@/utils/createDialog'
import ColumnListMore from '@/components/Column/ColumnListMore'
import TableSourceIP from './components/TableSourceIP'
import TableChannel from './components/TableChannel'
import packagesMixins from '../../../mixins/packages'

const Label = {
  protocol: [
    {
      label: 'TCP',
      value: 1
    },
    {
      label: 'UDP',
      value: 2
    }
  ],
  loading: [
    {
      label: '轮询',
      value: 1
    },
    {
      label: 'IP哈希',
      value: 2
    }
  ],
  sourceType: [
    {
      label: 'IP',
      value: 1
    },
    {
      label: '域名',
      value: 2
    }
  ]
}

function portValidator(rule, value, callback) {
  value = value.toString().replace('，', ',')
  value = value.toString().split(',')
  if (value.length > 1000) callback(new Error('最多同时添加1000个端口'))
  callback()
}

export default createDialog({
  components: { ColumnListMore, TableSourceIP, TableChannel },

  mixins: [packagesMixins],

  data() {
    return {
      loading: true,
      Label,
      optionsDefault: {
        batch: false,
        mode: 'Create',
        listView: []
      },
      formDefault: {
        protocol: 1,
        domain: '',
        port: '',
        loading: 1,
        channel_loading: 1,
        remark: '',
        channel_status: 0,
        source_type: 1,
        source: [
          {
            ip: '',
            port: '',
            backup: 1
          }
        ],
        package_id: this.$route.params.id
      },
      rules: {
        port: [
          { required: true, message: '请输入端口', trigger: 'blur' },
          { validator: portValidator, trigger: 'blur' }
        ],
        domain: [
          {

          }
        ]
      }
    }
  },

  methods: {
    afterOpen(form) {
      this.$nextTick(async() => {
        this.$refs.Form.clearValidate()
        const source_list = form.source_list
        if (this.options.batch && this.options.mode === 'Edit') {
          source_list.forEach(_ => {
            _.port = ''
          })
        }
        this.$refs.TableSourceIP.setList(source_list || [])
        if (form.channel_status) this.$refs.TableChannel.setList(form.channel_source_list || [])
        this.loading = false
      })
    },

    async fetchSubmit(form) {
      this.$refs.Form.validate(valid => {
        if (!valid) throw new Error()
      })

      const source_list = await this.$refs.TableSourceIP.getList()
      form = {
        ...this.form,
        source_list,
        channel_source_list: form.channel_status ? source_list : []
      }

      try {
        if (this.options.batch) {
          if (this.options.mode === 'Create') {
            await this.Fetch.post('V4/tjkd.app.domain.batch.add', form)
          } else {
            await this.Fetch.post('V4/tjkd.app.domain.batch.edit', form)
          }
        } else {
          if (this.options.mode === 'Create') {
            await this.Fetch.post('V4/tjkd.app.domain.add', form)
          } else {
            await this.Fetch.post('V4/tjkd.app.domain.edit', form)
          }
        }
      } catch (e) {
        throw new Error()
      }
    },

    async handleSubmit() {
      this.Message('ACTION_SUCCESS')
      this.$emit('init')
      this.handleClose()
    }
  }
})
</script>
