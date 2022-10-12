const Crypto = require('crypto')
const Axios = require('axios')
const { chunk } = require('lodash')

async function fetch(data, lang) {
  const transList = []

  Object.keys(data).forEach(name => {
    const itemData = data[name]
    Object.keys(itemData).forEach(key => {
      if (itemData[key] === '') transList.push([`${name}.${key}`, key])
    })
  })

  const queueList = chunk(transList, 20)

  for (let i = 0; i < queueList.length; i++) {
    await fetchItem(queueList[i], data, lang)
    sleep(200)
  }
}

async function fetchItem(list, i18nContent, lang) {
  const strList = []
  list.forEach(item => {
    const [, str] = item
    strList.push(str)
  })

  const q = strList.join('\n')
  const res = await fetchBaidu(q, lang)

  const { trans_result } = res
  trans_result.forEach((item, index) => {
    const [componentName, str] = list[index][0].split('.')
    i18nContent[componentName][str] = item.dst
  })
  return i18nContent
}

async function translateList(list, lang) {
  // console.log(list)
  console.log('translateCount', list.length)
  const queueList = chunk(list, 20)
  const nList = []

  for (let i = 0; i < queueList.length; i++) {
    nList.push(...await fetchTranslateList(queueList[i], lang))
    sleep(200)
  }
  return nList
}

async function fetchTranslateList(list, lang) {
  const strList = []
  const nList = []

  list.forEach(item => {
    const [name] = item
    let [, str] = item
    if (!str) str = name.split('.').pop()
    strList.push(str)
  })

  const q = strList.join('\n')
  const res = await fetchBaidu(q, lang)

  const { trans_result = [], error_msg } = res
  if (error_msg) console.log(error_msg)

  if (trans_result.length !== Object.keys(list).length) {
    console.log(trans_result.length, Object.keys(list).length, list, Object.values(list))

    // throw new Error('翻译结果不一致')
  }
  trans_result.forEach((item, index) => {
    const [key] = list[index]
    nList.push([key, item.dst])
  })

  return nList
}

exports.translateList = translateList
exports.fetchBaidu = fetch

async function fetchBaidu(q, lang = 'en') {
  const salt = Date.now()
  const token = '_6zlAXsXyq48UIvSAn6H'
  const appid = '20190917000335074'
  const sign = Crypto.createHash('md5').update(`${appid}${q}${salt}${token}`).digest('hex')
  const params = {
    q,
    from: 'zh',
    to: lang,
    appid,
    salt,
    sign
  }

  const result = await Axios.get('http://api.fanyi.baidu.com/api/trans/vip/translate', {
    params
  })

  return result.data
}

function sleep(d) {
  for (var t = Date.now(); Date.now() - t <= d;);
}

// module.exports = fetch
