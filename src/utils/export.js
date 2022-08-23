function downloadFile(url) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  document.body.appendChild(a)
  a.click()
  a.style.display = 'none'
}

export { downloadFile }
