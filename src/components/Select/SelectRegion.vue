<template>
  <div>
    <yd-form-select
      :selects="selectCountry"
      v-model="form.country_code"
      default-text="选择国家"
      style="width: 150px"
      @change="handleChangeCountry"
    />
    <yd-form-select
      v-if="selectCity.length"
      :selects="selectCity"
      v-model="form.province_code"
      style="width: 150px; margin-left: 10px"
      default-text="选择省市"
    />
    <el-button
      :loading="submitLoading"
      :disabled="!form.country_code"
      style="margin-left: 10px"
      type="primary"
      @click="handleAdd"
    >添加</el-button>
    <div class="margin-top">
      <el-tag
        v-for="(item, index) in listView"
        v-if="item.zone_name"
        :closable="true"
        :close-transition="true"
        :key="index"
        disable-transitions
        style="margin-right: 10px"
        type="gray"
        @close="handleRemove(index)"
      >{{ item.zone_name }}</el-tag>
    </div>
  </div>
</template>

<script>
import { areaView } from '@/utils/filter'
import { deepClone } from '@/utils'

export default {
  name: 'SelectRegionList',

  props: {
    value: [Array],
    fetchSubmit: Function
  },

  data() {
    return {
      listView: [],
      loading: true,
      selectCountry: [],
      selectCity: [],
      form: {
        country_code: '',
        province_code: ''
      },
      formDefault: {
        country_code: '',
        province_code: ''
      },
      submitLoading: false
    }
  },

  watch: {
    value() {
      this.listView = this.value
    }
  },

  created() {
    this.listView = this.value
    this.init()
  },

  methods: {
    async init() {
      const data = await this.Fetch.get('V4/Web.Domain.Region')
      this.selectCountry = data.map(_ => {
        return {
          label: _.country_name,
          value: _.country_code
        }
      })
    },

    checkRepeat(item) {
      const code = `${item.zone_code.country_code}${item.zone_code.province_code}`
      const list = new Set(this.listView.map(_ => `${_.zone_code.country_code}${_.zone_code.province_code}`))
      if (list.has(code)) {
        this.$message.warning('区域重复')
        throw new Error()
      }
    },

    async handleChangeCountry() {
      const { country_code } = this.form
      const params = {
        country_code
      }

      if (country_code === 'CN') {
        const data = await this.Fetch.get('V4/Web.Domain.Region', params)
        this.selectCity = data.filter(_ => Boolean(_.province_name)).map(_ => {
          return {
            label: _.province_name,
            value: _.province_code
          }
        })
      } else {
        this.selectCity = []
        this.form.province_code = ''
      }
    },

    handleAdd() {
      const { country_code, province_code } = this.form
      const item = {
        zone_code: {
          country_code,
          province_code
        },
        zone_name: areaView(`${country_code}-${province_code}`)
      }

      try {
        this.checkRepeat(item)
      } catch (e) {
        return
      }

      this.handleUpdate([...this.listView, item])
    },

    async handleUpdate(val) {
      if (this.fetchSubmit) {
        this.submitLoading = true
        try {
          await this.fetchSubmit(val)
        } catch (e) {
          return
        } finally {
          this.submitLoading = false
          this.form = deepClone(this.formDefault)
        }
      }

      this.$emit('input', val)
    },

    handleRemove(index) {
      this.listView.splice(index, 1)
      this.handleUpdate(this.listView)
    }
  }
}
</script>

