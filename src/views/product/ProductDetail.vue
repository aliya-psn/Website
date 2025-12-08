<template>
  <!-- 产品详情页面 -->
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
    <div class="pt-24 md:pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          <!-- 左侧：产品信息 -->
          <div class="space-y-8">
            <!-- 新品标签 -->
            <div v-if="productDetail.tags && productDetail.tags.includes('新品')" class="inline-block">
              <span class="px-4 py-1.5 bg-black text-white text-xs font-medium tracking-wide">
                新品
              </span>
            </div>

            <!-- 产品名称 -->
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-gray-900 leading-tight tracking-tight">
              {{ productDetail.productName }}
            </h1>

            <!-- 价格 -->
            <div class="text-5xl md:text-6xl font-bold text-gray-900 font-elegant">
              ¥{{ productDetail.price?.toLocaleString() }}
            </div>

            <!-- 产品规格 -->
            <p class="text-base md:text-lg text-gray-600 font-light leading-relaxed">
              {{ productDetail.specification }}
            </p>

            <!-- 购买按钮 -->
            <button
              @click="showQRCodeModal = true"
              class="px-10 py-4 bg-gray-800 text-white text-base font-medium rounded-lg hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl mt-8"
            >
              前往官方小程序购买
            </button>
          </div>

          <!-- 右侧：产品展示和功效 -->
          <div class="space-y-6">
            <!-- 产品图片轮播区域 -->
            <div class="relative bg-white rounded-2xl p-6 md:p-8 shadow-xl overflow-hidden">
              <!-- 图片容器 -->
              <div 
                class="flex transition-transform duration-500 ease-in-out"
                :style="{ transform: `translateX(-${currentImageIndex * 100}%)` }"
              >
                <div
                  v-for="(img, index) in productImages"
                  :key="index"
                  class="min-w-full flex items-center justify-center p-4"
                >
                  <img
                    :src="img"
                    :alt="productDetail.productName"
                    class="w-48 md:w-56 h-auto object-contain"
                  />
                </div>
              </div>

              <!-- 左右切换按钮 -->
              <button
                v-if="productImages.length > 1"
                @click="previousImage"
                class="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                aria-label="上一张"
              >
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                v-if="productImages.length > 1"
                @click="nextImage"
                class="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all z-10"
                aria-label="下一张"
              >
                <svg class="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- 轮播指示器 -->
              <div v-if="productImages.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                <button
                  v-for="(img, index) in productImages"
                  :key="index"
                  @click="currentImageIndex = index"
                  class="w-2 h-2 rounded-full transition-all duration-300"
                  :class="currentImageIndex === index ? 'bg-gray-800 w-8' : 'bg-gray-300'"
                  :aria-label="`切换到第${index + 1}张图片`"
                ></button>
              </div>
            </div>

            <!-- 功效标题 -->
            <h3 class="text-xl md:text-2xl font-elegant font-bold text-gray-900">
              功效
            </h3>

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
            <h3 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 mb-4">
              {{ productConfig.qrCodeModal.title }}
            </h3>
            <p class="text-gray-600 mb-6">
              {{ productConfig.qrCodeModal.description }}
            </p>
            
            <!-- 二维码区域 -->
            <div class="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
              <img
                :src="productConfig.qrCodeModal.qrCodeImage"
                :alt="productConfig.qrCodeModal.qrCodeAlt"
                class="w-48 h-48"
              />
            </div>
            
            <p class="text-sm text-gray-500">
              {{ productConfig.qrCodeModal.footerText }}
            </p>
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

const route = useRoute()
const { productData: productConfig } = useI18nData()
const showQRCodeModal = ref(false)
const currentImageIndex = ref(0)

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

// 产品图片数组（支持多张图片轮播）
const productImages = computed(() => {
  const images = []
  if (productDetail.value.image) {
    images.push(productDetail.value.image)
  }
  // 如果有其他图片，可以添加
  if (productDetail.value.images && Array.isArray(productDetail.value.images)) {
    images.push(...productDetail.value.images)
  }
  // 如果只有一张图片，至少显示一张
  return images.length > 0 ? images : [productDetail.value.image || '']
})

// 上一张图片
const previousImage = () => {
  if (productImages.value.length > 1) {
    currentImageIndex.value = (currentImageIndex.value - 1 + productImages.value.length) % productImages.value.length
  }
}

// 下一张图片
const nextImage = () => {
  if (productImages.value.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % productImages.value.length
  }
}
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}

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

