<template>
  <div 
    ref="containerRef"
    class="lazy-image-container"
    :class="[
      containerClass,
      // 如果图片使用 absolute 定位，容器需要 relative
      !isAutoHeight ? 'relative' : '',
      // 如果容器类中没有 flex，且不是 h-auto，则添加 overflow-hidden
      !containerClass.includes('flex') && !isAutoHeight ? 'overflow-hidden' : ''
    ]"
    :style="containerStyle"
  >
    
    <!-- 图片（统一使用一个 img，通过状态控制切换模糊图和清晰图） -->
    <img
      v-if="shouldLoad && currentImageSrc"
      ref="imgRef"
      :src="currentImageSrc"
      :alt="alt"
      :class="[
        'lazy-image',
        isAutoHeight ? 'block mx-auto' : 'absolute inset-0',
        imageClass,
        {
          'opacity-0': !isVisible,
          'opacity-100': isVisible,
        }
      ]"
      :style="imageStyle"
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

// 当前显示的图片 src（优先显示占位图，占位图加载完成后切换到清晰图）
const currentImageSrc = computed(() => {
  if (!shouldLoad.value) return ''
  
  // 如果有占位图且与主图不同，且主图未加载完成，显示占位图
  if (resolvedPlaceholder.value && 
      resolvedSrc.value &&
      resolvedPlaceholder.value !== resolvedSrc.value && 
      !isLoaded.value) {
    return resolvedPlaceholder.value
  }
  
  // 如果主图已解析，显示主图
  if (resolvedSrc.value) {
    return resolvedSrc.value
  }
  
  // 如果只有占位图，显示占位图
  if (resolvedPlaceholder.value) {
    return resolvedPlaceholder.value
  }
  
  return ''
})

// 图片是否可见（图片应该始终可见，通过模糊效果来区分占位图和清晰图）
const isVisible = computed(() => {
  // 图片应该始终可见，通过模糊效果来区分占位图和清晰图
  return true
})

// 图片样式（根据当前状态应用模糊效果）
const imageStyle = computed(() => {
  const style = {}
  
  // 如果当前显示的是占位图，应用模糊效果
  if (currentImageSrc.value === resolvedPlaceholder.value) {
    style.filter = `blur(${blurAmount}px)`
    style.transform = 'scale(1.05)'
  }
  // 如果主图未加载完成且占位图与主图相同，应用模糊效果（渐进式加载）
  else if (!isLoaded.value && resolvedPlaceholder.value === resolvedSrc.value) {
    style.filter = `blur(${blurAmount}px)`
    style.transform = 'scale(1.05)'
  }
  
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

// 统一的图片加载处理
const handleImageLoad = () => {
  // 如果当前显示的是占位图
  if (currentImageSrc.value === resolvedPlaceholder.value && 
      resolvedPlaceholder.value !== resolvedSrc.value) {
    placeholderLoaded.value = true
    
    // 占位图加载完成后，如果主图还未加载，等待一小段时间后自动切换到主图
    // 这样可以确保占位图先显示，然后再切换到主图
    if (resolvedSrc.value && !isLoaded.value) {
      // 使用 setTimeout 确保占位图先显示，然后再切换
      setTimeout(() => {
        // currentImageSrc 会自动切换到 resolvedSrc.value（因为 isLoaded 还是 false）
        // 触发主图加载
      }, 50)
    }
  } else {
    // 主图加载完成
    isLoaded.value = true
  }
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
          
          // 再加载占位图（模糊预览），确保占位图先显示
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
watch(() => props.src, async (newSrc, oldSrc) => {
  if (newSrc !== oldSrc && newSrc) {
    isLoaded.value = false
    hasError.value = false
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

/* 当容器使用 flex 居中时，确保图片能正确居中 */
.lazy-image-container.flex {
  display: flex;
}

/* 当图片使用 block 定位时，确保能正确响应 flex 布局 */
.full-image.block {
  position: static;
}

/* 确保占位图在 flex 容器中也能正确居中 */
.lazy-image-container.flex .placeholder-image.block {
  align-self: center;
}

.lazy-image {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
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
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: opacity, filter;
  pointer-events: none;
}

/* 当使用 absolute 定位时，占位图和清晰图应该完全一致 */
.placeholder-image.absolute,
.full-image.absolute {
  width: 100%;
  height: 100%;
}

/* 当使用 block 定位时，占位图和清晰图应该完全一致 */
.placeholder-image.block,
.full-image.block {
  position: static !important;
  margin-left: auto !important;
  margin-right: auto !important;
  width: auto !important;
  height: auto !important;
  max-width: 100%;
  max-height: 100%;
  display: block;
}

/* 确保在 flex 容器中也能正确居中 */
.lazy-image-container.flex .placeholder-image.block,
.lazy-image-container.flex .full-image.block {
  align-self: center;
  margin-left: auto !important;
  margin-right: auto !important;
}

.placeholder-image.opacity-0 {
  opacity: 0 !important;
}

/* 完整图片样式 */
.full-image {
  z-index: 2;
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1), filter 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1);
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
</style>
