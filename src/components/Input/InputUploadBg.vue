<style lang="scss">
.InputUploadIcon {
  cursor: pointer;
  border: 1px solid $--border-color-base;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-upload {
    width: 100%;
  }

  .el-upload__input{
    display: none !important;
  }

  &__img {
    height: 100px;
    height: 100px;
  }

  &__icon {
    display: block;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }
}

.cropper-content {
  .cropper {
    margin: 0 auto;
    width: 320px;
    height: 320px;
  }
}
</style>

<template>
  <el-dropdown
    :show-timeout="0"
    placement="bottom"
    trigger="hover"
    @command="cmd => handleItemCommand(cmd)"
  >
    <el-dropdown-menu v-if="value !== defaultValue && defaultValue" slot="dropdown">
      <el-dropdown-item command="reset">重置</el-dropdown-item>
    </el-dropdown-menu>
    <el-upload
      :show-file-list="false"
      :auto-upload="false"
      :on-change="getUploadFile"
      action=""
      class="InputUploadIcon"
    >
      <template v-if="value">
        <el-image
          :src="value"
          :class="b('img')"
          style="margin-top: 10px"
          fit="contain"
        />
      </template>
      <div
        v-else
        :class="b('icon')"
        class="el-icon-upload2"
      />
    </el-upload>
  </el-dropdown>

</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'InputUploadIcon',

  props: {
    value: String,
    fileKey: String,
    defaultValue: String
  },

  data() {
    return {
      dialogVisible: false,
      uploadLoading: false,
      option: {
        img: '',
        info: true,
        outputType: 'png',
        canScale: false,
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 160,
        autoCropHeight: 90,
        fixedBox: true,
        fixed: true,
        full: true,
        canMoveBox: false,
        centerBox: false,
        infoTrue: false
      }
    }
  },

  watch: {
    defaultValue() {
      this.initDefault()
    }
  },

  created() {
    this.initDefault()
  },

  methods: {
    initDefault() {
      if (!this.value && this.defaultValue) this.$emit('input', this.defaultValue)
    },

    reset() {
      this.$nextTick(() => {
        console.log(this.defaultValue)
        if (this.defaultValue) this.$emit('input', this.defaultValue)
      })
    },

    handleItemCommand(cmd) {
      if (cmd === 'reset') {
        this.$emit('input', this.defaultValue)
      }
    },

    getUploadFile(file, fileList) {
      this.fileinfo = file

      this.finish()
    },

    finish() {
      const formData = new FormData()
      formData.append('fileKey', this.fileKey)
      formData.append(
        this.fileKey,
        new File(
          [this.fileinfo.raw],
          this.fileinfo.name,
          { type: this.fileinfo.type }
        )
      )
      this.upLoadFile(formData)
    },

    async upLoadFile(formData) {
      this.uploadLoading = true
      let res
      try {
        res = await this.Fetch.post('sso/V4/upload/uploadPic', formData)
      } finally {
        this.uploadLoading = false
      }
      this.$emit('input', res.real_url)
      this.dialogVisible = false
    }
  }
})
</script>
