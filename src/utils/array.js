// 用于图表数据最大值推荐
export function markMax(arr, size, add = 0) {
  arr = arr.filter(_ => _ > 0)
  let max = Math.max(...arr)
  max = Math.ceil(max / size) * size + size * add

  return max || undefined
}

export function compare(property) {
  return function(a, b) {
    const value1 = a[property]
    const value2 = b[property]
    return value1 - value2
  }
}

export function maxSection(
  value,
  list = [
    1.2,
    1.5,
    2,
    2.5,
    3,
    4,
    5,
    8,
    10,
    15,
    20,
    30,
    40,
    50,
    75,
    100,
    150,
    200,
    300,
    400,
    500,
    750,
    1000
  ]
) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (value < item) {
      return item
    }
  }
  return value
}

export function maxFormat(value, size, add = 0) {
  value = Math.ceil(value / size) * size + size * add
  return value || undefined
}
// 判断是否是数组
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export function vPagination(arr, page, size) {
  const start = (page - 1) * size
  const end = page * size
  return arr.slice(start, end)
}
// 判断数组中是否有重复值
export function isRepeat(arr) {
  if (!isArray(arr)) {
    console.warn('[arr] must be array')
    return
  }
  const set = new Set(arr)
  return set.size !== arr.length
}
// 数组正则判断
export function arrTest(arr, reg, split) {
  if (split) arr = arr.split(',')
  if (!isArray(arr)) {
    console.warn('[arr] must be array')
    return
  }
  let ret = true
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (!reg.test(item)) {
      ret = false
    }
  }
  return ret
}
// 数组转排序对象
export function arrToSortObj(arr) {
  const obj = {}
  let i = 0
  arr.forEach(item => {
    obj[item] = i
    i++
  })
  return obj
}

export function arrRemove(arr, item) {
  const index = arr.indexOf(item)
  if (index > -1) {
    arr.splice(index, 1)
  }
  return arr
}

export function createArr(length) {
  return Array.from(
    {
      length
    },
    (v, k) => k
  )
}

export function arraySum(arr) {
  if (arr.length === 0) return 0
  return arr.reduce((prev, curr, idx, arr) => {
    return prev + curr
  })
}

export function arrayIsEqual(arr1, arr2) {
  // 判断2个数组是否相等
  if (arr1 === arr2) {
    return true
  } else {
    if (arr1.length !== arr2.length) {
      return false
    } else {
      // 长度相同
      for (const i in arr1) {
        if (arr1[i] !== arr2[i]) {
          return false
        }
      }
      return true
    }
  }
}

export function arrayDedupe(array) {
  return Array.from(new Set(array))
}

export function arrayRange(min, max) {
  const arr = []
  for (let i = min; i <= max; i++) {
    arr.push(i)
  }
  return arr
}

export function randomOne(arr) {
  return arr[Math.floor((Math.random() * arr.length))]
}

export function getAllChildNodes(list = [], key = 'value') {
  const arr = list.map(_ => _[key])
  list.forEach(item => {
    if (item.children && Array.isArray(item.children)) {
      arr.push(...getAllChildNodes(item.children))
    }
  })
  return arr
}
