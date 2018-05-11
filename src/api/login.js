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

export function logout() {
  return request({
    baseURL: 'https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin',
    url: '/user/logout',
    method: 'post'
  })
}
