import { constantRouterMap } from '@/router'
import { getMenu } from '@/api/login'
const _import = require('@/router/_import_' + process.env.NODE_ENV)

// 异步获取路由并动态化component路径
function generateMenus(menu = [], routes = []) {
  for (let i = 0, l = menu.length; i < l; i++) {
    const item = menu[i]
    item.component = _import(item.component)
    if (item.children && item.children.length) {
      routes.push(item)
      generateMenus(item.children, routes)
    }
  }
  return routes
}
const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GetMenu({ commit }, menuSys) {
      return new Promise((resolve, reject) => {
        getMenu(menuSys)
          .then(res => {
            let accessedRouters = res.data
            accessedRouters = generateMenus(accessedRouters)
            // 404路由处理
            accessedRouters = accessedRouters.concat({ path: '*', redirect: '/404', hidden: true })
            commit('SET_ROUTERS', accessedRouters)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default permission
