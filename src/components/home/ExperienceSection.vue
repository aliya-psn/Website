<template>
  <!-- 体验区域 - 首页第二个页面 -->
  <section 
    id="experience-section"
    class="relative min-h-screen bg-[#F5F5F7] overflow-hidden"
  >
    <!-- 内容区域 -->
    <div class="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-16 md:py-20">
      <!-- 上半部分：标题、描述、按钮 -->
      <div class="flex-1 flex flex-col items-center justify-center text-center mb-6 md:mb-8">
        <!-- 标题 -->
        <div class="mb-3 md:mb-4">
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-normal leading-tight" style="line-height: 56px;">
            {{ experienceData.heading }}
          </h2>
        </div>

        <!-- 描述文字 -->
        <p class="hero-description text-lg md:text-xl lg:text-xl text-gray-900 mb-3 md:mb-4 max-w-2xl leading-relaxed animate-fade-in-up-delay font-normal" style="line-height: 28px;">
          {{ experienceData.description }}
        </p>

        <!-- 体验按钮 -->
        <div class="animate-fade-in-up-delay-2">
          <button 
            @click="goToAllProducts"
            class="hero-button px-4 py-0.5 md:px-5 md:py-1 lg:px-6 lg:py-1.5 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl font-medium text-sm md:text-base lg:text-lg relative overflow-hidden"
          >
            <span class="relative z-10">{{ experienceData.buttonText }}</span>
          </button>
        </div>
      </div>

      <!-- 下半部分：产品图片 -->
      <div class="flex-1 flex items-center justify-center animate-fade-in-up-delay-3 w-full min-h-0">
        <div class="relative product-image-container">
          <LazyImage 
            :src="experienceData.productImage" 
            alt="产品"
            container-class="w-96 md:w-[28rem] lg:w-[40rem] xl:w-[44rem] h-auto"
            image-class="product-image w-full h-auto object-contain"
            root-margin="200px"
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
import LazyImage from '../LazyImage.vue'

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
      const animatedElements = experienceSection.querySelectorAll('.animate-fade-in-up-delay, .animate-fade-in-up-delay-2, .animate-fade-in-up-delay-3')
      animatedElements.forEach(el => {
        observer.observe(el)
      })
    }
  }, 500)
})
</script>

<style scoped>

/* 滚动区域动画 - 初始状态隐藏 */
.animate-fade-in-up-delay,
.animate-fade-in-up-delay-2,
.animate-fade-in-up-delay-3 {
  opacity: 0;
}

/* 滚动触发后显示动画 */
.animate-fade-in-up-delay.animate-on-scroll {
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.animate-fade-in-up-delay-2.animate-on-scroll {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

.animate-fade-in-up-delay-3.animate-on-scroll {
  animation: fadeInUp 0.8s ease-out 0.8s both;
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


.hero-description {
  color: #272626;
  letter-spacing: 0.02em;
  font-weight: 400;
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

