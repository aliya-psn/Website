<!-- 时间轴布局组件 -->
<template>
  <div 
    class="h-screen pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 relative overflow-hidden flex flex-col"
    :style="{
      background: 'linear-gradient(to bottom right, #111827, #1f2937, #111827)'
    }"
  >
    <!-- 背景图片层，带过渡效果 -->
    <Transition name="background-fade" mode="out-in">
      <div
        v-if="backgroundImage"
        :key="backgroundImage"
        class="absolute inset-0 z-0 background-image-layer"
        :style="{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }"
      ></div>
    </Transition>
    
    <!-- 背景遮罩层，确保文字可读性 -->
    <div class="absolute inset-0 bg-black/66 z-0 timeline-overlay"></div>
    
    <div class="w-full max-w-[calc(100%-min(12vw,8rem))] mx-auto px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 2xl:px-12 flex-1 flex flex-col relative z-10">
      <!-- 小屏幕：顶部横向时间轴 -->
      <div class="lg:hidden mb-4 sm:mb-6 flex-shrink-0">
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

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-6 xl:gap-8 2xl:gap-10 flex-1 min-h-0">
        <!-- 大屏幕：左侧时间轴 -->
        <div class="hidden lg:flex lg:col-span-2 flex-col items-start justify-center h-full">
          <div class="relative flex flex-col items-start w-full">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="relative z-10 mb-6 lg:mb-8 cursor-pointer group w-full"
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
        <div class="lg:col-span-10 relative h-full min-h-0">
          <div class="relative h-full">
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
      class="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
    >
      <div class="scroll-hint flex flex-col items-center gap-2">
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
        <span class="text-white text-xs sm:text-sm font-medium whitespace-nowrap">{{ t('common.scrollDownHint') }}</span>
        
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
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

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
  },
  backgroundImage: {
    type: String,
    default: ''
  },
  hasCircleCutout: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['switch'])

const { t } = useI18n()

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
  will-change: transform, opacity;
  animation: fadeInUp 0.6s ease-out forwards;
}

.scroll-arrow-up {
  animation: bounceUp 1.5s ease-in-out infinite;
}

.scroll-arrow-down {
  animation: bounceDown 1.5s ease-in-out infinite;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
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

/* 背景图片过渡动画 */
.background-image-layer {
  transition: opacity 0.8s ease-in-out;
}

.background-fade-enter-active,
.background-fade-leave-active {
  transition: opacity 0.8s ease-in-out;
}

.background-fade-enter-from {
  opacity: 0;
}

.background-fade-enter-to {
  opacity: 1;
}

.background-fade-leave-from {
  opacity: 1;
}

.background-fade-leave-to {
  opacity: 0;
}
</style>
