<template>
  <!-- 体验区域 - 首页第二个页面 -->
  <section 
    id="experience-section"
    class="relative min-h-screen bg-white overflow-hidden"
  >
    <!-- 内容区域 -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 md:py-20">
      <!-- 上半部分：标题、描述、按钮 -->
      <div class="flex-1 flex flex-col items-center justify-center text-center mb-12 md:mb-16">
        <!-- 标题 -->
        <div class="mb-6 md:mb-8 animate-slide-in-left-delay hero-title-wrapper">
          <h2 class="hero-title text-4xl md:text-5xl lg:text-6xl font-elegant font-bold tracking-tight leading-tight">
            <span class="hero-title-text">{{ experienceData.heading }}</span>
            <span class="hero-title-glow"></span>
            <span class="hero-title-shine"></span>
          </h2>
        </div>

        <!-- 描述文字 -->
        <p class="hero-description text-base md:text-lg lg:text-xl text-gray-700 mb-8 md:mb-10 max-w-2xl leading-relaxed animate-fade-in-up-delay font-light">
          {{ experienceData.description }}
        </p>

        <!-- 体验按钮 -->
        <div class="animate-fade-in-up-delay-2">
          <button 
            @click="goToAllProducts"
            class="hero-button px-8 py-3 md:px-10 md:py-4 rounded-lg bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl font-elegant font-medium text-base md:text-lg relative overflow-hidden"
          >
            <span class="relative z-10">{{ experienceData.buttonText }}</span>
            <svg class="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform group-hover:translate-x-1 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <div class="hero-button-shine"></div>
          </button>
        </div>
      </div>

      <!-- 下半部分：产品图片 -->
      <div class="flex-1 flex items-center justify-center animate-fade-in-up-delay-3">
        <div class="relative product-image-container">
          <img 
            :src="experienceData.productImage" 
            alt="产品"
            class="product-image w-96 md:w-[28rem] lg:w-[40rem] xl:w-[44rem] h-auto object-contain"
          />
          <div class="product-glow"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps({
  experienceData: {
    type: Object,
    required: true
  }
})

const goToAllProducts = () => {
  router.push('/all-products')
}

// 监听滚动，实现滚动触发动画
onMounted(() => {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll')
      }
    })
  }, observerOptions)

  // 延迟执行，确保 DOM 已渲染
  setTimeout(() => {
    const experienceSection = document.getElementById('experience-section')
    if (experienceSection) {
      const animatedElements = experienceSection.querySelectorAll('.animate-slide-in-left-delay, .animate-fade-in-up-delay, .animate-fade-in-up-delay-2, .animate-fade-in-up-delay-3')
      animatedElements.forEach(el => {
        observer.observe(el)
      })
    }
  }, 500)
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}

/* 滚动区域动画 - 初始状态隐藏 */
.animate-slide-in-left-delay,
.animate-fade-in-up-delay,
.animate-fade-in-up-delay-2,
.animate-fade-in-up-delay-3 {
  opacity: 0;
}

/* 滚动触发后显示动画 */
.animate-slide-in-left-delay.animate-on-scroll {
  animation: slideInLeft 0.8s ease-out 0.2s both;
}

.animate-fade-in-up-delay.animate-on-scroll {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.animate-fade-in-up-delay-2.animate-on-scroll {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.animate-fade-in-up-delay-3.animate-on-scroll {
  animation: fadeInUp 0.8s ease-out 0.8s both;
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

/* 标题容器 - 同一行显示 */
.hero-title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  position: relative;
}

.hero-title {
  position: relative;
  display: inline-block;
  letter-spacing: 0.03em;
}

.hero-title-text {
  position: relative;
  z-index: 3;
  background: linear-gradient(
    135deg,
    #000000 0%,
    #1a1a1a 25%,
    #2d2d2d 50%,
    #1a1a1a 75%,
    #000000 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 4s ease infinite;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  transition: filter 0.3s ease;
}

.hero-title-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(45, 45, 45, 0.6) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glowPulse 3s ease-in-out infinite;
  filter: blur(8px);
  opacity: 0.6;
}

.hero-title-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  animation: shineSweep 3s ease-in-out infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-title-wrapper:hover .hero-title-text {
  filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 30px rgba(0, 0, 0, 0.3));
  transform: scale(1.02);
}

.hero-title-wrapper:hover .hero-title-glow {
  opacity: 0.9;
  filter: blur(12px);
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes shineSweep {
  0% {
    left: -100%;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

@keyframes titleGlow {
  0% {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.1));
  }
  100% {
    filter: drop-shadow(0 0 15px rgba(0, 0, 0, 0.2));
  }
}

@keyframes titleShine {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.hero-description {
  color: #4a4a4a;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
  letter-spacing: 0.02em;
  font-weight: 300;
  position: relative;
}

.hero-description::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2), transparent);
  animation: lineExpand 2s ease-in-out infinite;
}

@keyframes lineExpand {
  0%, 100% {
    width: 60px;
    opacity: 0.5;
  }
  50% {
    width: 120px;
    opacity: 1;
  }
}

/* 高级按钮特效 */
.hero-button {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.hero-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.hero-button:hover::before {
  left: 100%;
}

.hero-button-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.6s ease;
}

.hero-button:hover .hero-button-shine {
  left: 100%;
}

.hero-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* 产品图片特效 */
.product-image-container {
  position: relative;
}

.product-image {
  position: relative;
  z-index: 2;
  animation: floatImage 6s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 40px rgba(0, 0, 0, 0.15));
}

.product-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(0, 0, 0, 0.05) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  animation: pulseGlow 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes floatImage {
  0%, 100% {
    transform: translateY(0px) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.02);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.1);
  }
}

</style>

