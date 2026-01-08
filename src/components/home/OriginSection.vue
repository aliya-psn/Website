<template>
  <!-- 品牌起源区域 - 首页第三个页面-->
  <section
    id="origin-section"
    class="relative overflow-hidden h-screen"
    style="background-color: #f5f5f7"
  >
    <!-- 装饰性背景元素 -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-linear-to-br from-gray-100/20 to-transparent rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-linear-to-tl from-gray-100/20 to-transparent rounded-full blur-3xl"
      ></div>
    </div>

    <!-- 内容区域 -->
    <div
      class="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8 pt-16 md:pt-20"
    >
      <!-- 上半部分：标题、描述 -->
      <div class="flex-[0.3] flex flex-col items-center justify-center text-center w-full">
        <div class="flex flex-col gap-1 md:gap-2 lg:gap-3 xl:gap-4 mb-3">
          <!-- 标题 -->
          <h2
            class="text-4xl md:text-5xl lg:text-6xl font-semibold text-center text-gray-900"
          >
            <span class="origin-title-text">{{ originData.title }}</span>
          </h2>
          <!-- 副标题 -->
          <p
            v-if="originData.subtitle"
            class="origin-subtitle text-lg md:text-xl text-center mt-2 md:mt-3 mb-8 md:mb-10 lg:mb-12 font-normal text-gray-900 origin-fade-in"
            style="line-height: 28px"
          >
            {{ originData.subtitle }}
          </p>
        </div>

        <!-- 描述文字 - 段落列表 -->
        <div class="md:space-y-1">
          <p
            v-for="(paragraph, index) in originData.description"
            :key="index"
            class="origin-paragraph text-base md:text-lg font-normal text-center text-gray-900"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>

      <!-- 下半部分：手图 -->
      <div class="flex-[0.7] flex items-center justify-center w-full min-h-0">
        <div class="relative w-full h-full flex items-center justify-center pt-2">
          <LazyImage
            :src="originData.image"
            :alt="originData.title"
            container-class="w-full h-full flex items-center justify-center"
            image-class="h-full w-auto object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import LazyImage from '../LazyImage.vue'

defineProps({
  originData: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
/* 标题 */
.origin-title {
  position: relative;
  display: block;
  margin: 0 auto;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.origin-title-text {
  position: relative;
  z-index: 2;
  background: linear-gradient(
    135deg,
    #0a0a0a 0%,
    #1a1a1a 30%,
    #2d2d2d 50%,
    #1a1a1a 70%,
    #0a0a0a 100%
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: elegantGradient 8s ease-in-out infinite;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08));
  transition: filter 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.origin-title-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(45, 45, 45, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: elegantGradient 8s ease-in-out infinite reverse;
  filter: blur(6px);
  opacity: 0.5;
}

.origin-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.15),
    transparent
  );
  animation: elegantLineExpand 4s ease-in-out infinite;
  border-radius: 1px;
}

.origin-title:hover .origin-title-text {
  filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.12));
}

.origin-title:hover::after {
  animation-duration: 2s;
}

@keyframes elegantGradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes elegantLineExpand {
  0%,
  100% {
    width: 0;
    opacity: 0;
  }
  20% {
    width: 100px;
    opacity: 0.6;
  }
  50% {
    width: 180px;
    opacity: 1;
  }
  80% {
    width: 100px;
    opacity: 0.6;
  }
}

/* 副标题 */
.origin-subtitle {
  color: #374151;
  letter-spacing: 0.03em;
  line-height: 1.75;
}

/* 段落  */
.origin-paragraph {
  color: #374151;
  letter-spacing: 0.02em;
  line-height: 1.5;
}

/* 淡入动画 - 基本过渡 */
.origin-fade-in {
  opacity: 0;
  animation: elegantFadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes elegantFadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
