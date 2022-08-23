<style lang="scss">
.ColumnListMore {
  &__item {
    display: inline-block;
  }

  &__popover {
    overflow: auto;
    padding-right: 0px;
    margin-left: -10px !important;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    .ps-container {
      max-height: 300px;
    }
  }
}
</style>

<template>
  <span :class="b()">
    <template v-for="(item, index) in value">
      <template v-if="index < num">
        <el-divider
          v-if="index > 0"
          :key="index"
          direction="vertical"
        />
        <span
          :key="index"
          :class="b('item')"
        >
          <template v-if="lavelViewList && lavelViewList.length">
            {{ item | labelView(lavelViewList) }}
          </template>
          <template v-else>
            {{ item }}
          </template>
        </span>
      </template>
    </template>
    <el-popover
      v-if="showPopover"
      ref="popover"
      :disabled="!showPopover"
      :visible-arrow="false"
      :popper-class="b('popover')"
      width="320"
      placement="bottom-start"
      trigger="hover"
    >
      <div :class="b('core')">
        <yd-scroll>
          <template v-for="(item, index) in value">
            <template v-if="index >= num">
              <el-divider
                v-if="index > num"
                :key="index"
                direction="vertical"
              />
              <span
                :key="index"
                :class="b('item')"
              >
                <template v-if="lavelViewList && lavelViewList.length">
                  {{ item | labelView(lavelViewList) }}
                </template>
                <template v-else>
                  {{ item }}
                </template>
              </span>
            </template>
          </template>
        </yd-scroll>
      </div>
      <i
        slot="reference"
        :class="b('icon')"
        class="el-icon-caret-bottom"
      />
    </el-popover>
  </span>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnListMore',

  props: {
    value: [Array],
    lavelViewList: Array,
    num: {
      type: Number,
      default: 5
    }
  },

  computed: {
    showPopover() {
      return this.value.length > this.num
    }
  }
})
</script>
