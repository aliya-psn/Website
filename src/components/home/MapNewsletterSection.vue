<template>
  <!-- 地图和邮箱订阅区域 - 首页底部 -->
  <section
    id="map-newsletter-section"
    class="relative bg-[#F5F5F7] overflow-hidden pt-10 md:pt-14"
  >
    <!-- 地图区域 - 独立容器，只保留左右边距 -->
    <div class="mb-12 md:mb-16 pl-12 md:pl-16 lg:pl-20 xl:pl-24 pr-6 md:pr-8 lg:pr-12 xl:pr-16">
      <div
        id="map"
        class="w-full h-[400px] md:h-[500px] rounded-lg shadow-lg overflow-hidden"
      ></div>

    <!-- 邮箱订阅区域 -->
    <div class="container mx-auto px-4 md:px-8 max-w-xl mt-6 md:mt-8 lg:mt-10">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 leading-tight mb-3 md:mb-4 text-center">
          {{ sectionData.title }}
        </h2>
        <p class="text-lg md:text-xl text-gray-700 text-center mb-3 md:mb-4 font-normal">
          {{ sectionData.placeholder }}
        </p>
        
        <form @submit.prevent="handleSubmit" class="space-y-3">
          <input
            v-model="email"
            type="email"
            :placeholder="sectionData.placeholder"
            required
            class="w-full px-3 py-2.5 md:px-4 md:py-3 border border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm md:text-base"
          />
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full px-3 py-2.5 md:px-4 md:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? sectionData.submitting : sectionData.buttonText }}
          </button>
        </form>
        
        <p v-if="submitMessage" :class="submitMessageClass" class="mt-3 text-center text-xs md:text-sm">
          {{ submitMessage }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MAP_DEFAULT_COORDS } from '../../utils/locationConstants'

// 修复Leaflet默认图标路径问题
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconRetinaUrl: iconRetina,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

const props = defineProps({
  sectionData: {
    type: Object,
    required: true,
  },
})

const email = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitMessageClass = ref('')

let map = null
let marker = null

// 创建蓝色心形图标
const createHeartIcon = () => {
  return L.divIcon({
    className: 'custom-heart-marker',
    html: `
      <svg width="30" height="30" viewBox="0 0 24 24" fill="#3b82f6" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  })
}

// 在地图上添加标记
const addMarker = (lat, lng) => {
  if (marker) {
    map.removeLayer(marker)
  }
  const heartIcon = createHeartIcon()
  marker = L.marker([lat, lng], { icon: heartIcon }).addTo(map)
}

// 初始化地图并定位到指定经纬度
const initMap = () => {
  // 创建地图实例
  map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: true,
  }).setView([MAP_DEFAULT_COORDS.lat, MAP_DEFAULT_COORDS.lng], 10)

  // 添加OpenStreetMap图层
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19,
  }).addTo(map)

  // 添加标记到固定经纬度
  addMarker(MAP_DEFAULT_COORDS.lat, MAP_DEFAULT_COORDS.lng)
}

// 处理表单提交
const handleSubmit = async () => {
  if (!email.value) return
  
  isSubmitting.value = true
  submitMessage.value = ''
  
  try {
    // 这里可以添加实际的API调用
    // await subscribeNewsletter(email.value)
    
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    submitMessage.value = sectionData.successMessage || '订阅成功！'
    submitMessageClass.value = 'text-green-600'
    email.value = ''
    
    // 3秒后清除成功消息
    setTimeout(() => {
      submitMessage.value = ''
    }, 3000)
  } catch (error) {
    submitMessage.value = sectionData.errorMessage || '订阅失败，请稍后重试。'
    submitMessageClass.value = 'text-red-600'
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // 延迟初始化地图，确保DOM已渲染
  setTimeout(() => {
    initMap()
  }, 100)
})

onUnmounted(() => {
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
/* 地图容器样式 */
#map {
  background-color: #f5f5f5;
}

/* 自定义心形标记样式 */
:deep(.custom-heart-marker) {
  background: transparent;
  border: none;
}
</style>
