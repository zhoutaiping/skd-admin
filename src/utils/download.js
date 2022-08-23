import Axios from 'axios'

export async function downloadUrl(options) {
  let res
  try {
    res = await Axios(options)
  } catch (e) {
    return
  }
  const blob = new Blob([res.data])
  const fileName = 'export.xls'
  // res.headers['content-disposition'].replace('attachment; filename=', '')
  // console.log(fileName)
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
