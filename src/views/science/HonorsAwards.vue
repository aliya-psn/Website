<!-- 荣誉奖项 -->
<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <!-- 标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-gray-900 text-center mb-16 tracking-tight">
        {{ honorsAwardsData.title }}
      </h1>

      <!-- 奖项网格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        <div
          v-for="(award, index) in honorsAwardsData.awards"
          :key="index"
          class="award-item flex flex-col"
        >
          <!-- 图片区域（黑色矩形） -->
          <div class="w-full aspect-4/3 bg-gray-900 mb-4 overflow-hidden rounded-lg">
            <LazyImage
              v-if="award.image"
              :src="award.image"
              :alt="award.name"
              container-class="w-full h-full"
              image-class="w-full h-full object-cover"
              skeleton-class="bg-gray-800"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gray-900"
            >
              <span class="text-white text-sm opacity-50">Award Image</span>
            </div>
          </div>
          
          <!-- 文字描述 -->
          <p class="text-base md:text-lg text-gray-900 font-light leading-relaxed">
            {{ award.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18nData } from '../../composables/useI18nData'
import LazyImage from '../../components/LazyImage.vue'

const { dataSource } = useI18nData()

// 获取荣誉奖项数据
const honorsAwardsData = computed(() => {
  return dataSource.value.honorsAwards || {
    title: 'Honors & Awards',
    awards: []
  }
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}

.award-item {
  transition: transform 0.3s ease;
}

.award-item:hover {
  transform: translateY(-4px);
}
</style>

