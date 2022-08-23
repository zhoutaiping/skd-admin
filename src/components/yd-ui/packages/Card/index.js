import Card from './Card'
import CardList from './CardList'

Card.install = Vue => {
  Vue.component(Card.name, Card)
  Vue.component(CardList.name, CardList)
}

export default Card
