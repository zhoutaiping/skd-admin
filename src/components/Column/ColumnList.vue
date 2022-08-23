<style lang="scss">
.columnListItem__icon {
  font-size: 13px;
  width: 14px;
  height: 14px;
  display: inline-block;
  background-size: 100%;
}

.columnList {
  position: relative;
  max-width: 300px;

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

  &__item {
    line-height: 24px;
    color: #555;

    &.ellipsis {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-right: 20px;
    }
  }

  &__icon {
    position: absolute;
    right: 10px;
    top: 5px;
  }
}
</style>
<template>
  <div :class="b()">
    <el-popover
      ref="popover"
      :style="{'margin-top': -24 * num + 10 + 'px'}"
      :disabled="!showPopover"
      :open-delay="150"
      :visible-arrow="false"
      :popper-class="b('popover')"
      width="190"
      placement="bottom-start"
      trigger="hover"
    >
      <div :class="b('core')">
        <yd-scroll>
          <ul>
            <li
              v-for="(item, index) in listFormat"
              :class="b('item')"
              :key="index"
            >
              <span
                v-if="item.icon"
                :class="item.icon"
                class="columnListItem__icon"
              />
              {{ item.value }}
            </li>
          </ul>
        </yd-scroll>
      </div>
      <template slot="reference">
        <ul :class="b('core')">
          <li
            v-for="(item, index) in listFormat"
            v-if="index < num"
            :class="b('item')"
            :key="index"
            class="ellipsis"
          >
            <span
              v-if="item.icon"
              :class="item.icon"
              class="columnListItem__icon"
            />
            <PopoverEllipsis
              v-model="item.value"
              :url="false"
              :max-length="100"
              line-feed
            />
          </li>
        </ul>
        <i
          v-if="showPopover"
          :class="b('icon')"
          class="el-icon-caret-bottom"
        />
      </template>
    </el-popover>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import PopoverEllipsis from '@/components/Popover/PopoverEllipsis'
export default create({
  name: 'columnList',
  components: { PopoverEllipsis },
  props: {
    num: {
      type: Number,
      default: 2
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  mounted() {
    const el = this.$refs.popover.$refs.popper
    el.style.marginTop = -(24 * this.num + 10) + 'px'
  },

  computed: {
    listFormat() {
      const { list = [] } = this
      if (!list.length) return []

      if (typeof list[0] === 'string') {
        return list.map(value => {
          return {
            value
          }
        })
      } else {
        return list
      }
    },

    showPopover() {
      return this.list.length > this.num
    }
  }
})
</script>
