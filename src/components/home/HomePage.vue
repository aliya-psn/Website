<template>
  <!-- 首页 -->
  <div class="relative min-h-screen">
    <!-- 背景图片，带虚化 -->
    <div
      class="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-700"
      :style="{
        backgroundImage: 'url(' + pageData.home.backgroundImage + ')',
        filter: 'blur(3px)',
      }"
    >
      <div
        class="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/40"
      ></div>
    </div>

    <!-- 导航栏占位，避免内容被固定导航栏遮挡 -->
    <div class="h-20 md:h-24"></div>

    <!-- 主标题 -->
    <div
      class="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4 animate-fade-in-up"
    >
      <h2
        class="text-white text-4xl md:text-6xl lg:text-7xl font-system text-center leading-tight mb-8 hero-title font-semibold"
      >
        {{ pageData.home.hero.title }}<br />
        <span class="font-light hero-subtitle">{{
          pageData.home.hero.subtitle
        }}</span>
      </h2>

      <!-- 向下箭头 -->
      <div
        class="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all animate-bounce-slow hover:scale-110"
        :style="{ marginTop: '60px' }"
        @click="scrollDown"
      >
        <svg
          class="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div
      class="fixed bottom-6 md:bottom-8 left-4 md:left-8 right-4 md:right-8 flex justify-between items-end pointer-events-none z-20"
    >
      <!-- 联系我们 -->
      <button
        @click="goToJoinUs"
        class="contact-btn bg-linear-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl text-white rounded-xl flex items-center gap-3 px-6 py-4 md:px-8 md:py-5 hover:from-slate-800/98 hover:via-slate-700/98 hover:to-slate-800/98 transition-all duration-300 hover:scale-105 shadow-2xl pointer-events-auto group border border-white/10 hover:border-white/20"
      >
        <div class="icon-wrapper relative">
          <svg
            class="w-5 h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <div class="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <span class="font-elegant text-sm md:text-base font-medium tracking-wide">
          {{ t('common.contactUs') }}
        </span>
        <svg
          class="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <!-- 聊天图标 -->
      <button
        class="chat-btn w-14 h-14 md:w-16 md:h-16 rounded-full bg-linear-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl text-white flex items-center justify-center hover:from-slate-800/98 hover:via-slate-700/98 hover:to-slate-900/98 transition-all duration-300 hover:scale-110 shadow-2xl pointer-events-auto group border border-white/10 hover:border-white/20 relative overflow-hidden"
      >
        <div class="absolute inset-0 bg-linear-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <svg
          class="w-6 h-6 md:w-7 md:h-7 relative z-10 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>
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

const goToJoinUs = () => {
  router.push('/join-us')
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
  letter-spacing: 0.1em;
  font-weight: 500;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.hero-subtitle {
  font-weight: 300;
  letter-spacing: 0.01em;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 50%,
    rgba(255, 255, 255, 0.95) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
    0 2px 25px rgba(255, 255, 255, 0.3);
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.4));
  animation: subtitleShine 2.5s ease-in-out infinite alternate;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@keyframes subtitleShine {
  0% {
    opacity: 0.9;
    filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.5));
  }
  100% {
    opacity: 1;
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
  }
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
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
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
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease;
}

.chat-btn:hover::after {
  width: 120%;
  height: 120%;
}
</style>
