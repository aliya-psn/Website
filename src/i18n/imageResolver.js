import i18n from './index.js'

// 按需加载 assets 下的静态资源，避免预加载所有图片导致性能问题
// 使用 eager: false 实现懒加载，只有在实际使用时才加载图片
// 注意：eager: false 时，assetModules[key] 是一个函数，需要调用才能获取资源
const assetModules = import.meta.glob('../assets/**/*', {
  eager: false,
  import: 'default'
})

// 缓存已解析的图片路径，避免重复解析
const resolvedPathCache = new Map()

/**
 * 将类似 /src/assets/xxx.png 的路径转换为构建后可访问的资源 URL
 * 使用动态导入实现按需加载
 * @param {string} path
 * @returns {string|Promise<string>} 返回路径字符串或 Promise
 */
function resolveAssetPath(path) {
  if (!path || typeof path !== 'string') return ''

  // 检查缓存
  if (resolvedPathCache.has(path)) {
    return resolvedPathCache.get(path)
  }

  // 仅处理以 /src/assets/ 开头的路径
  const prefix = '/src/assets/'
  if (path.startsWith(prefix)) {
    const relativePath = path.slice(prefix.length) // 例如 home/4.png
    const moduleKey = `../assets/${relativePath}`   // 与 glob key 匹配
    const moduleLoader = assetModules[moduleKey]
    
    if (moduleLoader) {
      // eager: false 时，moduleLoader 是一个函数
      // 返回一个 Promise，在 LazyImage 组件中处理异步加载
      const loadPromise = Promise.resolve(moduleLoader()).then(module => {
        const resolved = module?.default || module || path
        resolvedPathCache.set(path, resolved)
        return resolved
      }).catch(error => {
        console.warn(`Failed to load asset: ${moduleKey}`, error)
        return path
      })
      
      // 将 Promise 缓存，避免重复加载
      resolvedPathCache.set(path, loadPromise)
      return loadPromise
    } else {
      console.warn(`Asset not found in glob: ${moduleKey}`)
    }
  }

  return path
}

/**
 * 图片路径解析工具
 * 根据键名从 images.json 中获取实际的图片路径
 * 注意：由于使用按需加载，返回的可能是 Promise，需要在组件中处理
 * 
 * @param {string} key - 图片键名，支持点号分隔的路径，如 "home.backgroundImage"
 * @returns {string|Promise<string>} 图片路径或 Promise
 * 
 * @example
 * getImagePath('home.backgroundImage') // => Promise<string> 或 string
 * getImagePath('product.x') // => Promise<string> 或 string
 */
export function getImagePath(key) {
  if (!key) return ''
  
  // http/https 的 URL 直接返回；根路径但非 /src/assets 也直接返回
  if (key.startsWith('http://') || key.startsWith('https://')) {
    return key
  }
  if (key.startsWith('/') && !key.startsWith('/src/assets/')) {
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
    
    if (typeof result === 'string') {
      return resolveAssetPath(result)
    }
    return key
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
    if (!data.includes('/') && !data.startsWith('http') && !data.startsWith('https') && (data.includes('image') || data.includes('Image'))) {
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
