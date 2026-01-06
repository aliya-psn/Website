<template>
  <!-- 科学探索区域 - 首页第四个页面 -->
  <section
    id="scientific-exploration-section"
    class="relative overflow-hidden h-screen"
    style="background-color: #f5f5f7"
  >
    <div
      class="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 pt-16 md:pt-20"
    >
      <!-- 上半部分：标题、描述、按钮 -->
      <div class="flex-[0.3] flex flex-col items-center justify-center text-center">
        <!-- 标题 -->
        <div class="flex flex-col gap-1 md:gap-2 lg:gap-3 xl:gap-4 mb-3 md:mb-4">
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-normal leading-tight"
          >
            {{ sectionData.title }}
          </h2>
          <!-- 描述文字 -->
          <p
            class="hero-description text-lg md:text-xl lg:text-xl text-gray-900 md:mb-4 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay font-normal"
            style="line-height: 28px"
          >
            {{ sectionData.subtitle }}
          </p>
        </div>

        <!-- 按钮 -->
        <div class="animate-fade-in-up-delay-2">
          <button
            @click="handleButtonClick"
            class="hero-button px-4 py-0.5 md:px-5 md:py-1 lg:px-6 lg:py-1.5 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl font-medium text-sm md:text-base lg:text-lg relative overflow-hidden"
          >
            <span class="relative z-10">{{ sectionData.buttonText }}</span>
          </button>
        </div>
      </div>

      <!-- 下半部分：文档拼贴图 -->
      <div class="flex-[0.7] flex items-center justify-center w-full min-h-0">
        <div class="relative w-full h-full flex items-center justify-center">
          <LazyImage
            :src="sectionData.collageImage"
            :alt="sectionData.title"
            container-class="w-full h-full flex items-center justify-center"
            image-class="h-full w-auto object-contain"
          />
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
  sectionData: {
    type: Object,
    required: true,
  },
})

const handleButtonClick = () => {
  router.push('/origin')
}

// 监听滚动，实现滚动触发动画
onMounted(() => {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll')
      }
    })
  }, observerOptions)

  // 延迟执行，确保 DOM 已渲染
  setTimeout(() => {
    const scientificSection = document.getElementById('scientific-exploration-section')
    if (scientificSection) {
      const animatedElements = scientificSection.querySelectorAll(
        '.animate-fade-in-up-delay, .animate-fade-in-up-delay-2, .animate-fade-in-up-delay-3'
      )
      animatedElements.forEach((el) => {
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
</style>
