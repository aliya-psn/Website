import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getImagePath } from '../i18n/imageResolver'

/**
 * 图片解析 composable
 * 在组件中使用，自动解析图片键名为实际路径
 */
export function useImageResolver() {
  const { locale } = useI18n()

  /**
   * 解析图片路径
   * @param {string} key - 图片键名
   * @returns {string} 图片路径
   */
  const resolveImage = (key) => {
    return getImagePath(key)
  }

  /**
   * 批量解析对象中的图片路径
   * @param {any} data - 需要处理的数据
   * @returns {any} 处理后的数据
   */
  const resolveImages = (data) => {
    if (typeof data === 'string') {
      return resolveImage(data)
    }
    
    if (Array.isArray(data)) {
      return data.map(item => resolveImages(item))
    }
    
    if (data && typeof data === 'object') {
      const resolved = {}
      for (const [key, value] of Object.entries(data)) {
        // 如果是图片相关的字段，尝试解析
        if (typeof value === 'string' && 
            (key.toLowerCase().includes('image') || key === 'videoUrl')) {
          resolved[key] = resolveImage(value)
        } else {
          resolved[key] = resolveImages(value)
        }
      }
      return resolved
    }
    
    return data
  }

  return {
    resolveImage,
    resolveImages,
    locale: computed(() => locale.value)
  }
}
