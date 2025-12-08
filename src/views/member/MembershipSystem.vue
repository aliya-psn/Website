<!-- 会员体系 -->
<template>
  <div class="min-h-screen bg-white pt-24 md:pt-28">
    <div class="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <!-- 第一部分：Membership Program / Skin Condition Predictive Modeling -->
      <div class="mb-20">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-elegant font-bold text-gray-900 text-center mb-4 tracking-tight">
          {{ membershipData.title }}
        </h1>
        <div class="text-center mb-8 space-y-2">
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
        
        <h2 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 text-center mb-12">
          {{ membershipData.predictiveModeling.title }}
        </h2>
        
        <!-- 预测模型 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div
            v-for="(model, index) in membershipData.predictiveModeling.models"
            :key="index"
            class="model-card flex flex-col"
          >
            <div class="w-full aspect-[4/3] mb-4 overflow-hidden rounded-lg bg-gray-100">
              <img
                :src="model.image"
                :alt="model.period"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="text-center">
              <p class="text-lg md:text-xl font-bold text-gray-900 mb-2">{{ model.period }}</p>
              <p class="text-base text-gray-700 font-light">{{ model.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二部分：Allergen Sensitivity Alert System -->
      <div class="mb-20">
        <h2 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 text-center mb-8">
          {{ membershipData.allergenAlert.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
            <img
              :src="membershipData.allergenAlert.image"
              :alt="membershipData.allergenAlert.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- 第三部分：Personalized dosage optimization algorithms -->
      <div class="mb-20">
        <h2 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 text-center mb-8">
          {{ membershipData.dosageOptimization.title }}
        </h2>
        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 max-w-6xl mx-auto">
          <div
            v-for="(person, index) in membershipData.dosageOptimization.people"
            :key="index"
            class="person-item"
          >
            <div class="w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
              <img
                :src="person.image"
                :alt="`Person ${index + 1}`"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 第四部分：User Experience Ecosystem -->
      <div class="mb-20">
        <h2 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 text-center mb-8">
          {{ membershipData.userExperience.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
            <img
              :src="membershipData.userExperience.image"
              :alt="membershipData.userExperience.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- 第五部分：User Feedback -->
      <div class="mb-20">
        <h2 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 text-center mb-8">
          {{ membershipData.userFeedback.title }}
        </h2>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
            <img
              :src="membershipData.userFeedback.image"
              :alt="membershipData.userFeedback.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- 第六部分：Skin Renewal Journals -->
      <div class="mb-20">
        <h2 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 text-center mb-4">
          {{ membershipData.skinRenewal.title }}
        </h2>
        <p class="text-base md:text-lg text-gray-600 text-center mb-8 font-light">
          {{ membershipData.skinRenewal.subtitle }}
        </p>
        <div class="w-full max-w-5xl mx-auto">
          <div class="w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <video
              v-if="membershipData.skinRenewal.videoUrl"
              :src="membershipData.skinRenewal.videoUrl"
              controls
              class="w-full h-full"
              preload="metadata"
            >
              您的浏览器不支持视频播放。
            </video>
            <div v-else class="w-full h-full flex items-center justify-center text-white text-center p-8">
              <div>
                <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <p class="text-lg">{{ membershipData.skinRenewal.subtitle }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第七部分：Expert Q&A Sessions -->
      <div class="mb-20">
        <h2 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 text-center mb-8">
          {{ membershipData.expertQA.title }}
        </h2>
        <div class="w-full max-w-4xl mx-auto">
          <div class="w-full aspect-video overflow-hidden rounded-lg bg-gray-100">
            <img
              :src="membershipData.expertQA.image"
              :alt="membershipData.expertQA.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- 第八部分：Skin Renewal Milestone Badges -->
      <div>
        <h2 class="text-2xl md:text-3xl font-elegant font-bold text-gray-900 text-center mb-12">
          {{ membershipData.milestoneBadges.title }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          <div
            v-for="(badge, index) in membershipData.milestoneBadges.badges"
            :key="index"
            class="badge-card flex flex-col items-center"
          >
            <div class="w-32 h-32 md:w-40 md:h-40 mb-4 overflow-hidden rounded-full bg-gray-100">
              <img
                :src="badge.image"
                :alt="badge.period"
                class="w-full h-full object-cover"
              />
            </div>
            <p class="text-lg md:text-xl font-bold text-gray-900 mb-2">{{ badge.period }}</p>
            <p class="text-base text-gray-700 text-center font-light">{{ badge.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18nData } from '../../composables/useI18nData'

const { dataSource } = useI18nData()

// 获取会员体系数据
const membershipData = computed(() => {
  return dataSource.value.membershipSystem || {
    title: 'Membership Program',
    professionalSupport: '',
    certificationProgram: '',
    aiDevelopment: '',
    predictiveModeling: {
      title: '',
      models: []
    },
    allergenAlert: {
      title: '',
      image: ''
    },
    dosageOptimization: {
      title: '',
      people: []
    },
    userExperience: {
      title: '',
      image: ''
    },
    userFeedback: {
      title: '',
      image: ''
    },
    skinRenewal: {
      title: '',
      subtitle: '',
      videoUrl: ''
    },
    expertQA: {
      title: '',
      image: ''
    },
    milestoneBadges: {
      title: '',
      badges: []
    }
  }
})
</script>

<style scoped>
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
}

.model-card,
.badge-card {
  transition: transform 0.3s ease;
}

.model-card:hover,
.badge-card:hover {
  transform: translateY(-4px);
}
</style>

