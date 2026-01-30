<template>
  <div
    ref="containerRef"
    class="lazy-image-container"
    :class="[
      containerClass,
      // 容器始终需要 relative，以确保绝对定位的图片相对于正确的容器
      'relative',
      // 如果容器类中没有 flex，且不是 h-auto，则添加 overflow-hidden
      !containerClass.includes('flex') && !isAutoHeight ? 'overflow-hidden' : ''
    ]"
    :style="containerStyle"
  >

    <!-- 占位图（模糊预览） -->
    <img
      v-if="shouldLoad && resolvedPlaceholder"
      ref="placeholderImgRef"
      :src="resolvedPlaceholder"
      :alt="alt"
      :class="[
        'placeholder-image',
        (isAutoHeight || forceRelative) ? 'block mx-auto' : 'absolute inset-0',
        imageClass,
        {
          'hide': isLoaded
        }
      ]"
      :style="placeholderStyle"
      @load="handlePlaceholderLoad"
      @error="handleError"
      loading="lazy"
      :fetchpriority="preload ? 'high' : 'auto'"
    />

    <!-- 清晰图 -->
    <img
      v-if="shouldLoad && resolvedSrc"
      ref="imgRef"
      :src="resolvedSrc"
      :alt="alt"
      :class="[
        'full-image',
        (isAutoHeight || forceRelative) ? 'block mx-auto' : 'inset-0',
        imageClass,
        {
          'show': isLoaded,
          'custom-position': allowCustomPosition
        }
      ]"
      :style="fullImageStyle"
      @load="handleImageLoad"
      @error="handleError"
      loading="lazy"
      :fetchpriority="preload ? 'high' : 'auto'"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { preloadImage, preconnectDomain, prefetchImage } from '../utils/imagePreloader'

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
  containerStyle: {
    type: Object,
    default: () => ({})
  },
  // 强制使用相对定位（即使不包含 h-auto/w-auto）
  forceRelative: {
    type: Boolean,
    default: false
  },
  // 允许自定义位置（不设置默认的 top 和 left）
  allowCustomPosition: {
    type: Boolean,
    default: false
  },
  rootMargin: {
    type: String,
    default: '100px'
  },
  // 是否预加载（高优先级）
  preload: {
    type: Boolean,
    default: false
  },
  // 是否预取（低优先级）
  prefetch: {
    type: Boolean,
    default: false
  },
  // 模糊占位图（低质量图片URL）
  placeholder: {
    type: String,
    default: ''
  },
  // 模糊程度（像素）
  blurAmount: {
    type: Number,
    default: 20
  },
  // 是否自动生成占位图（如果未提供placeholder，尝试从原图URL生成缩略图）
  autoPlaceholder: {
    type: Boolean,
    default: true
  }
})

const containerRef = ref(null)
const imgRef = ref(null)
const placeholderImgRef = ref(null)
const shouldLoad = ref(false)
const isLoaded = ref(false)
const placeholderLoaded = ref(false)
const resolvedSrc = ref('')
const resolvedPlaceholder = ref('')
let observer = null

// 检测是否使用 h-auto 或 w-auto（高度或宽度自适应）
const isAutoHeight = computed(() => {
  return props.imageClass.includes('h-auto') || props.imageClass.includes('w-auto')
})

// 占位图样式（应用模糊效果）
const placeholderStyle = computed(() => {
  const style = {}

  // 占位图始终应用模糊效果
  // 移除 scale 或减小到 1.01，避免尺寸不匹配导致的抖动
  style.filter = `blur(${props.blurAmount}px)`
  style.transform = 'scale(1.01)'
  style.transformOrigin = 'center center'
  // 启用硬件加速，减少抖动
  style.willChange = 'opacity, transform, filter'
  style.backfaceVisibility = 'hidden'

  return style
})

// 清晰图样式（无模糊效果）
const fullImageStyle = computed(() => {
  const style = {}

  // 启用硬件加速，确保与占位图尺寸一致
  style.transform = 'scale(1)'
  style.transformOrigin = 'center center'
  style.willChange = 'opacity'
  style.backfaceVisibility = 'hidden'

  return style
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
    // URL解析失败，返回原图（渐进式加载）
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

// 处理占位图加载完成
const handlePlaceholderLoad = () => {
  placeholderLoaded.value = true
}

// 处理清晰图加载完成
const handleImageLoad = () => {
  isLoaded.value = true
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

          // 先解析图片路径
          const src = await resolveImageSrc(props.src)
          resolvedSrc.value = src

          // 加载占位图（模糊预览）
          await loadPlaceholder()

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
      threshold: 0.01
    }
  )

  observer.observe(containerRef.value)
}


const handleError = () => {
  // 图片加载错误时不做任何处理
}

// 加载图片
const loadImage = async () => {
  if (!props.src) return

  isLoaded.value = false
  placeholderLoaded.value = false

  if (shouldLoad.value || !window.IntersectionObserver) {
    shouldLoad.value = true

    const src = await resolveImageSrc(props.src)
    resolvedSrc.value = src

    await loadPlaceholder()

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
watch(() => props.src, async (newSrc, oldSrc) => {
  if (newSrc !== oldSrc && newSrc) {
    isLoaded.value = false
    placeholderLoaded.value = false
    resolvedPlaceholder.value = ''
    
    if (typeof newSrc === 'string' && (newSrc.startsWith('http://') || newSrc.startsWith('https://'))) {
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
      const src = await resolveImageSrc(newSrc)
      resolvedSrc.value = src

      await loadPlaceholder()

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
}, { immediate: false })

// 监听 placeholder 变化
watch(() => props.placeholder, async (newPlaceholder) => {
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
})

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
        const src = await resolveImageSrc(props.src)
        if (src && typeof src === 'string') {
          await preloadImage(src)
          shouldLoad.value = true
          resolvedSrc.value = src
          await loadPlaceholder()
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
  /* 确保容器稳定，避免布局抖动 */
  contain: layout style paint;
  /* 启用硬件加速 */
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* 当容器使用 flex 居中时，确保图片能正确居中 */
.lazy-image-container.flex {
  display: flex;
}

/* 绝对定位的图片（用于填充容器） */
.placeholder-image.absolute,
.full-image.absolute {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  /* 包含 transform 和 filter 的过渡，使切换更平滑 */
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              filter 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  /* 启用硬件加速 */
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

/* block定位的图片（用于自适应大小） */
.placeholder-image.block {
  position: relative !important;
  display: block;
  margin-left: auto !important;
  margin-right: auto !important;
  width: auto !important;
  height: auto !important;
  max-width: 100%;
  max-height: 100%;
}

.full-image.block {
  position: absolute !important;
  display: block;
  width: 100% !important;
  margin: 0 !important;
}

/* 默认设置 top 和 left 为 0（除非 allowCustomPosition 为 true） */
.full-image.block:not(.custom-position) {
  top: 0 !important;
  left: 0 !important;
}

/* 占位图样式（模糊预览）- 始终在底部 */
.placeholder-image {
  z-index: 1;
}

/* 清晰图样式 - 在占位图之上 */
.full-image {
  z-index: 2;
}

/* 默认显示状态 */
.placeholder-image {
  opacity: 1;
}

.full-image {
  opacity: 0;
}

/* 清晰图加载完成后，占位图隐藏，清晰图显示 */
.placeholder-image.hide {
  opacity: 0 !important;
}

.full-image.show {
  opacity: 1 !important;
}
</style>
