<!-- 核心成分 -->
<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-12 md:px-20 py-8">
      <!-- 主标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 text-center mb-16 tracking-tight">
        {{ keyIngredientsData.title }}
      </h1>

      <!-- Dr Shona Dalzell -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-center w-full">
        <!-- 左侧：肖像照片 -->
        <div class="flex justify-center lg:justify-start items-center">
          <div class="relative w-72 h-88 md:w-96 md:h-[28rem] lg:-ml-4">
            <LazyImage
              :src="keyIngredientsData.drShona.image"
              :alt="keyIngredientsData.drShona.name"
              container-class="w-full h-full"
              image-class="w-full h-full object-cover"
            />
          </div>
        </div>

        <!-- 右侧：名字和背景信息 -->
        <div class="flex flex-col justify-center space-y-6">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-name font-semibold text-gray-900">
            {{ keyIngredientsData.drShona.name }}
          </h2>
          
          <div class="space-y-4">
            <div class="space-y-2">
              <p v-for="(info, index) in keyIngredientsData.drShona.background1" :key="`bg1-${index}`" class="text-xs md:text-sm text-gray-900 leading-snug font-light tracking-normal">
                {{ info }}
              </p>
            </div>
            <div class="space-y-2 mt-6 md:mt-8">
              <p v-for="(info, index) in keyIngredientsData.drShona.background2" :key="`bg2-${index}`" class="text-xs md:text-sm text-gray-900 leading-snug font-light tracking-normal">
                {{ info }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Medical Aesthetic Clinical Cooperation 部分 -->
      <div class="mt-20 w-full">
        <h2 class="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-8">
          {{ keyIngredientsData.clinicalCooperation.title }}
        </h2>
        
        <p class="text-xs md:text-sm text-gray-900 leading-relaxed font-light text-center max-w-4xl mx-auto mb-12">
          {{ keyIngredientsData.clinicalCooperation.description }}
        </p>

        <!-- 团队图片 -->
        <div class="w-full">
          <LazyImage
            :src="keyIngredientsData.clinicalCooperation.teamImage"
            :alt="keyIngredientsData.clinicalCooperation.title"
            container-class="w-full"
            image-class="w-full h-auto shadow-lg"
          />
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
@font-face {
  font-family: 'Monbaiti';
  src: url('../../assets/monbaiti.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.font-name {
  font-family: 'Monbaiti', 'SimSun', 'STSong', '宋体', serif;
}
</style>

