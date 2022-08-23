import 'vue'
import { storiesOf } from '@storybook/vue'
import ColumnDomain from '../ColumnDomain'

storiesOf('Column', module).add('ColumnDomain', () => ({
  components: { ColumnDomain },
  template: '<ColumnDomain domain="www.yundun.com"/>'
}))

storiesOf('Column', module).add('ColumnDomain disabled', () => ({
  components: { ColumnDomain },
  template: '<ColumnDomain domain="www.yundun.com" disabled/>'
}))
