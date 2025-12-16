<!-- 时间轴布局组件 -->
<template>
  <div class="min-h-screen pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- 背景装饰：粒子效果 -->
    <ParticleBackground />
    
    <div class="max-w-[90rem] mx-auto px-2 sm:px-3 md:px-4 py-6 sm:py-8 md:py-12 lg:py-16 relative z-10">
      <!-- 小屏幕：顶部横向时间轴 -->
      <div class="lg:hidden mb-6 sm:mb-8">
        <div class="overflow-x-auto scrollbar-hide -mx-3 sm:-mx-4 px-3 sm:px-4">
          <div class="flex items-center gap-4 sm:gap-6 min-w-max">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="flex-shrink-0 cursor-pointer group"
              @click="$emit('switch', index)"
            >
              <div class="flex flex-col items-center gap-2">
                <!-- 圆点 -->
                <div
                  class="w-3 h-3 rounded-full transition-all duration-300"
                  :class="currentIndex === index
                    ? 'bg-white scale-125'
                    : 'bg-gray-500 group-hover:bg-gray-400'"
                ></div>
                <!-- 标签文字 -->
                <span
                  class="text-xs sm:text-sm font-medium text-white transition-all duration-300 whitespace-nowrap"
                  :class="currentIndex === index
                    ? 'opacity-100'
                    : 'opacity-60 group-hover:opacity-100'"
                >
                  {{ getLabel(item) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8">
        <!-- 大屏幕：左侧时间轴 -->
        <div class="hidden lg:flex lg:col-span-2 flex-col items-start lg:justify-center lg:h-[700px]">
          <div class="relative flex flex-col items-start w-full">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="relative z-10 mb-8 lg:mb-12 cursor-pointer group w-full"
              @click="$emit('switch', index)"
            >
              <div class="flex items-center relative">
                <!-- 横线 -->
                <div
                  class="h-0.5 transition-all duration-300 origin-left"
                  :class="currentIndex === index
                    ? 'bg-white w-8'
                    : 'bg-gray-500 w-6 group-hover:w-8'"
                ></div>
                
                <!-- 标签文字 -->
                <span
                  class="ml-3 text-base font-light text-white transition-all duration-300 whitespace-nowrap"
                  :class="currentIndex === index
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'"
                >
                  {{ getLabel(item) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 内容区域 -->
        <div class="lg:col-span-10 relative">
          <div class="relative min-h-[400px] sm:min-h-[500px] md:h-[600px] lg:h-[700px]">
            <Transition
              :name="animationDirection"
              mode="out-in"
            >
              <div
                :key="currentIndex"
                class="absolute inset-0"
              >
                <slot :item="currentItem" :index="currentIndex" />
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 滚动提示 - 仅在桌面端显示 -->
    <div 
      v-if="showScrollHint"
      class="hidden lg:flex absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 scroll-hint flex-col items-center gap-2"
    >
      <!-- 向上箭头 -->
      <svg 
        class="w-3 h-3 sm:w-4 sm:h-4 text-white scroll-arrow-up" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
      
      <!-- 提示文字 -->
      <span class="text-white text-xs sm:text-sm font-medium">向下滚动查看</span>
      
      <!-- 向下箭头 -->
      <svg 
        class="w-3 h-3 sm:w-4 sm:h-4 text-white scroll-arrow-down" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ParticleBackground from './ParticleBackground.vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  currentIndex: {
    type: Number,
    required: true
  },
  animationDirection: {
    type: String,
    default: 'slide-forward'
  },
  labelKey: {
    type: String,
    default: 'year' // 默认使用 year，也可以是 'title' 等
  }
})

const emit = defineEmits(['switch'])

const currentItem = computed(() => {
  return props.items[props.currentIndex] || {}
})

const getLabel = (item) => {
  if (typeof item === 'string') return item
  return item[props.labelKey] || item.title || item.year || ''
}

// 是否显示滚动提示（不在最后一项时显示）
const showScrollHint = computed(() => {
  return props.currentIndex < props.items.length - 1
})
</script>

<style scoped>
/* 隐藏滚动条但保持滚动功能 */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scroll-hint {
  animation: fadeInUp 0.6s ease-out;
}

.scroll-arrow-up {
  animation: bounceUp 1.5s ease-in-out infinite;
}

.scroll-arrow-down {
  animation: bounceDown 1.5s ease-in-out infinite;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes bounceUp {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

@keyframes bounceDown {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(4px);
    opacity: 1;
  }
}
</style>
