import Fetch from "@/api/fetch";

const state = {
  loadingSettings: true,
  logicMap: {},
  logics: [],
  rules: [],
  selects: {
    timeType: [
      {
        label: "秒",
        value: "second",
      },
      {
        label: "分钟",
        value: "minute",
      },
      {
        label: "小时",
        value: "hour",
      },
      {
        label: "天",
        value: "day",
      },
    ],
    actionType: [
      {
        label: "观察",
        value: "watch",
      },
      {
        label: "放行",
        value: "pass",
      },
      {
        label: "阻断",
        value: "deny",
      },
      {
        label: "封禁",
        value: "block",
      },
    ],
    actionTypeSDK: [
      {
        label: "观察",
        value: "watch",
      },
      {
        label: "放行",
        value: "pass",
      },
      {
        label: "阻断",
        value: "deny",
      },
    ],
    cpuArch: [
      {
        label: "x86",
        value: "x86",
      },
      {
        label: "armeabi",
        value: "armeabi",
      },
      {
        label: "armeabi-v7a",
        value: "armeabi-v7a",
      },
      {
        label: "arm64-v8a",
        value: "arm64-v8a",
      },
    ],
    deviceOS: [
      {
        label: "安卓",
        value: "android",
      },
      {
        label: "IOS",
        value: "ios",
      },
      {
        label: "Windows",
        value: "windows",
      },
    ],
    deviceRisk: [
      {
        label: "模拟器",
        value: "simulator",
      },
      {
        label: "Root",
        value: "root",
      },
      {
        label: "VPN",
        value: "vpn",
      },
      {
        label: "代理",
        value: "proxy",
      },
      {
        label: "Hook",
        value: "hook",
      },
      {
        label: "越狱",
        value: "jailbreak",
      },
    ],
    action: [
      {
        label: "观察",
        value: "watch",
      },
      {
        label: "放行",
        value: "pass",
      },
      {
        label: "阻断",
        value: "deny",
      },
    ],
  },
};

const mutations = {
  SET_SETTINGS: (state, data) => {
    const selectLogis = [];
    Object.keys(data.logic).forEach((key) => {
      const item = data.logic[key];
      selectLogis.push({
        label: item.name,
        value: item.cfg,
      });
    });

    const rules = [];
    const logicMap = {};
    Object.keys(data.rules).forEach((key) => {
      const item = data.rules[key];
      rules.push({
        label: item.name,
        value: key,
      });
      logicMap[key] = selectLogis.filter((_) => item.logic.includes(_.value));
    });

    state.rules = rules;
    state.logics = selectLogis;
    state.logicMap = logicMap;
    state.loadingSettings = false;
  },
};

