import 'vue'
import { storiesOf } from '@storybook/vue'
import InputArea from '../InputArea'

storiesOf('Input', module).add('InputArea 区域', () => ({
  components: { InputArea },
  template: '<InputArea />'
}))
