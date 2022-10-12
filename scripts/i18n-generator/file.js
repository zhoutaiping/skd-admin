const fs = require('fs')
const path = require('path')
const compiler = require('vue-template-compiler')
const glob = require('glob')
const vuetemplatei18n = require('./plugins/vuetemplatei18n')
const vuejsi18n = require('./plugins/vuejsi18n')
const { fetchBaidu, translateList } = require('./plugins/baidu')
const { mergeDict, initDictByComponentData, writeDict } = require('./plugins/dict')
const { decodeOriginString, clearTranslatedList, jsonFlat, jsonUnflat, objToList, listToObj } = require('./plugins/utils')

const basePath = './src/'

const [,, modulePath = 'console/cloud-speed', lang = 'en'] = process.argv

const components = []
function mapDir(dir) {
  const files = fs.readdirSync(dir)
  files.forEach((filename, index) => {
    const pathname = path.join(dir, filename)
    const stats = fs.statSync(pathname)
    if (stats.isDirectory()) {
      mapDir(pathname)
    } else if (stats.isFile()) {
      if (['.js'].includes(path.extname(pathname))) components.push(pathname)
    }
  })
}

mapDir(`${basePath}${modulePath}`)

const allProcesses = {
  vue: compileVueMiddleware
}

let parse

function compileVueMiddleware(file) {
  const i18nList = []
  parse = compiler.parseComponent(file.content)
  if (parse.template) {
    const [updated, originList = []] = vuetemplatei18n(parse.template.content, file.key)
    file.content = file.content.slice(0, parse.template.start) + updated + file.content.slice(parse.template.end)
    i18nList.push(...originList)
  }
  parse = compiler.parseComponent(file.content)
  if (parse.script) {
    const [updated, originList] = vuejsi18n(parse.script.content, file.key)
    file.content = file.content.slice(0, parse.script.start) + updated + file.content.slice(parse.script.end)
    i18nList.push(...originList)
  }
  parse = compiler.parseComponent(file.content)
  file.i18nList = i18nList.map(decodeOriginString)
  return file
}

const i18nContent = {}

components.map(component => {
  let filePaths = []
  filePaths = glob.sync(component)
  filePaths.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf8')
    const extname = path.extname(filePath).slice(1)
    if (!allProcesses[extname]) {
      return
    }

    const key = filePath.replace('src/console/', '').replace('.vue', '').replace(/\//g, '__')
    const file = allProcesses[extname]({
      content,
      filePath,
      key
    })

    if (file.i18nList.length) {
      const data = {}
      file.i18nList.forEach(name => {
        data[name] = ''
      })

      i18nContent[key] = data
    }

    fs.writeFileSync(file.filePath, file.content)
    console.log(`${filePath} done`)
  })
})

async function main(componentData) {
  // const zhData = mergeDict(initDictByComponentData(componentData), 'zh')
  // writeDict(zhData, 'zh')
  // writeLang(zhData, 'zh')

  console.log(await translateData(componentData, 'en'))

  // await fetchBaidu(i18nContent, lang)

  // 输出文件
  // writeLang(i18nContent, lang)
}

async function translateData(data, lang) {
  const tList = jsonFlat(mergeDict(data, lang))
  const tedList = listToObj(await translateList(clearTranslatedList(objToList(tList))))
  const tedData = jsonUnflat({
    ...tList,
    ...tedList
  })

  writeDict(tedData, lang)
  writeLang(tedData, lang)
}

function writeLang(i18nContent, lang) {
  fs.writeFileSync(`./public/locale/${lang}.json`, JSON.stringify(i18nContent, null, '\t'))
}

main(i18nContent)

// console\red-guard\views\menace-analyze\tab\Bot\UnknowDetail.vue
// console\red-guard\views\menace-analyze\tab\Bot\KnowDetail.vue
