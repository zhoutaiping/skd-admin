import Color from '../../src/utils/color'

export default {
  color: [Color.colorPrimary, Color.colorGreen, Color.colorPick, Color.colorOrange, Color.colorRed],
  backgroundColor: 'rgba(0,0,0,0)',
  textStyle: {},
  title: {
    textStyle: {
      color: '#333333'
    },
    subtextStyle: {
      color: '#93b7e3'
    }
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: '2'
      }
    },
    lineStyle: {
      normal: {
        width: '2'
      }
    },
    symbolSize: '6',
    symbol: 'none',
    smooth: true
  },
  radar: {
    itemStyle: {
      normal: {
        borderWidth: '2'
      }
    },
    lineStyle: {
      normal: {
        width: '2'
      }
    },
    symbolSize: '6',
    symbol: 'emptyCircle',
    smooth: true
  },
  candlestick: {
    itemStyle: {
      normal: {
        color: '#edafda',
        color0: 'transparent',
        borderColor: '#d680bc',
        borderColor0: '#8fd3e8',
        borderWidth: '2'
      }
    }
  },
  graph: {
    itemStyle: {
      normal: {
        borderWidth: 0,
        borderColor: '#999'
      }
    },
    lineStyle: {
      normal: {
        width: 1,
        color: '#aaaaaa'
      }
    },
    symbolSize: '6',
    symbol: 'emptyCircle',
    smooth: true,
    color: ['#0d64d0', '#4e8cd8', '#19be6b', '#cbb0e3', '#a5e7f0'],
    label: {
      normal: {
        textStyle: {
          color: '#eeeeee'
        }
      }
    }
  },
  map: {
    itemStyle: {
      normal: {
        areaColor: '#f3f3f3',
        borderColor: '#516b91',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(165,231,240,1)',
        borderColor: '#516b91',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#000000'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(81,107,145)'
        }
      }
    }
  },
  geo: {
    itemStyle: {
      normal: {
        areaColor: '#f3f3f3',
        borderColor: '#516b91',
        borderWidth: 0.5
      },
      emphasis: {
        areaColor: 'rgba(165,231,240,1)',
        borderColor: '#516b91',
        borderWidth: 1
      }
    },
    label: {
      normal: {
        textStyle: {
          color: '#000000'
        }
      },
      emphasis: {
        textStyle: {
          color: 'rgb(81,107,145)'
        }
      }
    }
  },
  categoryAxis: {
    boundaryGap: false,
    axisLine: {
      // 轴线
      show: true,
      lineStyle: {
        color: Color.colorLightGreySS
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
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
      }
    }
  },
  valueAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: Color.colorLightGreySS
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
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
      }
    }
  },
  logAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
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
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
      }
    }
  },
  timeAxis: {
    axisLine: {
      show: true,
      lineStyle: {
        color: '#333'
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
    },
    splitArea: {
      show: false,
      areaStyle: {
        color: ['rgba(250,250,250,0.05)', 'rgba(200,200,200,0.02)']
      }
    }
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
    padding: 12,
    trigger: 'axis',
    // backgroundColor: '#FFF',
    // borderColor: Color.colorDarkGrey,
    // borderWidth: 1,
    // textStyle: {
    //   color: Color.colorDarkGrey
    // },
    axisPointer: {
      lineStyle: {
        color: Color.colorLightGrey,
        width: '1'
      },
      crossStyle: {
        color: '#008acd',
        width: '1'
      }
    }
  },
  timeline: {
    lineStyle: {
      color: '#8fd3e8',
      width: 1
    },
    itemStyle: {
      normal: {
        color: '#8fd3e8',
        borderWidth: 1
      },
      emphasis: {
        color: '#8fd3e8'
      }
    },
    controlStyle: {
      normal: {
        color: '#8fd3e8',
        borderColor: '#8fd3e8',
        borderWidth: 0.5
      },
      emphasis: {
        color: '#8fd3e8',
        borderColor: '#8fd3e8',
        borderWidth: 0.5
      }
    },
    checkpointStyle: {
      color: '#8fd3e8',
      borderColor: 'rgba(138,124,168,0.37)'
    },
    label: {
      normal: {
        textStyle: {
          color: '#8fd3e8'
        }
      },
      emphasis: {
        textStyle: {
          color: '#8fd3e8'
        }
      }
    }
  },
  visualMap: {
    color: ['#0a4b9d', '#0d64d0', '#4e8cd8']
  },
  dataZoom: {
    backgroundColor: 'rgba(0,0,0,0)',
    dataBackgroundColor: 'rgba(255,255,255,0.3)',
    fillerColor: 'rgba(167,183,204,0.4)',
    handleColor: '#a7b7cc',
    handleSize: '100%',
    textStyle: {
      color: '#333333'
    }
  },
  markPoint: {
    label: {
      normal: {
        textStyle: {
          color: '#eeeeee'
        }
      },
      emphasis: {
        textStyle: {
          color: '#eeeeee'
        }
      }
    }
  }
}
