import Color from '@/utils/color'

const tooltip_white = {
  padding: 8,
  trigger: 'axis',
  backgroundColor: 'rgb(255, 255, 255, .95)',
  textStyle: {
    color: Color.colorLightGrey,
    fontSize: 12,
    lineHeight: 25,
    height: 25
  },
  extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3)'
}

export { tooltip_white }
