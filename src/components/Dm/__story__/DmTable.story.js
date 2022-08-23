import 'vue'
import { storiesOf } from '@storybook/vue'
import DmTable from '../DmTable'
import DmData from '../DmData'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

const stories = storiesOf('DmData', module)
stories.addDecorator(withKnobs)

stories.add('套餐列表', () => ({
  props: {
    isDisabled: {
      default: boolean('Disabled', false)
    },
    text: {
      default: text('Text', 'Hello Storybook')
    }
  },

  data() {
    return {
      list: [
        {
          meal_flag: 'waf-2019087R3zZi',
          meal_flag_name: '高级版'
        }
      ]
    }
  },

  components: { DmTable, DmData },

  template: `
    <DmData :text="text">
      <DmTable>
        <el-table :data="list">
          <el-table-column prop="meal_flag" label="套餐名称" />
          <el-table-column prop="meal_flag_name" label="套餐版本" />
        </el-table>
      </DmTable>
    </DmData>
  `
}))
