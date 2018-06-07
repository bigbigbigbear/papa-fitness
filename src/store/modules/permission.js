import {
  constantRouterMap
} from '@/router'
import {
  getBusinessMenu,
  getStadiumMenu
} from '@/api/auth'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

// 异步获取路由并动态化component路径
function generateMenus (menu = []) {
  const routes = menu.filter((item) => {
    item.component = _import(item.component)
    if (item.children && item.children.length) {
      item.children = generateMenus(item.children)
    }
    return true
  })
  return routes
}
const permission = {
  state: {
    businessRouters: constantRouterMap,
    stadiumRouters: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
    },
    SET_BUSINESSROUTERS: (state, routers) => {
      state.businessRouters = constantRouterMap.concat(routers)
    },
    SET_STADIUMROUTERS: (state, routers) => {
      state.stadiumRouters = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GetMenu ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getBusinessMenu()
          .then(res1 => {
            getStadiumMenu()
              .then(res2 => {
                let businessRouters = res1.data
                let stadiumRouters = res2.data
                let accessedRouters = []
                businessRouters = generateMenus(businessRouters)
                stadiumRouters = generateMenus(stadiumRouters)

                accessedRouters = accessedRouters.concat(businessRouters)
                accessedRouters = accessedRouters.concat(stadiumRouters)
                // 404路由处理
                accessedRouters = accessedRouters.concat({
                  path: '*',
                  redirect: '/404',
                  hidden: true
                })
                // console.log(businessRouters, stadiumRouters, accessedRouters)
                commit('SET_BUSINESSROUTERS', businessRouters)
                commit('SET_STADIUMROUTERS', stadiumRouters)
                commit('SET_ROUTERS', accessedRouters)
                resolve()
              })
              .catch(error => {
                reject(error)
              })
          })
      })
    }
  }
}

export default permission
