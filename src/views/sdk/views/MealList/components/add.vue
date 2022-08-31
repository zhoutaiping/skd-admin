<style scoped>
.input-box {
  width: 400px;
}
</style>
<template>
  <DmDialog
    ref="Dialog"
    :fetch-submit="fetchSubmit"
    :mode="options.mode"
    width="700px"
    title="应用"
    @submit="handleSubmit"
  >
    <el-form
      ref="Form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="150px"
    >
      <el-form-item
        prop="domain"
        label="应用名称"
      >
        <el-input
          v-model="form.name"
          class="input-box"
        />
      </el-form-item>
      <!-- <el-form-item
        prop="AccessKey"
        label="AccessKey"
      >
        <el-input
          v-model="form.ip"
          class="input-box"
        />
        <a>生成AccessKey</a>
      </el-form-item> -->
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          placeholder="备注"
          type="textarea"
          class="input-box"
        />
      </el-form-item>
    </el-form>
  </DmDialog>
</template>

<script>
import createDialog from '@/utils/createDialog'

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
  components: { },

  mixins: [],

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
        source_type: ''
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
        this.loading = false
      })
    },

    async fetchSubmit(form) {
      this.$refs.Form.validate(valid => {
        if (!valid) throw new Error()
      })

      form = {
        ...this.form
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
