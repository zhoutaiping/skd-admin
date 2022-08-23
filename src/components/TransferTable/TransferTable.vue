<style lang="scss">
.TransferTable{
  display: flex;

  &__item {
    strong {
      font-size: 13px
    }
  }

  &__center {
    display: flex;
    padding: 0 10px;
    justify-content: center;
    flex-direction: column;

    .btn {
      width: 60px;
      margin-left: 0px;
      margin-top: 10px;
    }
  }
}
</style>

<template>
  <div :class="b()">
    <div :class="b('item')">
      <strong>{{ outLabel }}
        <template v-if="$refs.TransferTableItemOut">
          （{{ $refs.TransferTableItemOut.total }}）
        </template>
      </strong>
      <TransferTableItem
        ref="TransferTableItemOut"
        :fetch-data="fetchOutList"
        @selection-change="val => selectedOut = val"
      >
        <template slot="table-column">
          <slot name="out-table-column" />
          <slot name="table-column" />
        </template>
      </TransferTableItem>
    </div>
    <div :class="b('center')">
      <el-button
        :type="selectedIn.length ? 'primary' : 'default'"
        :loading="loadingToOut"
        :disabled="!selectedIn.length"
        class="btn"
        @click="handleToOut"
      >
        <i class="el-icon-back" />
      </el-button>
      <el-button
        :type="selectedOut.length ? 'primary' : 'default'"
        :loading="loadingToIn"
        :disabled="!selectedOut.length"
        class="btn"
        @click="handleToIn"
      >
        <i class="el-icon-right" />
      </el-button>
    </div>
    <div :class="b('item')">
      <strong>{{ inLabel }}
        <template v-if="$refs.TransferTableItemIn">
          （{{ $refs.TransferTableItemIn.total }}）
        </template>
      </strong>
      <TransferTableItem
        ref="TransferTableItemIn"
        :fetch-data="fetchInList"
        @selection-change="val => selectedIn = val"
      >
        <template slot="table-column">
          <slot name="in-table-column" />
          <slot name="table-column" />
        </template>
      </TransferTableItem>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import TransferTableItem from './TransferTableItem'

export default create({
  name: 'TransferTable',

  components: { TransferTableItem },

  props: {
    fetchToIn: Function,
    fetchToOut: Function,
    fetchInList: Function,
    fetchOutList: Function,
    outLabel: {
      type: String,
      default: '未选择'
    },
    inLabel: {
      type: String,
      default: '已选择'
    }
  },

  data() {
    return {
      selectedIn: [],
      selectedOut: [],
      loadingToOut: false,
      loadingToIn: false
    }
  },

  methods: {
    init() {
      this.$refs.TransferTableItemIn.getData()
      this.$refs.TransferTableItemOut.getData()
    },

    handleSelectionchange() {

    },

    async handleToOut() {
      try {
        this.loadingToOut = true
        await this.fetchToOut(this.selectedIn)
      } catch (e) {
        return
      } finally {
        this.loadingToOut = false
      }
      this.init()
      this.Message('ACTION_SUCCESS')
    },

    async handleToIn() {
      try {
        this.loadingToIn = true
        await this.fetchToIn(this.selectedOut)
      } catch (e) {
        return
      } finally {
        this.loadingToIn = false
      }
      this.init()
      this.Message('ACTION_SUCCESS')
    }
  }
})
</script>
