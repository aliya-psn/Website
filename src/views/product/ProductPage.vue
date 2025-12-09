<template>
  <!-- 产品详情页面 -->
  <div class="min-h-screen bg-white">
    <!-- 主内容区域 -->
    <div class="pt-24 md:pt-28">
      <!-- 标题区域 -->
      <div class="bg-white py-8">
        <div class="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            {{ productData.title }}
          </h1>
          <p v-if="productData.shortDescription" class="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-light">
            {{ productData.shortDescription }}
          </p>
        </div>
      </div>

      <!-- 详细描述区域 -->
      <div v-if="productData.description && Array.isArray(productData.description) && productData.description.length > 0" class="bg-white py-2">
        <div class="max-w-3xl mx-auto px-6 md:px-12">
          <div class="space-y-2 text-center">
            <p
              v-for="(desc, index) in productData.description"
              :key="index"
              class="text-sm md:text-base text-gray-600 leading-relaxed font-light tracking-wide"
            >
              {{ desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- 产品展示区域 -->
      <div class="py-2 md:py-4 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div class="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
            <!-- 产品图片 -->
            <div class="shrink-0">
              <LazyImage 
                :src="productData.productImage" 
                :alt="productData.title"
                container-class="w-96 md:w-[28rem] lg:w-[40rem] xl:w-[44rem] min-w-96 md:min-w-[28rem] lg:min-w-[40rem] h-auto"
                image-class="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 产品列表区域 -->
      <div v-if="productData.productList && productData.productList.length > 0" class="bg-white py-12 md:py-20">
        <div class="max-w-7xl mx-auto px-6 md:px-12">
          <h2 class="text-3xl md:text-4xl font-elegant font-bold text-gray-900 text-center mb-12">
            {{ t('common.seriesProducts') }}
          </h2>
          
          <!-- 产品网格 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div
              v-for="product in productData.productList"
              :key="product.id"
              @click="goToProductDetail(product)"
              class="product-card group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <!-- 产品图片区域 -->
              <div class="relative bg-gray-50 aspect-square overflow-hidden">
                <LazyImage
                  :src="product.image"
                  :alt="product.productName"
                  container-class="w-full h-full"
                  image-class="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                <!-- 标签 -->
                <div v-if="product.tags && product.tags.length > 0" class="absolute top-3 left-3 flex flex-col gap-2">
                  <span
                    v-for="tag in product.tags"
                    :key="tag"
                    class="px-2 py-1 text-xs font-medium rounded"
                    :class="tag === '新品' ? 'bg-red-500 text-white' : 'bg-yellow-400 text-gray-900'"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <!-- 产品信息 -->
              <div class="p-4 md:p-6">
                <!-- 产品名称 -->
                <h3 class="text-base md:text-lg font-semibold text-gray-900 mb-3 font-elegant">
                  {{ product.productName }}
                </h3>
                
                <!-- 价格 -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span class="text-2xl md:text-3xl font-bold text-gray-900 font-elegant">
                    ¥ {{ product.price.toLocaleString() }}
                  </span>
                  <button
                    class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded hover:bg-gray-800 transition-colors"
                  >
                    {{ t('common.viewDetails') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useI18nData } from '../../composables/useI18nData'
import LazyImage from '../../components/LazyImage.vue'

const router = useRouter()
const { t } = useI18n()
const { productData: productDataSource, dataSource } = useI18nData()

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

// 根据 slug 获取产品数据
const productData = computed(() => {
  const product = productDataSource.value.products?.find(p => p.slug === props.slug)
  
  // 从 dropdownItems 中获取 title、description 和 image
  const dropdownItem = dataSource.value.navItems
    ?.find(item => item.id === 'products')
    ?.dropdownItems
    ?.find(item => item.slug === props.slug)
  
  if (product && dropdownItem) {
    return {
      ...product,
      title: dropdownItem.title,
      shortDescription: dropdownItem.description, // 简短描述（用于标题下方）
      description: product.description || dropdownItem.description, // 详细描述（可能是数组）
      productImage: dropdownItem.image
    }
  }
  
  return product
})

// 跳转到产品详情页
const goToProductDetail = (product) => {
  if (product.slug) {
    router.push(`/product/${product.slug}`)
  } else if (product.id) {
    router.push(`/product/${product.id}`)
  }
}
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}

.product-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-4px);
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover::before {
  opacity: 1;
}
</style>

