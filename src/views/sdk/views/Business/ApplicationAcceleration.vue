<template>
  <yd-card-list>
    <CardItemForm
      :loading="false"
      is-support
      is-init
      title="全网加速"
    >
      <template slot="tips">
        <p>智能选路、就近网络节点接入、UDP多路传输等技术，确保超低延迟和高可靠性</p>
      </template>
      <SelectSwitch
        slot="action"
        :value="true"
        disabled
      />
    </CardItemForm>
  </yd-card-list>
</template>

<script>
import SelectSwitch from '@/components/Select/SelectSwitch'

export default {
  components: { SelectSwitch }
}
</script>
