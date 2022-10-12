const fs = require("fs");
const { transByList } = require("./plugins/baidu");
const {
  jsonFlat,
  jsonUnflat,
  objToList,
  clearTranslatedList,
} = require("./plugins/utils");
const { exec } = require("child_process");
const { mergeDictJs } = require("./plugins/dict");

const [, , moduleName = "cloud-speed", lang = "en"] = process.argv;

main(moduleName, lang);
async function main(moduleName, lang = "en") {
  const path = `./src/views/${moduleName}/locale/zh.js`;
  const tranPath = `./src/views/${moduleName}/locale/${lang}.js`;
  // eslint-disable-next-line no-eval
  let zhData = eval(fs.readFileSync(path, "utf8"));
  zhData = jsonFlat(zhData);

  const enData = await mergeDictJs(tranPath, zhData);
  let transList = clearTranslatedList(objToList(enData));

  if (transList.length) {
    transList.forEach((item, index) => {
      const [key] = item;
      item[1] = zhData[key];
    });

    transList = await transByList(transList, lang);

    transList.forEach((item) => {
      const [key, str] = item;
      enData[key] = str;
    });

    fs.writeFileSync(
      tranPath,
      `exports.default =${JSON.stringify(jsonUnflat(enData), null, "\t")}`
    );
    exec(`npm run lint ${tranPath}`);
  }

  fs.writeFileSync(
    path,
    `exports.default =${JSON.stringify(jsonUnflat(zhData), null, "\t")}`
  );
  exec(`npm run lint ${path}`);
}
