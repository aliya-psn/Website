<!-- 起源 -->
<template>
  <TimelineLayout
    :items="originList"
    :current-index="currentIndex"
    :animation-direction="animationDirection"
    label-key="title"
    @switch="switchToIndex"
  >
    <template #default="{ item: currentSlide }">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center h-full">
        <!-- 左侧：圆形图片 -->
        <div class="flex justify-center lg:justify-start order-2 lg:order-1">
          <div class="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem]">
            <div class="absolute inset-0 rounded-full bg-white/20 blur-3xl animate-pulse-slow"></div>
            <div class="absolute inset-0 rounded-full bg-white/10 blur-2xl"></div>
            <LazyImage
              :src="currentSlide.image || originData.image || ''"
              :alt="currentSlide.title"
              container-class="relative w-full h-full rounded-full overflow-hidden"
              :image-class="`w-full h-full object-cover ${currentSlide.objectPosition || 'object-center'} rounded-full shadow-2xl ring-2 sm:ring-4 ring-white/20`"
            />
            <div class="absolute -inset-2 sm:-inset-4 rounded-full bg-white/5 blur-xl"></div>
          </div>
        </div>

        <!-- 右侧：文本内容 -->
        <div class="flex flex-col justify-center space-y-4 sm:space-y-6 relative order-1 lg:order-2">
          <div class="absolute -top-4 -right-4 sm:-top-10 sm:-right-10 text-white/10 text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold select-none pointer-events-none z-0 overflow-hidden">
            {{ currentSlide.title }}
          </div>
          
          <div class="relative z-10">
            <div class="mb-4 sm:mb-6">
              <span class="text-lg sm:text-xl md:text-2xl font-medium text-white/80">
                {{ originData.subtitle }}
              </span>
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-1 sm:mt-2 inline-block border-b-2 border-white/30 pb-1 sm:pb-2">
                {{ currentSlide.title }}
              </h1>
            </div>
            
            <div class="space-y-3 sm:space-y-4">
              <p
                v-for="(paragraph, index) in formattedDescription(currentSlide)"
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

// 导航栏控制，保持与发展历程页一致
const navBarControl = inject('navBarControl', null)

// 起源主体数据
const originData = computed(() => {
  return dataSource.value.origin || {
    title: 'Origin',
    subtitle: '',
    description: [],
    image: ''
  }
})

// 起源列表，使用 title 作为时间轴节点
const originList = computed(() => {
  const list = dataSource.value.originHistory
  if (Array.isArray(list)) return list
  return list ? [list] : []
})

const currentIndex = ref(0)
const animationDirection = ref('slide-forward')

const switchToIndex = (index) => {
  if (index === currentIndex.value) return
  animationDirection.value = index > currentIndex.value ? 'slide-forward' : 'slide-backward'
  currentIndex.value = index
}

// 格式化描述文本
const formattedDescription = (slide) => {
  const desc = slide?.description
  if (Array.isArray(desc)) return desc
  return desc ? String(desc).split('\n').map(s => s.trim()).filter(Boolean) : []
}

// 使用滚动处理 composable
useTimelineScroll({
  onSwitch: (direction) => {
    const newIndex = direction > 0 
      ? currentIndex.value + 1 
      : currentIndex.value - 1
    if (newIndex >= 0 && newIndex < originList.value.length) {
      switchToIndex(newIndex)
    }
  },
  canSwitchNext: () => currentIndex.value < originList.value.length - 1,
  canSwitchPrev: () => currentIndex.value > 0
})

onMounted(() => {
  if (navBarControl) {
    navBarControl.showNavBar()
  }
})
</script>

