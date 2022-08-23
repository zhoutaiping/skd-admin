import FormRadio from './FormRadio'
import FormRadioButton from './FormRadioButton'
import FormSelect from './FormSelect'
import FormCheckbox from './FormCheckbox'
import InputMultiple from './InputMultiple'

const Form = {}

Form.install = Vue => {
  Vue.component(FormRadio.name, FormRadio)
  Vue.component(FormRadioButton.name, FormRadioButton)
  Vue.component(FormSelect.name, FormSelect)
  Vue.component(FormCheckbox.name, FormCheckbox)
  Vue.component(InputMultiple.name, InputMultiple)
}

export default Form
