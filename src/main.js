import { createApp, ref } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n, { initLocale } from './i18n'

// 创建全局 loading 状态管理（使用 Vue 的 ref，确保响应式）
const loadingState = ref(true)
window.__APP_LOADING__ = loadingState

// 等待所有资源加载完成
async function waitForResources() {
  try {
    // 等待语言初始化
    const resolvedLocale = await initLocale()
    document.title = i18n.global.t('title')
    
    // 等待路由准备就绪（设置超时，避免永久等待）
    await Promise.race([
      router.isReady(),
      new Promise((resolve) => setTimeout(resolve, 2000)) // 2秒超时
    ])
    
    // 等待关键资源加载（图片、字体等）
    await Promise.all([
      // 等待字体加载
      document.fonts.ready.catch(() => {}), // 忽略字体加载错误
      // 等待关键图片预加载（可选）
      new Promise((resolve) => {
        // 给一个最小加载时间，确保动画流畅
        setTimeout(resolve, 800)
      })
    ])
    
    // 额外延迟，让用户看到 loading 动画
    await new Promise(resolve => setTimeout(resolve, 500))
  } catch (error) {
    console.warn('资源加载警告:', error)
    // 即使出错也继续，不阻塞应用启动
  }
}

// 启动应用
async function bootstrap() {
  try {
    // 先创建并挂载应用（确保页面能显示）
    const app = createApp(App)
    app.use(router)
    app.use(i18n)
    app.mount('#app')
    
    // 等待资源加载
    await waitForResources()
    
    // 隐藏 loading（延迟一点让动画更流畅）
    setTimeout(() => {
      loadingState.value = false
    }, 300)
  } catch (error) {
    console.error('应用启动失败:', error)
    // 即使出错也隐藏 loading
    loadingState.value = false
  }
}

// 启动应用
bootstrap()
