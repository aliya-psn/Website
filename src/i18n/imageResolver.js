import i18n from './index.js'

/**
 * 图片路径解析工具
 * 根据键名从 images.json 中获取实际的图片路径
 * 
 * @param {string} key - 图片键名，支持点号分隔的路径，如 "home.backgroundImage1"
 * @returns {string} 图片路径
 * 
 * @example
 * getImagePath('home.backgroundImage1') // => "/src/assets/home/4.png"
 * getImagePath('product.default') // => "/src/assets/product/3.png"
 */
export function getImagePath(key) {
  if (!key) return ''
  
  // 如果已经是完整路径（以 http:// 或 https:// 或 / 开头），直接返回
  if (key.startsWith('http://') || key.startsWith('https://') || key.startsWith('/')) {
    return key
  }
  
  // 从 i18n 实例中获取图片资源
  try {
    const currentLocale = i18n.global.locale.value
    const messages = i18n.global.messages.value || i18n.global.messages
    const images = messages[currentLocale]?._images
    
    if (!images) {
      console.warn(`Images not found for locale: ${currentLocale}`)
      return key
    }
    
    // 按点号分割键名，逐层访问
    const keys = key.split('.')
    let result = images
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k]
      } else {
        console.warn(`Image key not found: ${key}`)
        return key
      }
    }
    
    return typeof result === 'string' ? result : key
  } catch (error) {
    console.error('Error resolving image path:', error)
    return key
  }
}

/**
 * 批量解析图片路径
 * 递归处理对象中的所有图片键名
 * 
 * @param {any} data - 需要处理的数据（对象、数组等）
 * @returns {any} 处理后的数据
 */
export function resolveImages(data) {
  // 跳过 _images 字段（这是图片资源本身，不需要解析）
  if (data && typeof data === 'object' && data._images) {
    const { _images, ...rest } = data
    const resolved = { _images, ...resolveImages(rest) }
    return resolved
  }
  
  if (typeof data === 'string') {
    // 如果字符串看起来像键名（不包含路径分隔符且不是URL），尝试解析
    if (!data.includes('/') && !data.startsWith('http') && !data.startsWith('https')) {
      return getImagePath(data)
    }
    return data
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
        resolved[key] = getImagePath(value)
      } else {
        resolved[key] = resolveImages(value)
      }
    }
    return resolved
  }
  
  return data
}
