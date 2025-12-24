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
            class="absolute inset-0 lg:relative w-full h-full min-h-[24rem] sm:min-h-[28rem] md:min-h-[32rem] lg:min-h-0 lg:w-48 lg:h-48 sm:lg:w-64 sm:lg:h-64 md:lg:w-80 md:lg:h-80 lg:w-[28rem] lg:h-[28rem]"
          >
          </div>
        </div>

        <!-- 右侧：文本内容 -->
        <div
          class="flex flex-col justify-center space-y-4 sm:space-y-6 relative order-1 lg:order-2"
        >
          <!-- <div
            class="absolute -top-4 -right-4 sm:-top-10 sm:-right-10 text-white/10 text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold select-none pointer-events-none z-0 overflow-hidden"
          >
            {{ currentSlide.title }}
          </div> -->

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

            <div class="space-y-2 sm:space-y-3 mt-4 sm:mt-6">
              <p
                v-for="(paragraph, index) in formattedDescription(currentSlide)"
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

