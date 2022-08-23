export function arrToSelect(arr = []) {
  return arr.map(_ => {
    return {
      label: _,
      value: _
    }
  })
}

export function formatObjToList(data) {
  const list = []
  Object.keys(data).forEach(value => {
    list.push({
      label: data[value],
      value
    })
  })
  return list
}

function countItem(list, value) {
  let count = 0
  const item = []
  for (const key of value) {
    if (list.has(key)) {
      count++
      item.push(key)
    }
  }
  return count === list.size ? 'all' : item
}

export function formatRegionView(value, selectRegionMap) {
  value = new Set(value)
  const valueMap = new Map()
  Object.keys(selectRegionMap).forEach(key => {
    const itemValue = countItem(selectRegionMap[key], value)
    if (itemValue) valueMap.set(key, itemValue)
  })

  filterContinent(valueMap, selectRegionMap)

  return valueMap
}

function filterContinent(value, regionMap) {
  const valueAll = new Set()
  for (const [key, val] of value) {
    if (val === 'all') valueAll.add(key)
  }

  const CONTINENT_LIST = ['CN', 'ASIA', 'AMERICA', 'EUROPE', 'AFRICA', 'OCEANIA']
  Object.keys(regionMap).forEach(key => {
    if (CONTINENT_LIST.includes(key)) {
      const item = regionMap[key]
      const itemValue = countItem(item, valueAll)
      if (itemValue === 'all') {
        for (const name of item) value.delete(name)
        value.set(key, 'all')
      }
    }
  })
}
