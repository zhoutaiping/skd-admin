import 'vue'
import { storiesOf } from '@storybook/vue'
import InputRuleLimit from '../InputRuleLimit'

storiesOf('Input', module).add('InputRuleLimit 请求限制', () => ({
  components: { InputRuleLimit },
  template: '<InputRuleLimit />'
}))
