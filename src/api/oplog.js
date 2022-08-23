import Axios from 'axios'

async function downloadLog(params) {
  let res
  try {
    res = await Axios({
      url: '/agw/oplog/console/user/oplog/list',
      params: {
        ...params,
        export: 'on'
      },
      responseType: 'blob'
    })
  } catch (e) {
    return
  }

  const blob = new Blob([res.data])
  const fileName = res.headers['content-disposition'].replace('attachment; filename=', '')

  if ('download' in document.createElement('a')) {
    const link = document.createElement('a')
    link.download = fileName
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link)
  } else {
    navigator.msSaveBlob(blob, fileName)
  }
}

function formatTarget(data, map) {
  const list = []
  Object.keys(data).forEach(item => {
    const title = map[item]
    if (title && Array.isArray(data[item])) {
      list.push(`${title}: ` + data[item].join(', '))
    }
  })
  return list
}

export {
  downloadLog,
  formatTarget
}
