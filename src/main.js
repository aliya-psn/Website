import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import dataSource from './data/data.json'

// 设置页面标题
document.title = dataSource.title

createApp(App).use(router).mount('#app')
