<style lang="scss">
.CardInfos {
  &__item {
    font-size: 14px;
    margin-top: 8px;
  }
}
</style>

<template>
  <DmCard
    :loading="loading"
    :title="title"
    :class="b()"
  >
    <el-row :gutter="12">
      <el-col
        v-for="(item, index) in viewData"
        :span="8"
        :key="index"
        :class="b('item')"
      >{{ item.label }}：
        <slot
          :name="item.key"
          :row="item"
        />
        <template v-if="!item.component">
          {{ item.value }} {{ item.unit }}
        </template>
      </el-col>
    </el-row>
  </DmCard>
</template>

<script>
import create from '@/utils/create-basic'
import { labelView } from '@/utils/filter'

export default create({
  name: 'CardInfos',

  props: {
    title: String,
    loading: {
      type: Boolean,
      default: true
    },
    col: {

    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      viewData: []
    }
  },

  watch: {
    data(val) {
      this.initData()
    }
  },

  created() {
    this.initData()
  },

  methods: {
    setItemData(key, value) {
      if (!key) return
      const item = this.viewData.find(_ => _.key === key)
      if (!item) return
      if (item.labelMap) {
        if (!isNaN(value)) value = Number(value)
        value = labelView(value, item.labelMap)
      }
      item.value = value
    },

    initData() {
      const data = []
      this.data.forEach(item => {
        data.push({
          ...item,
          value: item.default || item.value || ''
        })
      })
      this.viewData = data
    }
  }
})
</script>
