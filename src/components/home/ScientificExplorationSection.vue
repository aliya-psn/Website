<template>
  <!-- 科学探索区域 - 首页第四个页面 -->
  <section
    id="scientific-exploration-section"
    class="relative overflow-hidden min-h-screen"
    style="background-color: #F5F5F7;"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16 min-h-screen flex flex-col items-center justify-center py-8 md:py-12 lg:py-16">
      <!-- 顶部文字和按钮区域 - 占据约1/3空间 -->
      <div class="text-center mb-2 md:mb-4">
        <!-- 标题 -->
        <h2
          class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 md:mb-4"
        >
          {{ sectionData.title }}
        </h2>
        
        <!-- 副标题 -->
        <p
          class="text-lg md:text-xl lg:text-xl text-gray-700 mb-3 md:mb-4 font-normal"
        >
          {{ sectionData.subtitle }}
        </p>
        
        <!-- 按钮 -->
        <button
          @click="handleButtonClick"
          class="bg-gray-900 text-white px-5 py-1 md:px-6 md:py-1.5 lg:px-8 lg:py-2 rounded-full text-xs md:text-sm lg:text-base font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          {{ sectionData.buttonText }}
        </button>
      </div>

      <!-- 文档拼贴图区域 - 占据约2/3空间 -->
      <div class="relative w-full flex items-center justify-center flex-1">
        <div class="w-full max-w-5xl">
          <LazyImage
            :src="sectionData.collageImage"
            :alt="sectionData.title"
            container-class="w-full"
            image-class="w-full h-auto object-contain max-h-[70vh]"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
</script>

<style scoped>
/* 简洁的样式 */
</style>

