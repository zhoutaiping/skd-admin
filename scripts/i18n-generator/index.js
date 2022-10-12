const fs = require("fs");
const path = require("path");
const compiler = require("vue-template-compiler");
const glob = require("glob");
const vuetemplatei18n = require("./plugins/vuetemplatei18n");
const vuejsi18n = require("./plugins/vuejsi18n");
const { translateList } = require("./plugins/baidu");
const { writeDict, readDict, exportSetingsByLang } = require("./plugins/dict");
const { decodeOriginString, listToObj } = require("./plugins/utils");
const { formatStr } = require("./utils/format");
const {
  generateZhDict,
  mergeDictBySettings,
  generateLangDict,
} = require("./utils/generateDict");
const deepmerge = require("deepmerge");

const basePath = "./src/";

const [, , lang = "en"] = process.argv;

const MODULE_PATH = [
  "src/components/Popover",
  "src/components/Select",
  "src/components/Input",
  "src/components/InputEdit",
  "src/components/Dm",
  "src/components/Column",
  "src/components/Button",
  "src/components/Card",
  "src/components/Chart",
  "src/components/CustomizationPage",
  "src/components/DateSelect",
  "src/components/Dialog",
  "src/components/FormItem",
  "src/components/Item",
  "src/components/List",
  "src/components/Navbar",
  "src/components/Popup",
  "src/components/Table",
  "src/components/Tips",
  "src/components/Toolbar",
  "src/components/Transfer",
  "src/layouts",
  "src/utils",
  "src/constants",
  // 'src/console/home',
  // 'src/console/cloud-speed',
  // 'src/console/cloud-resolving',
  // 'src/console/anti-ddos',
  // 'src/console/taichi-app',
  // 'src/console/zero-trust',
  // 'src/console/message-center',
  // 'src/console/web-snapshot',
  // 'src/console/service-report',
  // 'src/console/finance-center',
  // 'src/console/user-center',
  // 'src/console/red-guard',
  // 'src/console/ssl-certificate',
  // 'src/console/connector',
  // 'src/console/bot',
  // 'src/console/cloud-wall',
  // 'src/console/scan-plus',
  // 'src/console/user-center/views/ipList',
  // 'src/console/logs',
  "src/console/ecs",
];

// const MODULE_PATH = [
//   'src/console/cloud-speed/constant/select.js'
// ]

// 跳过翻译文件
const SKIP_FILE = [
  "src/components/Dm/DmData.vue",
  "src/components/Column/ColumnThreatLevel.vue",
  "src/utils/chart.js",
  "zh.js",
  "en.js",
  "cht.js",
  "story.js",
  "spec.js",
  "router.js",
  "config.js",
  "src/console/ecs/App.vue",
];

const componentList = [];

function isInList(path) {
  path = path.replace(/\\/g, "/");
  return (
    MODULE_PATH.some((_) => path.includes(_)) &&
    !SKIP_FILE.some((_) => path.includes(_))
  );
}

function mapDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((filename) => {
    const pathname = path.join(dir, filename);
    const stats = fs.statSync(pathname);
    if (stats.isDirectory()) {
      mapDir(pathname);
    } else if (stats.isFile()) {
      if (isInList(pathname)) {
        if ([".vue", ".js"].includes(path.extname(pathname)))
          componentList.push(pathname);
      }
    }
  });
}

mapDir(basePath);

const allProcesses = {
  vue: compileVueMiddleware,
  js: function (file) {
    const i18nList = [];
    const [updated, originList] = vuejsi18n(file.content, file.key);
    file.content = updated;
    i18nList.push(...originList);
    file.i18nList = i18nList.map(decodeOriginString);
    return file;
  },
};

