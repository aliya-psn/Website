<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <!-- 主标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-gray-900 text-center mb-16 tracking-tight">
        {{ keyIngredientsData.title }}
      </h1>

      <!-- Dr Shona Dalzell -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-center">
        <!-- 左侧：肖像照片 -->
        <div class="flex justify-center lg:justify-start items-center">
          <div class="relative w-72 h-88 md:w-96 md:h-[28rem]">
            <img
              :src="keyIngredientsData.drShona.image"
              :alt="keyIngredientsData.drShona.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- 右侧：名字和背景信息 -->
        <div class="flex flex-col justify-center space-y-6">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900">
            {{ keyIngredientsData.drShona.name }}
          </h2>
          
          <div class="space-y-4">
            <div class="space-y-2">
              <p v-for="(info, index) in keyIngredientsData.drShona.background1" :key="`bg1-${index}`" class="text-xs md:text-sm text-gray-900 leading-snug font-light tracking-normal">
                {{ info }}
              </p>
            </div>
            <div class="space-y-2 mt-6 md:mt-8">
              <p v-for="(info, index) in keyIngredientsData.drShona.background2" :key="`bg2-${index}`" class="text-xs md:text-sm text-gray-500 leading-snug font-light tracking-normal">
                {{ info }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Medical Aesthetic Clinical Cooperation 部分 -->
      <div class="mt-20">
        <h2 class="text-3xl md:text-4xl font-elegant font-bold text-gray-900 text-center mb-8">
          {{ keyIngredientsData.clinicalCooperation.title }}
        </h2>
        
        <p class="text-base md:text-lg text-gray-700 leading-relaxed font-light text-center max-w-4xl mx-auto mb-12">
          {{ keyIngredientsData.clinicalCooperation.description }}
        </p>

        <!-- 团队图片 -->
        <div class="flex justify-center max-w-5xl mx-auto">
          <div class="w-full max-w-4xl">
            <img
              :src="keyIngredientsData.clinicalCooperation.teamImage"
              :alt="keyIngredientsData.clinicalCooperation.title"
              class="w-full h-auto rounded-lg shadow-lg"
            />
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

// 获取核心成分数据
const keyIngredientsData = computed(() => {
  return dataSource.value.keyIngredients || {
    title: 'R&D Team & Key Ingredients',
    drShona: {
      name: '',
      image: '',
      background1: [],
      background2: []
    },
    clinicalCooperation: {
      title: '',
      description: '',
      teamMembers: []
    }
  }
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}
</style>

