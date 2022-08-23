<style lang="scss">
.yd-skeleton {
  display: table;
  width: 100%;

  &-header {
    display: table-cell;
    padding-right: 16px;
    vertical-align: top;

    .yd-skeleton-avatar {
      display: inline-block;
      vertical-align: top;
      background: #f2f2f2;
      width: 32px;
      height: 32px;
      line-height: 32px;
    }

    .yd-skeleton-avatar.yd-skeleton-avatar-circle {
      border-radius: 50%;
    }

    .yd-skeleton-avatar-lg {
      width: 40px;
      height: 40px;
      line-height: 40px;
    }

    .yd-skeleton-avatar-lg.yd-skeleton-avatar-circle {
      border-radius: 50%;
    }

    .yd-skeleton-avatar-sm {
      width: 24px;
      height: 24px;
      line-height: 24px;
    }

    .yd-skeleton-avatar-sm.yd-skeleton-avatar-circle {
      border-radius: 50%;
    }
  }
}
.yd-skeleton-content {
  display: table-cell;
  width: 100%;
  vertical-align: top;
}
.yd-skeleton-content .yd-skeleton-title {
  width: 100%;
  height: 16px;
  margin-top: 16px;
  background: #f2f2f2;
}
.yd-skeleton-content .yd-skeleton-title + .yd-skeleton-paragraph {
  margin-top: 24px;
}
.yd-skeleton-content .yd-skeleton-paragraph > li {
  width: 100%;
  height: 16px;
  list-style: none;
  background: #f2f2f2;
}
.yd-skeleton-content
  .yd-skeleton-paragraph
  > li:last-child:not(:first-child):not(:nth-child(2)) {
  width: 61%;
}
.yd-skeleton-content .yd-skeleton-paragraph > li + li {
  margin-top: 16px;
}
.yd-skeleton-with-avatar .yd-skeleton-content .yd-skeleton-title {
  margin-top: 12px;
}
.yd-skeleton-with-avatar
  .yd-skeleton-content
  .yd-skeleton-title
  + .yd-skeleton-paragraph {
  margin-top: 28px;
}
.yd-skeleton.yd-skeleton-active .yd-skeleton-content .yd-skeleton-title,
.yd-skeleton.yd-skeleton-active
  .yd-skeleton-content
  .yd-skeleton-paragraph
  > li {
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  -webkit-animation: yd-skeleton-loading 1.4s ease infinite;
  animation: yd-skeleton-loading 1.4s ease infinite;
}

@keyframes yd-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

</style>

<template>
  <div :class="b()">
    <div class="yd-skeleton-content">
      <h3
        class="yd-skeleton-title"
        style="width: 38%;"
      />
      <ul class="yd-skeleton-paragraph">
        <li />
        <li />
        <li style="width: 61%;" />
      </ul>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'yd-skeleton'
})
</script>
