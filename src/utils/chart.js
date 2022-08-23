import moment from 'moment'
import * as Chart from '@/constants/chart'
import { formatNumber } from '@/utils/filter'

export function handleUnSelectLegend(echarts, columns) {
  echarts.dispatchAction({
    type: 'legendAllSelect'
  })
  echarts.dispatchAction({
    type: 'legendInverseSelect'
  })
}

export function extractData(data) {
  const { trend } = data
  let list = []
  let xData = []
  let unit = ''

  if (trend && trend.y_data && trend.y_data.data && trend.y_data.data.length > 0) {
    list = trend.y_data.data
    xData = trend.x_data
    unit = trend.y_data.unit
  }

  return {
    list,
    xData,
    unit
  }
}

export function formatListDate(data, format = 'YYYY-MM-DD HH:mm:ss') {
  const { x_data = [] } = data
  const { data: yData = [] } = data.y_data

  const rows = x_data.map((date, index) => {
    return {
      date: moment(date, 'YYYY-MM-DD HH:mm:ss').format('M月D日 H:mm'),
      value: yData[index]
    }
  })

  return {
    columns: ['date', 'value'],
    rows
  }
}

export function formatData(data, columns, dateformat = 'M月D日 H:mm') {
  const x_data = data.x_data || []
  const y_data = data.y_data || {
    data: [],
    unit: ''
  }

  const rows = x_data.map((time, index) => {
    return {
      [columns[0]]: moment(time, 'YYYY-MM-DD HH:mm:ss').format(dateformat),
      [columns[1]]: y_data.data[index]
    }
  })
  return {
    columns,
    rows
  }
}
export function formatData2(data, columns, type) {
  const x_data = data.x_data || []
  const y_data = data.y_data || {
    data: [],
    unit: ''
  }
  const rows = x_data.map((time, index) => {
    let new_y_data = 0
    if (type) {
      new_y_data = data[type][index]
    } else {
      new_y_data = y_data[index]
    }
    return {
      [columns[0]]: moment(time, 'YYYY-MM-DD HH:mm:ss').format('M月D日 H:mm'),
      [columns[1]]: new_y_data
    }
  })
  return {
    columns,
    rows
  }
}
export function tooltipAlone(unit) {
  return Object.assign({}, Chart.tooltip_white, {
    formatter: params => {
      const { name, value, seriesName, marker } = params[0]
      let result = name + '<br />'
      const valueFormat = formatNumber(value[1])
      result += `<strong>${marker} ${seriesName} - ${valueFormat} ${unit}</strong>`
      return result
    }
  })
}

export function tooltipMultiple(unit) {
  return Object.assign({}, Chart.tooltip_white, {
    formatter: params => {
      let result = params[0].name
      params.forEach(item => {
        const { value, seriesName, marker } = item
        const valueFormat = formatNumber(value[1])
        result += `<br /><strong>${marker} ${seriesName} - ${valueFormat} ${unit}</strong>`
      })
      return result
    }
  })
}

export function tooltipParent(unit) {
  return Object.assign({}, Chart.tooltip_white, {
    formatter: params => {
      const { name, value, seriesName, marker, data } = params

      if (!data) return
      const values = value.toString().split('.')

      // TODO
      let val
      let parent

      if (values.length === 2) {
        val = values[0]
        parent = values[1].padEnd(4, '0') / 100
      } else {
        val = values[0]
        parent = '0.00'
      }

      let result = name + '<br />'
      const valueFormat = formatNumber(val)
      result += `<strong>${marker} ${seriesName}：${valueFormat} ${unit}（${parent}%）</strong>`
      return result
    }
  })
}

export function tooltipParentPie(unit) {
  return {
    formatter: params => {
      const { name, value, marker, percent } = params
      let result = name + '<br />'
      const valueFormat = formatNumber(value)
      result += `<strong>${marker} ${valueFormat} ${unit}（${percent}%）</strong>`
      return result
    }
  }
}
