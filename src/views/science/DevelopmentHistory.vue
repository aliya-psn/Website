<!-- 发展历程 -->
<template>
  <TimelineLayout
    :items="historyList"
    :current-index="currentIndex"
    :animation-direction="animationDirection"
    label-key="year"
    :background-image="backgroundImage"
    :has-circle-cutout="true"
    @switch="switchToYear"
  >
    <template #default="{ item: currentData }">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center h-full">
        <!-- 左侧：占位区域，圆形区域由 TimelineLayout 的遮罩层处理 -->
        <div class="flex justify-center lg:justify-start order-2 lg:order-1 relative w-full lg:w-auto">
          <div
            class="absolute inset-0 lg:relative w-full h-full min-h-[24rem] sm:min-h-[28rem] md:min-h-[32rem] lg:min-h-0 lg:w-48 lg:h-48 sm:lg:w-64 sm:lg:h-64 md:lg:w-80 md:lg:h-80 lg:w-[28rem] lg:h-[28rem]"
          >
          </div>
        </div>

        <!-- 右侧：文本内容 -->
        <div class="flex flex-col justify-center space-y-4 sm:space-y-6 relative order-1 lg:order-2">
          <!-- 背景年份 -->
          <!-- <div class="absolute -top-8 left-0 sm:-top-16 sm:left-0 text-white/10 text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-medium select-none pointer-events-none z-0">
            {{ currentData.shortYear || currentData.year }}
          </div> -->
          
          <div class="relative z-10">
            <!-- 年份和标题 -->
            <div class="mb-4 sm:mb-6 flex flex-col">
              <span class="text-lg sm:text-xl md:text-2xl font-medium text-white/80">
                {{ currentData.year }}
              </span>
              <h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white mt-1 sm:mt-2">
                {{ currentData.title }}
              </h1>
              <div class="w-10 sm:w-12 h-0.5 bg-white/30 mt-4 sm:mt-5"></div>
            </div>

            <!-- 正文 -->
            <div class="space-y-2 sm:space-y-3 mt-4 sm:mt-6 max-w-sm">
              <p
                v-for="(paragraph, index) in currentData.description"
                :key="index"
                class="text-xs sm:text-sm md:text-base text-white/80 leading-normal font-light"
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
import { useImageResolver } from '../../composables/useImageResolver'
import { useTimelineScroll } from '../../composables/useTimelineScroll'
import TimelineLayout from '../../components/TimelineLayout.vue'
import '../../styles/timelineStyles.css'

const { dataSource } = useI18nData()
const { resolveImage } = useImageResolver()

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

// 获取背景图片
const backgroundImage = computed(() => {
  return resolveImage('menu.scienceAnalysis.developmentHistory')
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



