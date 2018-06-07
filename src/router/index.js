import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV) // 生产环境使用路由懒加载，开发环境懒加载热更新很慢
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;

Vue.use(Router)

/* Layout */
import BusinessLayout from '../views/businessLayout/Layout'
import StadiumLayout from '../views/stadiumLayout/Layout'

/**
* hidden: true                   如果 `hidden:true` 将不会显示侧边菜单
* alwaysShow: true               如果没有二级菜单，设置为false
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
  path: '/login',
  name: 'Login',
  component: _import('login/index'),
  hidden: true
},
{
  path: '/404',
  name: 'NotFound',
  component: _import('404'),
  hidden: true
},
{
  path: '/',
  component: BusinessLayout,
  redirect: '/business/home',
  name: 'BHome',
  hidden: true,
  children: [
    {
      path: 'business/home',
      name: 'BusinessHome',
      component: _import('businessHome/index'),
      meta: {
        title: '商户首页'
      }
    }
  ]
},
{
  path: '/stadium',
  component: StadiumLayout,
  redirect: '/stadium/home',
  name: 'SHome',
  hidden: true,
  children: [
    {
      path: 'home',
      name: 'StadiumHome',
      component: _import('stadiumHome/index'),
      meta: {
        title: '场馆首页'
      }
    }
  ]
}
]
// 实例化vue的时候只挂载constantRouter
export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [
  // no layout
  // {
  //   path: '/401',
  //   component: _import('errorPage/401')
  // },

  // // has layout
  // {
  //   path: '/documentation',
  //   // 你可以选择不同的layout组件
  //   component: Layout,

  //   // 这里开始对应的路由都会显示在app-main中 如上图所示
  //   children: [{
  //     path: 'index',
  //     component: _import('documentation/index'),
  //     name: 'documentation'
  //   }]
  // }
]
