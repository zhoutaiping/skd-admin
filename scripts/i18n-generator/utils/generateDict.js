const { jsonFlat, jsonUnflat } = require('../plugins/utils')
const { mergeDict, initDictByComponentData, writeDict, readDict } = require('../plugins/dict')

function generateZhDict(settings) {
  const dict = {}
  Object.keys(settings).forEach(key => {
    const item = settings[key]
    if (!dict[key]) dict[key] = {}
    item.forEach(iItem => {
      dict[key][iItem.key] = iItem.content
    })
  })

  return dict
}

function generateLangDict(settings, lang) {
  const langDictList = jsonFlat(readDict(lang))
  Object.keys(settings).forEach(key => {
    const item = settings[key]
    item.forEach(iItem => {
      const i18nKey = `${key}.${iItem.key}`
      if (!langDictList[i18nKey]) langDictList[i18nKey] = iItem[`baidu_${lang}`]
    })
  })

  return jsonUnflat(langDictList)
}

function mergeDictBySettings(settings, translatedMap, lang) {
  const langDict = readDict(lang)
  const waitTranslateList = []
  const langDictList = jsonFlat(langDict)

  Object.keys(settings).forEach(key => {
    const item = settings[key]
    item.forEach(iItem => {
      const i18nKey = `${key}.${iItem.key}`
      if (!langDictList[i18nKey] && !translatedMap[i18nKey]) waitTranslateList.push([i18nKey, iItem.content])
    })
  })

  return waitTranslateList
}

exports.generateLangDict = generateLangDict
exports.generateZhDict = generateZhDict
exports.mergeDictBySettings = mergeDictBySettings
