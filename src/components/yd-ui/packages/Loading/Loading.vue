<template>
  <div :class="['is-' + placement, 'is-' + effect, 'size-' + size, {'is-opacity': opacity}]" class="yd-loading">
    <div class="bouncing-loader">
      <div/>
      <div/>
      <div/>
    </div>
  </div>
</template>

<script>
const NAME = 'yd-loading'

export default {
  name: NAME,

  props: {
    placement: String,
    opacity: Boolean,
    size: {
      type: String,
      default: 'default'
    },
    effect: {
      type: String,
      default: 'light'
    }
  }
}
</script>

<style lang="scss">
@keyframes bouncing-loader {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0.1;
    transform: scale(0.5);
  }
}

.yd-loading {
  position: absolute;
  z-index: 100;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background: #fff;

  &.is-opacity {
    background: rgba(255, 255, 255, 0.78);
  }

  .bouncing-loader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -4px;
    width: 100px;
    height: 8px;
    display: flex;
    justify-content: center;
  }

  &.is-top {
    .bouncing-loader {
      top: 30px;
    }
  }

  .bouncing-text {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -4px;
    width: 100px;
    color: #999;
  }

  .bouncing-loader > div {
    width: 8px;
    height: 8px;
    margin: 0px 4px;
    background: $--color-primary;
    border-radius: 100%;
    animation: bouncing-loader 0.45s infinite alternate;
  }

  &.size-small {
    .bouncing-loader {
      margin-top: -3px;
      height: 6px;
      > div {
        width: 6px;
        height: 6px;
        margin: 0px 3px;
      }
    }
  }

  &.is-dark {
    .bouncing-loader > div {
      background: #fff;
    }
  }

  .bouncing-loader > div:nth-child(2) {
    animation-delay: 0.15s;
  }
  .bouncing-loader > div:nth-child(3) {
    animation-delay: 0.3s;
  }
}
</style>
