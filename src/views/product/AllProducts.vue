<template>
  <!-- 全部产品页面 - 目前没使用 -->
  <div class="min-h-screen bg-white pt-24 md:pt-32 pb-20">
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <div class="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <!-- 左侧筛选栏 -->
        <aside class="w-full lg:w-64 shrink-0">
          <div class="bg-white border border-gray-200 rounded-lg p-6 sticky top-24">
            <h2 class="text-lg font-semibold text-gray-900 mb-6">{{ t('common.filter') }}</h2>
            
            <!-- 分类筛选 -->
            <div class="mb-6">
              <button
                @click="toggleCategoryFilter"
                class="w-full flex items-center justify-between text-base font-medium text-gray-900 mb-4 hover:text-gray-700 transition-colors"
              >
                <span>{{ t('common.category') }}</span>
                <svg
                  :class="['w-5 h-5 transition-transform', categoryFilterOpen ? 'rotate-180' : '']"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <div v-show="categoryFilterOpen" class="space-y-2">
                <label
                  v-for="category in categories"
                  :key="category.slug"
                  class="flex items-center cursor-pointer group"
                >
                  <input
                    type="radio"
                    :value="category.slug"
                    v-model="selectedCategory"
                    class="w-4 h-4 text-gray-900 border-gray-300 focus:outline-none focus:ring-0"
                  />
                  <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-light">
                    {{ category.title }}
                  </span>
                </label>
                <label class="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    value="all"
                    v-model="selectedCategory"
                    class="w-4 h-4 text-gray-900 border-gray-300 focus:outline-none focus:ring-0"
                  />
                  <span class="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors font-light">
                    {{ t('common.all') }}
                  </span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <!-- 右侧产品区域 -->
        <main class="flex-1">
          <!-- 排序栏 -->
          <div class="flex items-center justify-between mb-8">
            <div class="flex items-center gap-4">
              <label class="text-sm text-gray-700 font-light">{{ t('common.sortBy') }}</label>
              <div class="relative">
                <select
                  v-model="sortBy"
                  class="appearance-none px-5 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-0 focus:border-gray-400 transition-all duration-200 hover:border-gray-400 shadow-sm hover:shadow-md font-light cursor-pointer"
                >
                  <option value="default">{{ t('common.default') }}</option>
                  <option value="price-asc">{{ t('common.priceLowToHigh') }}</option>
                  <option value="price-desc">{{ t('common.priceHighToLow') }}</option>
                  <option value="name-asc">{{ t('common.name') }}</option>
                </select>
                <!-- 自定义下拉箭头 -->
                <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- 产品网格 -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div
              v-for="product in displayedProducts"
              :key="`${product.categorySlug}-${product.id}`"
              @click="goToProductDetail(product)"
              class="product-card group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer hover:shadow-xl"
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
                    class="px-2.5 py-1 text-xs font-medium rounded"
                    :class="getTagClass(tag)"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
              
              <!-- 产品信息 -->
              <div class="p-4">
                <!-- 产品名称 -->
                <h3 class="text-sm md:text-base font-medium text-gray-900 mb-3 line-clamp-2 min-h-12">
                  {{ product.productName }}
                </h3>
                
                <!-- 价格 -->
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span class="text-lg md:text-xl font-bold text-gray-900">
                    ${{ product.price?.toLocaleString() }}
                  </span>
                  <button
                    @click.stop="goToProductDetail(product)"
                    class="px-4 py-2 bg-white border border-gray-300 text-gray-900 text-xs font-medium rounded hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                  >
                    {{ t('common.viewDetails') }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="displayedProducts.length === 0" class="text-center py-20">
            <p class="text-gray-500 text-lg font-light">{{ t('common.noProducts') }}</p>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18nData } from '../../composables/useI18nData'
import { useI18n } from 'vue-i18n'
import LazyImage from '../../components/LazyImage.vue'

const router = useRouter()
const { productData } = useI18nData()
const { t } = useI18n()

// 筛选状态
const categoryFilterOpen = ref(true)
const priceFilterOpen = ref(false)
const customFilterOpen = ref(false)
const selectedCategory = ref('all')
const sortBy = ref('default')

// 获取所有分类
const categories = computed(() => {
  return productData.value.products || []
})

// 获取所有产品（扁平化）
const allProducts = computed(() => {
  const products = []
  productData.value.products?.forEach(category => {
    if (category.productList && category.productList.length > 0) {
      category.productList.forEach(product => {
        products.push({
          ...product,
          categorySlug: category.slug,
          categoryTitle: category.title
        })
      })
    }
  })
  return products
})

// 筛选后的产品
const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return allProducts.value
  }
  return allProducts.value.filter(product => product.categorySlug === selectedCategory.value)
})

// 排序后的产品
const displayedProducts = computed(() => {
  const products = [...filteredProducts.value]
  
  switch (sortBy.value) {
    case 'price-asc':
      return products.sort((a, b) => (a.price || 0) - (b.price || 0))
    case 'price-desc':
      return products.sort((a, b) => (b.price || 0) - (a.price || 0))
    case 'name-asc':
      return products.sort((a, b) => a.productName.localeCompare(b.productName))
    default:
      return products
  }
})

// 切换筛选器
const toggleCategoryFilter = () => {
  categoryFilterOpen.value = !categoryFilterOpen.value
}

const togglePriceFilter = () => {
  priceFilterOpen.value = !priceFilterOpen.value
}

const toggleCustomFilter = () => {
  customFilterOpen.value = !customFilterOpen.value
}

// 获取标签样式
const getTagClass = (tag) => {
  // 支持中英文标签
  if (tag === '新品' || tag === 'New') {
    return 'bg-blue-900 text-white'
  } else if (tag === '明星臻选' || tag === 'Star Selection') {
    return 'bg-yellow-400 text-gray-900'
  } else if (tag === '特价' || tag === 'Special') {
    return 'bg-red-500 text-white'
  }
  return 'bg-gray-200 text-gray-700'
}

// 跳转到产品详情
const goToProductDetail = (product) => {
  if (product.slug) {
    router.push(`/product-slug/${product.slug}`)
  } else if (product.id) {
    router.push(`/product/${product.id}`)
  }
}
</script>

<style scoped>

.product-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.product-card:hover {
  transform: translateY(-4px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 优化 select 样式 */
select {
  background-image: none;
}

select::-ms-expand {
  display: none;
}

select option {
  padding: 0.5rem;
  background-color: white;
}
</style>

