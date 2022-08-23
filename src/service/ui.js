export function jumpDialog(from, to, time = 100) {
  from.visible = false

  setTimeout(() => {
    to.visible = true
  })
}
