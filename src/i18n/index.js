import { createI18n } from 'vue-i18n'
// 动态导入语言文件，避免同步加载所有语言
import zhCN from './locales/zh-CN.json'
import images from './images.json'
import { resolveLocaleFromIp } from '../utils/ipLocaleResolver'

// 合并图片资源到国际化消息中
const mergeImages = (messages) => {
  return {
    ...messages,
    _images: images
  }
}

// 语言文件加载器（按需加载）
const localeLoaders = {
  'zh-CN': () => Promise.resolve(zhCN),
  'en': () => import('./locales/en.json').then(m => m.default)
}

const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN', // 初始值
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': mergeImages(zhCN), // 默认语言同步加载
  },
})

// 动态加载语言文件
export async function loadLocale(locale) {
  if (i18n.global.availableLocales.includes(locale)) {
    return locale
  }
  
  const loader = localeLoaders[locale]
  if (loader) {
    const messages = await loader()
    i18n.global.setLocaleMessage(locale, mergeImages(messages))
    return locale
  }
  
  return 'zh-CN'
}

// 初始化语言：优先本地存储，其次 IP 映射，最后默认中文
export async function initLocale() {
  const saved = sessionStorage.getItem('locale')
  if (saved) {
    await loadLocale(saved)
    i18n.global.locale.value = saved
    return saved
  }
  const ipLocale = await resolveLocaleFromIp()
  await loadLocale(ipLocale)
  i18n.global.locale.value = ipLocale
  sessionStorage.setItem('locale', ipLocale)
  return ipLocale
}

export default i18n

