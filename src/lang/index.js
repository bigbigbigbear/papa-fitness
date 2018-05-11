import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from './en'
import zhLocale from './zh-CN'

Vue.use(VueI18n)

const messages = {
  'en': {
    ...enLocale,
    ...elementEnLocale // 将我们项目中的语言包与Element的语言包进行合并
  },
  'zh-CN': {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: localStorage.getItem('language') || 'zh-CN', // 设置语言,组件中切换语言 this.$i18n.locale = 'en';localStorage.setItem('language','en')
  messages // set locale messages
})

export default i18n
