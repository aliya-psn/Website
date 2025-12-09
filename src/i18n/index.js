import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import en from './locales/en.json'
import images from './images.json'
import { resolveLocaleFromIp } from '../utils/ipLocaleResolver'

// 合并图片资源到国际化消息中
const mergeImages = (messages) => {
  return {
    ...messages,
    _images: images
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN', // 初始值
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': mergeImages(zhCN),
    en: mergeImages(en),
  },
})

// 初始化语言：优先本地存储，其次 IP 映射，最后默认中文
export async function initLocale() {
  const saved = sessionStorage.getItem('locale')
  if (saved) {
    i18n.global.locale.value = saved
    return saved
  }
  const ipLocale = await resolveLocaleFromIp()
  i18n.global.locale.value = ipLocale
  sessionStorage.setItem('locale', ipLocale)
  return ipLocale
}

export default i18n