// 需多次解析，避免错误
let parse;
function compileVueMiddleware(file) {
  const i18nList = [];
  parse = compiler.parseComponent(file.content);
  // Template
  if (parse.template) {
    const [updated, originList = []] = vuetemplatei18n(
      parse.template.content,
      file.key
    );
    file.content =
      file.content.slice(0, parse.template.start) +
      updated +
      file.content.slice(parse.template.end);
    i18nList.push(...originList);
  }
  // Script
  parse = compiler.parseComponent(file.content);
  if (parse.script) {
    const [updated, originList] = vuejsi18n(parse.script.content, file.key);
    file.content =
      file.content.slice(0, parse.script.start) +
      updated +
      file.content.slice(parse.script.end);
    i18nList.push(...originList);
  }
  parse = compiler.parseComponent(file.content);
  file.i18nList = i18nList.map(decodeOriginString);
  return file;
}

const i18nContent = {};
let i18nSettings = {};

componentList.map((component) => {
  const filePaths = glob.sync(component);
  filePaths.map((filePath) => {
    const content = fs.readFileSync(filePath, "utf8");
    const extname = path.extname(filePath).slice(1);
    console.log(filePath);
    if (!allProcesses[extname]) {
      return;
    }

    const key = filePath
      .replace("src/console/", "")
      .replace(/(.js|.vue)/gim, "")
      .replace(/\//g, "__");
    const file = allProcesses[extname]({
      content,
      filePath,
      key,
    });

    if (file.i18nList.length) {
      const data = {};
      file.i18nList.forEach((name) => {
        data[name] = "";
      });

      i18nContent[key] = data;

      const { content: fileContent, list: settingList } = contentReplaceKey(
        file.content,
        file.i18nList,
        key
      );
      file.content = fileContent;
      i18nSettings[key] = settingList;
    }

    fs.writeFileSync(file.filePath, file.content);
  });
});

function settingsToMap(settings) {
  const map = {};
  Object.keys(settings).forEach((key) => {
    const item = settings[key];
    const itemMap = {};
    item.forEach((iItem) => {
      itemMap[iItem.key] = iItem;
    });
    map[key] = itemMap;
  });
  return map;
}

function mapToSettings(map) {
  const settings = {};
  Object.keys(map).forEach((key) => {
    const item = map[key];
    const list = [];
    Object.keys(item).forEach((iKey) => {
      list.push({
        ...item[iKey],
      });
    });
    settings[key] = list;
  });
  return settings;
}

function contentReplaceKey(content, i18nList, key) {
  const list = [];
  // console.log(content, i18nList)
  i18nList.forEach((item) => {
    const key = formatStr(item);
    content = content.replace(item, key);

    list.push({
      key,
      content: item,
    });
  });
  return { list, content };
}

function mergeSettings(i18nSettings) {
  const oSettings = readDict("settings");
  return mapToSettings(
    deepmerge(settingsToMap(i18nSettings), settingsToMap(oSettings))
  );
}

async function main(lang = "en") {
  console.log("312312----");
  // 输出中文字典
  writeLang(generateZhDict(i18nSettings), "zh");

  const waitTranslateList = mergeDictBySettings(
    i18nSettings,
    exportSetingsByLang(lang),
    lang
  );

  // console.log(waitTranslateList)

  const transList = await translateList(waitTranslateList, lang);
  // console.log(transList)
  handleWriteSettingsTranslate(i18nSettings, transList, lang);

  i18nSettings = mergeSettings(i18nSettings);
  writeLang(generateLangDict(i18nSettings, lang), lang);
  writeDict(i18nSettings, "settings");
}

function handleWriteSettingsTranslate(settings, transList, lang) {
  const transMap = listToObj(transList);
  Object.keys(settings).forEach((key) => {
    const item = settings[key];
    item.forEach((iItem) => {
      const i18nKey = `${key}.${iItem.key}`;
      if (transMap[i18nKey]) iItem[`baidu_${lang}`] = transMap[i18nKey];
    });
  });
}

function writeLang(i18nContent, lang) {
  fs.writeFileSync(
    `./public/locale/${lang}.json`,
    JSON.stringify(i18nContent, null, "\t")
  );
  fs.writeFileSync(
    `./src/assets/lang/${lang}.json`,
    JSON.stringify(i18nContent, null, "\t")
  );
}

main();
