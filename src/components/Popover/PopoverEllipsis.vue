<style lang="scss">
.popover-ellipsis {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  &.lineFeed{
    white-space: normal;
  }
}
.popper--ellipsis {
  max-width: 800px;
  word-wrap: break-word;
  font-size: 12px;
  border-radius: 2px;
  padding: 12px;
}
</style>

<template>
  <el-popover
    :content="value"
    :disabled="disabledPopover"
    popper-class="popper--ellipsis"
    placement="top-start"
    trigger="hover"
  >
    <span
      slot="reference"
      :class="[lineFeed ? 'lineFeed' : '']"
      class="popover-ellipsis"
    >
      <a
        v-if="url"
        :href="href || value"
        target="_blank"
      >{{ text }}</a>
      <template v-else>
        {{ text }}
      </template>
    </span>
  </el-popover>
</template>

<script>
export default {
  name: 'PopoverEllipsis',

  props: {
    value: {
      type: String,
      default: ''
    },
    lineFeed: Boolean,
    href: String,
    url: {
      type: Boolean,
      default: true
    },
    maxLength: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      disabledPopover: false
    }
  },

  computed: {
    length() {
      return this.value && this.value.length || 0
    },

    text() {
      if (this.length > this.maxLength) {
        return this.value.substring(0, this.maxLength) + '...'
      } else {
        return this.value
      }
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
      // if (this.value.length > this.maxLength) {
      this.disabledPopover = false
      // } else {
      //   this.disabledPopover = true
      // }
    }
  }
}
</script>
