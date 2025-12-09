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
        <div class="mb-6 md:mb-8 animate-slide-in-left-delay">
          <h2 class="hero-title-main text-4xl md:text-5xl lg:text-6xl font-elegant font-bold mb-2 tracking-tight leading-tight">
            {{ experienceData.title }}
          </h2>
          <h3 class="hero-title-sub text-4xl md:text-5xl lg:text-6xl font-elegant font-bold tracking-tight leading-tight">
            {{ experienceData.subtitle }}
          </h3>
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
        <div class="relative">
          <img 
            :src="experienceData.productImage" 
            alt="产品"
            class="w-64 md:w-80 lg:w-96 xl:w-[28rem] h-auto object-contain shadow-2xl rounded-lg"
          />
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

/* 高级文字特效 */
.hero-title-main {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.05em;
  position: relative;
  animation: titleGlow 3s ease-in-out infinite alternate;
}

.hero-title-main::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 50%, rgba(255, 255, 255, 0.1) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleShine 4s ease-in-out infinite;
  pointer-events: none;
}

.hero-title-sub {
  background: linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 50%, #2d2d2d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.05em;
  position: relative;
  animation: titleGlow 3s ease-in-out infinite alternate-reverse;
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

</style>

