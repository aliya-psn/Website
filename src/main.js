import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n, { initLocale } from './i18n'

// 启动应用前确定语言
const resolvedLocale = await initLocale()
document.title = i18n.global.t('title')

createApp(App).use(router).use(i18n).mount('#app')
