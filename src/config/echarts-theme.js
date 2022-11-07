import Color from './color'

const THEME = {
  color: [
    Color.ColorPrimary,
    Color.ColorGreen,
    Color.ColorYellow,
    Color.ColorOrange,
    Color.ColorRed,
    "#626c91",
    '#3fb1e3',
    '#6be6c1',
    '#626c91',
    '#a0a7e6',
    '#c4ebad',
    '#96dee8'
  ],
  backgroundColor: 'rgba(0,0,0,0)',
  grid: {
    top: 15,
    right: 15,
    bottom: 50,
    left: 100
  },
  line: {
    symbol: 'emptyCircle',
    symbolSize: 3,
    itemStyle: {
      borderWidth: 1
    },
    lineStyle: {
      width: 2
    },
    areaStyle: {
      opacity: 0.3
    }
  },
  categoryAxis: {
    // boundaryGap: false,
    // 轴线
    axisLine: {
      show: true,
      lineStyle: {
        color: Color.BorderColorBase,
        width: 1
      }
    },
    // 刻度
    axisTick: {
      show: false,
    },
    // axisPointer: {
    //   lineStyle: {
    //     color: Color.BorderColorBase
    //   }
    // },
    axisLabel: {
      show: true,
      textStyle: {
        color: Color.ColorTextPecondary
      }
    },
    splitLine: {
      show: false
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: Color.BorderColorBase,
        width: 1
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: Color.ColorTextPecondary
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: Color.BorderColorLighter
      }
    },
    axisTick: {
      show: false
    }
  },
  legend: {
    textStyle: {
      color: '#666'
    }
  },
  tooltip: {
    padding: 8,
    backgroundColor: '#FFF',
    textStyle: {
      color: Color.ColorTextPrimary,
      fontSize: 13,
      lineHeight: 25,
      height: 25
    },
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
  }
}

export default THEME
