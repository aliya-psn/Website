<template>
  <!-- 产品系列展示区域 -->
  <div 
    class="fixed left-0 right-0 w-screen bg-gray-50 shadow-lg z-50"
    :style="{ top: navHeight + 'px' }"
  >
    <!-- 关闭按钮 -->
    <button
      @click="handleClose"
      class="absolute top-4 right-10 text-gray-600 hover:text-gray-800 transition-colors z-10"
      aria-label="关闭"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- 横向布局 -->
    <div class="flex gap-4 px-10 py-6 justify-center">
      <div
        v-for="(item, index) in data"
        :key="item.id || item.slug || index"
        class="flex flex-col cursor-pointer hover:opacity-90 transition-opacity group max-w-xs w-full"
        @click="handleCategoryClick(item)"
      >
        <!-- 文字区域 -->
        <div class="px-4 py-4 text-center">
          <h3 class="text-gray-800 text-sm md:text-base font-medium mb-1">
            {{ item.title || item.name }}
          </h3>
        </div>

        <!-- 图片区域 -->
        <div v-if="item.image" class="relative overflow-hidden bg-white w-[250px] h-[250px] mx-auto">
          <LazyImage
            :src="item.image"
            :alt="item.title || item.name"
            container-class="w-full h-full"
            :image-class="`min-w-full min-h-full w-full h-full ${item.objectFit || 'object-cover'} ${item.objectPosition || 'object-center'} group-hover:scale-110 transition-transform duration-500 ease-out`"
          />
          <!-- 会员体系菜单：图片下方悬浮显示描述（仅会员体系，不包括专属服务） -->
          <div v-if="isMembership && (item.slug === 'membership-system' || item.id === 'membership-system')" class="absolute bottom-[28%] left-0 right-0 px-3 py-2 pointer-events-none">
            <p class="text-gray-700 text-xs md:text-sm text-center font-medium">
              {{ item.title || item.name }}
            </p>
          </div>
        </div>
        <!-- 如果没有图片，显示占位符 -->
        <div v-else class="relative overflow-hidden bg-gray-100 w-[250px] h-[250px] mx-auto flex items-center justify-center">
          <span class="text-gray-400 text-sm">{{ item.title || item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import LazyImage from './LazyImage.vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  isMembership: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['item-click', 'close'])

const navHeight = ref(80) // 默认导航栏高度

const handleCategoryClick = (category) => {
  emit('item-click', category)
}

const handleClose = () => {
  emit('close')
}

onMounted(() => {
  // 计算导航栏高度
  const nav = document.querySelector('nav')
  if (nav) {
    navHeight.value = nav.offsetHeight
  }
})
</script>

<style scoped>
/* 下拉菜单动画 */
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.2s ease-in;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
