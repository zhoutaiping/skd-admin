import ButtonCheckbox from './ButtonCheckbox'

const Button = {}
Button.install = Vue => {
  Vue.component(ButtonCheckbox.name, ButtonCheckbox)
}

export default Button
