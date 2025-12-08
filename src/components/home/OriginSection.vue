<template>
  <!-- 品牌起源区域 - 首页第三个页面-->
  <section
    id="origin-section"
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
      <!-- 左侧图片区域 -->
      <div
        class="w-full lg:w-1/2 relative flex items-center justify-center px-6 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-16 animate-fade-in-right"
      >
        <div
          class="w-full max-w-xl h-[60vh] relative overflow-hidden rounded-2xl shadow-2xl"
        >
          <img
            :src="originData.image"
            alt="品牌形象"
            class="w-full h-full object-cover object-center"
          />
          <!-- 渐变遮罩 -->
          <div
            class="absolute inset-0 bg-linear-to-br from-transparent via-transparent to-gray-900/5"
          ></div>
        </div>
      </div>

      <!-- 右侧内容区域（Logo 和文字） -->
      <div
        class="w-full lg:w-1/2 flex flex-col justify-center items-start lg:items-start px-6 md:px-8 lg:px-12 xl:px-16 py-12 lg:py-16"
      >
        <!-- Logo 和标题 -->
        <div class="max-w-xl animate-fade-in-left">
          <!-- 标题 -->
          <h2
            class="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-4 tracking-tight"
          >
            {{ originData.title }}
          </h2>

          <!-- 装饰线条 -->
          <div
            class="w-16 h-0.5 bg-linear-to-r from-gray-900 to-transparent mb-4"
          ></div>

          <!-- 描述文字 -->
          <p
            class="text-base md:text-lg text-gray-700 leading-relaxed font-light"
          >
            {{ originData.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

defineProps({
  originData: {
    type: Object,
    required: true,
  },
})

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
    const originSection = document.getElementById('origin-section')
    if (originSection) {
      const animatedElements = originSection.querySelectorAll(
        '.animate-fade-in-left, .animate-fade-in-right'
      )
      animatedElements.forEach((el) => {
        observer.observe(el)
      })
    }
  }, 500)
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia',
    'Times New Roman', serif;
}

/* 滚动区域动画 - 初始状态隐藏 */
.animate-fade-in-left,
.animate-fade-in-right {
  opacity: 0;
}

/* 滚动触发后显示动画 */
.animate-fade-in-left.animate-on-scroll {
  animation: fadeInLeft 0.8s ease-out 0.3s both;
}

.animate-fade-in-right.animate-on-scroll {
  animation: fadeInRight 0.8s ease-out 0.3s both;
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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
