import { createApp, ref } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n, { initLocale, loadLocale } from './i18n'

// 创建全局 loading 状态管理
const loadingState = ref(true)
window.__APP_LOADING__ = loadingState

// 等待所有资源加载完成，异步执行，不阻塞页面渲染
async function waitForResources() {
  try {
    // 初始化语言（优先使用缓存，否则默认英文）
    await initLocale()
    document.title = i18n.global.t('title')
    
    // 以下代码已注释：根据 IP 自动切换语言
    // const saved = sessionStorage.getItem('locale')
    // if (saved) {
    //   // 先加载语言文件，再设置 locale
    //   await loadLocale(saved)
    //   i18n.global.locale.value = saved
    //   document.title = i18n.global.t('title')
    // } else {
    //   // 异步获取 IP 语言
    //   const localePromise = initLocale()
    //   const localeTimeout = new Promise((resolve) => setTimeout(() => resolve('en'), 800)) // 0.8秒超时
    //   const resolvedLocale = await Promise.race([localePromise, localeTimeout])
    //   document.title = i18n.global.t('title')
    // }
    
    // 等待路由准备
    await Promise.race([
      router.isReady(),
      new Promise((resolve) => setTimeout(resolve, 500)) // 0.5秒超时
    ])
    
    // 最小加载时间（确保动画流畅，但不阻塞）
    await new Promise((resolve) => {
      setTimeout(resolve, 200) 
    })
  } catch (error) {
    console.warn('资源加载警告:', error)
  }
}

// 启动应用
async function bootstrap() {
  const startTime = performance.now()
  
  try {
    // 创建并挂载应用
    const app = createApp(App)
    app.use(router)
    app.use(i18n)
    app.mount('#app')
    
    const mountTime = performance.now() - startTime
    console.log(`[性能] 应用挂载耗时: ${mountTime.toFixed(2)}ms`)
    
    // 异步等待资源加载
    waitForResources().then(() => {
      const totalTime = performance.now() - startTime
      console.log(`[性能] 总加载耗时: ${totalTime.toFixed(2)}ms`)
      // 资源加载完成后隐藏 loading
      setTimeout(() => {
        loadingState.value = false
      }, 100)
    }).catch(() => {
      loadingState.value = false
    })
    
    // 设置最大等待时间，确保loading隐藏
    setTimeout(() => {
      if (loadingState.value) {
        console.warn('[性能] 加载超时，强制隐藏 loading')
        loadingState.value = false
      }
    }, 2000)
  } catch (error) {
    console.error('应用启动失败:', error)
    loadingState.value = false
  }
}

// 启动应用
bootstrap()
