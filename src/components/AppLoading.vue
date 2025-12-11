<!-- 应用初始化 Loading 组件 -->
<template>
  <Transition name="fade-out" appear>
    <div
      v-if="visible"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pointer-events-auto"
    >
      <!-- 背景粒子效果 -->
      <div class="absolute inset-0 overflow-hidden">
        <div
          v-for="i in 50"
          :key="i"
          class="absolute rounded-full bg-white/20 animate-float"
          :style="getParticleStyle(i)"
        ></div>
      </div>

      <!-- 主要内容 -->
      <div class="relative z-10 flex flex-col items-center gap-8">
        <!-- Logo 或品牌标识区域 -->
        <div class="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
          <!-- 外圈旋转环 -->
          <div class="absolute inset-0 border-4 border-transparent border-t-white/30 border-r-white/20 rounded-full animate-spin-slow"></div>
          <div class="absolute inset-2 border-4 border-transparent border-b-white/30 border-l-white/20 rounded-full animate-spin-reverse"></div>
          
          <!-- 中心圆 -->
          <div class="absolute inset-4 sm:inset-6 md:inset-8 flex items-center justify-center">
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-white/20 to-transparent blur-xl animate-pulse-slow"></div>
            <div class="relative w-full h-full rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center px-2">
              <div class="text-white text-xs sm:text-sm md:text-base font-bold font-elegant text-center leading-tight">
                {{ brandText }}
              </div>
            </div>
          </div>
        </div>

        <!-- 进度条 -->
        <!-- <div class="flex flex-col items-center gap-3">
          <div class="w-48 sm:w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-white/20 via-white/60 to-white/20 rounded-full animate-progress"
            ></div>
          </div>
        </div> -->

        <!-- 加载点动画 -->
        <!-- <div class="flex items-center gap-2">
          <div
            v-for="i in 3"
            :key="i"
            class="w-2 h-2 rounded-full bg-white/60 animate-bounce-dot"
            :style="{ animationDelay: `${i * 0.2}s` }"
          ></div>
        </div> -->
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  brandText: {
    type: String,
    default: 'FANTASYCARE'
  }
})

// 生成粒子样式
const getParticleStyle = (index) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const top = Math.random() * 100
  const delay = Math.random() * 3
  const duration = Math.random() * 3 + 2
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
/* 淡出动画 */
.fade-out-leave-active {
  transition: opacity 0.6s ease-out;
}

.fade-out-leave-to {
  opacity: 0;
}

/* 慢速旋转 */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 8s linear infinite;
}

.animate-spin-reverse {
  animation: spin-slow 12s linear infinite reverse;
}

/* 脉冲动画 */
@keyframes pulse-slow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

/* 浮动动画 */
@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
    opacity: 0.2;
  }
  25% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.4;
  }
  50% {
    transform: translateY(-40px) translateX(-10px);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-20px) translateX(5px);
    opacity: 0.4;
  }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

/* 进度条动画 */
@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}

.animate-progress {
  animation: progress 2s ease-in-out infinite;
}

/* 弹跳点动画 */
@keyframes bounce-dot {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.animate-bounce-dot {
  animation: bounce-dot 1.4s ease-in-out infinite;
}
</style>
