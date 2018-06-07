import request from '@/utils/request'

// 获取场馆设置-场馆列表
export function getSdiumList(param) {
  return request({
    url: '/business/gym/gymList',
    method: 'post',
    data: param
  })
}

// 添加场馆
export function addStadium(param) {
  return request({
    url: '/business/gym/gymAdd',
    method: 'post',
    data: param
  })
}

// 删除场馆
export function delStadium(param) {
  return request({
    url: '/business/gym/gymDelete',
    method: 'post',
    data: param
  })
}
