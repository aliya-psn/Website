<!-- 专属服务 -->
<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-8">
      <!-- 标题和描述 -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
          {{ exclusiveServicesData.title }}
        </h1>
        <h2 class="text-lg md:text-xl font-medium text-gray-700 mb-3">
          {{ exclusiveServicesData.subtitle }}
        </h2>
        <p class="text-base md:text-lg text-gray-700 leading-relaxed font-light max-w-3xl mx-auto">
          {{ exclusiveServicesData.description }}
        </p>
      </div>

      <!-- 服务卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
        <div
          v-for="(service, index) in exclusiveServicesData.services"
          :key="index"
          class="service-card flex flex-col"
        >
          <!-- 图片区域 -->
          <div class="w-full aspect-square mb-6 overflow-hidden bg-gray-100">
            <LazyImage
              :src="service.image"
              :alt="service.title"
              container-class="w-full h-full"
              image-class="w-full h-full object-cover"
            />
          </div>
          
          <!-- 标题和描述 -->
          <h3 class="text-xl md:text-2xl font-semibold text-gray-900 mb-3 text-center">
            {{ service.title }}
          </h3>
          <p class="text-base text-gray-700 leading-relaxed font-light text-center">
            {{ service.description }}
          </p>
        </div>
      </div>

      <!-- 底部大图部分 -->
      <div class="mt-20">
        <div class="w-full mb-6 overflow-hidden bg-gray-100">
          <LazyImage
            :src="exclusiveServicesData.globalConsultation.image"
            :alt="exclusiveServicesData.globalConsultation.title"
            container-class="w-full"
            image-class="w-full h-auto object-cover"
          />
        </div>
        
        <div class="space-y-1 max-w-3xl mx-auto">
          <p
            v-for="(item, index) in exclusiveServicesData.globalConsultation.features"
            :key="index"
            class="text-sm md:text-base text-gray-700 leading-relaxed font-light text-center"
          >
            {{ item }}
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

// 获取专属服务数据
const exclusiveServicesData = computed(() => {
  return dataSource.value.exclusiveServices || {
    title: 'Exclusive Services',
    subtitle: '',
    description: '',
    services: [],
    globalConsultation: {
      title: '',
      image: '',
      features: []
    }
  }
})
</script>

<style scoped>

.service-card {
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
}
</style>

