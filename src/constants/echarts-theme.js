import Color from '../utils/color'

const THEME = {
  color: ['#3fb1e3'],
  backgroundColor: 'rgba(0,0,0,0)',
  grids: [0, 0, 0, 0],
  line: {
    symbol: 'none',
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
    boundaryGap: false,
    axisLine: {
      // 轴线
      show: true,
      lineStyle: {
        color: Color.colorLightGreySS,
        width: 1
      }
    },
    axisTick: {
      // 刻度
      show: true,
      length: 6,
      lineStyle: {
        color: Color.colorLightGreySS
      }
    },
    axisPointer: {
      lineStyle: {
        color: Color.colorLightGreyS
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#999999'
      }
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: ['#eeeeee']
      }
    }
    // splitArea: {
    //   show: false,
    //   areaStyle: {
    //     color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
    //   }
    // }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: Color.colorLightGreySS,
        width: 1
      }
    },
    axisTick: {
      show: false,
      lineStyle: {
        color: '#333'
      }
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#999999'
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#eeeeee']
      }
    }
    // splitArea: {
    //   show: false,
    //   areaStyle: {
    //     color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
    //   }
    // }
  },
  toolbox: {
    iconStyle: {
      normal: {
        borderColor: '#999999'
      },
      emphasis: {
        borderColor: '#666666'
      }
    }
  },
  legend: {
    textStyle: {
      color: '#666'
    }
  },
  tooltip: {
    padding: 8,
    // trigger: 'axis',
    backgroundColor: '#FFF',
    textStyle: {
      color: Color.colorLightGrey,
      fontSize: 13,
      lineHeight: 25,
      height: 25
    },
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
  }
}

export default THEME
