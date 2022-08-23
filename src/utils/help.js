import Fetch from '@/api/fetch'
import RULE from './verify'

export default {
  download: (url) => {
    if (!url) return
    const a = document.createElement('a')
    a.setAttribute('href', url)
    document.body.appendChild(a)
    a.click()
    a.style.display = 'none'
  },
  // copy text
  copyText: text => {
    const aux = document.createElement('input')
    const content = text
    aux.setAttribute('value', content)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
  },

  sendQQStatistics: () => {
    Fetch.post('../node_api/statistics/qq')
  },

  openServicePanel(data) {
    // 企业 QQ
    if (RULE.defaultUrl.test(data)) {
      window.open(data)
      return
    }
    // 美洽
    const [type, token] = data.split(':')

    if (type === 'qq') {
      window.open(`http://wpa.qq.com/msgrd?v=3&uin=${token}&site=qq&menu=yes$`)
    } else {
      if (!token) return
      window._MEIQIA('showPanel', {
        [type]: token
      })
    }
  },

  lengthLimit: (character, length) => character.length > length
}
