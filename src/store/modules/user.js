import { login, tokenGet } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      const params = {
        account: userInfo.username,
        password: userInfo.password
      }
      return new Promise((resolve, reject) => {
        tokenGet({}).then(res => {
          const token = res
          setToken(token)
          commit('SET_TOKEN', token)
          login(params).then(response => {
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        const params = {
          account: 'ppfs',
          password: 'admin'
        }
        login(params).then(response => {
          const data = {
            roles: ['admin']
          }
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', 'bear')
          commit('SET_AVATAR', 'https://s1.ax1x.com/2018/05/29/C4fsC4.png')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({ commit }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
