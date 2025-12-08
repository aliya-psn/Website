<template>
  <!-- 全部产品展示区域 - 首页第四个页面 -->
  <section
    id="all-products-section"
    class="relative bg-linear-to-br from-gray-50 via-white to-gray-50 overflow-hidden py-16 md:py-24"
  >
    <div class="max-w-7xl mx-auto px-6 md:px-12">
      <!-- 标题区域 -->
      <div class="text-center mb-12 md:mb-16 animate-fade-in-up">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-elegant font-bold text-gray-900 mb-4 tracking-tight"
        >
          {{ sectionData.title }}
        </h2>
        <div
          class="w-16 h-0.5 bg-linear-to-r from-transparent via-gray-900 to-transparent mx-auto mb-6"
        ></div>
        <p
          class="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed"
        >
          {{ sectionData.description }}
        </p>
      </div>

      <!-- 产品网格 -->
      <div
        class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-12"
      >
        <div
          v-for="(product, index) in displayedProducts"
          :key="`${product.categorySlug}-${product.id}`"
          @click="goToProductDetail(product)"
          class="product-card group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 cursor-pointer hover:shadow-xl animate-fade-in-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- 产品图片区域 -->
          <div class="relative bg-gray-50 aspect-square overflow-hidden">
            <img
              :src="product.image"
              :alt="product.productName"
              class="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
            />
            <!-- 标签 -->
            <div
              v-if="product.tags && product.tags.length > 0"
              class="absolute top-2 left-2 flex flex-col gap-1"
            >
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="px-2 py-0.5 text-xs font-medium rounded"
                :class="getTagClass(tag)"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- 产品信息 -->
          <div class="p-3 md:p-4">
            <!-- 产品名称 -->
            <h3
              class="text-xs md:text-sm font-medium text-gray-900 mb-2 font-elegant line-clamp-2 min-h-10"
            >
              {{ product.productName }}
            </h3>

            <!-- 价格 -->
            <div class="flex items-center justify-between pt-2 border-t border-gray-100">
              <span
                class="text-base md:text-lg font-bold text-gray-900 font-elegant"
              >
                ¥{{ product.price?.toLocaleString() }}
              </span>
              <button
                class="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                {{ t('common.viewDetails') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 查看更多按钮 -->
      <div class="text-center animate-fade-in-up-delay">
        <button
          @click="goToAllProducts"
          class="px-8 py-3 rounded-lg bg-gray-900 text-white flex items-center justify-center mx-auto hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl font-elegant font-medium text-base"
        >
          <span>{{ t('common.viewAllProducts') }}</span>
          <svg
            class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18nData } from '../../composables/useI18nData'
import { useI18n } from 'vue-i18n'

const { productData } = useI18nData()
const { t } = useI18n()

const router = useRouter()

// 获取全部产品区域配置
const sectionData = computed(() => {
  return (
    productData.value.allProductsSection || {
      title: '全部产品',
      description: '探索美丽日记的完整产品系列，发现适合您的专属护肤方案',
    }
  )
})

// 获取所有产品（扁平化）
const allProducts = computed(() => {
  const products = []
  productData.value.products?.forEach((category) => {
    if (category.productList && category.productList.length > 0) {
      category.productList.forEach((product) => {
        products.push({
          ...product,
          categorySlug: category.slug,
          categoryTitle: category.title,
        })
      })
    }
  })
  return products
})

// 只显示前 8 个产品作为预览
const displayedProducts = computed(() => {
  return allProducts.value.slice(0, 8)
})

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

// 跳转到全部产品页面
const goToAllProducts = () => {
  router.push('/all-products')
}

// 监听滚动，实现滚动触发动画
onMounted(() => {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll')
      }
    })
  }, observerOptions)

  // 延迟执行，确保 DOM 已渲染
  setTimeout(() => {
    const allProductsSection = document.getElementById('all-products-section')
    if (allProductsSection) {
      const animatedElements = allProductsSection.querySelectorAll(
        '.animate-fade-in-up, .animate-fade-in-up-delay'
      )
      animatedElements.forEach((el) => {
        observer.observe(el)
      })
    }
  }, 500)
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia',
    'Times New Roman', serif;
}

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

/* 滚动区域动画 - 初始状态隐藏 */
.animate-fade-in-up,
.animate-fade-in-up-delay {
  opacity: 0;
}

/* 滚动触发后显示动画 */
.animate-fade-in-up.animate-on-scroll {
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

.animate-fade-in-up-delay.animate-on-scroll {
  animation: fadeInUp 0.8s ease-out 0.6s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
