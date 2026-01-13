<template>
  <div
    ref="containerRef"
    class="lazy-image-container relative overflow-hidden"
    :class="containerClass"
    :style="containerStyle"
  >
    <!-- 骨架屏占位符 -->
    <div
      v-if="!placeholderLoaded && !isLoaded && !hasError"
      class="absolute inset-0 skeleton-placeholder z-10"
      :class="skeletonClass"
    >
      <div class="absolute inset-0 shimmer"></div>
    </div>

    <!-- 模糊占位图（低质量图片，仅当占位图与主图不同时显示） -->
    <img
      v-if="
        shouldLoad && resolvedPlaceholder && resolvedPlaceholder !== resolvedSrc
      "
      ref="placeholderRef"
      :src="resolvedPlaceholder"
      :alt="alt"
      :class="[
        'lazy-image placeholder-image',
        isAutoHeight ? 'relative' : 'absolute inset-0',
        imageClass,
        {
          'opacity-100': placeholderLoaded && !isLoaded,
          'opacity-0': isLoaded,
        },
      ]"
      :style="{ filter: `blur(${blurAmount}px)`, transform: 'scale(1.05)' }"
      @load="handlePlaceholderLoad"
      @error="handlePlaceholderError"
    />

    <!-- 完整清晰图片 -->
    <img
      v-if="shouldLoad && resolvedSrc"
      ref="imgRef"
      :src="resolvedSrc"
      :alt="alt"
      :class="[
        'lazy-image full-image',
        isAutoHeight ? 'relative' : 'absolute inset-0',
        imageClass,
        {
          'opacity-0': !isLoaded,
          'opacity-100': isLoaded,
          'blur-image': !isLoaded && resolvedPlaceholder === resolvedSrc,
          'sharp-image': isLoaded || resolvedPlaceholder !== resolvedSrc,
        },
      ]"
      :style="
        !isLoaded && resolvedPlaceholder === resolvedSrc
          ? { filter: `blur(${blurAmount}px)`, transform: 'scale(1.05)' }
          : {}
      "
      @load="handleLoad"
      @error="handleError"
      loading="lazy"
      :fetchpriority="preload ? 'high' : 'auto'"
    />

    <!-- 错误占位符 -->
    <div
      v-if="hasError && !placeholderLoaded"
      class="absolute inset-0 flex items-center justify-center bg-gray-100 z-20"
      :class="errorClass"
    >
      <svg
        class="w-12 h-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import {
  preloadImage,
  preconnectDomain,
  prefetchImage,
} from '../utils/imagePreloader'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
  containerClass: {
    type: String,
    default: '',
  },
  imageClass: {
    type: String,
    default: 'w-full h-full object-cover',
  },
  skeletonClass: {
    type: String,
    default: 'bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100',
  },
  errorClass: {
    type: String,
    default: '',
  },
  containerStyle: {
    type: Object,
    default: () => ({}),
  },
  rootMargin: {
    type: String,
    default: '100px',
  },
  // 是否预加载（高优先级）
  preload: {
    type: Boolean,
    default: false,
  },
  // 是否预取（低优先级）
  prefetch: {
    type: Boolean,
    default: false,
  },
  // 模糊占位图（低质量图片URL）
  placeholder: {
    type: String,
    default: '',
  },
  // 模糊程度（像素）
  blurAmount: {
    type: Number,
    default: 20,
  },
  // 是否自动生成占位图（如果未提供placeholder，尝试从原图URL生成缩略图）
  autoPlaceholder: {
    type: Boolean,
    default: true,
  },
})

const containerRef = ref(null)
const imgRef = ref(null)
const placeholderRef = ref(null)
const shouldLoad = ref(false)
const isLoaded = ref(false)
const placeholderLoaded = ref(false)
const hasError = ref(false)
const resolvedSrc = ref('')
const resolvedPlaceholder = ref('')
let observer = null

// 检测是否使用 h-auto（高度自适应）
const isAutoHeight = computed(() => {
  return props.imageClass.includes('h-auto')
})

// 处理异步图片路径（可能是 Promise）
const resolveImageSrc = async (src) => {
  if (!src) return ''

  if (typeof src === 'string') {
    return src
  }

  if (src instanceof Promise) {
    try {
      return await src
    } catch (error) {
      console.error('Failed to resolve image src:', error)
      return ''
    }
  }

  return src
}

// 生成占位图URL（如果支持的话）
const generatePlaceholder = (src) => {
  if (!src || typeof src !== 'string') return ''

  if (props.placeholder) return props.placeholder

  if (!props.autoPlaceholder) return ''

  // 尝试从URL生成占位图
  try {
    const url = new URL(src)
    url.searchParams.set('w', '20')
    url.searchParams.set('q', '20')
    return url.toString()
  } catch (e) {
    return src
  }
}

