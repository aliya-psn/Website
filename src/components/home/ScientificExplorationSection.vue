<template>
  <!-- 科学探索区域 - 首页第四个页面 -->
  <section
    id="scientific-exploration-section"
    class="relative bg-white overflow-hidden py-12 md:py-16 lg:py-20"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16">
      <!-- 顶部文字和按钮区域 - 占据约1/3空间 -->
      <div class="text-center mb-4">
        <!-- 标题 -->
        <h2
          class="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 lg:mb-5"
        >
          {{ sectionData.title }}
        </h2>
        
        <!-- 副标题 -->
        <p
          class="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 lg:mb-10 font-light"
        >
          {{ sectionData.subtitle }}
        </p>
        
        <!-- 按钮 -->
        <button
          @click="handleButtonClick"
          class="bg-gray-900 text-white px-8 py-3 md:px-10 md:py-3.5 lg:px-12 lg:py-4 rounded-lg text-sm md:text-base lg:text-lg font-medium hover:bg-gray-800 transition-colors duration-300"
        >
          {{ sectionData.buttonText }}
        </button>
      </div>

      <!-- 文档拼贴图区域 - 占据约2/3空间 -->
      <div class="relative w-full flex items-center justify-center">
        <div class="w-full max-w-6xl">
          <img
            :src="sectionData.collageImage"
            :alt="sectionData.title"
            class="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

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

