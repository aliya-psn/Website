<template>
  <!-- 底部备案说明 -->
  <footer class="footer">
    <div class="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-8 md:py-12">
      <div class="text-center">
        <p class="text-sm md:text-base text-gray-300 font-light">
          {{ footerData.text }}
        </p>
        <p v-if="footerData.copyright" class="text-xs md:text-sm mt-3 text-gray-400 font-light">
          {{ footerData.copyright }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
defineProps({
  footerData: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 1) 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
}
</style>

