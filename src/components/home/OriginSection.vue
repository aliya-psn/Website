<template>
  <!-- 品牌起源区域 - 首页第三个页面-->
  <section
    id="origin-section"
    class="relative bg-gray-50 overflow-hidden py-16 md:py-24"
  >
    <!-- 内容区域 - 居中白色卡片 -->
    <div class="relative z-10 flex items-center justify-center px-6 md:px-8 lg:px-12 xl:px-16">
      <div class="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 md:p-12 lg:p-16">
        <!-- 标题 -->
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8 md:mb-12"
        >
          {{ originData.title }}
        </h2>

        <!-- 描述文字 - 三个段落 -->
        <div class="space-y-6 md:space-y-8">
          <p
            v-for="(paragraph, index) in originData.description"
            :key="index"
            class="text-base md:text-lg text-gray-700 leading-relaxed font-light text-center"
          >
            {{ paragraph }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  originData: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
/* 简洁的卡片样式 */
</style>
