import CountryList from '../constants/country-list'
import { province as ProvinceList } from '../constants/city-data'
import moment from 'moment'

export function areaView(arr) {
  if (typeof arr === 'string') {
    arr = arr.split('-')
  }

  const [country, province] = arr

  let _country = CountryList.find(item => item.value === country) || ''
  let _province = ProvinceList.find(item => item.value === province) || ''

  if (_country) _country = _country.label
  if (_province) _province = _province.label

  let ret = _country
  if (_province) {
    ret = ret + '-' + _province
  }
  return ret
}

export function labelView(value, origin, label = 'label', noknow = '未知') {
  if (!origin) return

  const item = origin.find(item => item.value === value)

  let name
  if (item) name = item[label]
  return name || noknow
}

export function mbToSize(mb) {
  const formatData = {}
  if (mb < 1024) return
  if (mb === 0) {
    formatData.data = 0
    formatData.unit = 'MB'
  } else {
    const k = 1024

    const sizes = ['MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(mb) / Math.log(k))
    formatData.data = mb / Math.pow(k, i)
    formatData.unit = sizes[i]
  }
  return formatData
}

export function byteView(value, format, zero = 2, type = 1) {
  const UT = 1024
  let unit = 'B'

  if (value === 0) {
    if (type === 1) return '0 B'
    if (type === 2) return { value: 0, unit: 'B' }
  } else {
    if (format) {
      unit = format
      if (format === 'KB') value = value / Math.pow(UT, 1)
      if (format === 'MB') value = value / Math.pow(UT, 2)
      if (format === 'GB') value = value / Math.pow(UT, 3)
      if (format === 'TB') value = value / Math.pow(UT, 4)
    } else {
      if (value < UT) {
        return `${value} B`
      } else if (value >= UT && value < Math.pow(UT, 2)) {
        unit = 'KB'
        value = value / Math.pow(UT, 1)
      } else if (Math.pow(UT, 2) >= UT && value < Math.pow(UT, 3)) {
        unit = 'MB'
        value = value / Math.pow(UT, 2)
      } else if (Math.pow(UT, 3) >= UT && value < Math.pow(UT, 4)) {
        unit = 'GB'
        value = value / Math.pow(UT, 3)
      } else {
        unit = 'TB'
        value = value / Math.pow(UT, 4)
      }
    }

    if (type === 1) return `${value.toFixed(zero)} ${unit}`
    if (type === 2) return { value: value.toFixed(2), unit: unit }
  }
}

export function bitsView(value, format, zero = 2) {
  const UT = 1000
  let unit = 'bps'

  if (value === 0 || value === null || value === undefined) {
    return '0 bps'
  } else {
    if (format) {
      unit = format
      if (format === 'Kbps') value = value / Math.pow(UT, 1)
      if (format === 'Mbps') value = value / Math.pow(UT, 2)
      if (format === 'Gbps') value = value / Math.pow(UT, 3)
      if (format === 'Tbps') value = value / Math.pow(UT, 4)
    } else {
      if (value < UT) {
        return `${value} bps`
      } else if (value >= UT && value < Math.pow(UT, 2)) {
        unit = 'Kbps'
        value = value / Math.pow(UT, 1)
      } else if (Math.pow(UT, 2) >= UT && value < Math.pow(UT, 3)) {
        unit = 'Mbps'
        value = value / Math.pow(UT, 2)
      } else if (Math.pow(UT, 3) >= UT && value < Math.pow(UT, 4)) {
        unit = 'Gbps'
        value = value / Math.pow(UT, 3)
      } else {
        unit = 'Tbps'
        value = value / Math.pow(UT, 4)
      }
    }

    return `${value.toFixed(zero)} ${unit}`
  }
}

export function numView(value, zero = 2) {
  const old_Value = JSON.parse(JSON.stringify(value))
  let unit = ''
  if (value >= 10000 && value < 100000000) {
    unit = '万'
    value = value / 10000
  } else if (value >= 100000000) {
    unit = '亿'
    value = value / 100000000
  }
  return old_Value >= 10000 ? `${value.toFixed(zero)} ${unit}` : `${value} ${unit}`
}

export function formatNumber(s, type = 0) {
  if (/[^0-9\.]/.test(s)) return '0'
  if (s === null || s === '') return '0'
  s = s.toString().replace(/^(\d*)$/, '$1.')
  s = (s + '00').replace(/(\d*\.\d\d)\d*/, '$1')
  s = s.replace('.', ',')
  const re = /(\d)(\d{3},)/
  while (re.test(s)) s = s.replace(re, '$1,$2')

  s = s.replace(/,(\d\d)$/, '.$1')
  if (type === 0) {
    const a = s.split('.')
    if (a[1] === '00') {
      s = a[0]
    }
  }
  return s
}

export function datetime(val, format, source) {
  return moment(val, source).format(format)
}

export function priceView(money) {
  let tpMoney = '0.00'
  if (money != null) {
    tpMoney = money
  }
  tpMoney = Number(tpMoney)
  if (isNaN(tpMoney)) {
    return '0.00'
  }
  tpMoney = tpMoney.toFixed(2) + ''
  var re = /^(-?\d+)(\d{3})(\.?\d*)/
  while (re.test(tpMoney)) {
    tpMoney = tpMoney.replace(re, '$1,$2$3')
  }
  return tpMoney
}

export function formatSeconds(value) {
  var theTime = parseInt(value)// 秒
  var middle = 0// 分
  var hour = 0// 小时

  if (theTime > 60) {
    middle = parseInt(theTime / 60)
    theTime = parseInt(theTime % 60)
    if (middle > 60) {
      hour = parseInt(middle / 60)
      middle = parseInt(middle % 60)
    }
  }
  var result = '' + parseInt(theTime) + '秒'
  if (middle > 0) {
    result = '' + parseInt(middle) + '分' + result
  }
  if (hour > 0) {
    result = '' + parseInt(hour) + '小时' + result
  }
  return result
}

const Filters = {
  labelView,
  byteView,
  bitsView,
  datetime,
  formatNumber,
  formatSeconds,
  numView,
  areaViewStage: areaView
}

export function installFilter(Vue) {
  Object.keys(Filters).forEach(key => {
    Vue.filter(key, Filters[key])
  })
}

// 把数组分成成指定长度的新数组 chunk([1, 2, 3, 4, 5], 2); // [[1,2],[3,4],[5]]
export function chunkArr(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  )
}

export function nbUnit(mb, unit = '次', type) {
  const formatData = {}
  if (!mb) {
    formatData.data = 0
    formatData.unit = unit
  }
  if (mb === 0) {
    formatData.data = 0
    formatData.unit = unit
  } else {
    const k = 10000

    const sizes = ['次', '万次', '亿次', '万亿次', '兆次', '万兆次', '亿兆次']

    const i = Math.floor(Math.log(mb) / Math.log(k))
    formatData.data = mb / Math.pow(k, i)
    formatData.unit = sizes[i]
  }
  return formatData
}
