/**
 * author Bear 18/05/21
 * 过滤器
 */
/**
 * Created by bear on 18/05/01.
 */
// 时间格式化
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{M}-{d} {h}:{m}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    w: date.getDay()
  }
  const time_str = format.replace(/{(y|M|d|h|m|s|w)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'w') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 时间格式化
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

// 状态格式化
export function compare(status, type) {
  let result = ''
  const _type = type || 1
  if (status === 1) {
    switch (_type) {
      case 1:
        result = '有效' // 状态
        break
      case 2:
        result = '是' // 状态
        break
      case 3:
        result = '男' // 性别 1男 2女
        break
      default:
        result = '进账' // 账单
        break
    }
  } else if (status === 0) {
    switch (_type) {
      case 1:
        result = '无效'
        break
      case 2:
        result = '否'
        break
      default:
        result = '出账'
        break
    }
  } else {
    switch (_type) {
      case 3:
        result = '女'
        break
      default:
        result = '--'
        break
    }
  }
  return result
}

// 格式化数据类型，字符串转数字
export function stringToNumber(str) {
  str = str === '' ? '' : parseInt(str)
  return str
}
