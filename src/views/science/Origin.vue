<!-- 起源 -->
<template>
  <TimelineLayout
    :items="originList"
    :current-index="currentIndex"
    :animation-direction="animationDirection"
    label-key="title"
    :background-image="backgroundImage"
    :has-circle-cutout="true"
    @switch="switchToIndex"
  >
    <template #default="{ item: currentSlide }">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center h-full"
      >
        <!-- 左侧：占位区域，圆形区域由 TimelineLayout 的遮罩层处理 -->
        <div class="flex justify-center lg:justify-start order-2 lg:order-1 relative w-full lg:w-auto">
          <div
            class="absolute inset-0 lg:relative w-full h-full min-h-[20rem] sm:min-h-[24rem] md:min-h-[28rem] lg:min-h-0 lg:w-[20rem] lg:h-[20rem] xl:w-[24rem] xl:h-[24rem] 2xl:w-[28rem] 2xl:h-[28rem] bg-cover bg-no-repeat rounded-full"
            :style="getImageStyle(currentSlide)"
          >
          </div>
        </div>

        <!-- 右侧：文本内容 -->
        <div
          class="flex flex-col justify-center space-y-4 sm:space-y-6 relative order-1 lg:order-2"
        >
          <div class="relative z-10">
            <div class="mb-4 sm:mb-6">
              <span
                class="text-lg sm:text-xl md:text-2xl font-medium text-white/80"
              >
                {{ originData.subtitle }}
              </span>
              <h1
                class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mt-1 sm:mt-2"
              >
                {{ currentSlide.title }}
              </h1>
              <div class="w-10 sm:w-12 h-0.5 bg-white/30 mt-4 sm:mt-5"></div>
            </div>

            <span
              class="text-lg sm:text-xl md:text-2xl font-medium text-white/80 max-w-md sm:max-w-lg md:max-w-xl block"
            >
              {{ currentSlide.subtitle }}
            </span>

            <div class="mt-4 sm:mt-6">
              <p
                class="text-xs sm:text-sm md:text-base text-white/80 leading-normal font-light whitespace-pre-line"
              >
                {{ currentSlide?.description }}
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

// 导航栏控制，保持与发展历程页一致
const navBarControl = inject('navBarControl', null)

// 起源主体数据
const originData = computed(() => {
  return (
    dataSource.value.origin || {
      title: '',
      subtitle: '',
      description: [],
      image: '',
    }
  )
})

// 起源列表，使用 title 作为时间轴节点
const originList = computed(() => {
  const list = dataSource.value.originHistory
  if (Array.isArray(list)) return list
  return list ? [list] : []
})

// 获取背景图片 - 使用当前项的 image
const backgroundImage = computed(() => {
  const currentItem = originList.value[currentIndex.value]
  if (currentItem?.image) {
    return resolveImage(currentItem.image)
  }
  // 如果没有 image，使用默认的
  return resolveImage('menu.scienceAnalysis.origin')
})

const currentIndex = ref(0)
const animationDirection = ref('slide-forward')

const switchToIndex = (index) => {
  if (index === currentIndex.value) return
  animationDirection.value =
    index > currentIndex.value ? 'slide-forward' : 'slide-backward'
  currentIndex.value = index
}

// 格式化描述文本
const formattedDescription = (slide) => {
  const desc = slide?.description
  if (Array.isArray(desc)) return desc
  return desc
    ? String(desc)
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean)
    : []
}

// 获取图片样式，包括背景图片和位置
const getImageStyle = (slide) => {
  if (!slide?.image) return {}
  
  const style = {
    backgroundImage: `url(${resolveImage(slide.image)})`
  }
  
  // 如果有 objectPosition，转换为 backgroundPosition
  if (slide.objectPosition) {
    let position = slide.objectPosition
    
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
    const newIndex =
      direction > 0 ? currentIndex.value + 1 : currentIndex.value - 1
    if (newIndex >= 0 && newIndex < originList.value.length) {
      switchToIndex(newIndex)
    }
  },
  canSwitchNext: () => currentIndex.value < originList.value.length - 1,
  canSwitchPrev: () => currentIndex.value > 0,
})

onMounted(() => {
  if (navBarControl) {
    navBarControl.showNavBar()
  }
})
</script>

