<style lang="scss">
.popover--service-status {
  .title {
    margin-bottom: 10px;
  }

  .yd-badge {
    float: right;
  }
}

.ColumnDomainService {
  .yd-icon {
    cursor: pointer;
    margin-right: 4px;
    transition: 0.5s;
    font-size: 18px;

    &:hover {
      opacity: 0.5;
    }
  }
}
</style>

<template>
  <div class="ColumnDomainService">
    <el-popover
      v-if="showList.includes('cdn')"
      :open-delay="300"
      popper-class="popover--service-status"
      placement="top"
      width="180"
      trigger="hover"
    >
      <p class="title">{{ $t('cloud-speed.title') }}
        <yd-badge
          v-if="data.hwws_status"
          status="success"
        >已开通</yd-badge>
        <yd-badge
          v-else
          status="default"
        >未开通</yd-badge>
      </p>
      <a href="/console/cloud-speed">
        <el-button
          type="primary"
          plain
          size="mini"
        >了解详情</el-button>
      </a>
      <yd-icon-status
        slot="reference"
        :active="data.use_yundun_cname === '1' || data.use_yundun_dns === '1'"
        icon="ya-jiasu"
        status="processing"
      />
    </el-popover>
    <el-popover
      v-if="showList.includes('tjkd-plus')"
      :open-delay="300"
      popper-class="popover--service-status"
      placement="top"
      width="180"
      trigger="hover"
    >
      <p class="title">{{ $t('cloud-wall.title') }}
        <yd-badge
          v-if="data.tjkd_status === '1' || data.tjkd_plus_status === '1'"
          status="success"
        >已开通</yd-badge>
        <yd-badge
          v-else
          status="default"
        >未开通</yd-badge>
      </p>
      <yd-icon-status
        slot="reference"
        :active="data.tjkd_status === '1' || data.tjkd_plus_status === '1'"
        status="processing"
        icon="ya-cloud-wall"
      />
      <a href="/console/cloud-wall">
        <el-button
          type="primary"
          plain
          size="mini"
        >了解详情</el-button>
      </a>
    </el-popover>
    <el-popover
      v-if="showList.includes('red-guard')"
      :open-delay="300"
      popper-class="popover--service-status"
      placement="top"
      width="180"
      trigger="hover"
    >
      <p class="title">{{ $t('red-guard.title') }}
        <yd-badge
          v-if="data.hwws_status === '1'"
          status="success"
        >已开通</yd-badge>
        <yd-badge
          v-if="data.hwws_status === '0'"
          status="default"
        >未开通</yd-badge>
      </p>
      <a href="/console/red-guard#/websiteList">
        <el-button
          type="primary"
          plain
          size="mini"
        >了解详情</el-button>
      </a>
      <yd-icon-status
        slot="reference"
        :active="data.hwws_status === '1'"
        status="processing"
        icon="ya-yun-yyj"
      />
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'ColumnDomainService',

  props: {
    data: Object,
    showList: {
      type: Array,
      default: () => {
        return ['cdn', 'tjkd-plus', 'red-guard']
      }
    }
  }
}
</script>
