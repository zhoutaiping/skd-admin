<style lang="scss">
.FormItemArea {
  max-height: 300px;
  overflow: auto;
  .el-checkbox {
    margin-bottom: 6px;
  }
}
</style>

<template>
  <div class="FormItemArea">
    <el-checkbox-group
      v-model="country"
      @change="handleChange"
    >
      <el-row>
        <el-col
          v-for="item in CountryList"
          :span="8"
          :key="item.value"
        >
          <el-checkbox
            :label="item.value"
            :value="item.value"
          >{{ item.label }}</el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
    <hr v-if="showProvince">
    <el-checkbox-group
      v-if="showProvince"
      v-model="province"
      @change="handleChange"
    >
      <el-row>
        <el-col
          v-for="item in ProvinceList"
          :span="6"
          :key="item.value"
        >
          <el-checkbox
            :label="item.value"
            :value="item.value"
          >{{ item.label }}</el-checkbox>
        </el-col>
      </el-row>
    </el-checkbox-group>
  </div>
</template>

<script>
import CountryList from '@/constants/country-list'
import { province as ProvinceList } from '@/constants/city-data'

export default {
  props: {
    value: Object
  },

  data() {
    return {
      CountryList,
      ProvinceList,
      country: [],
      province: []
    }
  },

  computed: {
    provinceView() {
      return this.province.join('|')
    },
    showProvince() {
      return this.country.includes('CN')
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
      const { country = [], province = [] } = this.value
      this.country = country
      this.province = province
    },
    handleChange() {
      const { country, province, showProvince } = this
      const input = { country, province }

      if (!showProvince && province.length > 0) {
        input.province = []
      }

      this.$emit('input', input)
      this.$emit('change', input)
    },

    formatChange() {

    }
  }
}
</script>
