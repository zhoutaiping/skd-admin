import 'vue'
import { storiesOf } from '@storybook/vue'
import InputWeekTime from '../InputWeekTime'

storiesOf('Input', module).add('InputWeekTime', () => ({
  components: { InputWeekTime },
  template: '<InputWeekTime />'
}))
