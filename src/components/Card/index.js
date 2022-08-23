import CardItemForm from './_CardItemForm'

const Card = {}

Card.install = function(Vue) {
  Vue.component(CardItemForm.name, CardItemForm)
}

export default Card
