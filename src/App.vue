<template>
  <!-- 导航栏 - 固定在顶部，isNavBarVisible控制是否隐藏导航 -->
  <NavBar :isVisible="isNavBarVisible" />

  <!-- 路由视图 -->
  <router-view />

  <!-- 底部备案说明 - 所有页面都显示 -->
  <Footer :footerData="dataSource.footer" />
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import dataSource from './data/data.json'

const isNavBarVisible = ref(true)
let lastScrollTop = 0
let scrollTimeout = null
let isProgrammaticScroll = false // 标志：是否正在执行程序化滚动
const SCROLL_THRESHOLD = 5 // 滚动阈值，避免微小滚动触发切换
const HIDE_NAVBAR_THRESHOLD = 80 // 距离顶部超过xpx才隐藏导航栏

// 提供控制 NavBar 显示/隐藏的方法给子组件
const hideNavBar = () => {
  isNavBarVisible.value = false
}

const showNavBar = () => {
  isNavBarVisible.value = true
}

// 设置程序化滚动标志
const setProgrammaticScroll = (value) => {
  isProgrammaticScroll = value
}

provide('navBarControl', {
  hideNavBar,
  showNavBar,
  setProgrammaticScroll
})

// 监听滚动事件，判断滚动方向
const handleScroll = () => {
  // 如果正在执行程序化滚动，暂时不处理自动显示逻辑，防止点击设置导航隐藏影响了滑动
  if (isProgrammaticScroll) {
    lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
    return
  }
  
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
  
  // 清除之前的定时器
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  
  // 如果距离顶部小于等于xpx，始终显示导航栏
  if (currentScrollTop <= HIDE_NAVBAR_THRESHOLD) {
    isNavBarVisible.value = true
    lastScrollTop = currentScrollTop
    return
  }
  
  // 计算滚动距离，只有当距离顶部超过xpx时，才根据滚动方向隐藏/显示导航栏
  const scrollDifference = Math.abs(currentScrollTop - lastScrollTop)

  // 只有当滚动距离超过阈值时才判断方向
  if (scrollDifference > SCROLL_THRESHOLD) {
    if (currentScrollTop > lastScrollTop) {
      // 向下滚动 - 隐藏导航栏
      isNavBarVisible.value = false
    } else if (currentScrollTop < lastScrollTop) {
      // 向上滚动 - 显示导航栏
      isNavBarVisible.value = true
    }
    lastScrollTop = currentScrollTop
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

<style scoped>
</style>
