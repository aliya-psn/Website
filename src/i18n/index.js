import { createI18n } from 'vue-i18n'
// 动态导入语言文件，避免同步加载所有语言
import en from './locales/en.json'
import images from './images.json'
import images_local from './images_local.json'
// import { resolveLocaleFromIp } from '../utils/ipLocaleResolver'

// 合并图片资源到国际化消息中
const mergeImages = (messages) => {
  return {
    ...messages,
    _images: images_local // 这里通过替换图片资源为本地图片资源
  }
}

// 语言文件加载器（按需加载）
const localeLoaders = {
  'en': () => Promise.resolve(en),
  'zh-CN': () => import('./locales/zh-CN.json').then(m => m.default)
}

const i18n = createI18n({
  legacy: false,
  locale: 'en', // 初始值
  fallbackLocale: 'en',
  messages: {
    'en': mergeImages(en), // 默认语言同步加载
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
  
  return 'en'
}

// 初始化语言：优先本地存储，否则默认英文
export async function initLocale() {
  const saved = sessionStorage.getItem('locale')
  if (saved) {
    await loadLocale(saved)
    i18n.global.locale.value = saved
    return saved
  }
  // 默认使用英文
  i18n.global.locale.value = 'en'
  sessionStorage.setItem('locale', 'en')
  return 'en'
  
  // 以下代码已注释：根据 IP 自动切换语言
  // const ipLocale = await resolveLocaleFromIp()
  // await loadLocale(ipLocale)
  // i18n.global.locale.value = ipLocale
  // sessionStorage.setItem('locale', ipLocale)
  // return ipLocale
}

export default i18n

