<template>
  <!-- 产品详情页面 - 目前没使用 -->
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
    <div class="pt-24 md:pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <!-- 左侧：产品信息 -->
          <div class="space-y-8">
            <!-- 产品名称 -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight tracking-tight">
              {{ productDetail.productName }}
            </h1>

            <!-- 价格 -->
            <div class="text-5xl md:text-6xl font-bold text-gray-900">
              ${{ productDetail.price?.toLocaleString() }}
            </div>

            <!-- 产品规格 -->
            <p class="text-base md:text-lg text-gray-600 font-light leading-relaxed">
              {{ productDetail.description }}
            </p>

            <!-- 购买按钮 -->
            <button
              @click="showQRCodeModal = true"
              class="px-10 py-4 bg-gray-800 text-white text-base font-medium rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl mt-8"
            >
              {{ productConfig.qrCodeModal.buttonText }}
            </button>
          </div>

          <!-- 右侧：产品展示和功效 -->
          <div class="space-y-6">
            <!-- 产品图片区域 -->
            <div class="relative bg-transparent aspect-square overflow-hidden group">
              <LazyImage
                :src="productDetail.image"
                :alt="productDetail.productName"
                container-class="w-full h-full"
                :image-class="`w-full h-full object-contain ${getImagePadding(productDetail.slug)} group-hover:scale-105 transition-transform duration-300`"
              />
            </div>

            <!-- 详细功效说明 -->
            <div v-if="productDetail.benefitDetails" class="space-y-3">
              <p
                v-for="(detail, index) in productDetail.benefitDetails"
                :key="index"
                class="text-sm md:text-base text-gray-700 leading-relaxed font-light"
              >
                {{ detail }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 二维码弹窗 -->
    <transition name="modal">
      <div
        v-if="showQRCodeModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click.self="showQRCodeModal = false"
      >
        <div class="bg-white rounded-2xl p-8 md:p-12 max-w-md w-full mx-4 relative shadow-2xl">
          <!-- 关闭按钮 -->
          <button
            @click="showQRCodeModal = false"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="关闭"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- 弹窗内容 -->
          <div class="text-center">
            <h3 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {{ productConfig.qrCodeModal.title }}
            </h3>
            <p class="text-gray-600 mb-6">
              {{ productConfig.qrCodeModal.description }}
            </p>
            
            <!-- 二维码区域 -->
            <!-- <div class="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
              <LazyImage
                :src="productConfig.qrCodeModal.qrCodeImage"
                :alt="productConfig.qrCodeModal.qrCodeAlt"
                container-class="w-48 h-48"
                image-class="w-full h-full object-contain"
              />
            </div>
            
            <p class="text-sm text-gray-500">
              {{ productConfig.qrCodeModal.footerText }}
            </p> -->
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18nData } from '../../composables/useI18nData'
import LazyImage from '../../components/LazyImage2.vue'

const route = useRoute()
const { productData: productConfig } = useI18nData()
const showQRCodeModal = ref(false)

// 根据产品ID或slug获取产品详情
const productDetail = computed(() => {
  const productId = route.params.id
  const productSlug = route.params.slug || route.params.id

  // 在所有产品系列中查找产品
  for (const product of productConfig.value.products || []) {
    if (product.productList) {
      // 通过slug查找
      if (productSlug && typeof productSlug === 'string') {
        const found = product.productList.find(p => p.slug === productSlug)
        if (found) return found
      }
      // 找不到通过id找
      if (productId) {
        const found = product.productList.find(p => p.id === Number(productId))
        if (found) return found
      }
    }
  }
  
  return {}
})

// 获取图片 padding 样式
const getImagePadding = (slug) => {
  // slug 为 "basic-revitalization-collection-1" 或 "basic-revitalization-collection-2" 的产品使用 p-2，其他使用 p-14
  return (slug === 'basic-revitalization-collection-1' || slug === 'basic-revitalization-collection-2') ? 'p-2' : 'p-14'
}
</script>

<style scoped>

/* 弹窗动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white,
.modal-leave-to .bg-white {
  transform: scale(0.9);
  opacity: 0;
}
</style>

