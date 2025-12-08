<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- 左侧：主标题和描述 -->
        <div class="flex flex-col justify-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-gray-900 mb-6 tracking-tight">
            {{ aboutData.title }}
          </h1>
          <p class="text-base md:text-lg text-gray-700 leading-relaxed font-light">
            {{ aboutData.description }}
          </p>
        </div>

        <!-- 右侧：两个子部分 -->
        <div class="flex flex-col gap-8 md:gap-12">
          <div
            v-for="(section, index) in aboutData.sections"
            :key="index"
            class="space-y-4"
          >
            <h2 class="text-xl md:text-2xl font-elegant font-semibold text-gray-900">
              {{ section.title }}
            </h2>
            <p class="text-base text-gray-600 leading-relaxed">
              {{ section.description }}
            </p>
            <!-- 如果有图片，显示图片 -->
            <div v-if="section.image" class="mt-6">
              <img
                :src="section.image"
                :alt="section.title"
                class="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18nData } from '../composables/useI18nData'

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const { dataSource } = useI18nData()

// 根据 slug 获取关于我们的数据
const aboutData = computed(() => {
  const aboutMap = {
    'our-story': dataSource.value.about?.ourStory,
    'our-introduction': dataSource.value.about?.ourIntroduction,
    'our-technology': dataSource.value.about?.ourTechnology,
    'our-strategy': dataSource.value.about?.ourStrategy
  }
  
  return aboutMap[props.slug] || dataSource.value.about?.ourStory
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}
</style>

