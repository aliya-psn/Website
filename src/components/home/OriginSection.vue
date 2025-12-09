<template>
  <!-- 品牌起源区域 - 首页第三个页面-->
  <section
    id="origin-section"
    class="relative bg-white overflow-hidden"
  >
    <!-- 装饰性背景元素 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-100/20 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-gray-100/20 to-transparent rounded-full blur-3xl"></div>
    </div>

    <!-- 内容区域 -->
    <div class="relative z-10  flex flex-col items-center justify-center px-6 md:px-8 lg:px-12 xl:px-16 py-16 md:py-24">
      <div class="w-full max-w-4xl">
        <!-- 标题 -->
        <h2
          class="origin-title text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-10"
        >
          {{ originData.title }}
        </h2>

        <!-- 副标题 -->
        <p
          v-if="originData.subtitle"
          class="origin-subtitle text-base md:text-lg text-center mb-10 md:mb-12 font-normal leading-relaxed origin-fade-in"
        >
          {{ originData.subtitle }}
        </p>

        <!-- 描述文字 - 段落列表 -->
        <div class="space-y-6 md:space-y-8">
          <p
            v-for="(paragraph, index) in originData.description"
            :key="index"
            class="origin-paragraph text-base md:text-lg leading-relaxed font-normal text-center origin-fade-in"
            :style="{ animationDelay: `${(index + 1) * 0.15}s` }"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  originData: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
/* 标题高级特效 */
.origin-title {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: titleGradientShift 6s ease-in-out infinite;
  letter-spacing: -0.02em;
  line-height: 1.2;
  position: relative;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.05));
}

.origin-title::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.2), transparent);
  animation: lineExpand 3s ease-in-out infinite;
}

@keyframes titleGradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes lineExpand {
  0%, 100% {
    width: 80px;
    opacity: 0.4;
  }
  50% {
    width: 150px;
    opacity: 0.8;
  }
}

/* 副标题特效 */
.origin-subtitle {
  color: #6b7280;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
  position: relative;
}

.origin-subtitle::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -20px;
  transform: translateX(-50%);
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
  animation: subtitleLine 1.5s ease-out 0.5s forwards;
}

@keyframes subtitleLine {
  to {
    width: 100px;
  }
}

/* 段落高级特效 */
.origin-paragraph {
  color: #4b5563;
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.8;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
  position: relative;
}

.origin-paragraph::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -12px;
  transform: translateX(-50%);
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.08), transparent);
  transition: width 1s ease;
}

.origin-paragraph:hover::before {
  width: 120px;
}

/* 淡入动画 */
.origin-fade-in {
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
