<template>
  <div :class="b()">
    <template v-if="disabled">
      {{ domain }}
    </template>
    <router-link
      v-else
      :to="to"
    >{{ domain }}</router-link>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnDomain',

  props: {
    domain: String,
    to: [String, Object],
    disabled: Boolean
  }
})
</script>
