<!-- 时间轴布局组件 -->
<template>
  <div class="h-screen pt-20 md:pt-24 relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- 背景装饰：粒子效果 -->
    <ParticleBackground />
    
    <div class="max-w-[90rem] mx-auto px-2 md:px-6 py-12 md:py-16 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <!-- 左侧：时间轴 -->
        <div class="lg:col-span-2 flex flex-col items-center lg:items-start -ml-2 lg:ml-0">
          <div class="relative flex flex-col items-center lg:items-start w-full">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="relative z-10 mb-8 lg:mb-12 cursor-pointer group w-full"
              @click="$emit('switch', index)"
            >
              <div class="flex items-center relative pl-2 lg:pl-0">
                <!-- 横线 -->
                <div
                  class="h-0.5 transition-all duration-300 origin-left"
                  :class="currentIndex === index
                    ? 'bg-white w-12 lg:w-16'
                    : 'bg-gray-500 w-6 lg:w-8 group-hover:w-10 lg:group-hover:w-12'"
                ></div>
                
                <!-- 标签文字 -->
                <span
                  class="ml-3 lg:ml-4 text-sm md:text-base font-medium text-white transition-all duration-300 whitespace-nowrap"
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

        <!-- 右侧：内容区域 -->
        <div class="lg:col-span-10 relative">
          <div class="relative h-[600px] md:h-[700px]">
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
    
    <!-- 滚动提示 -->
    <div 
      v-if="showScrollHint"
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 scroll-hint flex flex-col items-center gap-2"
    >
      <!-- 向上箭头 -->
      <svg 
        class="w-4 h-4 text-white scroll-arrow-up" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
      
      <!-- 提示文字 -->
      <span class="text-white text-sm font-medium">向下滚动查看</span>
      
      <!-- 向下箭头 -->
      <svg 
        class="w-4 h-4 text-white scroll-arrow-down" 
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
