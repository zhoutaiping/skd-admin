<style lang="scss">
.TransferTableItem {
  border-radius: 2px;
  background: #fff;

  &--border {
    border: 1px solid rgba(0, 0, 0, 0.1);

    .TransferItem {
      &__header {
        padding: 12px;
      }

      &__body {
        border: none;
      }
    }
  }

  &__header {
    padding: 12px;
    padding-bottom: 12px;
  }

  &__body {
    position: relative;
  }

  &__topInfo {
    position: absolute;
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 0 12px;
    left: 0px;
    top: 0px;
    right: 0px;
    line-height: 32px;
    font-size: 12px;
    z-index: 10;
  }

  &__list {
    padding-top: 32px;

    .ps-container {
      height: 350px;
    }
  }

  &__footer {
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    padding: 0 16px;
  }
}
</style>

<template>
  <div :class="b()">
    <DmTable
      :loading="loading"
      min-height
      type="white"
      border
    >
      <el-table
        :data="list"
        height="250"
        @selection-change="val => $emit('selection-change', val)"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <slot name="table-column"/>
      </el-table>
    </DmTable>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'TransferTableItem',

  props: {
    fetchData: Function
  },

  data() {
    return {
      loading: false,
      list: [],
      total: 0,
      bindParams: {}
    }
  },

  methods: {
    async getData() {
      this.loading = true
      const res = await this.fetchData(this.bindParams)
      this.list = res.list
      this.total = res.total
      this.loading = false
    }
  }
})
</script>
