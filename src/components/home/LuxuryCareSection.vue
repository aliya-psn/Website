<template>
  <!-- 奢华护理区域 - 首页第五个页面 -->
  <section
    id="luxury-care-section"
    class="relative bg-white overflow-hidden"
  >
    <div class="relative w-full h-[55vh] md:h-[60vh] lg:h-[65vh]">
      <!-- 右下角图片区域 - 顶部与主标题对齐 -->
      <div class="luxury-image-container absolute top-4 md:top-6 lg:top-8 xl:top-10 right-6 md:right-8 lg:right-12 xl:right-16 w-full md:w-4/5 lg:w-3/4 xl:w-2/3 h-[40vh] md:h-[45vh] lg:h-[50vh] xl:h-[55vh] z-0 overflow-visible">
        <div class="luxury-image-wrapper w-full h-full">
          <LazyImage
            :src="sectionData.image"
            :alt="sectionData.primaryText"
            container-class="w-full h-full"
            image-class="w-full h-full object-contain object-bottom-right"
          />
        </div>
      </div>

      <!-- 文字区域 - 浮动在图片上方 -->
      <div class="luxury-text-container absolute top-4 md:top-6 lg:top-8 xl:top-10 left-12 md:left-16 lg:left-20 xl:left-24 z-10 max-w-lg md:max-w-xl lg:max-w-2xl">
        <div class="luxury-text-row flex flex-wrap items-center gap-3 md:gap-4 lg:gap-5">
          <p
            class="luxury-primary-text text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-0 whitespace-nowrap"
          >
            {{ sectionData.primaryText }}
          </p>
          <p
            class="luxury-secondary-text text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 font-light leading-relaxed mb-0 whitespace-nowrap"
          >
            {{ sectionData.secondaryText }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import LazyImage from '../LazyImage.vue'

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

.luxury-text-row p {
  margin: 0;
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

