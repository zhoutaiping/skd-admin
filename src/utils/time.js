import moment from 'moment'

export function isExpire(time, source = 'YYYY-MM-DD HH:mm:ss') {
  return !moment(time, source).format('x') > Date.now()
}
