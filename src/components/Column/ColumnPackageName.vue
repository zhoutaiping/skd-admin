<template>
  <div :class="b()">
    {{ row.instance_id || '-' }}<br >
    {{ row.package_name }}
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnPackageName',

  props: {
    row: Object
  }
})
</script>
