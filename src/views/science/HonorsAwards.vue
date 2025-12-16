<!-- 荣誉奖项 -->
<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-8">
      <!-- 标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 text-center mb-16 tracking-tight">
        {{ honorsAwardsData.title }}
      </h1>

      <!-- 上排：2 张 -->
      <div v-if="topRow.length" class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        <div
          v-for="(award, index) in topRow"
          :key="'top-' + index"
          class="award-item flex flex-col"
        >
          <div class="w-full bg-gray-900 mb-4 overflow-hidden rounded-lg">
            <LazyImage
              v-if="award.image"
              :src="award.image"
              :alt="award.name"
              container-class="w-full"
              image-class="w-full h-auto object-contain"
              skeleton-class="bg-gray-800"
            />
          </div>
          <p class="text-base md:text-lg text-gray-900 font-light leading-relaxed text-center">
            {{ award.name }}
          </p>
        </div>
      </div>

      <!-- 中排：3 张 -->
      <div v-if="middleRow.length" class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
        <div
          v-for="(award, index) in middleRow"
          :key="'mid-' + index"
          class="award-item flex flex-col"
        >
          <div class="w-full max-w-sm mx-auto bg-gray-900 mb-4 overflow-hidden rounded-lg">
            <LazyImage
              v-if="award.image"
              :src="award.image"
              :alt="award.name"
              container-class="w-full"
              image-class="w-full h-auto object-contain"
              skeleton-class="bg-gray-800"
            />
          </div>
          <p class="text-base md:text-lg text-gray-900 font-light leading-relaxed text-center">
            {{ award.name }}
          </p>
        </div>
      </div>

      <!-- 下排：3 张 -->
      <div v-if="bottomRow.length" class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div
          v-for="(award, index) in bottomRow"
          :key="'bot-' + index"
          class="award-item flex flex-col"
        >
          <div class="w-full max-w-sm mx-auto bg-gray-900 mb-4 overflow-hidden rounded-lg">
            <LazyImage
              v-if="award.image"
              :src="award.image"
              :alt="award.name"
              container-class="w-full"
              image-class="w-full h-auto object-contain"
              skeleton-class="bg-gray-800"
            />
          </div>
          <p class="text-base md:text-lg text-gray-900 font-light leading-relaxed text-center">
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

// 切分为 2 / 3 / 3 的布局
const topRow = computed(() => honorsAwardsData.value.awards?.slice(0, 2) || [])
const middleRow = computed(() => honorsAwardsData.value.awards?.slice(2, 5) || [])
const bottomRow = computed(() => honorsAwardsData.value.awards?.slice(5, 8) || [])
</script>

<style scoped>

.award-item {
  transition: transform 0.3s ease;
}

.award-item:hover {
  transform: translateY(-4px);
}
</style>

