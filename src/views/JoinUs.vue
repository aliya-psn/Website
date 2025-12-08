<template>
  <!-- 加盟合作页面 -->
  <div class="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
    <!-- 页面头部区域 -->
    <section class="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <!-- 背景装饰元素 - 轻量级视觉点缀 -->
      <div class="absolute inset-0 opacity-[0.03]">
        <div class="absolute top-32 right-32 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div class="absolute bottom-32 left-32 w-56 h-56 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-elegant font-bold text-gray-900 mb-6 tracking-tight">
          {{ joinData.title }}
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-4 font-light">
          {{ joinData.subtitle }}
        </p>
        <p class="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {{ joinData.description }}
        </p>
      </div>
    </section>

    <!-- 主要内容区域 -->
    <section class="max-w-7xl mx-auto px-6 md:px-12 pb-24">
      <div class="space-y-24">
        <!-- 内容区块 - 左右交替布局 -->
        <div
          v-for="(section, index) in joinData.sections"
          :key="index"
          class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          :class="{ 'lg:flex-row-reverse': index % 2 === 1 }"
        >
          <!-- 文本内容区域 -->
          <div :class="{ 'lg:order-2': index % 2 === 1 }">
            <h2 class="text-3xl md:text-4xl font-elegant font-bold text-gray-900 mb-6">
              {{ section.title }}
            </h2>
            <p class="text-lg text-gray-700 leading-relaxed mb-6">
              {{ section.description }}
            </p>
            
            <!-- 特性列表 -->
            <ul v-if="section.features" class="space-y-4">
              <li
                v-for="(feature, idx) in section.features"
                :key="idx"
                class="flex items-start gap-3"
              >
                <!-- 特性图标 -->
                <div class="shrink-0 w-6 h-6 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>
            
            <!-- 优势列表 -->
            <ul v-if="section.positions" class="space-y-4">
              <li
                v-for="(position, idx) in section.positions"
                :key="idx"
                class="flex items-start gap-3"
              >
                <div class="shrink-0 w-6 h-6 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mt-0.5">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span class="text-gray-700">{{ position }}</span>
              </li>
            </ul>
          </div>
          
          <!-- 视觉装饰区域 - 渐变背景卡片 -->
          <div :class="{ 'lg:order-1': index % 2 === 1 }" class="relative">
            <div class="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <!-- 渐变背景层 -->
              <div class="absolute inset-0 bg-linear-to-br from-blue-400 via-purple-500 to-pink-500 opacity-70"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-white text-center p-8">
                  <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 class="text-2xl font-elegant font-bold mb-2">{{ section.title }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式区域 - 深色背景 -->
    <section class="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 md:py-24">
      <div class="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <h2 class="text-3xl md:text-4xl font-elegant font-bold text-white mb-8">
          {{ joinData.contact.title }}
        </h2>
        <!-- 联系方式卡片网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- 邮箱联系方式卡片 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-white font-semibold mb-2">加盟邮箱</h3>
            <a :href="`mailto:${joinData.contact.email}`" class="text-blue-300 hover:text-blue-200 transition-colors">
              {{ joinData.contact.email }}
            </a>
          </div>
          <!-- 电话联系方式卡片 -->
          <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-white font-semibold mb-2">加盟热线</h3>
            <a :href="`tel:${joinData.contact.phone}`" class="text-blue-300 hover:text-blue-200 transition-colors">
              {{ joinData.contact.phone }}
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import dataSource from '../data/data.json'

// 获取加盟合作页面数据
const joinData = dataSource.joinUs || {}
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}
</style>

