<style lang="scss">
.InputUpload {
  cursor: pointer;

  &--image {
    border: 1px solid $--border-color-base;
    width: 200px;
    height: 50px;

    .el-upload {
      width: 200px;
    }
  }

  .el-upload {
    width: 100%;
  }

  &__img {
    height: 50px;
  }

  &__icon {
    display: block;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }
}
</style>

<template>
  <el-upload
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :data="{fileKey}"
    :class="b([type])"
    :name="fileKey"
    action="/api/sso/V4/upload/uploadPic"
  >
    <template v-if="type === 'image'">
      <el-image
        v-if="value"
        :src="value"
        :class="b('img')"
        fit="contain"
      />
      <div
        v-else
        :class="b('icon')"
        class="el-icon-upload2"
      />
    </template>
    <template v-else>
      <el-input
        v-model="value"
        placeholder="..."
      >
        <template slot="append">
          <el-button type="primary">选择上传</el-button>
        </template>
      </el-input>
    </template>
  </el-upload>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'InputUpload',

  props: {
    value: String,
    fileKey: String,
    type: {
      type: String,
      default: 'image'
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {
      const { status = {}, data = {}} = res
      if (status.message) this.$message.warning(status.message)
      if (data.real_url) this.$emit('input', data.real_url)
    }
  }
})
</script>
