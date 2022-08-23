<style lang="scss">
.InputArea {
  &__button {
    max-width: 400px;
    min-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }

  &__popover {
    padding: 0px;
    overflow: hidden;
    width: 450px;

    .FormCheckbox__checkall {
      font-weight: bold;

      .el-checkbox__label {
        color: #000 !important;
      }
    }

    .el-tabs {
      .FormCheckbox {
        padding: 0 15px;
        padding-bottom: 15px;
      }

      &__item {
        padding: 0 10px;
        font-size: 12px;
      }

      &__active-bar {
        // width: 205px !important;
      }
    }

    .s-title {
      padding-left: 15px;
      font-size: 12px;
      color: #909399;
      line-height: 30px;
    }
  }
}
</style>

<template>
  <div :class="b()">
    <el-dropdown
      trigger="click"
      placement="bottom-start"
    >
      <el-button :class="b('button')">
        {{ valView || '请选择' }}<i class="el-icon-arrow-down el-icon--right" />
      </el-button>
      <el-dropdown-menu
        slot="dropdown"
        :class="b('popover')"
      >
        <el-tabs
          v-model="active"
          size="small"
          stretch
        >
          <el-tab-pane
            v-for="(item, index) in selectRegion.world"
            :key="index"
            :name="item.value"
          >
            <span slot="label">
              {{ item.label }}
            </span>
            <div style="max-height: 400px; overflow: auto">
              <yd-scroll>
                <yd-form-checkbox
                  v-if="index === 0 && !province"
                  :checks="SELECT_CN"
                  v-model="val"
                  :span="8"
                />
                <template v-else>
                  <template v-if="item.options[0] && item.options[0].options">
                    <div
                      v-for="(oItem, index) in item.options"
                      :key="index"
                    >
                      <div>
                        <yd-form-checkbox
                          :check-all-label="oItem.label"
                          :checks="oItem.options"
                          v-model="val"
                          :span="8"
                          show-check-all
                        />
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <yd-form-checkbox
                      :checks="item.options"
                      v-model="val"
                      :span="8"
                      show-check-all
                    />
                  </template>
                </template>
              </yd-scroll>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import { labelView } from '@/utils/filter'
import { arrRemove } from '@/utils/array'
import { formatRegionView } from '@/utils/format'
import { province as Province } from '@/constants/city-data'

function arrayEquals(array1, array2) {
  return array1.length === array2.length && array1.every(function(v, i) { return v === array2[i] })
}

function isCountry(val) {
  return isNaN(val)
}

function isProvince(val) {
  return !isNaN(val)
}

export default create({
  name: 'InputArea',

  props: {
    province: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Object, Array, String],
      default() {
        return {
          country: [],
          province: []
        }
      }
    }
  },

  data() {
    return {
      visible: false,
      active: 'CN',
      val: [],
      valView: '',
      counts: {},
      SELECT_CN: [
        {
          label: '中国大陆',
          value: 'CNPR'
        },
        {
          label: '香港',
          value: 'HK'
        },
        {
          label: '澳门',
          value: 'MO'
        },
        {
          label: '台湾',
          value: 'TW'
        }
      ]
    }
  },

  computed: {
    selectRegion() {
      return this.$store.state.select.region
    },
    selectRegionMap() {
      return this.$store.state.select.regionMap
    }
  },

  watch: {
    val(val) {
      this.handleChange(val)
    },

    value() {
      this.init()
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      const value = this.value
      if (typeof value === 'object') {
        const { country = [], province = [] } = value
        const val = [...country, ...province]

        if (country.includes('CN') && !province.length) {
          val.push(...Province.map(_ => _.value))
        }

        if (!arrayEquals(val, this.val)) {
          this.val = val
        }
      }
    },

    handleClear() {
      this.$emit('input', {
        country: [],
        province: []
      })
    },

    handleChange(value) {
      let province = value.filter(isProvince)
      const country = value.filter(isCountry)
      if (province.length) {
        if (!country.includes('CN')) country.push('CN')
        if (province.length === 31) province = []
      } else {
        arrRemove(country, 'CN')
      }
      const input = {
        province: province.map(_ => _.replace('CN-', '')),
        country
      }

      const valueMap = formatRegionView(value, this.selectRegionMap)
      const valueView = []
      for (const [key, item] of valueMap) {
        const title = labelView(key, this.selectRegion.list)
        if (item === 'all') {
          valueView.push(title)
        } else {
          valueView.push(...item.map(_ => labelView(_, this.selectRegion.list)))
        }
      }

      this.$emit('input', input)
      this.valView = valueView.join('|')
    }
  }
})
</script>
