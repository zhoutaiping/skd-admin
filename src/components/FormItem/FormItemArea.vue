<template>
  <div>
    <el-select
      v-model="country"
      style="width: 100px"
      placeholder="请选择"
      @change="handleChange"
    >
      <el-option
        v-for="item in CountryList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select
      v-if="country === 'CN'"
      v-model="province"
      style="width: 100px"
      placeholder="请选择"
      @change="handleChange"
    >
      <el-option
        v-for="item in ProvinceList"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
import CountryList from '@/constants/country-list'
import { province as ProvinceList } from '@/constants/city-data'

export default {
  props: {
    value: Array
  },

  data() {
    return {
      CountryList,
      ProvinceList,
      country: '',
      province: ''
    }
  },

  computed: {
    provinceView() {
      return this.province.join('|')
    }
  },

  watch: {
    value(val) {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const [country, province] = this.value
      this.country = country
      this.province = province
    },
    handleChange() {
      const { country, province } = this
      const input = [country, province]
      this.$emit('input', input)
    }
  }
}
</script>
