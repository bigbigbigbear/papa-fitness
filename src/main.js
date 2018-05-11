import Vue from 'vue'
import 'normalize.css/normalize.css' // 通用的CSS重置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './lang' // 国际化语言包
import '@/styles/index.scss' // 全局 css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // svg-icon
import '@/permission' // 权限控制

Vue.use(ElementUI, {
  size: 'medium', // 设置element-ui默认尺寸
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.devtools = true
Vue.config.debug = true
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
