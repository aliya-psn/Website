<template>
  <!-- 限量尊享系列页面 -->
  <div class="h-screen bg-white overflow-hidden">
    <!-- 主内容区域 -->
    <div class="pt-24 md:pt-28 h-full flex flex-col">
      <!-- 标题区域 -->
      <div class="bg-white pt-8 pb-4">
        <div class="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 tracking-tight mb-3"
          >
            {{ productData.title }}
          </h1>
        </div>
      </div>

      <!-- 描述区域 -->
      <div
        v-if="
          productData.description &&
          Array.isArray(productData.description) &&
          productData.description.length > 0
        "
        class="bg-white py-2"
      >
        <div class="max-w-3xl mx-auto px-6 md:px-12">
          <div class="space-y-0.5 text-center">
            <p
              v-if="productData.shortDescription"
              class="text-sm md:text-base text-gray-600 leading-tight font-light tracking-wide"
            >
              {{ productData.shortDescription }}
            </p>
            <p
              v-for="(desc, index) in productData.description"
              :key="index"
              class="text-sm md:text-base text-gray-600 leading-tight font-light tracking-wide"
            >
              {{ desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- 产品图片区域 -->
      <div
        class="flex-1 flex items-center justify-center relative overflow-hidden w-full"
      >
        <!-- 产品图片 -->
        <div class="w-[50%] md:w-[52%] lg:w-[56%] xl:w-[60%] 2xl:w-[64%] 3xl:w-[68%] 4xl:w-[72%]">
          <LazyImage
            :key="productData.descImage"
            :src="productData.descImage"
            :alt="productData.title"
            container-class="w-full h-auto"
            image-class="w-full h-full object-contain"
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

const { productData: productDataSource, dataSource } = useI18nData()

// 根据 slug 获取产品数据
const productData = computed(() => {
  const slug = 'limited-exclusive-collection'
  const product = productDataSource.value.products?.find((p) => p.slug === slug)
  // 从 dropdownItems 中获取 title、description 和 image
  const dropdownItem = dataSource.value.navItems
    ?.find((item) => item.id === 'products')
    ?.dropdownItems?.find((item) => item.slug === slug)

  if (product && dropdownItem) {
    const result = {
      ...product,
      title: dropdownItem.title,
      shortDescription: dropdownItem.description,
      descImage: dropdownItem.seriesImage,
    }

    return result
  }
  return product
})
</script>

<style scoped></style>
