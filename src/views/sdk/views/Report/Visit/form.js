import moment from 'moment'
import { TOOLTIP_THEME } from '@/constants/echarts-tooltip'
const grid = {
  top: 60,
  left: 80,
  right: 50,
  bottom: 50
}
const grid2 = {
  top: 100,
  left: 80,
  right: 50,
  bottom: 50
}

function getLineDefaultData(start_time, unit) {
  const defaultData = {
    trend: {
      x_data: [moment(start_time || new Date(), 'YYYY-MM-DD HH:mm:ss')],
      y_data: {
        data: [0],
        unit: unit || ''
      }
    }
  }
  return defaultData
}

function getFlowDefaultData(start_time, unit) {
  const defaultData = {
    trend: {
      x_data: [moment(start_time || new Date(), 'YYYY-MM-DD HH:mm:ss')],
      received_data: {
        value: [0],
        unit: unit || 'MB'
      },
      send_data: {
        value: [0],
        unit: unit || 'MB'
      }
    }
  }
  return defaultData
}

function getBackSourceDefaultData(start_time, unit) {
  // ['200', '404', '405', '406', '502']
  const defaultData = {
    trend: {
      x_data: [moment(start_time || new Date(), 'YYYY-MM-DD HH:mm:ss')],
      status_200_data: {
        desc: '转发正常',
        name: '200',
        value: [0],
        unit: ''
      },
      status_404_data: {
        desc: 'accessKey未识别(未配置或套餐已过期)',
        name: '404',
        value: [0],
        unit: ''
      },
      status_405_data: {
        desc: '业务端口或域名未在控制台配置',
        name: '405',
        value: [0],
        unit: ''
      },
      status_502_data: {
        desc: '回源失败',
        name: '502',
        value: [0],
        unit: ''
      }
    }
  }
  return defaultData
}
function getRiskControlStatusDefaultData(start_time, unit) {
  // ['200', '404', '405', '406', '502']
  const defaultData = {
    trend: {
      x_data: [moment(start_time || new Date(), 'YYYY-MM-DD HH:mm:ss')],
      status_406_data: {
        desc: '禁止模拟器',
        name: '406',
        value: [0],
        unit: ''
      },
      status_407_data: {
        desc: '禁止root',
        name: '407',
        value: [0],
        unit: ''
      },
      status_408_data: {
        desc: '禁止调试',
        name: '408',
        value: [0],
        unit: ''
      },
      status_409_data: {
        desc: '禁止多开',
        name: '409',
        value: [0],
        unit: ''
      },
      status_410_data: {
        desc: '禁止群控',
        name: '410',
        value: [0],
        unit: ''
      },
      status_411_data: {
        desc: '禁止hook',
        name: '411',
        value: [0],
        unit: ''
      },
      status_412_data: {
        desc: '禁止vpn',
        name: '412',
        value: [0],
        unit: ''
      },
      status_413_data: {
        desc: '禁止代理',
        name: '413',
        value: [0],
        unit: ''
      }
    }
  }
  return defaultData
}
const ring_chartSettingVe = {
  legend: {
    orient: 'horizontal',
    x: 'center'
    // show: false,
    // type: 'scroll',
    // orient: 'vertical',
    // left: 0,
    // top: 20,
    // bottom: 20
  },

  tooltip: TOOLTIP_THEME
}

function getRingDefaultData(columns = [], rows = [], maxSelect) {
  const ringChart = {
    data: {
      columns: rows.length ? columns : ['name', 'value'],
      rows: rows.length ? rows : [{ name: '暂无数据', value: 0 }]
    }
  }

  if (maxSelect === 3) {
    const select = {}
    select[rows[0].name] = true
    select[rows[1].name] = true
    select[rows[2].name] = true
    return { ringChart, select }
  } else {
    return ringChart
  }
}

export {
  grid, grid2, getLineDefaultData, getRingDefaultData, ring_chartSettingVe, getFlowDefaultData, getBackSourceDefaultData,
  getRiskControlStatusDefaultData
}
