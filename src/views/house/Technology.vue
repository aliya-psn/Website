<!-- 技术与专利 -->
<template>
  <div class="min-h-screen bg-white pt-16 md:pt-20">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <!-- 第一部分：Ingredients & Technology Qualification process -->
      <div class="mb-20">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          {{ technologyData.qualification.title }}
        </h2>
        
        <!-- 证书图片 -->
        <div class="flex justify-center max-w-5xl mx-auto">
          <div class="w-full max-w-4xl">
            <LazyImage
              :src="technologyData.qualification.certificateImage"
              :alt="technologyData.qualification.title"
              container-class="w-full"
              image-class="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <!-- 第二部分：Ingredient patent -->
      <div>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          {{ technologyData.patents.title }}
        </h2>
        
        <!-- 专利图片 -->
        <div class="flex justify-center max-w-5xl mx-auto">
          <div class="w-full max-w-4xl">
            <LazyImage
              :src="technologyData.patents.patentImage"
              :alt="technologyData.patents.title"
              container-class="w-full"
              image-class="w-full h-auto rounded-lg shadow-lg"
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
import LazyImage from '../../components/LazyImage.vue'

const { dataSource } = useI18nData()

// 获取技术与专利数据
const technologyData = computed(() => {
  return dataSource.value.technology || {
    qualification: {
      title: '',
      certificates: []
    },
    patents: {
      title: '',
      patentImage: ''
    }
  }
})
</script>

<style scoped>

.certificate-item,
.patent-item {
  transition: transform 0.3s ease;
}

.certificate-item:hover,
.patent-item:hover {
  transform: translateY(-4px);
}
</style>

