<template>
  <!-- 体验区域 - 首页第二个页面 -->
  <section 
    id="experience-section"
    class="relative bg-linear-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden"
  >
    <!-- 装饰性背景元素 -->
    <div class="absolute inset-0 opacity-30 pointer-events-none">
      <div class="absolute top-20 right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl"></div>
      <div class="absolute bottom-20 left-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-100 rounded-full blur-3xl"></div>
    </div>
    
    <!-- 内容区域 -->
    <div class="relative z-10 flex flex-col lg:flex-row">
      <!-- 左侧内容 -->
      <div class="flex-1 flex flex-col justify-center px-10 md:px-12 lg:px-18 xl:px-30 py-16 lg:py-20">
        <!-- 标题 -->
        <div class="mb-8 animate-slide-in-left-delay">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-2 tracking-tight leading-tight">
            {{ experienceData.title }}
          </h2>
          <h3 class="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 tracking-tight leading-tight">
            {{ experienceData.subtitle }}
          </h3>
          <!-- 装饰线条 -->
          <div class="mt-4 w-16 h-0.5 bg-linear-to-r from-gray-900 to-transparent"></div>
        </div>

        <!-- 描述文字 -->
        <p class="text-base md:text-lg text-gray-700 mb-10 max-w-xl leading-relaxed animate-fade-in-up-delay font-light">
          {{ experienceData.description }}
        </p>

        <!-- 体验按钮 -->
        <div class="mb-10 animate-fade-in-up-delay-2">
          <button 
            @click="goToAllProducts"
            class="px-8 py-3 rounded-lg bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl font-elegant font-medium text-base"
          >
            <span>{{ experienceData.buttonText }}</span>
            <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <!-- 产品图片 -->
        <div class="animate-fade-in-up-delay-3">
          <div class="relative inline-block">
            <img 
              :src="experienceData.productImage" 
              alt="产品"
              class="w-40 md:w-48 lg:w-56 h-auto object-contain shadow-xl rounded-lg"
            />
          </div>
        </div>
      </div>

      <!-- 右侧图片 -->
      <div class="flex-1 relative flex items-center justify-center pr-8 md:pr-12 lg:pr-16 xl:pr-20 animate-fade-in-right">
        <div class="w-full max-w-2xl h-[70vh] relative overflow-hidden rounded-2xl shadow-2xl">
          <img 
            :src="experienceData.experienceImage" 
            alt="眼部特写"
            class="w-full h-full object-cover object-center"
          />
          <!-- 渐变遮罩 -->
          <div class="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-gray-900/5"></div>
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
      const animatedElements = experienceSection.querySelectorAll('.animate-slide-in-left-delay, .animate-fade-in-up-delay, .animate-fade-in-up-delay-2, .animate-fade-in-up-delay-3, .animate-fade-in-right')
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
.animate-fade-in-up-delay-3,
.animate-fade-in-right {
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

.animate-fade-in-right.animate-on-scroll {
  animation: fadeInRight 1s ease-out 0.3s both;
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

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

