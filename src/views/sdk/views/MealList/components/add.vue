<template>
  <DmDialog
    ref="Dialog"
    :fetch-submit="fetchSubmit"
    :mode="options.mode"
    width="500px"
    title-label="应用"
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
        prop="app_name"
        label="应用名称"
      >
        <el-input
          v-model="form.app_name"
          style="width: 280px"
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
    </el-form>
  </DmDialog>
</template>

<script>
import createDialog from '@/utils/createDialog'

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
      optionsDefault: {
        mode: 'Create'
      },
      formDefault: {
        app_name: '',
        remark: '',
        token: localStorage.getItem('token')
      },
      rules: {
        app_name: [
          { required: true, message: '请输入应用名称', trigger: 'blur' },
        ],
        remark: []
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
        if (this.options.mode === 'Create') {
          await this.FetchAccount.post('/sdk/add', form)
        } else {
          await this.FetchAccount.post('/sdk/modify', form)
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
