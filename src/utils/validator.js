export function validatorNumber(min, max) {
  return function intvalValidate(rule, value, callback) {
    if (!value) callback(new Error())
    if (isNaN(value)) callback(new Error())

    if (min <= value && value <= max) {
      callback()
    } else {
      callback(new Error())
    }
  }
}

export function validatorList(reg, message = '格式错误') {
  function _validator(rule, value, callback) {
    if (!value) callback()
    if (typeof value === 'string') {
      value = value.split(/[\n\r]/g)
      value = value.filter(_ => _)
    } else {
      if (!value[0]) callback(new Error('请填写'))
    }

    value.forEach(item => {
      if (!reg.test(item)) {
        callback(message)
      }
    })
    callback()
  }
  return _validator
}
// 验证器，转入正则，与错误信息
export function validator(reg, message = '格式错误') {
  function _validator(rule, value, callback) {
    if (typeof reg === 'function') {
      if (reg()) {
        callback()
      } else {
        callback(new Error(message))
      }
    } else if (Array.isArray(reg)) {
      if (!reg.some(_ => _.test(value))) callback(new Error(message))
      callback()
    } else {
      if (reg.test(value)) {
        callback()
      } else {
        callback(new Error(message))
      }
    }
  }
  return _validator
}
