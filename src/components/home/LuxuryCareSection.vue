<template>
  <!-- 奢华护理区域 - 首页第五个页面 -->
  <section
    id="luxury-care-section"
    class="relative bg-white overflow-hidden"
  >
    <div class="relative w-full h-[70vh] md:h-[75vh] lg:h-[80vh]">
      <!-- 右下角图片区域 - 浮动在右下角 -->
      <div class="luxury-image-container absolute bottom-0 right-0 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 h-[40vh] md:h-[45vh] lg:h-[50vh] xl:h-[55vh] z-0 overflow-visible">
        <div class="luxury-image-wrapper w-full h-full">
          <img
            :src="sectionData.image"
            :alt="sectionData.primaryText"
            class="w-full h-full object-contain object-right-bottom"
          />
        </div>
      </div>

      <!-- 文字区域 - 浮动在图片上方 -->
      <div class="luxury-text-container absolute top-4 md:top-6 lg:top-8 xl:top-10 left-4 md:left-6 lg:left-8 xl:left-10 z-10 max-w-lg md:max-w-xl lg:max-w-2xl">
        <!-- 主要文字 -->
        <p
          class="luxury-primary-text text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
        >
          {{ sectionData.primaryText }}
        </p>
        
        <!-- 次要文字 -->
        <p
          class="luxury-secondary-text text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 font-light leading-relaxed"
        >
          {{ sectionData.secondaryText }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  sectionData: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
/* 文字容器浮动效果 - 左上角 */
.luxury-text-container {
  animation: fadeInLeft 1s ease-out;
}

/* 图片容器 - 无动画 */
.luxury-image-container {
  /* 移除动画 */
}

.luxury-image-wrapper {
  /* 移除动画 */
}

/* 主要文字高级特效 */
.luxury-primary-text {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 100%;
  animation: textGradientShift 6s ease-in-out infinite, fadeInUp 1s ease-out 0.2s both;
  letter-spacing: -0.02em;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  position: relative;
}

.luxury-primary-text::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.3), transparent);
  animation: underlineExpand 1.5s ease-out 0.5s forwards;
}

/* 次要文字高级特效 */
.luxury-secondary-text {
  color: #4b5563;
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8), 0 2px 6px rgba(0, 0, 0, 0.05);
  letter-spacing: 0.02em;
  animation: fadeInUp 1s ease-out 0.4s both;
  position: relative;
}

.luxury-secondary-text::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent);
  animation: lineGrow 1s ease-out 0.6s forwards;
}

/* 文字动画 */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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

@keyframes textGradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes underlineExpand {
  to {
    width: 100%;
  }
}

@keyframes lineGrow {
  to {
    height: 60%;
  }
}
</style>

