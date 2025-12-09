<template>
  <div 
    ref="containerRef"
    class="lazy-image-container relative overflow-hidden"
    :class="containerClass"
    :style="containerStyle"
  >
    <!-- 骨架屏占位符 -->
    <div 
      v-if="!isLoaded && !hasError"
      class="absolute inset-0 skeleton-placeholder"
      :class="skeletonClass"
    >
      <div class="absolute inset-0 shimmer"></div>
    </div>
    
    <!-- 实际图片 -->
    <img
      v-if="shouldLoad"
      ref="imgRef"
      :src="src"
      :alt="alt"
      :class="[
        'lazy-image',
        imageClass,
        {
          'opacity-0': !isLoaded,
          'opacity-100': isLoaded,
        }
      ]"
      @load="handleLoad"
      @error="handleError"
      loading="lazy"
    />
    
    <!-- 错误占位符 -->
    <div 
      v-if="hasError"
      class="absolute inset-0 flex items-center justify-center bg-gray-100"
      :class="errorClass"
    >
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  containerClass: {
    type: String,
    default: ''
  },
  imageClass: {
    type: String,
    default: 'w-full h-full object-cover'
  },
  skeletonClass: {
    type: String,
    default: 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100'
  },
  errorClass: {
    type: String,
    default: ''
  },
  containerStyle: {
    type: Object,
    default: () => ({})
  },
  rootMargin: {
    type: String,
    default: '50px' // 提前50px开始加载
  }
})

const containerRef = ref(null)
const imgRef = ref(null)
const shouldLoad = ref(false)
const isLoaded = ref(false)
const hasError = ref(false)
let observer = null

// 检查是否应该开始加载图片
const checkIntersection = () => {
  if (!containerRef.value) return
  
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          shouldLoad.value = true
          observer?.unobserve(entry.target)
        }
      })
    },
    {
      rootMargin: props.rootMargin,
      threshold: 0.01
    }
  )
  
  observer.observe(containerRef.value)
}

const handleLoad = () => {
  isLoaded.value = true
  hasError.value = false
}

const handleError = () => {
  hasError.value = true
  isLoaded.value = false
}

onMounted(() => {
  // 如果浏览器不支持 IntersectionObserver，直接加载
  if (!window.IntersectionObserver) {
    shouldLoad.value = true
    return
  }
  
  checkIntersection()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.lazy-image-container {
  transition: opacity 0.3s ease;
}

.lazy-image {
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;
}

.lazy-image.opacity-0 {
  transform: scale(1.02);
}

.lazy-image.opacity-100 {
  transform: scale(1);
}

/* 骨架屏动画 */
.skeleton-placeholder {
  position: relative;
  overflow: hidden;
}

.shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.4) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

</style>

