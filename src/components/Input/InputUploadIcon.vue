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
    <el-dialog
      :visible.sync="dialogVisible"
      title="图片剪裁"
      width="400px"
      append-to-body
    >
      <div class="cropper-content">
        <div
          class="cropper"
          style="text-align:center"
        >
          <vueCropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
            :center-box="option.centerBox"
            :info-true="option.infoTrue"
            :fixed-box="option.fixedBox"
          />
        </div>
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          :loading="uploadLoading"
          type="primary"
          @click="finish"
        >确认</el-button>
      </div>
    </el-dialog>
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
        autoCropWidth: 80,
        autoCropHeight: 80,
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
      var files = file.raw
      this.fileinfo = file
      const reader = new FileReader()
      reader.onload = async e => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
        this.dialogVisible = true
      }
      reader.readAsArrayBuffer(files)
      this.option.fixedNumber = [1, 1]
    },

    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        const formData = new FormData()
        formData.append('fileKey', this.fileKey)
        formData.append(
          this.fileKey,
          new File(
            [data],
            this.fileinfo.name,
            { type: this.fileinfo.type }
          )
        )
        this.upLoadFile(formData)
      })
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
