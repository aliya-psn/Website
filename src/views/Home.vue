<template>
  <div>
    <!-- 首页 -->
    <HomePage :pageData="dataSource" @scroll-down="scrollDown" />

    <!-- 体验区域 -->
    <ExperienceSection :experienceData="dataSource.experience" />

    <!-- 品牌起源区域 -->
    <OriginSection :originData="dataSource.origin" />

    <!-- 全部产品展示区域 -->
    <AllProductsSection />
  </div>
</template>

<script setup>
import { inject } from 'vue'
import HomePage from '../components/home/HomePage.vue'
import ExperienceSection from '../components/home/ExperienceSection.vue'
import OriginSection from '../components/home/OriginSection.vue'
import AllProductsSection from '../components/home/AllProductsSection.vue'
import { useI18nData } from '../composables/useI18nData'

const { dataSource } = useI18nData()

// 获取 NavBar 控制方法
const navBarControl = inject('navBarControl', null)

const scrollDown = () => {
  const experienceSection = document.getElementById('experience-section')
  
  // 设置程序化滚动标志，防止滚动监听器干扰
  if (navBarControl && navBarControl.setProgrammaticScroll) {
    navBarControl.setProgrammaticScroll(true)
  }
  
  // 先开始滚动
  if (experienceSection) {
    experienceSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  } else {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }
  
  // 延迟隐藏导航栏，确保滚动已经开始
  setTimeout(() => {
    if (navBarControl) {
      navBarControl.hideNavBar()
    }
  }, 100)
  
  // 滚动完成后清除程序化滚动标志（平滑滚动大约需要 500-800ms）
  setTimeout(() => {
    if (navBarControl && navBarControl.setProgrammaticScroll) {
      navBarControl.setProgrammaticScroll(false)
    }
  }, 1000)
  
  // 延迟触发动画
  setTimeout(() => {
    if (experienceSection) {
      const animatedElements = experienceSection.querySelectorAll('.animate-slide-in-left-delay, .animate-fade-in-up-delay, .animate-fade-in-up-delay-2, .animate-fade-in-up-delay-3, .animate-fade-in-right')
      animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll')
      })
    }
  }, 200)
}
</script>

