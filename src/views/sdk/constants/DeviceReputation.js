export default {
  TimeUnit: [
    {
      value: 'minute',
      label: '分钟'
    },
    {
      value: 'hour',
      label: '小时'
    },
    {
      value: 'day',
      label: '天'
    },
    {
      value: 'month',
      label: '月'
    }
  ],
  Level: [
    {
      label: '普通',
      value: 'general'
    },
    {
      label: '优质',
      value: 'good'
    },
    {
      label: '风险',
      value: 'risk'
    }
  ],
  Mode: [
    {
      label: '智能评估',
      value: 0
    },
    {
      label: '自定义',
      value: 1
    }
  ],
  MatchType: [
    {
      label: '总在线时长',
      value: 'total_online_time',
      logic: ['gt', 'egt', 'lt', 'elt']
    },
    {
      label: '单APP启动次数',
      value: 'app_start_times',
      logic: ['gt', 'egt', 'lt', 'elt']
    },
    {
      label: '在线时间区间',
      value: 'online_time_rang',
      logic: ['belong', 'not_belong']
    }
  ],
  Logic: [
    {
      label: '大于',
      value: 'gt'
    },
    {
      label: '大于等于',
      value: 'egt'
    },
    {
      label: '小于',
      value: 'lt'
    },
    {
      label: '小于等于',
      value: 'elt'
    },
    {
      label: '属于',
      value: 'belong'
    },
    {
      label: '不属于',
      value: 'not_belong'
    }
  ]
}
