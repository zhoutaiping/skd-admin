<style lang="scss">
.TransferMany {
  width: 700px;
  .el-dropdown-link {
    cursor: pointer;
  }

  .customInput {
    textarea {
      height: 440px;
    }
  }

  &__center {
    position: absolute;
    display: inline-block;
    width: 100px;
    left: 50%;
    top: 50%;
    text-align: center;
    margin-left: -50px;
    margin-top: -40px;

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
    <el-row :gutter="100">
      <el-col :span="12">
        <el-dropdown
          v-if="is_custom"
          trigger="click"
          @command="handleModeClick"
        >
          <a class="el-dropdown-link">
            <template v-if="custom">
              <strong>手动输入</strong>
            </template>
            <template v-else>
              <strong>{{ outLabel }}（{{ total.out }}）</strong>
            </template>
            <i class="el-icon-arrow-down el-icon--right" />
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              :disabled="disabled"
              command="custom"
            >手动输入</el-dropdown-item>
            <el-dropdown-item
              :disabled="disabled"
              command="select"
            >选择框</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <strong v-else>{{ outLabel }}（{{ total.out }}）</strong>
        <template v-if="custom">
          <el-input
            :disabled="disabled"
            v-model="customeInput"
            class="customInput"
            type="textarea"
          />
        </template>
        <template v-else>
          <TransferItem
            ref="OutList"
            :disabled="disabled"
            :show-search="showOutSearch"
            :size="size"
            v-model="selectedOut"
            :fetch-data="fetchOutList"
            border
            @update="val => handleUpdateItem(val, 'out')"
          />
        </template>
      </el-col>
      <!-- 已选择 -->
      <el-col :span="12">
        <strong>{{ inLabel }}（{{ total.in }}）</strong>
        <TransferItem
          ref="InList"
          :disabled="disabled"
          :show-search="showInSearch"
          :size="size"
          v-model="selectedIn"
          :fetch-data="fetchInList"
          border
          @update="val => handleUpdateItem(val, 'in')"
        />
      </el-col>
      <div :class="b('center')">
        <template v-if="custom">
          <el-button
            :loading="loadingToIn"
            type="primary"
            class="btn"
            @click="handleToIn"
          >
            <i class="el-icon-right" />
          </el-button>
        </template>
        <template v-else>
          <el-button
            :type="selectedIn.length ? 'primary' : 'default'"
            :loading="loadingToOut"
            :disabled="disabled ||!selectedIn.length"
            class="btn"
            @click="handleToOut"
          >
            <i class="el-icon-back" />
          </el-button>
          <el-button
            :type="selectedOut.length ? 'primary' : 'default'"
            :loading="loadingToIn"
            :disabled="disabled ||!selectedOut.length"
            class="btn"
            @click="handleToIn"
          >
            <i class="el-icon-right" />
          </el-button>
        </template>
      </div>
    </el-row>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import TransferItem from './TransferItem'

export default create({
  name: 'TransferMany',

  components: { TransferItem },

  props: {
    size: {
      type: Number,
      default: 100
    },
    fetchCustomToIn: Function,
    fetchToIn: Function,
    fetchToOut: Function,
    fetchInList: Function,
    fetchOutList: Function,
    showInSearch: {
      type: Boolean,
      default: true
    },
    showOutSearch: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outLabel: {
      type: String,
      default: '组外域名'
    },
    inLabel: {
      type: String,
      default: '组内域名'
    },
    is_custom: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      custom: false,
      customeInput: '',
      total: {
        in: 0,
        out: 0
      },
      selectedIn: [],
      selectedOut: [],
      loadingToOut: false,
      loadingToIn: false
    }
  },

  methods: {
    handleModeClick(type) {
      if (type === 'custom') {
        this.custom = true
      } else {
        this.custom = false
        this.$nextTick(() => {
          this.init()
        })
      }
    },

    handleUpdateItem(val, type) {
      this.total[type] = val.allTotal
    },

    loadSelectIn() {
      return this.$refs.InList.list.map(_ => _.value)
    },

    init({ initIn = true, initOut = true } = {}) {
      this.selectedIn = []
      this.selectedOut = []
      initIn && this.$refs.InList && this.$refs.InList.init()
      initOut && this.$refs.OutList && this.$refs.OutList.init()
    },

    async handleToOut() {
      if (typeof this.fetchToOut === 'function') {
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
      }
      const list = this.$refs.InList.loadSelectedList()
      this.$refs.OutList.unshiftList(list)
    },

    async handleToIn() {
      if (this.custom) {
        if (typeof this.fetchCustomToIn === 'function') {
          try {
            this.loadingToIn = true
            await this.fetchCustomToIn(this.customeInput)
          } catch (e) {
            return
          } finally {
            this.customeInput = ''
            this.loadingToIn = false
          }
          this.init()
          this.Message('ACTION_SUCCESS')
        }
      } else {
        if (typeof this.fetchToIn === 'function') {
          try {
            this.loadingToIn = true
            await this.fetchToIn(this.selectedOut)
          } catch (e) {
            return
          } finally {
            this.loadingToIn = false
          }
          this.Message('ACTION_SUCCESS')
        }
        const list = this.$refs.OutList.loadSelectedList()
        this.$refs.InList.unshiftList(list)
      }
    }
  }
})
</script>
