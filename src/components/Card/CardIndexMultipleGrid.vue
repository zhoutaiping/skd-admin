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

  .dataItem {
    height: 25px;
    line-height: 25px;
  }
}
</style>

<template>
  <el-row :gutter="12">
    <el-col
      v-for="(item, index) in data"
      :key="index"
      :span="24 / data.length"
    >
      <DmCard>
        <ItemNumber
          v-model="item.value"
          :title="item.label"
          :unit="item.unit"
          :loading="loading"
        />
      </DmCard>
    </el-col>
  </el-row>
</template>

<script>
import create from '@/utils/create-basic'
import ItemNumber from '@/components/Item/ItemNumber'

export default create({
  name: 'CardIndexMultipleGrid',

  components: { ItemNumber },

  props: {
    title: String,
    loading: {
      type: Boolean, default: false
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
})
</script>
