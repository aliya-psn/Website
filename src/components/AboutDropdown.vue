<template>
  <!-- 关于我们下拉菜单 -->
  <div
    class="about-dropdown fixed left-0 right-0 w-screen z-50"
    :style="{ top: navHeight + 'px' }"
  >
    <!-- 背景装饰 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-full bg-linear-to-b from-slate-900/95 via-slate-800/98 to-slate-900/95"></div>
      <div class="absolute top-0 left-0 w-full h-full backdrop-blur-xl"></div>
      <!-- 装饰性光效 -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      <!-- 顶部装饰线 -->
      <div class="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
    </div>

    <!-- 内容区域 -->
    <div class="relative z-10 max-w-6xl mx-auto px-8 md:px-12 py-12 md:py-16">
      <!-- 关闭按钮 -->
      <button
        @click="handleClose"
        class="absolute top-6 right-8 md:right-12 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 z-20 group"
        aria-label="关闭"
      >
        <svg class="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- 标题 -->
      <div class="text-center mb-10 md:mb-12">
        <h2 class="text-2xl md:text-3xl font-elegant text-white/90 tracking-wider mb-2">
          关于我们
        </h2>
        <div class="w-20 h-px bg-linear-to-r from-transparent via-white/40 to-transparent mx-auto"></div>
      </div>
      
      <!-- 菜单列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="(item, index) in data"
          :key="item.slug || item"
          @click="handleItemClick(item)"
          class="menu-item group relative cursor-pointer"
          :style="{ animationDelay: index * 0.1 + 's' }"
        >
          <!-- 卡片背景 -->
          <div class="relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 md:p-8 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-1">
            <!-- 装饰性图标 -->
            <div class="absolute top-4 right-4 w-12 h-12 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              <svg class="w-full h-full text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            
            <!-- 内容 -->
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-1 h-8 bg-linear-to-b from-white/60 to-transparent rounded-full group-hover:from-white group-hover:to-white/60 transition-all duration-500"></div>
                <h3 class="text-white text-lg md:text-xl font-elegant tracking-wide group-hover:text-white transition-colors duration-300">
                  {{ typeof item === 'object' ? item.name : item }}
                </h3>
              </div>
              
              <!-- 悬停时的装饰线 -->
              <div class="w-0 h-px bg-linear-to-r from-white/60 to-transparent group-hover:w-full transition-all duration-500 mt-2"></div>
            </div>

            <!-- 悬停光效 -->
            <div class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div class="absolute inset-0 bg-linear-to-br from-white/5 to-transparent rounded-lg"></div>
            </div>
          </div>
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

const handleItemClick = (item) => {
  emit('item-click', item)
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
/* 下拉菜单容器 */
.about-dropdown {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

/* 优雅字体 */
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* 菜单项动画 */
.menu-item {
  animation: fadeInUp 0.6s ease-out both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 下拉菜单展开动画 */
.slide-down-enter-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 菜单项悬停效果增强 */
.menu-item:hover .menu-item {
  transform: translateY(-4px);
}

/* 响应式优化 */
@media (max-width: 768px) {
  .about-dropdown {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
}
</style>

