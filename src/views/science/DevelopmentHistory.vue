<!-- 发展历程 -->
<template>
  <TimelineLayout
    :items="historyList"
    :current-index="currentIndex"
    :animation-direction="animationDirection"
    label-key="year"
    @switch="switchToYear"
  >
    <template #default="{ item: currentData }">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center h-full">
        <!-- 左侧：圆形图片 - 带发光效果 -->
        <div class="flex justify-center lg:justify-start order-2 lg:order-1">
          <div class="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem]">
            <!-- 发光效果 -->
            <div class="absolute inset-0 rounded-full bg-white/20 blur-3xl animate-pulse-slow"></div>
            <div class="absolute inset-0 rounded-full bg-white/10 blur-2xl"></div>
            <LazyImage
              :src="currentData.image"
              :alt="currentData.title"
              container-class="relative w-full h-full rounded-full overflow-hidden"
              :image-class="`w-full h-full object-cover ${currentData.objectPosition || 'object-center'} rounded-full shadow-2xl ring-2 sm:ring-4 ring-white/20`"
            />
            <!-- 外圈光晕 -->
            <div class="absolute -inset-2 sm:-inset-4 rounded-full bg-white/5 blur-xl"></div>
          </div>
        </div>

        <!-- 右侧：文本内容 -->
        <div class="flex flex-col justify-center space-y-4 sm:space-y-6 relative order-1 lg:order-2">
          <!-- 背景年份 -->
          <div class="absolute -top-4 -right-4 sm:-top-10 sm:-right-10 text-white/10 text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-bold select-none pointer-events-none z-0">
            {{ currentData.year }}
          </div>
          
          <div class="relative z-10">
            <!-- 年份和标题 -->
            <div class="mb-4 sm:mb-6">
              <span class="text-lg sm:text-xl md:text-2xl font-elegant font-medium text-white/80">
                {{ currentData.year }}
              </span>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-white mt-1 sm:mt-2 inline-block border-b-2 border-white/30 pb-1 sm:pb-2">
                {{ currentData.title }}
              </h1>
            </div>
            
            <!-- 正文 -->
            <div class="space-y-3 sm:space-y-4">
              <p
                v-for="(paragraph, index) in currentData.description"
                :key="index"
                class="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-light"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </TimelineLayout>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useI18nData } from '../../composables/useI18nData'
import { useTimelineScroll } from '../../composables/useTimelineScroll'
import TimelineLayout from '../../components/TimelineLayout.vue'
import LazyImage from '../../components/LazyImage.vue'
import '../../styles/timelineStyles.css'

const { dataSource } = useI18nData()

// 获取导航栏控制方法，确保导航栏始终显示
const navBarControl = inject('navBarControl', null)

// 获取发展历程数据列表
const historyList = computed(() => {
  const history = dataSource.value.developmentHistory
  if (Array.isArray(history)) {
    return history
  }
  return history ? [history] : []
})

// 当前索引
const currentIndex = ref(0)

// 动画方向
const animationDirection = ref('slide-forward')

// 切换年份
const switchToYear = (index) => {
  if (index === currentIndex.value) return
  
  // 判断动画方向
  if (index > currentIndex.value) {
    animationDirection.value = 'slide-forward' // 年份增加：左上到右下
  } else {
    animationDirection.value = 'slide-backward' // 年份减少：右下到左上
  }
  
  currentIndex.value = index
}

// 使用滚动处理 composable
useTimelineScroll({
  onSwitch: (direction) => {
    const newIndex = direction > 0 
      ? currentIndex.value + 1 
      : currentIndex.value - 1
    if (newIndex >= 0 && newIndex < historyList.value.length) {
      switchToYear(newIndex)
    }
  },
  canSwitchNext: () => currentIndex.value < historyList.value.length - 1,
  canSwitchPrev: () => currentIndex.value > 0
})

onMounted(() => {
  // 确保导航栏始终显示
  if (navBarControl) {
    navBarControl.showNavBar()
  }
})
</script>


