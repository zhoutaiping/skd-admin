const fs = require('fs')
const { mergeDict, writeDict } = require('./plugins/dict')
const { objToList, jsonFlat, listToObj, clearTranslatedList } = require('./plugins/utils')
const { translateList } = require('./plugins/baidu')

function loadModule(moduleName, lang) {
  // eslint-disable-next-line no-eval
  return eval(fs.readFileSync(`./src/console/${moduleName}/locale/${lang}.js`, 'utf8'))
}

async function main(lang = 'zh') {
  const MODULES = [
    // 'home',
    // 'cloud-speed'
    // 'cloud-resolving',
    // 'scan-plus',
    // 'red-guard',
    // 'taichi-app',
    // 'service-report',
    // 'user-center',
    // 'access-management',
    // 'finance-center',
    // 'cloud-wall',
    // 'message-center',
    // 'anti-ddos',
    'user-center'
  ]

  // const dictPath = './config/dict/en.json'
  // const dictData = readDict(lang)
  // const content = {}
  for (const name of MODULES) {
    const moduleData = loadModule(name, lang)

    const tList = jsonFlat(mergeDict(moduleData, lang))
    // const tedList = listToObj(await translateList(clearTranslatedList(objToList(tList))))

    console.log(clearTranslatedList(objToList(tList)))
    // dictData[name] = loadModule(name)
  }

  // fs.writeFileSync(dictPath, JSON.stringify(dictData, null, '\t'))
}

main()
