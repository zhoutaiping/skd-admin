<template>
  <div>
    <yd-dialog
      :visible.sync="dialogVisible"
      title="预览页面"
      size="large"
    >
      <div
        class="UploadHtml"
        v-html="diyPageContent"
      />
    </yd-dialog>
    <el-form>
      <el-form-item>
        <el-input
          :autosize="{ minRows: 10, maxRows: 20}"
          v-model="diyPageContent"
          class="upload-html diy-input"
          type="textarea"
          placeholder="<h1></h1>"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="updateDiyPage"
        >提交</el-button>
        <el-button @click="dialogVisible = true">预览</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'UploadHtml',
  props: {
    html: {}
  },
  data() {
    return {
      diyPageContent: '',
      dialogVisible: false
    }
  },
  mounted() {
    this.diyPageContent = this.html
  },
  methods: {
    updateDiyPage() {
      if (this.diyPageContent.length > 64 * 1024) {
        this.$message.error('超出大小限制（64K）')
        return
      }

      if (!this.diyPageContent) {
        this.$message.error('不能为空！')
        return
      }
      this.$emit('updateHtml', this.diyPageContent)
    }
  }
}
</script>

<style lang="scss">
.UploadHtml {
  img {
    max-width: 300px;
  }
}
.diy-input {
  margin-top: 12px;
}
</style>
