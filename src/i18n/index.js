import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import en from './locales/en.json'
import { resolveLocaleFromIp } from '../utils/ipLocaleResolver'

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN', // 初始值，稍后会根据 IP 或 localStorage 覆盖
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    en,
  },
})

// 初始化语言：优先本地存储，其次 IP 映射，最后默认中文
export async function initLocale() {
  const saved = localStorage.getItem('locale')
  if (saved) {
    i18n.global.locale.value = saved
    return saved
  }
  const ipLocale = await resolveLocaleFromIp()
  i18n.global.locale.value = ipLocale
  localStorage.setItem('locale', ipLocale)
  return ipLocale
}

export default i18n

