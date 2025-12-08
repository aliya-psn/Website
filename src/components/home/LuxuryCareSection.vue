<template>
  <!-- 奢华护理区域 - 首页第五个页面 -->
  <section
    id="luxury-care-section"
    class="relative bg-white overflow-hidden min-h-screen"
  >
    <div class="relative w-full h-screen">
      <!-- 左上角文字区域 -->
      <div class="absolute top-8 md:top-12 lg:top-16 xl:top-20 left-6 md:left-12 lg:left-16 xl:left-24 z-10 max-w-lg md:max-w-xl lg:max-w-2xl">
        <!-- 主要文字 -->
        <p
          class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight"
        >
          {{ sectionData.primaryText }}
        </p>
        
        <!-- 次要文字 -->
        <p
          class="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 font-light leading-relaxed"
        >
          {{ sectionData.secondaryText }}
        </p>
      </div>

      <!-- 右下角图片区域 -->
      <div class="absolute bottom-0 right-0 w-full md:w-2/3 lg:w-1/2 h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
        <img
          :src="sectionData.image"
          :alt="sectionData.primaryText"
          class="w-full h-full object-cover object-center"
        />
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
/* 简洁的样式 */
</style>

