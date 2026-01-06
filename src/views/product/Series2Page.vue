<template>
  <!-- 进阶修护系列页面 -->
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
      <p
        v-if="productData.shortDescription"
        class="text-base md:text-lg text-gray-700 leading-relaxed max-w-xl mx-auto font-light text-center mb-2 md:mb-4"
      >
        {{ productData.shortDescription }}
      </p>
      <div class="max-w-7xl mx-auto px-6 md:px-12">
        <div
          class="flex flex-col lg:flex-row items-center lg:items-center gap-8 lg:gap-12 max-w-4xl mx-auto"
        >
          <!-- 左侧：Logo 和描述 -->
          <div
            class="flex-1 flex flex-col justify-center ml-2 md:ml-4 lg:ml-6"
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
              class="text-xs md:text-sm text-gray-600 leading-tight font-light max-w-2xl"
            >
              {{ productData.shortDescription }}
            </p>
          </div>

          <!-- 右侧：产品图片 -->
          <div
            v-if="productData.descImage || productData.navItemImage"
            class="shrink-0 w-full lg:w-1/2 flex justify-center mt-4 md:mt-6 lg:mt-8 xl:mt-10"
          >
            <div
              class="w-full flex items-center justify-center max-w-[160px] md:max-w-[180px] lg:max-w-[200px] h-[200px] md:h-[220px] lg:h-[280px]"
            >
              <LazyImage
                :key="productData.descImage || productData.navItemImage"
                :src="productData.descImage || productData.navItemImage"
                container-class="w-full h-full flex items-center justify-center"
                image-class="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 产品列表区域 -->
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
                class="relative w-full overflow-hidden flex items-center justify-center mx-auto bg-white p-4 md:p-6 h-46 md:h-54 lg:h-64 xl:h-60"
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
              <div
                class="pb-8 md:pb-10 text-center space-y-2 px-2 md:px-4 lg:px-6"
              >
                <!-- 产品名称 -->
                <h3 class="text-[28px] font-medium text-gray-900 leading-[1.1]">
                  {{ product.productName }}
                </h3>
                <!-- 产品规格 -->
                <p class="text-[17px] text-gray-900 font-light leading-tight">
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

// 根据 slug 获取产品数据
const productData = computed(() => {
  const slug = 'advanced-repair-collection'
  const product = productDataSource.value.products?.find(
    (p) => p.slug === slug
  )
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
    // 如果产品列表不为空，才添加 navItemImage
    if (product.productList && product.productList.length > 0) {
      result.navItemImage = product.descImage
    }

    return result
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

