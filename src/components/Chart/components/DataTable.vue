<template>
  <div :class="b()">
    <DmTable border>
      <el-table
        v-if="data.rows && data.rows.length"
        :height="height"
        :data="data.rows"
      >
        <el-table-column
          v-for="(item, index) in data.columns"
          :key="index"
          :prop="item"
          :label="item"
        >
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
      </el-table>
    </DmTable>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ChartTable',

  props: {
    height: {
      type: Number,
      default: 400
    },
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    unitType: String
  },

  data() {
    return {}
  },

  computed: {},

  methods: {}
})
</script>
