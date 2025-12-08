<template>
  <!-- 产品系列展示区域 -->
  <div 
    class="fixed left-0 right-0 w-screen bg-gray-200 shadow-lg z-50"
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

    <!-- 产品系列横向布局 -->
    <div class="flex gap-4 px-10 py-6">
      <div
        v-for="category in data"
        :key="category.id"
        class="flex-1 flex flex-col cursor-pointer hover:opacity-90 transition-opacity group"
        @click="handleCategoryClick(category)"
      >
        <!-- 文字区域 -->
        <div class="px-4 py-4 text-center  border-b border-gray-200">
          <h3 class="text-gray-800 text-sm md:text-base font-medium mb-1">
            {{ category.title }}
          </h3>
          <p class="text-gray-600 text-xs md:text-sm">
            {{ category.description }}
          </p>
        </div>

        <!-- 图片区域 -->
        <div class="relative overflow-hidden bg-white h-[200px]">
          <img
            :src="category.image"
            class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
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
