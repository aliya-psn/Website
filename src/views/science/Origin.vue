<!-- 起源 -->
<template>
  <div class="h-screen pt-20 md:pt-24 relative overflow-hidden bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- 背景装饰：粒子效果 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute inset-0 particle-background particle-layer-1"></div>
      <div class="absolute inset-0 particle-background particle-layer-2"></div>
    </div>
    
    <div class="max-w-[90rem] mx-auto px-2 md:px-6 py-12 md:py-16 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <!-- 左侧：时间轴，使用标题作为节点 -->
        <div class="lg:col-span-2 flex flex-col items-center lg:items-start -ml-2 lg:ml-0">
          <div class="relative flex flex-col items-center lg:items-start w-full">
            <div
              v-for="(item, index) in originList"
              :key="index"
              class="relative z-10 mb-8 lg:mb-12 cursor-pointer group w-full"
              @click="switchToIndex(index)"
            >
              <div class="flex items-center relative pl-2 lg:pl-0">
                <div
                  class="h-0.5 transition-all duration-300 origin-left"
                  :class="currentIndex === index
                    ? 'bg-white w-12 lg:w-16'
                    : 'bg-gray-500 w-6 lg:w-8 group-hover:w-10 lg:group-hover:w-12'"
                ></div>
                
                <span
                  class="ml-3 lg:ml-4 text-sm md:text-base font-medium text-white transition-all duration-300 whitespace-nowrap"
                  :class="currentIndex === index
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0'"
                >
                  {{ item.title }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- 右侧：内容区域，与发展历程保持一致的切换动画 -->
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
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center h-full">
                  <!-- 左侧：圆形图片 -->
                  <div class="flex justify-center lg:justify-start">
                    <div class="relative w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[28rem] lg:h-[28rem]">
                      <div class="absolute inset-0 rounded-full bg-white/20 blur-3xl animate-pulse-slow"></div>
                      <div class="absolute inset-0 rounded-full bg-white/10 blur-2xl"></div>
                      <LazyImage
                        :src="currentSlide.image"
                        :alt="currentSlide.title"
                        container-class="relative w-full h-full rounded-full overflow-hidden"
                        image-class="w-full h-full object-cover rounded-full shadow-2xl ring-4 ring-white/20"
                      />
                      <div class="absolute -inset-4 rounded-full bg-white/5 blur-xl"></div>
                    </div>
                  </div>

                  <!-- 右侧：文本内容 -->
                  <div class="flex flex-col justify-center space-y-6 relative">
                    <div class="absolute -top-10 -right-10 text-white/10 text-7xl md:text-8xl lg:text-9xl font-bold select-none pointer-events-none z-0">
                      {{ currentSlide.title }}
                    </div>
                    
                    <div class="relative z-10">
                      <div class="mb-6">
                        <span class="text-xl md:text-2xl font-elegant font-medium text-white/80">
                          {{ originData.subtitle }}
                        </span>
                        <h1 class="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-white mt-2 inline-block border-b-2 border-white/30 pb-2">
                          {{ currentSlide.title }}
                        </h1>
                      </div>
                      
                      <div class="space-y-4">
                        <p
                          v-for="(paragraph, index) in formattedDescription"
                          :key="index"
                          class="text-base md:text-lg text-white/80 leading-relaxed font-light"
                        >
                          {{ paragraph }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import { useI18nData } from '../../composables/useI18nData'
import LazyImage from '../../components/LazyImage.vue'

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

const currentSlide = computed(() => {
  const slide = originList.value[currentIndex.value] || {}
  return {
    ...slide,
    image: slide.image || originData.value.image || ''
  }
})

const formattedDescription = computed(() => {
  const desc = currentSlide.value.description
  if (Array.isArray(desc)) return desc
  return desc ? String(desc).split('\n').map(s => s.trim()).filter(Boolean) : []
})

const switchToIndex = (index) => {
  if (index === currentIndex.value) return
  animationDirection.value = index > currentIndex.value ? 'slide-forward' : 'slide-backward'
  currentIndex.value = index
}

// 滚动处理：手势分组，停止 1 段时间后才解锁（与发展历程一致）
let isSwitching = false
let switchUnlockTimer = null
const QUIET_WINDOW_MS = 320

const handleWheel = (e) => {
  e.preventDefault?.()

  clearTimeout(switchUnlockTimer)
  switchUnlockTimer = setTimeout(() => {
    isSwitching = false
  }, QUIET_WINDOW_MS)

  if (isSwitching) return

  if (e.deltaY > 0 && currentIndex.value < originList.value.length - 1) {
    switchToIndex(currentIndex.value + 1)
  } else if (e.deltaY < 0 && currentIndex.value > 0) {
    switchToIndex(currentIndex.value - 1)
  } else {
    return
  }

  isSwitching = true
}

onMounted(() => {
  if (navBarControl) {
    navBarControl.showNavBar()
  }
  window.addEventListener('wheel', handleWheel, { passive: false })
})

onUnmounted(() => {
  window.removeEventListener('wheel', handleWheel)
  clearTimeout(switchUnlockTimer)
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}

.particle-background {
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 30% 60%, rgba(255, 255, 255, 0.19) 1.5px, transparent 1.5px),
    radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.19) 1.5px, transparent 1.5px),
    radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 10% 70%, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px);
  background-size: 
    250px 250px,
    280px 280px,
    240px 240px,
    260px 260px,
    270px 270px,
    230px 230px,
    290px 290px,
    220px 220px;
  opacity: 0.5;
}

.particle-layer-1 {
  background-position: 
    0 0,
    60px 40px,
    120px 80px,
    40px 120px,
    100px 160px,
    20px 200px,
    140px 240px,
    80px 280px;
  animation: particle-float-1 30s ease-in-out infinite;
}

.particle-layer-2 {
  background-position: 
    150px 80px,
    200px 120px,
    180px 160px,
    220px 200px,
    160px 240px,
    240px 280px,
    190px 320px,
    210px 360px;
  animation: particle-float-2 22s ease-in-out infinite;
  opacity: 0.4;
}

@keyframes particle-float-1 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.5;
  }
  25% {
    transform: translate(20px, -30px);
    opacity: 0.55;
  }
  50% {
    transform: translate(-15px, 25px);
    opacity: 0.48;
  }
  75% {
    transform: translate(25px, 15px);
    opacity: 0.52;
  }
}

@keyframes particle-float-2 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.4;
  }
  33% {
    transform: translate(-25px, -20px);
    opacity: 0.45;
  }
  66% {
    transform: translate(18px, 22px);
    opacity: 0.38;
  }
}

@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.slide-forward-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-forward-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(-100px) translateY(-100px);
}
.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(100px) translateY(100px);
}

.slide-backward-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-backward-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-backward-enter-from {
  opacity: 0;
  transform: translateX(100px) translateY(100px);
}
.slide-backward-leave-to {
  opacity: 0;
  transform: translateX(-100px) translateY(-100px);
}
</style>
