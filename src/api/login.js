import request from '@/utils/request'

export function login(username, password) {
  return request({
    baseURL: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin',
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    baseURL: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin',
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

// 获取角色的菜单
export function getMenu(menu_sys) {
  return request({
    url: '/admin/auth/getMenu',
    method: 'post',
    data: {
      menu_sys
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function logout() {
  return request({
    baseURL: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin',
    url: '/user/logout',
    method: 'post'
  })
}
