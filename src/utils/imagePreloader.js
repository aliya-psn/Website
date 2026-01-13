/**
 * 图片预加载工具
 * 用于优化图片加载性能
 */

// 预加载的图片缓存
const preloadedImages = new Map()

// DNS预连接缓存
const preconnectedDomains = new Set()

/**
 * DNS预连接，提前建立连接以加快图片加载
 * @param {string} url - 图片URL
 */
export function preconnectDomain(url) {
  if (!url || typeof url !== 'string') return
  
  try {
    const urlObj = new URL(url)
    const domain = `${urlObj.protocol}//${urlObj.host}`
    
    // 如果已经预连接过，跳过
    if (preconnectedDomains.has(domain)) return
    
    // 创建preconnect link
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
    
    // 同时添加dns-prefetch作为降级方案
    const dnsLink = document.createElement('link')
    dnsLink.rel = 'dns-prefetch'
    dnsLink.href = domain
    document.head.appendChild(dnsLink)
    
    preconnectedDomains.add(domain)
  } catch (e) {
    // URL解析失败，忽略
  }
}

/**
 * 预加载单个图片
 * @param {string|Promise<string>} src - 图片路径或Promise
 * @param {Object} options - 选项
 * @returns {Promise<string>} 解析后的图片URL
 */
export async function preloadImage(src, options = {}) {
  if (!src) return ''
  
  // 如果是Promise，先解析
  const resolvedSrc = src instanceof Promise ? await src : src
  
  if (!resolvedSrc || typeof resolvedSrc !== 'string') return resolvedSrc
  
  // 检查缓存
  if (preloadedImages.has(resolvedSrc)) {
    return preloadedImages.get(resolvedSrc)
  }
  
  // DNS预连接
  if (resolvedSrc.startsWith('http://') || resolvedSrc.startsWith('https://')) {
    preconnectDomain(resolvedSrc)
  }
  
  return new Promise((resolve, reject) => {
    // 如果图片已经在浏览器缓存中，直接返回
    const img = new Image()
    
    img.onload = () => {
      preloadedImages.set(resolvedSrc, resolvedSrc)
      resolve(resolvedSrc)
    }
    
    img.onerror = () => {
      // 即使加载失败也缓存，避免重复尝试
      preloadedImages.set(resolvedSrc, resolvedSrc)
      reject(new Error(`Failed to preload image: ${resolvedSrc}`))
    }
    
    // 设置crossOrigin以支持CORS
    if (resolvedSrc.startsWith('http://') || resolvedSrc.startsWith('https://')) {
      img.crossOrigin = 'anonymous'
    }
    
    img.src = resolvedSrc
  })
}

/**
 * 批量预加载图片
 * @param {Array<string|Promise<string>>} sources - 图片路径数组
 * @param {Object} options - 选项
 * @returns {Promise<string[]>} 解析后的图片URL数组
 */
export async function preloadImages(sources, options = {}) {
  if (!Array.isArray(sources) || sources.length === 0) return []
  
  const { concurrency = 3 } = options
  
  // 并发控制预加载
  const results = []
  for (let i = 0; i < sources.length; i += concurrency) {
    const batch = sources.slice(i, i + concurrency)
    const batchResults = await Promise.allSettled(
      batch.map(src => preloadImage(src, options))
    )
    results.push(...batchResults.map(r => r.status === 'fulfilled' ? r.value : ''))
  }
  
  return results.filter(Boolean)
}

/**
 * 使用link rel="prefetch"预取图片（低优先级）
 * @param {string} url - 图片URL
 */
export function prefetchImage(url) {
  if (!url || typeof url !== 'string') return
  
  // 检查是否已经预取过
  const existingLink = document.querySelector(`link[rel="prefetch"][href="${url}"]`)
  if (existingLink) return
  
  const link = document.createElement('link')
  link.rel = 'prefetch'
  link.as = 'image'
  link.href = url
  document.head.appendChild(link)
}

/**
 * 使用link rel="preload"预加载图片（高优先级）
 * @param {string} url - 图片URL
 */
export function preloadImageLink(url) {
  if (!url || typeof url !== 'string') return
  
  // 检查是否已经预加载过
  const existingLink = document.querySelector(`link[rel="preload"][href="${url}"]`)
  if (existingLink) return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = url
  document.head.appendChild(link)
}
