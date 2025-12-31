<!-- 荣誉奖项 -->
<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <!-- 标题 -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 text-center mb-16 tracking-tight">
        {{ honorsAwardsData.title }}
      </h1>

      <!-- 小屏幕：统一列表展示 -->
      <div class="block md:hidden space-y-8">
        <div
          v-for="(award, index) in honorsAwardsData.awards"
          :key="'mobile-' + index"
          class="award-item flex flex-col"
        >
          <div class="w-full aspect-square  mb-4 overflow-hidden rounded-lg">
            <LazyImage
              v-if="award.image"
              :src="award.image"
              :alt="award.name"
              container-class="w-full h-full"
              image-class="w-full h-full object-contain scale-110"
            />
          </div>
          <p class="text-sm text-gray-900 font-light leading-tight text-center">
            {{ award.name }}
          </p>
        </div>
      </div>

      <!-- 大屏幕：2/3/3 分排布局 -->
      <div class="hidden md:block">
        <!-- 上排：2 张 -->
        <div v-if="topRow.length" class="grid grid-cols-12 gap-4 mb-12">
          <div
            v-for="(award, index) in topRow"
            :key="'top-' + index"
            class="award-item flex flex-col col-span-6"
          >
            <div class="w-full h-[44rem] mb-6 overflow-hidden rounded-lg">
              <LazyImage
                v-if="award.image"
                :src="award.image"
                :alt="award.name"
                container-class="w-full h-full"
                image-class="w-full h-full object-contain"
              />
            </div>
            <p class="text-sm md:text-base text-gray-900 font-light leading-tight text-center">
              {{ award.name }}
            </p>
          </div>
        </div>

        <!-- 中排：3 张 -->
        <div v-if="middleRow.length" class="grid grid-cols-12 gap-4 mb-12">
          <div
            v-for="(award, index) in middleRow"
            :key="'mid-' + index"
            class="award-item flex flex-col col-span-4"
          >
            <div class="w-full h-110  mb-6 overflow-hidden rounded-lg">
              <LazyImage
                v-if="award.image"
                :src="award.image"
                :alt="award.name"
                container-class="w-full h-full"
                image-class="w-full h-full object-contain"
              />
            </div>
            <p class="text-sm md:text-base text-gray-900 font-light leading-tight text-center">
              {{ award.name }}
            </p>
          </div>
        </div>

        <!-- 下排：3 张 -->
        <div v-if="bottomRow.length" class="grid grid-cols-12 gap-4">
          <div
            v-for="(award, index) in bottomRow"
            :key="'bot-' + index"
            class="award-item flex flex-col col-span-4"
          >
            <div class="w-full h-110  mb-6 overflow-hidden rounded-lg">
              <LazyImage
                v-if="award.image"
                :src="award.image"
                :alt="award.name"
                container-class="w-full h-full"
                image-class="w-full h-full object-contain"
              />
            </div>
            <p class="text-sm md:text-base text-gray-900 font-light leading-tight text-center">
              {{ award.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18nData } from '../../composables/useI18nData'
import LazyImage from '../../components/LazyImage.vue'

const { dataSource } = useI18nData()

// 获取荣誉奖项数据
const honorsAwardsData = computed(() => {
  return dataSource.value.honorsAwards || {
    title: 'Honors & Awards',
    awards: []
  }
})

// 切分为 2 / 3 / 3 的布局
const topRow = computed(() => honorsAwardsData.value.awards?.slice(0, 2) || [])
const middleRow = computed(() => honorsAwardsData.value.awards?.slice(2, 5) || [])
const bottomRow = computed(() => honorsAwardsData.value.awards?.slice(5, 8) || [])
</script>

<style scoped>

.award-item {
  transition: transform 0.3s ease;
}

</style>

