<template>
  <!-- 产品详情页面 -->
  <div class="min-h-screen bg-white">
    <!-- 主内容区域 -->
    <div class="pt-24 md:pt-28">
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

      <!-- 描述和产品图片区域 -->
      <!-- 有产品列表时使用左右布局，没有时保持原先的居中布局 -->
      <template
        v-if="productData.productList && productData.productList.length > 0"
      >
        <p
          v-if="productData.shortDescription"
          class="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto font-light text-center mb-2 md:mb-4"
        >
          {{ productData.shortDescription }}
        </p>
        <div
          v-if="productData.description || productData.productImage"
        >
          <div class="max-w-7xl mx-auto px-6 md:px-12">
            <div
              class="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 max-w-4xl mx-auto"
            >
              <!-- 左侧：Logo 和描述 -->
              <div class="flex-1 flex flex-col justify-center mt-2 md:mt-4 lg:mt-6 ml-2 md:ml-4 lg:ml-6">
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
                  class="text-xs md:text-sm text-gray-600 leading-tight font-light max-w-2xl"
                >
                  {{ productData.shortDescription }}
                </p>
              </div>

              <!-- 右侧：产品图片 -->
              <div
                v-if="productData.descImage"
                :class="[
                  'shrink-0 w-full lg:w-1/2 flex justify-center',
                  isSeries2 
                    ? 'mt-2 md:mt-4 lg:mt-6 xl:mt-8'
                    : '-mt-2 md:-mt-4 lg:-mt-6 xl:-mt-8'
                ]"
              >
                <div :class="[
                  'w-full flex items-center justify-center',
                  isSeries2 
                    ? 'max-w-[160px] md:max-w-[180px] lg:max-w-[200px] h-[200px] md:h-[220px] lg:h-[280px]'
                    : 'max-w-[200px] md:max-w-[240px] lg:max-w-[280px] h-[260px] md:h-[300px] lg:h-[340px]'
                ]">
                  <LazyImage
                    :key="productData.descImage"
                    :src="productData.descImage"
                    container-class="w-full h-full flex items-center justify-center"
                    image-class="w-full h-full object-contain"
                  />
                </div>
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
        <div class="pt-8 md:pt-12 pb-2 md:pb-4 relative overflow-hidden">
          <div class="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div
              class="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6"
            >
              <!-- 产品图片 -->
              <div class="shrink-0">
                <LazyImage
                  :key="productData.productImage"
                  :src="productData.productImage"
                  :alt="productData.title"
                  container-class="w-80 md:w-[24rem] lg:w-[36rem] xl:w-[40rem] min-w-80 md:min-w-[24rem] lg:min-w-[36rem] h-auto"
                  image-class="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 系列1和系列2  产品列表区域 -->
      <div
        v-if="productData.productList && productData.productList.length > 0"
        class="bg-white pb-12 md:pb-20 -mt-[60px]"
      >
        <div class="max-w-7xl mx-auto px-6 md:px-12">
          <!-- 产品网格 - 每行两个 -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-x-3 md:gap-x-4 gap-y-3 md:gap-y-4 max-w-4xl mx-auto"
          >
            <div
              v-for="product in productData.productList"
              :key="product.id"
              @click="goToProductDetail(product)"
              class="product-card group bg-white rounded-xl overflow-hidden transition-all duration-300"
            >
              <!-- 产品图片区域 -->
              <div
                :class="[
                  'relative w-full overflow-hidden flex items-center justify-center mx-auto bg-white p-4 md:p-6',
                  isSeries2 
                    ? 'h-46 md:h-54 lg:h-64 xl:h-60'
                    : 'h-54 md:h-66 lg:h-72 xl:h-80'
                ]"
              >
                <LazyImage
                  :key="product.image"
                  :src="product.image"
                  :alt="product.productName"
                  container-class="w-full h-full flex items-center justify-center"
                  image-class="w-full h-full max-w-[60%] object-contain mx-auto my-auto group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <!-- 产品信息 -->
              <div class="pb-8 md:pb-10 text-center space-y-2 px-2 md:px-4 lg:px-6">
                <!-- 产品名称 -->
                <h3 class="text-[28px] font-medium text-gray-900 leading-[1.1]">
                  {{ product.productName }}
                </h3>
                <!-- 产品规格 -->
                <p
                  class="text-[17px] text-gray-900 font-light leading-tight"
                >
                  {{ product.description }}
                </p>
                <!-- 价格 -->
                <div
                  class="flex items-center justify-center pt-4 md:pt-6 text-gray-900 text-[17px] font-medium"
                >
                  <span class="mr-1">
                    {{ t('common.currency') }}
                  </span>
                  <span class="font-price">{{
                    product.price.toLocaleString()
                  }}</span>
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

// 判断是否是系列2（advanced-repair-collection）
const isSeries2 = computed(() => {
  return props.slug === 'advanced-repair-collection'
})

// 根据 slug 获取产品数据
const productData = computed(() => {
  const product = productDataSource.value.products?.find(
    (p) => p.slug === props.slug
  )

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
.font-price {
  font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', 'Roboto Mono',
    'Courier New', 'Courier', 'monospace';
}
.product-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.15);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 0 30px 8px rgba(0, 0, 0, 0.2);
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
