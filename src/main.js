import Vue from 'vue'
import 'normalize.css/normalize.css' // 通用的CSS重置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // element主题
import i18n from './lang' // 国际化语言包
import '@/themes/orange/index.css' // 覆盖element主题，由element主题工具生成
import '@/styles/index.scss' // 全局 css

import '@/themes/orange/area-select.css' // 省市区插件样式
import VueAreaLinkage from 'vue-area-linkage' // 省市區插件

import App from './App'
import router from './router' // 路由
import store from './store' // vuex状态管理

import '@/icons' // svg-icon
import '@/permission' // 权限控制

Vue.use(ElementUI, {
  size: 'small', // 设置element-ui默认尺寸
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueAreaLinkage)

Vue.config.devtools = true
Vue.config.debug = true
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {
    App
  }
})