const actions = {
  async fetchSettings({ commit, state }) {
    console.log("----firewall.pagecfg");
    const data = {
      type: "app",
      logics: {
        contains: {
          cfg: "contains",
          name: "包含",
          valid_key: "contains",
        },
        not_contains: {
          cfg: "not_contains",
          name: "不包含",
          valid_key: "contains",
        },
        string_contains: {
          cfg: "string_contains",
          name: "字符串包含",
          valid_key: "contains",
        },
        string_not_contains: {
          cfg: "string_not_contains",
          name: "字符串不包含",
          valid_key: "contains",
        },
        belongs: {
          cfg: "belongs",
          name: "属于",
          valid_key: "belongs",
        },
        not_belongs: {
          cfg: "not_belongs",
          name: "不属于",
          valid_key: "belongs",
        },
        in: {
          cfg: "in",
          name: "在IP列表中",
          valid_key: "in",
          name_ip: "在IP列表中",
        },
        not_in: {
          cfg: "not_in",
          name: "不在IP列表中",
          valid_key: "in",
          name_ip: "不在IP列表中",
        },
        in_recent: {
          cfg: "in_recent",
          name: "在近7天的白名单中",
          valid_key: "not_exist",
        },
        not_in_recent: {
          cfg: "not_in_recent",
          name: "不在近7天的白名单中",
          valid_key: "not_exist",
        },
        equals: {
          cfg: "equals",
          name: "等于",
          valid_key: "equals",
          name_upstream_status: "频率等于",
        },
        not_equals: {
          cfg: "not_equals",
          name: "不等于",
          valid_key: "equals",
        },
        greater_than: {
          cfg: "greater_than",
          name: "大于",
          valid_key: "greater_than",
          name_upstream_status: "频率大于",
        },
        greater_equals: {
          cfg: "greater_equals",
          name: "大于等于",
          valid_key: "greater_than",
          name_upstream_status: "频率大于等于",
        },
        less_than: {
          cfg: "less_than",
          name: "小于",
          valid_key: "less_than",
        },
        not_exist: {
          cfg: "not_exist",
          name: "不存在",
          valid_key: "not_exist",
        },
        len_greater_than: {
          cfg: "len_greater_than",
          name: "长度大于",
          valid_key: "len",
        },
        len_equals: {
          cfg: "len_equals",
          name: "长度等于",
          valid_key: "len",
        },
        len_less_than: {
          cfg: "len_less_than",
          name: "长度小于",
          valid_key: "len",
        },
        key_rate_greater_than: {
          cfg: "key_rate_greater_than",
          name: "请求头频率大于",
          valid_key: "header_rate",
        },
        value_rate_greater_than: {
          cfg: "value_rate_greater_than",
          name: "请求头值频率大于",
          valid_key: "header_rate",
        },
        exist_garbled_code: {
          cfg: "exist_garbled_code",
          name: "存在乱码",
          valid_key: "not_exist",
        },
        not_garbled_code: {
          cfg: "not_garbled_code",
          name: "不存在乱码",
          valid_key: "not_exist",
        },
      },
      rules: {
        ip: {
          cfg: "IP",
          name: "IP",
          logic: ["equals", "not_equals"],
          logic_app: ["equals", "not_equals"],
          valid: {
            value: {
              format: "trim",
              check: "notEmpty|IpCidrOrIpv6",
            },
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim",
                check: "notEmpty|IpCidrOrIpv6",
              },
            },
          },
          valid_in: {
            value: {
              format: "trim",
              check: "notEmpty|IpCidrOrIpv6",
            },
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim",
                check: "notEmpty",
              },
            },
          },
          valid_not_exist: [],
          data: [],
        },
        region: {
          cfg: "Region",
          name: "访客区域",
          logic: ["belongs", "not_belongs"],
          valid: {
            map_cfg: {
              must: ["country", "province"],
              empty: 0,
              more_key: 0,
            },
            map: {
              country: {
                list_cfg: {
                  is_unique: 1,
                  allow_empty: 0,
                },
                list: {
                  value: {
                    format: "trim",
                    check:
                      "notEmpty|InArr:CN~HK~MO~TW~MN~KP~KR~JP~BN~KH~TL~ID~LA~MY~MM~PH~SG~TH~VN~BD~BT~IN~MV~NP~PK~LK~AF~IQ~IR~SY~JO~LB~IL~PS~BH~QA~KW~AE~OM~GE~SA~CY~TR~YE~AM~AZ~KZ~TJ~TM~UZ~KG~US~CA~MX~BR~CL~EC~CO~VE~AR~GY~GF~SR~PE~UY~PY~BO~PA~BZ~SV~HN~NI~CR~GT~BS~CU~JM~HT~DM~DO~PR~KY~BM~TT~FI~SE~NO~IS~DK~FO~LT~RU~UA~EE~LV~BY~MD~PL~CZ~HU~DE~AT~CH~LI~SK~GB~IE~NL~BE~LU~FR~MC~GR~MK~RO~BG~RS~AL~SI~HR~IT~VA~MT~ES~PT~AD~SM~BA~EG~LY~SD~TN~DZ~MA~RW~SO~DJ~KE~TZ~UG~ET~ER~BI~SC~TD~CF~CM~GA~CG~CD~GQ~ST~ML~GM~GN~CV~MR~BF~GW~SN~GH~TG~BJ~NE~NG~SL~LR~CI~ZA~ZM~AO~ZW~MW~MZ~BW~NA~LS~KM~MU~RE~SZ~MG~GU~NZ~AU~PG",
                  },
                },
              },
              province: {
                list_cfg: {
                  is_unique: 1,
                  allow_empty: 1,
                },
                list: {
                  value: {
                    format: "trim",
                    check:
                      "notEmpty|InArr:11~12~13~14~15~21~22~23~31~32~33~34~35~36~37~41~42~43~44~45~46~50~51~52~53~54~61~62~63~64~65",
                  },
                },
              },
            },
          },
          data: {
            countrys: {
              CN: "中国",
              HK: "中国-香港",
              MO: "中国-澳门",
              TW: "中国-台湾",
              ASIA: "亚洲",
              EASTASIA: "东亚",
              MN: "蒙古",
              KP: "朝鲜",
              KR: "韩国",
              JP: "日本",
              SOUTHEASTASIA: "东南亚",
              BN: "文莱",
              KH: "柬埔寨",
              TL: "东帝汶",
              ID: "印度尼西亚",
              LA: "老挝",
              MY: "马来西亚",
              MM: "缅甸",
              PH: "菲律宾",
              SG: "新加坡",
              TH: "泰国",
              VN: "越南",
              SOUTHASIA: "南亚",
              BD: "孟加拉",
              BT: "不丹",
              IN: "印度",
              MV: "马尔代夫",
              NP: "尼泊尔",
              PK: "巴基斯坦",
              LK: "斯里兰卡",
              WESTASIA: "西亚",
              AF: "阿富汗",
              IQ: "伊拉克",
              IR: "伊朗",
              SY: "叙利亚",
              JO: "约旦",
              LB: "黎巴嫩",
              IL: "以色列",
              PS: "巴勒斯坦",
              BH: "巴林",
              QA: "卡塔尔",
              KW: "科威特",
              AE: "阿联酋",
              OM: "阿曼",
              GE: "格鲁吉亚",
              SA: "沙特阿拉伯",
              CY: "塞浦路斯",
              TR: "土耳其",
              YE: "也门",
              AM: "亚美尼亚",
              AZ: "阿塞拜疆",
              CENTRALASIA: "中亚",
              KZ: "哈萨克斯坦",
              TJ: "塔吉克斯坦",
              TM: "土库曼斯坦",
              UZ: "乌兹别克斯坦",
              KG: "吉尔吉斯斯坦",
              AMERICA: "美洲",
              NORTHAMERICA: "北美洲",
              US: "美国",
              CA: "加拿大",
              MX: "墨西哥",
              SOUTHAMERICA: "南美洲",
              BR: "巴西",
              CL: "智利",
              EC: "厄瓜多尔",
              CO: "哥伦比亚",
              VE: "委内瑞拉",
              AR: "阿根廷",
              GY: "圭亚那",
              GF: "法属圭亚那",
              SR: "苏里南",
              PE: "秘鲁",
              UY: "乌拉圭",
              PY: "巴拉圭",
              BO: "玻利维亚",
              CENTRALAMERICA: "中美洲",
              PA: "巴拿马",
              BZ: "伯利兹",
              SV: "萨尔瓦多",
              HN: "洪都拉斯",
              NI: "尼加拉瓜",
              CR: "哥斯达黎加",
              GT: "危地马拉",
              CARIBBEAN: "加勒比海地区",
              BS: "巴哈马",
              CU: "古巴",
              JM: "牙买加",
              HT: "海地",
              DM: "多米尼加",
              DO: "多米尼克",
              PR: "波多黎各",
              KY: "开曼群岛",
              BM: "百慕大",
              TT: "特立尼达和多巴哥",
              EUROPE: "欧洲",
              NORTHEUROPE: "北欧",
              FI: "芬兰",
              SE: "瑞典",
              NO: "挪威",
              IS: "冰岛",
              DK: "丹麦",
              FO: "法罗群岛",
              EASTEUROPE: "东欧",
              LT: "立陶宛",
              RU: "俄罗斯",
              UA: "乌克兰",
              EE: "爱沙尼亚",
              LV: "拉脱维亚",
              BY: "白俄罗斯",
              MD: "摩尔多瓦",
              CENTRALEUROPE: "中欧",
              PL: "波兰",
              CZ: "捷克",
              HU: "匈牙利",
              DE: "德国",
              AT: "奥地利",
              CH: "瑞士",
              LI: "列支敦士登",
              SK: "斯洛伐克",
              WESTEUROPE: "西欧",
              GB: "英国",
              IE: "爱尔兰",
              NL: "荷兰",
              BE: "比利时",
              LU: "卢森堡",
              FR: "法国",
              MC: "摩纳哥",
              SOUTHEUROPE: "南欧",
              GR: "希腊",
              MK: "马其顿",
              RO: "罗马尼亚",
              BG: "保加利亚",
              RS: "塞尔维亚",
              AL: "阿尔巴尼亚",
              SI: "斯洛文尼亚",
              HR: "克罗地亚",
              IT: "意大利",
              VA: "梵蒂冈",
              MT: "马耳他",
              ES: "西班牙",
              PT: "葡萄牙",
              AD: "安道尔",
              SM: "圣马力诺",
              BA: "波斯尼亚和黑塞哥维那",
              AFRICA: "非洲",
              NORTHAFRICA: "北非",
              EG: "埃及",
              LY: "利比亚",
              SD: "苏丹",
              TN: "突尼斯",
              DZ: "阿尔及利亚",
              MA: "摩洛哥",
              EASTAFRICA: "东非",
              RW: "卢旺达",
              SO: "索马里",
              DJ: "吉布提",
              KE: "肯尼亚",
              TZ: "坦桑尼亚",
              UG: "乌干达",
              ET: "埃塞俄比亚",
              ER: "厄立特里亚",
              BI: "布隆迪",
              SC: "塞舌尔",
              CENTRALAFRICA: "中非",
              TD: "乍得",
              CF: "中非",
              CM: "喀麦隆",
              GA: "加蓬",
              CG: "刚果布",
              CD: "刚果金",
              GQ: "赤道几内亚",
              ST: "圣多美和普林西比",
              WESTAFRICA: "西非",
              ML: "马里",
              GM: "冈比亚",
              GN: "几内亚",
              CV: "佛得角",
              MR: "毛里塔尼亚",
              BF: "布基纳法索",
              GW: "几内亚比绍",
              SN: "塞内加尔",
              GH: "加纳",
              TG: "多哥",
              BJ: "贝宁",
              NE: "尼日尔",
              NG: "尼日利亚",
              SL: "塞拉利昂",
              LR: "利比里亚",
              CI: "科特迪瓦",
              SOUTHAFRICA: "南非",
              ZA: "南非",
              ZM: "赞比亚",
              AO: "安哥拉",
              ZW: "津巴布韦",
              MW: "马拉维",
              MZ: "莫桑比克",
              BW: "博茨瓦纳",
              NA: "纳米比亚",
              LS: "莱索托",
              KM: "科摩罗",
              MU: "毛里求斯",
              RE: "留尼旺",
              SZ: "斯威士兰",
              MG: "马达加斯加",
              OCEANIA: "大洋洲",
              GU: "关岛",
              NZ: "新西兰",
              AU: "澳大利亚",
              PG: "巴布亚新几内亚",
            },
            provinces: {
              11: "北京",
              12: "天津",
              13: "河北",
              14: "山西",
              15: "内蒙古",
              21: "辽宁",
              22: "吉林",
              23: "黑龙江",
              31: "上海",
              32: "江苏",
              33: "浙江",
              34: "安徽",
              35: "福建",
              36: "江西",
              37: "山东",
              41: "河南",
              42: "湖北",
              43: "湖南",
              44: "广东",
              45: "广西",
              46: "海南",
              50: "重庆",
              51: "四川",
              52: "贵州",
              53: "云南",
              54: "西藏",
              61: "陕西",
              62: "甘肃",
              63: "青海",
              64: "宁夏",
              65: "新疆",
            },
            ipRegions: [
              {
                key: "CN",
                name: "中国",
                child: [
                  {
                    key: "HK",
                    name: "中国-香港",
                  },
                  {
                    key: "MO",
                    name: "中国-澳门",
                  },
                  {
                    key: "TW",
                    name: "中国-台湾",
                  },
                ],
              },
              {
                key: "ASIA",
                name: "亚洲",
                child: [
                  {
                    key: "EASTASIA",
                    name: "东亚",
                    child: [
                      {
                        key: "MN",
                        name: "蒙古",
                      },
                      {
                        key: "KP",
                        name: "朝鲜",
                      },
                      {
                        key: "KR",
                        name: "韩国",
                      },
                      {
                        key: "JP",
                        name: "日本",
                      },
                    ],
                  },
                  {
                    key: "SOUTHEASTASIA",
                    name: "东南亚",
                    child: [
                      {
                        key: "BN",
                        name: "文莱",
                      },
                      {
                        key: "KH",
                        name: "柬埔寨",
                      },
                      {
                        key: "TL",
                        name: "东帝汶",
                      },
                      {
                        key: "ID",
                        name: "印度尼西亚",
                      },
                      {
                        key: "LA",
                        name: "老挝",
                      },
                      {
                        key: "MY",
                        name: "马来西亚",
                      },
                      {
                        key: "MM",
                        name: "缅甸",
                      },
                      {
                        key: "PH",
                        name: "菲律宾",
                      },
                      {
                        key: "SG",
                        name: "新加坡",
                      },
                      {
                        key: "TH",
                        name: "泰国",
                      },
                      {
                        key: "VN",
                        name: "越南",
                      },
                    ],
                  },
                  {
                    key: "SOUTHASIA",
                    name: "南亚",
                    child: [
                      {
                        key: "BD",
                        name: "孟加拉",
                      },
                      {
                        key: "BT",
                        name: "不丹",
                      },
                      {
                        key: "IN",
                        name: "印度",
                      },
                      {
                        key: "MV",
                        name: "马尔代夫",
                      },
                      {
                        key: "NP",
                        name: "尼泊尔",
                      },
                      {
                        key: "PK",
                        name: "巴基斯坦",
                      },
                      {
                        key: "LK",
                        name: "斯里兰卡",
                      },
                    ],
                  },
                  {
                    key: "CENTRALASIA",
                    name: "中亚",
                    child: [
                      {
                        key: "KZ",
                        name: "哈萨克斯坦",
                      },
                      {
                        key: "KG",
                        name: "吉尔吉斯斯坦",
                      },
                      {
                        key: "TJ",
                        name: "塔吉克斯坦",
                      },
                      {
                        key: "TM",
                        name: "土库曼斯坦",
                      },
                      {
                        key: "UZ",
                        name: "乌兹别克斯坦",
                      },
                    ],
                  },
                  {
                    key: "WESTASIA",
                    name: "西亚",
                    child: [
                      {
                        key: "AF",
                        name: "阿富汗",
                      },
                      {
                        key: "IQ",
                        name: "伊拉克",
                      },
                      {
                        key: "IR",
                        name: "伊朗",
                      },
                      {
                        key: "SY",
                        name: "叙利亚",
                      },
                      {
                        key: "JO",
                        name: "约旦",
                      },
                      {
                        key: "LB",
                        name: "黎巴嫩",
                      },
                      {
                        key: "IL",
                        name: "以色列",
                      },
                      {
                        key: "PS",
                        name: "巴勒斯坦",
                      },
                      {
                        key: "SA",
                        name: "沙特阿拉伯",
                      },
                      {
                        key: "BH",
                        name: "巴林",
                      },
                      {
                        key: "QA",
                        name: "卡塔尔",
                      },
                      {
                        key: "KW",
                        name: "科威特",
                      },
                      {
                        key: "AE",
                        name: "阿联酋",
                      },
                      {
                        key: "OM",
                        name: "阿曼",
                      },
                      {
                        key: "YE",
                        name: "也门",
                      },
                      {
                        key: "GE",
                        name: "格鲁吉亚",
                      },
                      {
                        key: "AM",
                        name: "亚美尼亚",
                      },
                      {
                        key: "AZ",
                        name: "阿塞拜疆",
                      },
                      {
                        key: "TR",
                        name: "土耳其",
                      },
                      {
                        key: "CY",
                        name: "塞浦路斯",
                      },
                    ],
                  },
                ],
              },
              {
                key: "AMERICA",
                name: "美洲",
                child: [
                  {
                    key: "NORTHAMERICA",
                    name: "北美洲",
                    child: [
                      {
                        key: "US",
                        name: "美国",
                      },
                      {
                        key: "CA",
                        name: "加拿大",
                      },
                      {
                        key: "MX",
                        name: "墨西哥",
                      },
                    ],
                  },
                  {
                    key: "SOUTHAMERICA",
                    name: "南美洲",
                    child: [
                      {
                        key: "BR",
                        name: "巴西",
                      },
                      {
                        key: "CL",
                        name: "智利",
                      },
                      {
                        key: "EC",
                        name: "厄瓜多尔",
                      },
                      {
                        key: "CO",
                        name: "哥伦比亚",
                      },
                      {
                        key: "VE",
                        name: "委内瑞拉",
                      },
                      {
                        key: "AR",
                        name: "阿根廷",
                      },
                      {
                        key: "GY",
                        name: "圭亚那",
                      },
                      {
                        key: "GF",
                        name: "法属圭亚那",
                      },
                      {
                        key: "SR",
                        name: "苏里南",
                      },
                      {
                        key: "PE",
                        name: "秘鲁",
                      },
                      {
                        key: "BO",
                        name: "玻利维亚",
                      },
                      {
                        key: "UY",
                        name: "乌拉圭",
                      },
                      {
                        key: "PY",
                        name: "巴拉圭",
                      },
                    ],
                  },
                  {
                    key: "CENTRALAMERICA",
                    name: "中美洲",
                    child: [
                      {
                        key: "GT",
                        name: "危地马拉",
                      },
                      {
                        key: "BZ",
                        name: "伯利兹",
                      },
                      {
                        key: "SV",
                        name: "萨尔瓦多",
                      },
                      {
                        key: "HN",
                        name: "洪都拉斯",
                      },
                      {
                        key: "NI",
                        name: "尼加拉瓜",
                      },
                      {
                        key: "CR",
                        name: "哥斯达黎加",
                      },
                      {
                        key: "PA",
                        name: "巴拿马",
                      },
                    ],
                  },
                  {
                    key: "CARIBBEAN",
                    name: "加勒比海地区",
                    child: [
                      {
                        key: "BS",
                        name: "巴哈马",
                      },
                      {
                        key: "CU",
                        name: "古巴",
                      },
                      {
                        key: "JM",
                        name: "牙买加",
                      },
                      {
                        key: "HT",
                        name: "海地",
                      },
                      {
                        key: "DM",
                        name: "多米尼加",
                      },
                      {
                        key: "DO",
                        name: "多米尼克",
                      },
                      {
                        key: "PR",
                        name: "波多黎各",
                      },
                      {
                        key: "KY",
                        name: "开曼群岛",
                      },
                      {
                        key: "BM",
                        name: "百慕大",
                      },
                      {
                        key: "TT",
                        name: "特立尼达和多巴哥",
                      },
                    ],
                  },
                ],
              },
              {
                key: "EUROPE",
                name: "欧洲",
                child: [
                  {
                    key: "NORTHEUROPE",
                    name: "北欧",
                    child: [
                      {
                        key: "FI",
                        name: "芬兰",
                      },
                      {
                        key: "SE",
                        name: "瑞典",
                      },
                      {
                        key: "NO",
                        name: "挪威",
                      },
                      {
                        key: "IS",
                        name: "冰岛",
                      },
                      {
                        key: "DK",
                        name: "丹麦",
                      },
                      {
                        key: "FO",
                        name: "法罗群岛",
                      },
                    ],
                  },
                  {
                    key: "EASTEUROPE",
                    name: "东欧",
                    child: [
                      {
                        key: "EE",
                        name: "爱沙尼亚",
                      },
                      {
                        key: "LV",
                        name: "拉脱维亚",
                      },
                      {
                        key: "LT",
                        name: "立陶宛",
                      },
                      {
                        key: "BY",
                        name: "白俄罗斯",
                      },
                      {
                        key: "RU",
                        name: "俄罗斯",
                      },
                      {
                        key: "UA",
                        name: "乌克兰",
                      },
                      {
                        key: "MD",
                        name: "摩尔多瓦",
                      },
                    ],
                  },
                  {
                    key: "CENTRALEUROPE",
                    name: "中欧",
                    child: [
                      {
                        key: "PL",
                        name: "波兰",
                      },
                      {
                        key: "SK",
                        name: "斯洛伐克",
                      },
                      {
                        key: "HU",
                        name: "匈牙利",
                      },
                      {
                        key: "DE",
                        name: "德国",
                      },
                      {
                        key: "AT",
                        name: "奥地利",
                      },
                      {
                        key: "CH",
                        name: "瑞士",
                      },
                      {
                        key: "LI",
                        name: "列支敦士登",
                      },
                      {
                        key: "CZ",
                        name: "捷克",
                      },
                    ],
                  },
                  {
                    key: "WESTEUROPE",
                    name: "西欧",
                    child: [
                      {
                        key: "GB",
                        name: "英国",
                      },
                      {
                        key: "IE",
                        name: "爱尔兰",
                      },
                      {
                        key: "NL",
                        name: "荷兰",
                      },
                      {
                        key: "BE",
                        name: "比利时",
                      },
                      {
                        key: "LU",
                        name: "卢森堡",
                      },
                      {
                        key: "FR",
                        name: "法国",
                      },
                      {
                        key: "MC",
                        name: "摩纳哥",
                      },
                    ],
                  },
                  {
                    key: "SOUTHEUROPE",
                    name: "南欧",
                    child: [
                      {
                        key: "RO",
                        name: "罗马尼亚",
                      },
                      {
                        key: "BG",
                        name: "保加利亚",
                      },
                      {
                        key: "RS",
                        name: "塞尔维亚",
                      },
                      {
                        key: "MK",
                        name: "马其顿",
                      },
                      {
                        key: "AL",
                        name: "阿尔巴尼亚",
                      },
                      {
                        key: "GR",
                        name: "希腊",
                      },
                      {
                        key: "SI",
                        name: "斯洛文尼亚",
                      },
                      {
                        key: "HR",
                        name: "克罗地亚",
                      },
                      {
                        key: "IT",
                        name: "意大利",
                      },
                      {
                        key: "BA",
                        name: "波斯尼亚和黑塞哥维那",
                      },
                      {
                        key: "VA",
                        name: "梵蒂冈",
                      },
                      {
                        key: "SM",
                        name: "圣马力诺",
                      },
                      {
                        key: "MT",
                        name: "马耳他",
                      },
                      {
                        key: "ES",
                        name: "西班牙",
                      },
                      {
                        key: "PT",
                        name: "葡萄牙",
                      },
                      {
                        key: "AD",
                        name: "安道尔",
                      },
                    ],
                  },
                ],
              },
              {
                key: "AFRICA",
                name: "非洲",
                child: [
                  {
                    key: "NORTHAFRICA",
                    name: "北非",
                    child: [
                      {
                        key: "EG",
                        name: "埃及",
                      },
                      {
                        key: "LY",
                        name: "利比亚",
                      },
                      {
                        key: "SD",
                        name: "苏丹",
                      },
                      {
                        key: "TN",
                        name: "突尼斯",
                      },
                      {
                        key: "DZ",
                        name: "阿尔及利亚",
                      },
                      {
                        key: "MA",
                        name: "摩洛哥",
                      },
                    ],
                  },
                  {
                    key: "EASTAFRICA",
                    name: "东非",
                    child: [
                      {
                        key: "ET",
                        name: "埃塞俄比亚",
                      },
                      {
                        key: "ER",
                        name: "厄立特里亚",
                      },
                      {
                        key: "SO",
                        name: "索马里",
                      },
                      {
                        key: "DJ",
                        name: "吉布提",
                      },
                      {
                        key: "KE",
                        name: "肯尼亚",
                      },
                      {
                        key: "TZ",
                        name: "坦桑尼亚",
                      },
                      {
                        key: "UG",
                        name: "乌干达",
                      },
                      {
                        key: "RW",
                        name: "卢旺达",
                      },
                      {
                        key: "BI",
                        name: "布隆迪",
                      },
                      {
                        key: "SC",
                        name: "塞舌尔",
                      },
                    ],
                  },
                  {
                    key: "CENTRALAFRICA",
                    name: "中非",
                    child: [
                      {
                        key: "TD",
                        name: "乍得",
                      },
                      {
                        key: "CF",
                        name: "中非",
                      },
                      {
                        key: "CM",
                        name: "喀麦隆",
                      },
                      {
                        key: "GQ",
                        name: "赤道几内亚",
                      },
                      {
                        key: "GA",
                        name: "加蓬",
                      },
                      {
                        key: "CG",
                        name: "刚果布",
                      },
                      {
                        key: "CD",
                        name: "刚果金",
                      },
                      {
                        key: "ST",
                        name: "圣多美和普林西比",
                      },
                    ],
                  },
                  {
                    key: "WESTAFRICA",
                    name: "西非",
                    child: [
                      {
                        key: "MR",
                        name: "毛里塔尼亚",
                      },
                      {
                        key: "SN",
                        name: "塞内加尔",
                      },
                      {
                        key: "GM",
                        name: "冈比亚",
                      },
                      {
                        key: "ML",
                        name: "马里",
                      },
                      {
                        key: "BF",
                        name: "布基纳法索",
                      },
                      {
                        key: "GN",
                        name: "几内亚",
                      },
                      {
                        key: "GW",
                        name: "几内亚比绍",
                      },
                      {
                        key: "CV",
                        name: "佛得角",
                      },
                      {
                        key: "SL",
                        name: "塞拉利昂",
                      },
                      {
                        key: "LR",
                        name: "利比里亚",
                      },
                      {
                        key: "CI",
                        name: "科特迪瓦",
                      },
                      {
                        key: "GH",
                        name: "加纳",
                      },
                      {
                        key: "TG",
                        name: "多哥",
                      },
                      {
                        key: "NG",
                        name: "尼日利亚",
                      },
                      {
                        key: "BJ",
                        name: "贝宁",
                      },
                      {
                        key: "NE",
                        name: "尼日尔",
                      },
                    ],
                  },
                  {
                    key: "SOUTHAFRICA",
                    name: "南非",
                    child: [
                      {
                        key: "ZM",
                        name: "赞比亚",
                      },
                      {
                        key: "AO",
                        name: "安哥拉",
                      },
                      {
                        key: "ZW",
                        name: "津巴布韦",
                      },
                      {
                        key: "MW",
                        name: "马拉维",
                      },
                      {
                        key: "MZ",
                        name: "莫桑比克",
                      },
                      {
                        key: "BW",
                        name: "博茨瓦纳",
                      },
                      {
                        key: "NA",
                        name: "纳米比亚",
                      },
                      {
                        key: "ZA",
                        name: "南非",
                      },
                      {
                        key: "SZ",
                        name: "斯威士兰",
                      },
                      {
                        key: "LS",
                        name: "莱索托",
                      },
                      {
                        key: "MG",
                        name: "马达加斯加",
                      },
                      {
                        key: "KM",
                        name: "科摩罗",
                      },
                      {
                        key: "MU",
                        name: "毛里求斯",
                      },
                      {
                        key: "RE",
                        name: "留尼旺",
                      },
                    ],
                  },
                ],
              },
              {
                key: "OCEANIA",
                name: "大洋洲",
                child: [
                  {
                    key: "AU",
                    name: "澳大利亚",
                  },
                  {
                    key: "NZ",
                    name: "新西兰",
                  },
                  {
                    key: "GU",
                    name: "关岛",
                  },
                  {
                    key: "PG",
                    name: "巴布亚新几内亚",
                  },
                ],
              },
            ],
            name_map: {
              country: "国家",
              province: "省",
              ipRegions: "地域",
            },
          },
        },
        fingerprint: {
          cfg: "Fingerprint",
          name: "设备指纹",
          logic: ["equals", "not_equals"],
          valid: {
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim,htmlDecode",
                check: "notEmpty",
              },
            },
          },
          data: [],
        },
        device_os: {
          cfg: "Device_OS",
          name: "终端系统",
          logic: ["equals", "not_equals"],
          valid: {
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim",
                check: "notEmpty|InArr:android~ios~windows",
              },
            },
          },
          data: [],
        },
        device_risk: {
          cfg: "Device_risk",
          name: "终端风险类型",
          logic: ["equals", "not_equals"],
          valid: {
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim",
                check:
                  "notEmpty|InArr:simulator~root~vpn~proxy~multiinst~hook~groupctrl~jailbreak",
              },
            },
          },
          data: [],
        },
        device_rate_limit: {
          cfg: "Device_rate_limit",
          name: "单设备请求频率",
          logic: ["greater_than"],
          valid: {
            map_cfg: {
              must: ["reqs", "interval"],
              empty: 0,
              more_key: 0,
            },
            map: {
              reqs: {
                value: {
                  format: "trim,intval",
                  check: "Number|NumberGt0",
                },
              },
              interval: {
                value: {
                  format: "trim,intval",
                  check: "Number|NumberGt0",
                },
              },
            },
          },
          data: {
            limit_req: [0, 20],
            limit_second: [0, 1000],
            name_map: {
              reqs: "请求次数",
              interval: "统计间长",
            },
          },
        },
        cpu_arch: {
          cfg: "Cpu_arch",
          name: "CPU架构",
          logic: ["equals", "not_equals"],
          valid: {
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim",
                check: "notEmpty|InArr:x86~armeabi~armeabi-v7a~arm64-v8a",
              },
            },
          },
          data: [],
        },
        device: {
          cfg: "Device",
          name: "设备名",
          logic: ["equals", "not_equals"],
          valid: {
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim,htmlDecode",
                check: "notEmpty",
              },
            },
          },
          data: [],
        },
        app_name: {
          cfg: "App_name",
          name: "应用名称",
          logic: ["equals", "not_equals"],
          valid: {
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim,htmlDecode",
                check: "notEmpty",
              },
            },
          },
          data: [],
        },
        app_sign_hash: {
          cfg: "App_sign_hash",
          name: "应用签名",
          logic: ["equals", "not_equals"],
          valid: {
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim,htmlDecode",
                check: "notEmpty",
              },
            },
          },
          data: [],
        },
        target_port: {
          cfg: "Target_port",
          name: "请求端口",
          logic: ["equals", "not_equals"],
          valid: {
            list_cfg: {
              is_unique: 1,
              allow_empty: 0,
            },
            list: {
              value: {
                format: "trim,intval",
                check: "Number|NumberGt0",
              },
            },
          },
          data: [],
        },
      },
      rule_types: [
        "ip",
        "region",
        "fingerprint",
        "device_os",
        "device_risk",
        "device_rate_limit",
        "cpu_arch",
        "device",
        "app_name",
        "app_sign_hash",
        "target_port",
      ],
      limit_max: {
        rule: 5,
        policy: 100,
      },
      logic: {
        contains: {
          cfg: "contains",
          name: "包含",
          valid_key: "contains",
        },
        not_contains: {
          cfg: "not_contains",
          name: "不包含",
          valid_key: "contains",
        },
        string_contains: {
          cfg: "string_contains",
          name: "字符串包含",
          valid_key: "contains",
        },
        string_not_contains: {
          cfg: "string_not_contains",
          name: "字符串不包含",
          valid_key: "contains",
        },
        belongs: {
          cfg: "belongs",
          name: "属于",
          valid_key: "belongs",
        },
        not_belongs: {
          cfg: "not_belongs",
          name: "不属于",
          valid_key: "belongs",
        },
        in: {
          cfg: "in",
          name: "在IP列表中",
          valid_key: "in",
          name_ip: "在IP列表中",
        },
        not_in: {
          cfg: "not_in",
          name: "不在IP列表中",
          valid_key: "in",
          name_ip: "不在IP列表中",
        },
        in_recent: {
          cfg: "in_recent",
          name: "在近7天的白名单中",
          valid_key: "not_exist",
        },
        not_in_recent: {
          cfg: "not_in_recent",
          name: "不在近7天的白名单中",
          valid_key: "not_exist",
        },
        equals: {
          cfg: "equals",
          name: "等于",
          valid_key: "equals",
          name_upstream_status: "频率等于",
        },
        not_equals: {
          cfg: "not_equals",
          name: "不等于",
          valid_key: "equals",
        },
        greater_than: {
          cfg: "greater_than",
          name: "大于",
          valid_key: "greater_than",
          name_upstream_status: "频率大于",
        },
        greater_equals: {
          cfg: "greater_equals",
          name: "大于等于",
          valid_key: "greater_than",
          name_upstream_status: "频率大于等于",
        },
        less_than: {
          cfg: "less_than",
          name: "小于",
          valid_key: "less_than",
        },
        not_exist: {
          cfg: "not_exist",
          name: "不存在",
          valid_key: "not_exist",
        },
        len_greater_than: {
          cfg: "len_greater_than",
          name: "长度大于",
          valid_key: "len",
        },
        len_equals: {
          cfg: "len_equals",
          name: "长度等于",
          valid_key: "len",
        },
        len_less_than: {
          cfg: "len_less_than",
          name: "长度小于",
          valid_key: "len",
        },
        key_rate_greater_than: {
          cfg: "key_rate_greater_than",
          name: "请求头频率大于",
          valid_key: "header_rate",
        },
        value_rate_greater_than: {
          cfg: "value_rate_greater_than",
          name: "请求头值频率大于",
          valid_key: "header_rate",
        },
        exist_garbled_code: {
          cfg: "exist_garbled_code",
          name: "存在乱码",
          valid_key: "not_exist",
        },
        not_garbled_code: {
          cfg: "not_garbled_code",
          name: "不存在乱码",
          valid_key: "not_exist",
        },
      },
      bots: {
        spider: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "spider",
          bot_name: "搜索引擎Bots",
          ip_type_name: "搜索引擎",
          bot_num: 21,
        },
        partner: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "partner",
          bot_name: "合作伙伴Bots",
          ip_type_name: "合作伙伴",
          bot_num: 6,
        },
        monitor: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "monitor",
          bot_name: "监控Bots",
          ip_type_name: "监控",
          bot_num: 11,
        },
        aggregator: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "aggregator",
          bot_name: "聚合器Bots",
          ip_type_name: "聚合器",
          bot_num: 4,
        },
        Social: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "Social",
          bot_name: "社交网络Bots",
          ip_type_name: "社交网络",
          bot_num: 2,
        },
        ad: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "ad",
          bot_name: "广告网络Bots",
          ip_type_name: "广告网络",
          bot_num: 2,
        },
        BackLinkWatch: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "BackLinkWatch",
          bot_name: "反向链接检测Bots",
          ip_type_name: "反向链接检测",
          bot_num: 7,
        },
        IDC: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "IDC",
          bot_name: "IDC数据Bots",
          ip_type_name: "IDC数据",
          bot_num: 4,
        },
        MaliciousUA: {
          risk_key: "eval",
          risk_name: "恶意Bots",
          bot_key: "MaliciousUA",
          bot_name: "恶意UA Bots",
          ip_type_name: "恶意UA",
          bot_num: 22,
        },
        FakeUA: {
          risk_key: "eval",
          risk_name: "恶意Bots",
          bot_key: "FakeUA",
          bot_name: "伪造搜索引擎Bots",
          ip_type_name: "伪造搜索引擎",
          bot_num: 33,
        },
        IpBlackList: {
          risk_key: "eval",
          risk_name: "恶意Bots",
          bot_key: "IpBlackList",
          bot_name: "IP信誉库黑名单Bots",
          ip_type_name: "IP信誉库黑名单",
          bot_num: 4,
        },
        Proxy: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "Proxy",
          bot_name: "代理池IPBots",
          ip_type_name: "代理池IP",
          bot_num: 4,
        },
        botnet: {
          risk_key: "eval",
          risk_name: "恶意Bots",
          bot_key: "botnet",
          bot_name: "僵尸网络Bots",
          ip_type_name: "僵尸网络",
          bot_num: 2,
        },
        Tor: {
          risk_key: "eval",
          risk_name: "恶意Bots",
          bot_key: "Tor",
          bot_name: "洋葱路由",
          ip_type_name: "洋葱路由",
          bot_num: 1,
        },
        Export: {
          risk_key: "ok",
          risk_name: "合法Bots",
          bot_key: "Export",
          bot_name: "公共出口",
          ip_type_name: "公共出口",
          bot_num: 1,
        },
      },
    };
    // const data = await Fetch.get('V4/firewall.pagecfg', { type: 'app' })
    commit("SET_SETTINGS", data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
