<!-- 粒子背景效果组件 -->
<template>
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute inset-0 particle-background particle-layer-1"></div>
    <div class="absolute inset-0 particle-background particle-layer-2"></div>
  </div>
</template>

<style scoped>
/* 粒子背景效果 - 基础样式 */
.particle-background {
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px),
    radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 30% 60%, rgba(255, 255, 255, 0.19) 1.5px, transparent 1.5px),
    radial-gradient(circle at 70% 40%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.19) 1.5px, transparent 1.5px),
    radial-gradient(circle at 90% 20%, rgba(255, 255, 255, 0.18) 1.5px, transparent 1.5px),
    radial-gradient(circle at 10% 70%, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px);
  background-size: 
    250px 250px,
    280px 280px,
    240px 240px,
    260px 260px,
    270px 270px,
    230px 230px,
    290px 290px,
    220px 220px;
  opacity: 0.5;
}

/* 第一层粒子 - 慢速浮动 */
.particle-layer-1 {
  background-position: 
    0 0,
    60px 40px,
    120px 80px,
    40px 120px,
    100px 160px,
    20px 200px,
    140px 240px,
    80px 280px;
  animation: particle-float-1 30s ease-in-out infinite;
}

/* 第二层粒子 - 中速浮动 */
.particle-layer-2 {
  background-position: 
    150px 80px,
    200px 120px,
    180px 160px,
    220px 200px,
    160px 240px,
    240px 280px,
    190px 320px,
    210px 360px;
  animation: particle-float-2 22s ease-in-out infinite;
  opacity: 0.4;
}

/* 第一层动画 - 轻微浮动 */
@keyframes particle-float-1 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.5;
  }
  25% {
    transform: translate(20px, -30px);
    opacity: 0.55;
  }
  50% {
    transform: translate(-15px, 25px);
    opacity: 0.48;
  }
  75% {
    transform: translate(25px, 15px);
    opacity: 0.52;
  }
}

/* 第二层动画 - 轻微浮动 */
@keyframes particle-float-2 {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0.4;
  }
  33% {
    transform: translate(-25px, -20px);
    opacity: 0.45;
  }
  66% {
    transform: translate(18px, 22px);
    opacity: 0.38;
  }
}
</style>
