<template>
  <DmDialog
    ref="Dialog"
    :fetch-submit="fetchSubmit"
    :mode="options.mode"
    width="700px"
    title-label="规则"
    @submit="handleSubmit"
  >
    <el-form
      ref="Form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="150px"
    >
      <DmAlert v-if="options.listView && options.listView.length">
        已选择：<ColumnListMore v-model="options.listView" />
      </DmAlert>
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
import RULE from '@/utils/verify'
import createDialog from '@/utils/createDialog'
import ColumnListMore from '@/components/Column/ColumnListMore'
import TableSourceIP from './components/TableSourceIP'
import TableChannel from './components/TableChannel'
import packagesMixins from '../../../mixins/packages'
import Label from '../../../constants/label'

function portValidator(rule, value, callback) {
  value = value.toString().split(',')
  if (value.length > 1000) callback(new Error('最多同时添加1000个端口'))
  value.forEach(item => {
    if (!RULE.port.test(item)) {
      callback(new Error('格式不正确'))
    }
  })
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
        domain: '',
        loading: 1,
        channel_loading: 1,
        channel_status: 0,
        package_id: this.$route.params.id
      },
      rules: {
        port: [
          { required: true, message: '请输入端口', trigger: 'blur' },
          { validator: portValidator, trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    afterOpen(form) {
      this.$nextTick(() => {
        this.$refs.Form.clearValidate()
        if (form.channel_status) this.$refs.TableChannel.setList(form.channel_source_list || [])
      })
    },

    async fetchSubmit(form) {
      this.$refs.Form.validate(valid => {
        if (!valid) throw new Error()
      })

      form = {
        ...this.form
      }

      if (form.channel_status) {
        form.channel_source_list = await this.$refs.TableChannel.getList()
      } else {
        form.channel_source_list = []
      }

      try {
        await this.Fetch.post('V4/tjkd.app.domain.channel.source.batch.save', form)
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
