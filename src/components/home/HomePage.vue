<template>
  <!-- 首页 -->
  <div class="relative min-h-screen">
    <!-- 背景图片 -->
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700"
      :style="{
        backgroundImage: 'url(' + pageData.home.backgroundImage + ')',
      }"
    ></div>

    <div class="h-[80px]"></div>

    <!-- 主标题 -->
    <div
      class="relative z-10 flex flex-col items-start pt-10 md:pt-14 lg:pt-18 pl-10 md:pl-18 lg:pl-26 pr-4"
    >
      <div
        class="text-gray-800 text-4xl md:text-5xl lg:text-6xl text-left leading-tight mb-4 md:mb-6 hero-title font-semibold flex flex-col gap-1 md:gap-2 lg:gap-3 xl:gap-4"
      >
        <p
          class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight whitespace-nowrap"
        >
          {{ pageData.home.hero.title }}
        </p>
        <p
          class="block font-normal hero-subtitle text-lg md:text-xl lg:text-xl"
          style="line-height: 28px"
        >
          {{ pageData.home.hero.subtitle }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  pageData: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['scroll-down'])
const router = useRouter()
const { t } = useI18n()

const scrollDown = () => {
  emit('scroll-down')
}
</script>

<style scoped>
/* 淡入动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out;
}

.animate-fade-in-up {
  animation: fadeInUp 1s ease-out 0.3s both;
}

.animate-slide-in-left {
  animation: slideInLeft 0.8s ease-out 0.5s both;
}

.animate-slide-in-right {
  animation: slideInRight 0.8s ease-out 0.5s both;
}

.animate-bounce-slow {
  animation: bounceSlow 2.5s infinite;
}

/* 主标题特效 */
.hero-title {
  letter-spacing: 0.02em;
  font-weight: 600;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero-subtitle {
  font-weight: 500;
  letter-spacing: 0.01em;
  color: rgba(31, 41, 55, 0.8);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 下拉展开动画 */
.slide-down-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-leave-active {
  transition: all 0.3s ease-in;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 按钮样式增强 */
.contact-btn {
  position: relative;
  overflow: hidden;
}

.contact-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transition: left 0.5s ease;
}

.contact-btn:hover::before {
  left: 100%;
}

.chat-btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.chat-btn:hover::after {
  width: 120%;
  height: 120%;
}
</style>
