<!-- 起源 -->
<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- 左侧：圆形图片 -->
        <div class="flex justify-center lg:justify-start">
          <div class="relative w-80 h-80 md:w-96 md:h-96">
            <img
              :src="originData.image"
              :alt="originData.title"
              class="w-full h-full object-cover rounded-full shadow-2xl"
            />
          </div>
        </div>

        <!-- 右侧：文本内容 -->
        <div class="flex flex-col justify-center space-y-6">
          <div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-gray-900 mb-4 tracking-tight">
              {{ originData.title }}
            </h1>
            <h2 class="text-xl md:text-2xl font-elegant font-medium text-gray-700 mb-6 italic">
              {{ originData.subtitle }}
            </h2>
          </div>
          
          <div class="space-y-4">
            <p
              v-for="(paragraph, index) in originData.description"
              :key="index"
              class="text-base md:text-lg text-gray-700 leading-relaxed font-light"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18nData } from '../../composables/useI18nData'

const { dataSource } = useI18nData()

// 获取起源数据
const originData = computed(() => {
  return dataSource.value.origin || {
    title: 'Origin',
    subtitle: '',
    description: [],
    image: ''
  }
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}
</style>

