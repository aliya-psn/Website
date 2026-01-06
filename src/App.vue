<template>
  <!-- 应用初始化 Loading -->
  <AppLoading 
    :visible="isLoading" 
    :brand-text="loadingBrandText"
  />

  <!-- 导航栏 - 固定在顶部，isNavBarVisible控制是否隐藏导航 -->
  <NavBar :isVisible="isNavBarVisible" />

  <!-- 路由视图 -->
  <router-view />

  <!-- 底部备案说明 - 根据路由 meta 判断是否显示 -->
  <Footer v-if="showFooter" :footerData="dataSource.footer" />

  <!-- 屏幕尺寸调试工具 - 仅在开发环境显示 -->
  <div
    v-if="showBreakpointDebug"
    class="fixed bottom-4 right-4 z-[9999] bg-black/80 backdrop-blur-sm text-white text-xs font-mono p-3 rounded-lg shadow-lg border border-white/20"
  >
    <div class="space-y-1">
      <div class="flex items-center gap-2">
        <span class="text-white/60">屏幕尺寸:</span>
        <span class="font-bold">{{ screenWidth }} × {{ screenHeight }}px</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-white/60">当前断点:</span>
        <span
          class="font-bold px-2 py-0.5 rounded"
          :class="currentBreakpointClass"
        >
          {{ currentBreakpoint }}
        </span>
      </div>
      <div class="mt-2 pt-2 border-t border-white/20 text-[10px] text-white/50">
        <div>sm: ≥640px</div>
        <div>md: ≥900px</div>
        <div>lg: ≥1200px</div>
        <div>xl: ≥1600px</div>
        <div>2xl: ≥2000px</div>
        <div>3xl: ≥2560px</div>
      </div>
    </div>
    <button
      @click="showBreakpointDebug = false"
      class="absolute top-1 right-1 text-white/60 hover:text-white text-lg leading-none"
      title="关闭"
    >
      ×
    </button>
  </div>
</template>

<script setup>
import { ref, provide, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import AppLoading from './components/AppLoading.vue'
import { useI18nData } from './composables/useI18nData'

const { dataSource } = useI18nData()
const route = useRoute()
const { t } = useI18n()

// Loading 状态 - 从全局状态获取（如果全局状态是 ref，直接使用；否则创建本地 ref）
const isLoading = window.__APP_LOADING__ || ref(true)

// 如果全局状态不存在，3秒后自动隐藏 loading（防止永久显示）
if (!window.__APP_LOADING__) {
  setTimeout(() => {
    isLoading.value = false
  }, 3000)
}

// Loading 品牌文字
const loadingBrandText = computed(() => {
  return 'FANTASYCARE'
})

const isNavBarVisible = ref(true)
let lastScrollTop = 0
let scrollTimeout = null
let isProgrammaticScroll = false // 标志：是否正在执行程序化滚动
let isScrollDisabled = false // 标志：是否禁用滚动监听（用于特殊页面）
const SCROLL_THRESHOLD = 5 // 滚动阈值，避免微小滚动触发切换
const HIDE_NAVBAR_THRESHOLD = 80 // 距离顶部超过xpx才隐藏导航栏

// 屏幕尺寸调试工具
const showBreakpointDebug = ref(import.meta.env.DEV) // 开发环境默认显示
const screenWidth = ref(window.innerWidth)
const screenHeight = ref(window.innerHeight)

// Tailwind 默认断点
const breakpoints = {
  sm: 640,
  md: 900,
  lg: 1200,
  xl: 1600,
  '2xl': 2000,
  '3xl': 2560
}

// 计算当前激活的断点
const currentBreakpoint = computed(() => {
  const width = screenWidth.value
  if (width >= breakpoints['3xl']) return '3xl'
  if (width >= breakpoints['2xl']) return '2xl'
  if (width >= breakpoints.xl) return 'xl'
  if (width >= breakpoints.lg) return 'lg'
  if (width >= breakpoints.md) return 'md'
  if (width >= breakpoints.sm) return 'sm'
  return 'base'
})

// 当前断点的样式类
const currentBreakpointClass = computed(() => {
  const bp = currentBreakpoint.value
  const classes = {
    base: 'bg-gray-600',
    sm: 'bg-blue-600',
    md: 'bg-green-600',
    lg: 'bg-yellow-600',
    xl: 'bg-orange-600',
    '2xl': 'bg-red-600',
    '3xl': 'bg-purple-600'
  }
  return classes[bp] || 'bg-gray-600'
})

// 监听窗口大小变化
const handleResize = () => {
  screenWidth.value = window.innerWidth
  screenHeight.value = window.innerHeight
}

// 根据路由 meta 判断是否显示 Footer
const showFooter = computed(() => {
  return !route.meta?.hideFooter
})

// 根据路由 meta 判断是否禁用滚动监听
watch(() => route.meta?.fullscreen, (fullscreen) => {
  isScrollDisabled = !!fullscreen
  if (fullscreen) {
    // 全屏页面始终显示导航栏
    isNavBarVisible.value = true
  }
}, { immediate: true })

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
  // 如果禁用滚动监听（全屏页面），直接返回
  if (isScrollDisabled) {
    return
  }
  
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
  window.addEventListener('resize', handleResize, { passive: true })
  // 初始化屏幕尺寸
  handleResize()
  
  // 开发环境下，按 Ctrl+Shift+B 切换调试面板显示
  if (import.meta.env.DEV) {
    const toggleDebug = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'B') {
        e.preventDefault()
        showBreakpointDebug.value = !showBreakpointDebug.value
      }
    }
    window.addEventListener('keydown', toggleDebug)
    onUnmounted(() => {
      window.removeEventListener('keydown', toggleDebug)
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

<style scoped>
</style>
