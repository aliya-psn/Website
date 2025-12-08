import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * 获取国际化数据的 composable
 * 直接从当前语言的 message 中返回对象，避免 t() 对对象路径的限制
 */
export function useI18nData() {
  const { t, locale, messages } = useI18n()

  // 当前语言的所有 message
  const currentMessages = computed(() => {
    const lang = locale.value
    return messages.value?.[lang] || {}
  })

  // 获取完整的数据源
  const dataSource = computed(() => currentMessages.value || {})

  // 获取产品数据
  const productData = computed(() => currentMessages.value.product || {})

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

