<style lang="scss">
.CardIndexMultiple {
  &__title {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 10px;
    border-top: 1px solid $--border-gray;
    padding-top: 10px;
  }

  &__core {
    font-size: 14px;
  }

  .dataItem{
    height: 25px;
    line-height: 25px;
  }
}
</style>

<template>
  <DmCard
    :class="b()"
    :loading="loading"
  >
    <div :class="b('core')">
      <el-row
        v-for="(item, index) in data"
        :key="index"
        :gutter="12"
        class="dataItem"
      >
        <el-col :span="12">{{ item.label }}
        </el-col>
        <el-col :span="12">
          {{ item.value }}
          {{ item.unit }}
        </el-col>
      </el-row>
    </div>
    <div :class="b('title')">{{ title }}</div>
  </DmCard>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'CardIndexMultiple',

  props: {
    title: String,
    loading: Boolean,
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
})
</script>
