import { Message } from 'element-ui'

function message(name, err) {
  let type = 'success'
  let message = ''

  switch (name) {
    case 'ACTION_SUCCESS':
      message = '操作成功'
      break

    case 'TASK_SUBMIT':
      message = '任务已提交，请前往任务列表查看任务详情'
      break

    case 'ACTION_ERROR':
      message = '操作失败'
      type = 'error'
      break
  }

  if (err && err.message) {
    message = `${message}: ${err.message}`
  }

  Message[type](message)
}

export default message
