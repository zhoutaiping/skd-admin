import 'vue'
import { storiesOf } from '@storybook/vue'
import InputSuffix from '../InputSuffix'

storiesOf('Input', module).add('InputSuffix 后缀', () => ({
  components: { InputSuffix },
  template: '<InputSuffix />'
}))