// 加载占位图
const loadPlaceholder = async () => {
  if (!props.placeholder && !props.autoPlaceholder) return

  try {
    if (props.placeholder) {
      const placeholderSrc = await resolveImageSrc(props.placeholder)
      if (placeholderSrc) {
        resolvedPlaceholder.value = placeholderSrc
        try {
          await preloadImage(placeholderSrc)
        } catch (e) {
          // 预加载失败不影响显示
        }
        return
      }
    }

    const src = await resolveImageSrc(props.src)
    if (src && typeof src === 'string') {
      const generatedPlaceholder = generatePlaceholder(src)
      if (generatedPlaceholder) {
        resolvedPlaceholder.value = generatedPlaceholder
        try {
          await preloadImage(generatedPlaceholder)
        } catch (e) {
          // 占位图预加载失败不影响主流程
        }
      }
    }
  } catch (e) {
    console.warn('Failed to load placeholder:', e)
  }
}

const handlePlaceholderLoad = () => {
  placeholderLoaded.value = true
}

const handlePlaceholderError = () => {
  placeholderLoaded.value = false
}

// 检查是否应该开始加载图片
const checkIntersection = () => {
  if (!containerRef.value) return

  if (observer) {
    observer.disconnect()
  }

  observer = new IntersectionObserver(
    async (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          shouldLoad.value = true

          // 先加载占位图（模糊预览）
          await loadPlaceholder()

          // 解析图片路径
          const src = await resolveImageSrc(props.src)
          resolvedSrc.value = src

          // 预加载优化：提前加载图片到浏览器缓存
          if (src && typeof src === 'string') {
            try {
              await preloadImage(src)
            } catch (e) {
              console.warn('Preload failed:', e)
            }
          }

          observer?.unobserve(entry.target)
        }
      }
    },
    {
      rootMargin: props.rootMargin,
      threshold: 0.01,
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

// 加载图片
const loadImage = async () => {
  if (!props.src) return

  isLoaded.value = false
  hasError.value = false
  placeholderLoaded.value = false

  if (shouldLoad.value || !window.IntersectionObserver) {
    shouldLoad.value = true

    await loadPlaceholder()

    const src = await resolveImageSrc(props.src)
    resolvedSrc.value = src

    if (src && typeof src === 'string') {
      try {
        await preloadImage(src)
      } catch (e) {
        console.warn('Preload failed:', e)
      }
    }
  }
}

// 监听 src 变化
watch(
  () => props.src,
  async (newSrc, oldSrc) => {
    if (newSrc !== oldSrc && newSrc) {
      isLoaded.value = false
      hasError.value = false
      placeholderLoaded.value = false
      resolvedPlaceholder.value = ''

      if (
        typeof newSrc === 'string' &&
        (newSrc.startsWith('http://') || newSrc.startsWith('https://'))
      ) {
        preconnectDomain(newSrc)
      }

      if (props.prefetch && typeof newSrc === 'string') {
        try {
          const src = await resolveImageSrc(newSrc)
          if (src && typeof src === 'string') {
            prefetchImage(src)
          }
        } catch (e) {
          // 忽略错误
        }
      }

      if (shouldLoad.value) {
        await loadPlaceholder()

        const src = await resolveImageSrc(newSrc)
        resolvedSrc.value = src

        if (src && typeof src === 'string') {
          try {
            await preloadImage(src)
          } catch (e) {
            console.warn('Preload failed:', e)
          }
        }
      } else {
        if (observer) {
          observer.disconnect()
        }
        checkIntersection()
      }
    }
  },
  { immediate: false }
)

// 监听 placeholder 变化
watch(
  () => props.placeholder,
  async (newPlaceholder) => {
    if (newPlaceholder && shouldLoad.value) {
      try {
        const placeholderSrc = await resolveImageSrc(newPlaceholder)
        if (placeholderSrc) {
          resolvedPlaceholder.value = placeholderSrc
        }
      } catch (e) {
        console.warn('Failed to load placeholder:', e)
      }
    }
  }
)

onMounted(async () => {
  if (props.src && typeof props.src === 'string') {
    if (props.src.startsWith('http://') || props.src.startsWith('https://')) {
      preconnectDomain(props.src)
    }

    if (props.prefetch) {
      try {
        const src = await resolveImageSrc(props.src)
        if (src && typeof src === 'string') {
          prefetchImage(src)
        }
      } catch (e) {
        // 忽略错误
      }
    }

    if (props.preload) {
      try {
        await loadPlaceholder()

        const src = await resolveImageSrc(props.src)
        if (src && typeof src === 'string') {
          await preloadImage(src)
          shouldLoad.value = true
          resolvedSrc.value = src
        }
      } catch (e) {
        console.warn('Preload failed:', e)
      }
    }
  }

  if (!window.IntersectionObserver) {
    await loadImage()
    return
  }

  if (!props.preload) {
    checkIntersection()
  }
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
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity;
}

.lazy-image.opacity-0 {
  transform: scale(1.02);
}

.lazy-image.opacity-100 {
  transform: scale(1);
}

/* 占位图样式（模糊预览） */
.placeholder-image {
  z-index: 1;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, filter;
}

.placeholder-image.opacity-0 {
  opacity: 0 !important;
}

/* 完整图片样式 */
.full-image {
  z-index: 2;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    filter 0.8s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, filter;
}

/* 渐进式加载：模糊到清晰 */
.blur-image {
  filter: blur(20px);
  transform: scale(1.05);
}

.sharp-image {
  filter: blur(0);
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
