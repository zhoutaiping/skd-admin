const WEEK_NAME = [
  {
    label: '周一',
    value: 1
  },
  {
    label: '周二',
    value: 2
  },
  {
    label: '周三',
    value: 3
  },
  {
    label: '周四',
    value: 4
  },
  {
    label: '周五',
    value: 5
  },
  {
    label: '周六',
    value: 6
  },
  {
    label: '周日',
    value: 0
  }
]

const IP_BELONG_TYPE = [
  {
    label: '代理',
    value: 'proxy'
  },
  {
    label: 'VPN',
    value: 'vpn'
  },
  {
    label: 'IDC',
    value: 'idc'
  },
  {
    label: '活跃僵尸网络',
    value: 'act_zombie_net'
  }
]

const HANDLE_TYPE_VAR = {
  GENERAL_CC: 'anticc',
  BLOCK: 'block',
  PROHIBITION: 'deny',
  RELEASE: 'pass',
  WATCH: 'watch'
}

const TCP_CONNECTION_TYPE = [
  {
    label: '空连接',
    value: 'empty'
  },
  {
    label: '慢连接',
    value: 'slow'
  }
]

const HANDLE_TYPE = [
  {
    label: '通用',
    value: HANDLE_TYPE_VAR.GENERAL_CC
  },
  {
    label: '观察',
    value: HANDLE_TYPE_VAR.WATCH
  },
  {
    label: '阻断',
    value: HANDLE_TYPE_VAR.PROHIBITION
  },
  {
    label: '封禁',
    value: HANDLE_TYPE_VAR.BLOCK
  },
  {
    label: '放行',
    value: HANDLE_TYPE_VAR.RELEASE
  }
]

const HANDLE_TCP_TYPE = [
  {
    label: '阻断',
    value: HANDLE_TYPE_VAR.PROHIBITION
  },
  {
    label: '封禁',
    value: HANDLE_TYPE_VAR.BLOCK
  },
  {
    label: '放行',
    value: HANDLE_TYPE_VAR.RELEASE
  },
  {
    label: '观察',
    value: HANDLE_TYPE_VAR.WATCH
  }
]
const ACTION_TCP_TYPE = [
  {
    label: '阻断',
    value: 'deny'
  },
  {
    label: '封禁',
    value: 'block'
  },
  {
    label: '放行',
    value: 'pass'
  }
]
const ACTION_TYPE = [
  {
    label: '通用 - 默认',
    value: 'anticc_default'
  },
  {
    label: '通用 - 普通',
    value: 'anticc_normal'
  },
  {
    label: '通用 - Cookie校验',
    value: 'anticc_cookie'
  },
  {
    label: '通用 - JS跳转',
    value: 'anticc_strict'
  },
  {
    label: '通用 - 验证码',
    value: 'anticc_captcha'
  },
  {
    label: '阻断',
    value: 'deny'
  },
  {
    label: '观察',
    value: 'watch'
  },
  {
    label: '封禁',
    value: 'block'
  },
  {
    label: '加白',
    value: 'white'
  },
  {
    label: '重定向',
    value: 'redirect'
  },
  {
    label: '蜜网牵引',
    value: 'web_pot'
  },
  {
    label: '放行',
    value: 'pass'
  },
  {
    label: '人机验证',
    value: 'verification'
  },
  {
    label: '放行后执行CC防护',
    value: 'pass_cc'
  },
  {
    label: '放行后执行WAF防护',
    value: 'pass_waf'
  },
  {
    label: '放行后执行CC和WAF防护',
    value: 'pass_cc_waf'
  }
]

const HANDLE_GENERAL_CC = [
  {
    label: '默认',
    value: 'default'
  },
  {
    label: '普通',
    value: 'normal'
  },
  {
    label: '严格',
    value: 'strict'
  },
  {
    label: '验证码',
    value: 'captcha'
  }
]

const HANDLE_RELEASE = [
  {
    label: 'CC 防护',
    value: 'cc'
  },
  {
    label: 'WAF 防护',
    value: 'waf'
  }
]

const HANDLE_TCP_RELEASE = [
  {
    label: 'CC 防护',
    value: 'cc'
  }
]

const TIME_TYPE = [
  {
    label: '秒',
    value: 'second'
  },
  {
    label: '分钟',
    value: 'minute'
  },
  {
    label: '小时',
    value: 'hour'
  },
  {
    label: '天',
    value: 'day'
  }
]

const TCP_TYPE = [
  {
    label: '空连接',
    value: 1
  },
  {
    label: '慢连接',
    value: 2
  }
]

// 策略来源
const RULE_ORIGIN_TYPE = [
  {
    label: 'web',
    value: '太极抗D WEB版'
  },
  {
    label: 'plus',
    value: '安全专家策略'
  },
  {
    label: 'cdn',
    value: ''
  }
]

const MATCHING_TYPE_VAR = {
  URL: 'url',
  URL_type: 'url_type',
  IP: 'ip',
  Region: 'region',
  Referer: 'referer',
  UA: 'user_agent',
  Args: 'args',
  QueryString: 'querystring',
  Req_header_entry: 'req_header_entry',
  Req_time: 'req_time',
  Req_method: 'req_method',
  Device_type: 'device_type',
  IP_type: 'ip_type',
  Postfix: 'postfix',
  IP_rate_limit: 'ip_rate_limit',
  IP_url_rate_limit: 'ip_url_rate_limit',
  Upstream_status: 'upstream_status'
}

const MATCHING_TYPE = [
  { label: 'URL', value: 'url' },
  { label: '请求类型', value: 'url_type' },
  { label: 'IP', value: 'ip' },
  { label: '区域', value: 'region' },
  { label: 'Referer', value: 'referer' },
  { label: 'UserAgent', value: 'user_agent' },
  { label: '请求参数', value: 'args' },
  { label: '查询字符串', value: 'querystring' },
  { label: '请求头', value: 'req_header_entry' },
  { label: '请求时间', value: 'req_time' },
  { label: '请求方法', value: 'req_method' },
  { label: '设备类型', value: 'device_type' },
  { label: 'IP类型', value: 'ip_type' },
  { label: '后缀', value: 'postfix' },
  { label: 'IP请求频率', value: 'ip_rate_limit' },
  { label: '源响应状态码', value: 'upstream_status' }
]

export {
  WEEK_NAME,
  MATCHING_TYPE_VAR,
  MATCHING_TYPE,
  IP_BELONG_TYPE,
  HANDLE_TYPE_VAR,
  TCP_CONNECTION_TYPE,
  HANDLE_TCP_RELEASE,
  HANDLE_TYPE,
  HANDLE_TCP_TYPE,
  HANDLE_GENERAL_CC,
  HANDLE_RELEASE,
  TIME_TYPE,
  TCP_TYPE,
  RULE_ORIGIN_TYPE,
  ACTION_TYPE,
  ACTION_TCP_TYPE
}
