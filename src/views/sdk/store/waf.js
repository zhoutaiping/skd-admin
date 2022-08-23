import Fetch from '@/api/fetch'

const state = {
  loadingSettings: true,
  logicMap: {},
  logics: [],
  rules: [],
  selects: {
    timeType: [
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
    ],
    actionType: [
      {
        label: '观察',
        value: 'watch'
      },
      {
        label: '放行',
        value: 'pass'
      },
      {
        label: '阻断',
        value: 'deny'
      },
      {
        label: '封禁',
        value: 'block'
      }
    ],
    actionTypeSDK: [
      {
        label: '观察',
        value: 'watch'
      },
      {
        label: '放行',
        value: 'pass'
      },
      {
        label: '阻断',
        value: 'deny'
      }
    ],
    cpuArch: [
      {
        label: 'x86',
        value: 'x86'
      },
      {
        label: 'armeabi',
        value: 'armeabi'
      },
      {
        label: 'armeabi-v7a',
        value: 'armeabi-v7a'
      },
      {
        label: 'arm64-v8a',
        value: 'arm64-v8a'
      }
    ],
    deviceOS: [
      {
        label: '安卓',
        value: 'android'
      },
      {
        label: 'IOS',
        value: 'ios'
      },
      {
        label: 'Windows',
        value: 'windows'
      }
    ],
    deviceRisk: [
      {
        label: '模拟器',
        value: 'simulator'
      },
      {
        label: 'Root',
        value: 'root'
      },
      {
        label: 'VPN',
        value: 'vpn'
      },
      {
        label: '代理',
        value: 'proxy'
      },
      {
        label: 'Hook',
        value: 'hook'
      },
      {
        label: '越狱',
        value: 'jailbreak'
      }
    ],
    action: [
      {
        label: '观察',
        value: 'watch'
      },
      {
        label: '放行',
        value: 'pass'
      },
      {
        label: '阻断',
        value: 'deny'
      }
    ]
  }
}

const mutations = {
  SET_SETTINGS: (state, data) => {
    const selectLogis = []
    Object.keys(data.logic).forEach(key => {
      const item = data.logic[key]
      selectLogis.push({
        label: item.name,
        value: item.cfg
      })
    })

    const rules = []
    const logicMap = {}
    Object.keys(data.rules).forEach(key => {
      const item = data.rules[key]
      rules.push({
        label: item.name,
        value: key
      })
      logicMap[key] = selectLogis.filter(_ => item.logic.includes(_.value))
    })

    state.rules = rules
    state.logics = selectLogis
    state.logicMap = logicMap
    state.loadingSettings = false
  }
}

const actions = {
  async fetchSettings({ commit, state }) {
    const data = await Fetch.get('V4/firewall.pagecfg', { type: 'app' })
    commit('SET_SETTINGS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
