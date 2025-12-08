// 根据 IP API 返回的完整数据决定语言；未命中则返回默认中文
function matchLocaleByData(data) {
  if (!data) return 'zh-CN'

  console.log('获取 IP 信息', data)

  // 兼容 ipapi.co 和 ipwho.is 的字段
  const country =
    (data.country_code || data.country || '').toString().toUpperCase()
  const languages = (data.languages || '').toString().toLowerCase() // 可能是 "en-US,es-US,haw,fr"

  // 国家优先
  const englishCountries = ['US', 'GB', 'AU', 'CA', 'NZ', 'SG']
  if (englishCountries.includes(country)) return 'en'

  // 语言字段包含 en 则用英文
  if (languages.includes('en')) return 'en'

  // 其他情况默认中文
  return 'zh-CN'
}

/**
 * 获取用户 IP，并根据映射规则返回 locale。失败时回退为中文。
 */
export async function resolveLocaleFromIp() {
  try {
    // 尝试 ipapi.co，失败再尝试 ipwho.is
    const endpoints = ['https://ipapi.co/json/', 'https://ipwho.is/']
    for (const url of endpoints) {
      try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`ip fetch failed: ${url}`)
        const data = await res.json()
        console.log('[i18n] 获取 IP 信息', url, data)
        const locale = matchLocaleByData(data)
        if (locale) return locale
      } catch (e) {
        console.warn('[i18n] IP 请求失败，尝试下一个', url, e)
      }
    }
    // 全部失败走回退
    return 'zh-CN'
  } catch (err) {
    console.warn('[i18n] 获取 IP 失败，返回中文', err)
    return 'zh-CN'
  }
}

