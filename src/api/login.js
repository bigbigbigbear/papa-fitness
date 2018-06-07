import request from '@/utils/request'

/**
 * 登录
 * @param {account} 用户名
 * @param {password} 密码
 */
export function login (params) {
  return request({
    url: '/business/account/login',
    method: 'post',
    data: params
  })
}

export function getInfo (params) {
  return request({
    url: '/admin/account/get',
    method: 'post',
    data: params
  })
}

export function tokenGet (params) {
  return request({
    url: '/token',
    method: 'get',
    params
  })
}

// 获取角色的菜单
export function getMenu (params) {
  return request({
    url: '/business/account/getMenu',
    method: 'post',
    data: params
  })
}
