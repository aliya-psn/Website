<template>
  <!-- 奢华护理区域 - 首页第五个页面 -->
  <section
    id="luxury-care-section"
    class="relative overflow-hidden pt-16 md:pt-20"
    style="background-color: #F5F5F7;"
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
      <div class="absolute top-4 md:top-6 lg:top-8 xl:top-10 left-12 md:left-16 lg:left-20 xl:left-24 z-10 max-w-lg md:max-w-xl lg:max-w-2xl">
        <div class="luxury-text-row flex flex-wrap items-center gap-1 md:gap-2 lg:gap-3 xl:gap-4">
          <p
            class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight whitespace-nowrap"
          >
            {{ sectionData.primaryText }}
          </p>
          <p
            class="text-lg md:text-xl lg:text-xl text-gray-700 font-normal leading-relaxed whitespace-nowrap"
            style="line-height: 28px;"
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

.luxury-text-row p {
  margin: 0;
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

</style>

