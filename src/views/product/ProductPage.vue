<template>
  <!-- 产品详情页面 -->
  <div class="min-h-screen bg-white">
    <!-- 主内容区域 -->
    <div class="pt-24 md:pt-28">
      <!-- 标题区域 -->
      <div class="bg-white py-8">
        <div class="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            {{ productData.title }}
          </h1>
          <p
            v-if="productData.shortDescription"
            class="text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-light"
          >
            {{ productData.shortDescription }}
          </p>
        </div>
      </div>

      <!-- 描述和产品图片区域 -->
      <!-- 有产品列表时使用左右布局，没有时保持原先的居中布局 -->
      <template
        v-if="productData.productList && productData.productList.length > 0"
      >
        <div
          v-if="productData.description || productData.productImage"
          class="bg-white pt-8 md:pt-12"
        >
          <div class="max-w-7xl mx-auto px-6 md:px-12">
            <div
              class="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12"
            >
              <!-- 左侧：Logo 和描述 -->
              <div
                class="flex-1 flex flex-col justify-center lg:justify-start pl-6 lg:pl-12"
              >
                <!-- Logo -->
                <div class="mb-2">
                  <img
                    :src="logoImage"
                    alt="Logo"
                    class="h-8 md:h-10 lg:h-12 object-contain"
                    style="max-height: 100%"
                  />
                </div>

                <!-- 描述 -->
                <div
                  v-if="
                    productData.description &&
                    Array.isArray(productData.description) &&
                    productData.description.length > 0
                  "
                  class="space-y-3"
                >
                  <p
                    v-for="(desc, index) in productData.description"
                    :key="index"
                    class="text-sm md:text-base text-gray-600 leading-relaxed font-light"
                  >
                    {{ desc }}
                  </p>
                </div>
                <p
                  v-else-if="productData.shortDescription"
                  class="text-sm md:text-base text-gray-600 leading-relaxed font-light"
                >
                  {{ productData.shortDescription }}
                </p>
              </div>

              <!-- 右侧：产品图片 -->
              <div
                v-if="productDataSource.descImage"
                class="flex-shrink-0 w-full lg:w-1/2 flex justify-center"
              >
                <LazyImage
                  :src="productDataSource.descImage"
                  container-class="w-full max-w-[240px] h-auto"
                  image-class="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <!-- 系列3 -->
        <div
          v-if="
            productData.description &&
            Array.isArray(productData.description) &&
            productData.description.length > 0
          "
          class="bg-white py-2"
        >
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
            <div
              class="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6"
            >
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
      </template>

      <!-- 产品列表区域 -->
      <div
        v-if="productData.productList && productData.productList.length > 0"
        class="bg-white pb-12 md:pb-20"
      >
        <div class="max-w-7xl mx-auto px-6 md:px-12 text-white">
          <!-- 产品网格 - 每行两个 -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3 md:gap-y-4">
            <div
              v-for="product in productData.productList"
              :key="product.id"
              @click="goToProductDetail(product)"
              class="product-card group text-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              style="background-color: rgb(87, 87, 91)"
            >
              <!-- 产品图片区域 -->
              <div
                class="relative w-full h-50 md:h-72 lg:h-84 overflow-hidden flex items-center justify-center mx-auto"
              >
                <LazyImage
                  :src="product.image"
                  :alt="product.productName"
                  container-class="w-full h-full flex items-center justify-center"
                  image-class="w-full h-full max-w-[50%] object-contain p-10 md:p-12 mx-auto my-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <!-- 产品信息 -->
              <div class="pb-10 md:pb-12 text-center space-y-2">
                <!-- 产品规格 -->
                <p
                  class="text-xs md:text-sm text-white font-light leading-tight"
                >
                  {{ product.description }}
                </p>

                <!-- 产品名称 -->
                <h3
                  class="text-base md:text-lg font-medium text-white"
                >
                  {{ product.productName }}
                </h3>

                <!-- 价格 -->
                <div class="flex items-center justify-center pt-4 md:pt-6">
                  <span
                    class="text-xs md:text-sm font-normal text-white"
                  >
                    {{ t('common.currency') }}
                    {{ product.price.toLocaleString() }}
                  </span>
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
import logoImage from '../../assets/logo.png'

const router = useRouter()
const { t } = useI18n()
const { productData: productDataSource, dataSource } = useI18nData()

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
})

// 根据 slug 获取产品数据
const productData = computed(() => {
  const product = productDataSource.value.products?.find(
    (p) => p.slug === props.slug
  )
  console.log(product)

  // 从 dropdownItems 中获取 title、description 和 image
  const dropdownItem = dataSource.value.navItems
    ?.find((item) => item.id === 'products')
    ?.dropdownItems?.find((item) => item.slug === props.slug)

  if (product && dropdownItem) {
    return {
      ...product,
      title: dropdownItem.title,
      shortDescription: dropdownItem.description, // 简短描述（用于标题下方）
      productImage: dropdownItem.image,
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
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.1),
    transparent
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.product-card:hover::before {
  opacity: 1;
}
</style>
