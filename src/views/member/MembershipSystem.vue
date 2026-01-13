<!-- 会员体系 -->
<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-8">
      <!-- 第一部分：Membership Program / Skin Condition Predictive Modeling -->
      <div class="mb-20">
        <h1
          class="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 text-center mb-4 tracking-tight"
        >
          {{ membershipData.title }}
        </h1>
        <div class="text-center mb-8 space-y-1">
          <p class="text-base md:text-lg text-gray-600 font-light">
            {{ membershipData.professionalSupport }}
          </p>
          <p class="text-base md:text-lg text-gray-600 font-light">
            {{ membershipData.certificationProgram }}
          </p>
          <p class="text-base md:text-lg text-gray-600 font-light">
            {{ membershipData.aiDevelopment }}
          </p>
        </div>

        <!-- 预测模型 -->
        <div class="w-full max-w-5xl mx-auto">
          <h2
            class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8"
          >
            {{ membershipData.predictiveModeling.title }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
            <div
              v-for="(model, index) in membershipData.predictiveModeling.models"
              :key="index"
              class="model-card flex flex-col"
            >
              <div class="w-full max-w-5xl mx-auto">
                <div class="w-full aspect-square overflow-hidden">
                  <LazyImage
                    :src="model.image"
                    :alt="model.period"
                    container-class="w-full h-full"
                    :image-class="`w-full h-full object-cover ${model.objectPosition || 'object-center'}`"
                    skeleton-class="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
                  />
                </div>
              </div>
              <div class="text-center mt-4 md:mt-6">
                <p class="text-lg md:text-xl font-bold text-gray-900 mb-2">
                  {{ model.period }}
                </p>
                <p class="text-base text-gray-700 font-light">
                  {{ model.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二部分：Allergen Sensitivity Alert System -->
      <div class="mb-20">
        <h2
          class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8"
        >
          {{ membershipData.allergenAlert.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-[16/9] overflow-hidden">
            <LazyImage
              :src="membershipData.allergenAlert.image"
              :alt="membershipData.allergenAlert.title"
              container-class="w-full h-full"
              image-class="w-full h-full object-contain"
              skeleton-class="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
            />
          </div>
        </div>
      </div>

      <!-- 第三部分：Personalized dosage optimization algorithms -->
      <div class="mb-20">
        <h2
          class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8"
        >
          {{ membershipData.dosageOptimization.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full min-h-[360px] md:min-h-[400px]">
            <LazyImage
              :src="membershipData.dosageOptimization.image"
              :alt="membershipData.dosageOptimization.title"
              container-class="w-full h-full"
              image-class="w-full h-auto object-contain"
              skeleton-class="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
            />
          </div>
        </div>
      </div>

      <!-- 第四部分：User Experience Ecosystem -->
      <div class="mb-20">
        <h2
          class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8"
        >
          {{ membershipData.userExperience.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-video overflow-hidden">
            <LazyImage
              :src="membershipData.userExperience.image"
              :alt="membershipData.userExperience.title"
              container-class="w-full h-full"
              image-class="w-full h-full object-cover"
              skeleton-class="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
            />
          </div>
        </div>
      </div>

      <!-- 第五部分：User Feedback -->
      <div class="mb-20">
        <h2
          class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8"
        >
          {{ membershipData.userFeedback.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-video overflow-hidden">
            <LazyImage
              :src="membershipData.userFeedback.image"
              :alt="membershipData.userFeedback.title"
              container-class="w-full h-full"
              image-class="w-full h-full object-cover"
              skeleton-class="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
            />
          </div>
        </div>
      </div>

      <!-- 第六部分：Skin Renewal Journals -->
      <div class="mb-20">
        <h2
          class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8"
        >
          {{ membershipData.skinRenewal.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-video bg-gray-900 overflow-hidden">
            <!-- v-if="membershipData.skinRenewal.videoUrl"
              :src="membershipData.skinRenewal.videoUrl" -->
            <video
              :src="sampleVideo"
              controls
              class="w-full h-full"
              preload="metadata"
            >
              您的浏览器不支持视频播放。
            </video>
          </div>
        </div>
      </div>

      <!-- 第七部分：Expert Q&A Sessions -->
      <div class="mb-20">
        <h2
          class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8"
        >
          {{ membershipData.expertQA.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-[2/1] overflow-hidden">
            <LazyImage
              :src="membershipData.expertQA.image"
              :alt="membershipData.expertQA.title"
              container-class="w-full h-full"
              image-class="w-full h-full object-cover object-[70%_75%]"
              skeleton-class="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
            />
          </div>
        </div>
      </div>

      <!-- 第八部分：Skin Renewal Milestone Badges -->
      <!-- <div>
        <div class="w-full max-w-5xl mx-auto">
          <h2
            class="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-8"
          >
            {{ membershipData.milestoneBadges.title }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <div
              v-for="(badge, index) in membershipData.milestoneBadges.badges"
              :key="index"
              class="badge-card flex flex-col items-center"
            >
              <div class="w-full mb-3">
                <LazyImage
                  :src="badge.image"
                  :alt="badge.period"
                  container-class="w-full"
                  image-class="w-full h-auto object-contain"
                  skeleton-class="bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100"
                />
              </div>
              <p class="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {{ badge.period }}
              </p>
              <p class="text-base text-gray-700 text-center font-light">
                {{ badge.description }}
              </p>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18nData } from '../../composables/useI18nData'
import LazyImage from '../../components/LazyImage.vue'
import sampleVideo from '../../assets/sample.mp4'

const { dataSource } = useI18nData()

// 获取会员体系数据
const membershipData = computed(() => {
  return (
    dataSource.value.membershipSystem
  )
})
</script>

<style scoped>
.model-card,
.badge-card {
  transition: transform 0.3s ease;
}

.model-card:hover,
.badge-card:hover {
  transform: translateY(-4px);
}

/* 图片容器圆角过渡 */
.lazy-image-container {
  border-radius: inherit;
}
</style>
