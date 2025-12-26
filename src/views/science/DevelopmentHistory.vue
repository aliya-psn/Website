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
            class="absolute inset-0 lg:relative w-full h-full min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-0 lg:w-[20rem] lg:h-[20rem] xl:w-[24rem] xl:h-[24rem] 2xl:w-[28rem] 2xl:h-[28rem] bg-cover bg-no-repeat rounded-full"
            :style="getImageStyle(currentData)"
          >
          </div>
        </div>

        <!-- 右侧：文本内容 -->
        <div class="flex flex-col justify-center space-y-4 sm:space-y-6 relative order-1 lg:order-2">
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

// 获取背景图片 - 使用当前项的 image
const backgroundImage = computed(() => {
  const currentItem = historyList.value[currentIndex.value]
  if (currentItem?.image) {
    return resolveImage(currentItem.image)
  }
  // 如果没有 image，使用默认的
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

// 获取图片样式，包括背景图片和位置
const getImageStyle = (data) => {
  if (!data?.image) return {}
  
  const style = {
    backgroundImage: `url(${resolveImage(data.image)})`
  }
  
  // 如果有 objectPosition，转换为 backgroundPosition
  if (data.objectPosition) {
    let position = data.objectPosition
    
    // 移除 object- 前缀
    position = position.replace(/^object-/, '')
    
    // 处理自定义值格式：[50%_20%] -> 50% 20%
    if (position.startsWith('[') && position.endsWith(']')) {
      position = position.slice(1, -1).replace(/_/g, ' ')
    } else {
      // 处理 Tailwind 预设值映射
      const positionMap = {
        'left': 'left center',
        'right': 'right center',
        'top': 'center top',
        'bottom': 'center bottom',
        'center': 'center center',
        'left-top': 'left top',
        'left-bottom': 'left bottom',
        'right-top': 'right top',
        'right-bottom': 'right bottom'
      }
      position = positionMap[position] || position
    }
    
    style.backgroundPosition = position
  } else {
    // 默认居中
    style.backgroundPosition = 'center'
  }
  
  return style
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



