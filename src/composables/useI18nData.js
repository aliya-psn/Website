import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { resolveImages } from '../i18n/imageResolver'

/**
 * 获取国际化数据的 composable
 * 直接从当前语言的 message 中返回对象，避免 t() 对对象路径的限制
 * 自动解析图片键名为实际路径
 */
export function useI18nData() {
  const { t, locale, messages } = useI18n()

  // 当前语言的所有 message
  const currentMessages = computed(() => {
    const lang = locale.value
    return messages.value?.[lang] || {}
  })

  // 获取完整的数据源，自动解析图片路径
  const dataSource = computed(() => {
    const data = currentMessages.value || {}
    return resolveImages(data)
  })

  // 获取产品数据，自动解析图片路径
  const productData = computed(() => {
    const data = currentMessages.value.product || {}
    return resolveImages(data)
  })

  // 切换语言
  const changeLocale = (lang) => {
    locale.value = lang
    localStorage.setItem('locale', lang)
    // 更新页面标题
    document.title = t('title')
  }

  return {
    t,
    locale,
    dataSource,
    productData,
    changeLocale
  }
}

