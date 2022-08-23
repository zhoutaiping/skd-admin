import 'vue'
import { storiesOf } from '@storybook/vue'
import InputSearch from '../InputSearch'

storiesOf('Input', module).add('InputSearch 搜索', () => ({
  components: { InputSearch },
  template: '<InputSearch />'
}))
