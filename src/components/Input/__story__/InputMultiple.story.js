import 'vue'
import { storiesOf } from '@storybook/vue'
import InputMultiple from '../InputMultiple'

storiesOf('Input', module).add('InputMultiple', () => ({
  components: { InputMultiple },
  template: '<InputMultiple />'
}))
