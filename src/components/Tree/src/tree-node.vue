<style lang="scss">
.TreeNode {
  position: relative;

  &:hover {
    .TreeNode__expand-icon {
      // color: $--color-primary;
    }
  }

  &__content {
    padding: 0px 16px;
    cursor: pointer;
    &:hover {
      background-color: #f5f7fa;
    }
  }

  .el-checkbox {
    padding: 8px 0px;
    padding-left: 12px;
    width: 100%;

    &:hover {
      color: $--color-primary;
    }
    // background: rgba(0, 0, 0, 0.01);
  }

  &__expand-icon {
    cursor: pointer;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.72);
    margin-right: 0px;
    margin-left: 12px;

    &.expanded {
      transform: rotate(90deg);
    }

    &.is-leaf {
      width: 0px;
      margin: 0px;
      color: transparent;
      cursor: default;
    }
  }
}
</style>
<template>
  <div
    v-show="node.visible"
    ref="node"
    :class="{
      'is-expanded': expanded,
      'is-current': node.isCurrent,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked
    }"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.draggable"
    class="TreeNode"
    role="treeitem"
    tabindex="-1"
    @click.stop="handleClick"
    @contextmenu="($event) => handleContextMenu($event)"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }"
      class="TreeNode__content"
    >

      <span
        :class="[
          { 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded },
          'TreeNode__expand-icon',
          tree.iconClass ? tree.iconClass : 'el-icon-arrow-right'
        ]"
        @click.stop="handleExpandIconClick"
      />
      <el-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="disabled || !!node.disabled"
        @click.native.stop
        @change="handleCheckChange"
      >
        {{ node.label }}
      </el-checkbox>
    </div>
    <el-collapse-transition>
      <div
        v-if="!renderAfterExpand || childNodeRendered"
        v-show="expanded"
        :aria-expanded="expanded"
        class="TreeNode__children"
        role="group"
      >
        <el-tree-node
          v-for="child in node.childNodes"
          :key="getNodeKey(child)"
          :render-content="renderContent"
          :render-after-expand="renderAfterExpand"
          :show-checkbox="showCheckbox"
          :node="child"
          @node-expand="handleChildNodeExpand"
        />
      </div>
    </el-collapse-transition>
  </div>
</template>

<script type="text/jsx">
import emitter from '@/mixins/emitter'
import { getNodeKey } from './model/util'

export default {
  name: 'ElTreeNode',

  componentName: 'ElTreeNode',

  components: {
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent
        const tree = parent.tree
        const node = this.node
        const { data, store } = node
        return (
          parent.renderContent
            ? parent.renderContent.call(parent._renderProxy, h, { _self: tree.$vnode.context, node, data, store })
            : tree.$scopedSlots.default
              ? tree.$scopedSlots.default({ node, data })
              : <span class='TreeNode__label'>{ node.label }</span>
        )
      }
    }
  },

  mixins: [emitter],

  props: {
    node: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    props: {
      type: Object,
      default() {
        return {}
      }
    },
    renderContent: Function,
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null
    }
  },

  watch: {
    'node.indeterminate'(val) {
      this.handleSelectChange(this.node.checked, val)
    },

    'node.checked'(val) {
      this.handleSelectChange(val, this.node.indeterminate)
    },

    'node.expanded'(val) {
      // eslint-disable-next-line no-return-assign
      this.$nextTick(() => this.expanded = val)
      if (val) {
        this.childNodeRendered = true
      }
    }
  },

  created() {
    const parent = this.$parent

    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }

    const tree = this.tree
    if (!tree) {
      console.warn('Can not find node\'s tree.')
    }

    const props = tree.props || {}
    const childrenKey = props['children'] || 'children'

    this.$watch(`node.data.${childrenKey}`, () => {
      this.node.updateChildren()
    })

    if (this.node.expanded) {
      this.expanded = true
      this.childNodeRendered = true
    }

    if (this.tree.accordion) {
      this.$on('tree-node-expand', node => {
        if (this.node !== node) {
          this.node.collapse()
        }
      })
    }
  },

  methods: {
    getNodeKey(node) {
      return getNodeKey(this.tree.nodeKey, node.data)
    },

    handleSelectChange(checked, indeterminate) {
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', this.node.data, checked, indeterminate)
      }
      this.oldChecked = checked
      this.indeterminate = indeterminate
    },

    handleClick() {
      const store = this.tree.store
      store.setCurrentNode(this.node)
      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode)
      this.tree.currentNode = this
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick()
      }
      if (this.tree.checkOnClickNode && !this.node.disabled) {
        this.handleCheckChange(null, {
          target: { checked: !this.node.checked }
        })
      }
      this.tree.$emit('node-click', this.node.data, this.node, this)
    },

    handleContextMenu(event) {
      if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
        event.stopPropagation()
        event.preventDefault()
      }
      this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this)
    },

    handleExpandIconClick() {
      if (this.node.isLeaf) return
      if (this.expanded) {
        this.tree.$emit('node-collapse', this.node.data, this.node, this)
        this.node.collapse()
      } else {
        this.node.expand()
        this.$emit('node-expand', this.node.data, this.node, this)
      }
    },

    handleCheckChange(value, ev) {
      this.node.setChecked(ev.target.checked, !this.tree.checkStrictly)
      this.$nextTick(() => {
        const store = this.tree.store
        this.tree.$emit('check', this.node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        })
      })
    },

    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node)
      this.tree.$emit('node-expand', nodeData, node, instance)
    },

    handleDragStart(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-start', event, this)
    },

    handleDragOver(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-over', event, this)
      event.preventDefault()
    },

    handleDrop(event) {
      event.preventDefault()
    },

    handleDragEnd(event) {
      if (!this.tree.draggable) return
      this.tree.$emit('tree-node-drag-end', event, this)
    }
  }
}
</script>
