import request from '@/utils/request'

// 获取角色商户端菜单
export function getBusinessMenu () {
  return request({
    url: '/business/account/getMenu',
    method: 'post',
    data: {}
  })
}

// 获取角色营业端菜单
export function getStadiumMenu () {
  return request({
    url: '/home/account/getMenu',
    method: 'post',
    data: {}
  })
}

