<template>
  <!-- 导航栏 -->
  <nav
    ref="navElement"
    :class="[
      'navbar fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-2 md:py-4',
      { scrolled: isScrolled, 'navbar-hidden': !props.isVisible },
    ]"
  >
    <div class="flex items-center justify-center">
      <!-- Logo -->
      <div
        @click="scrollToTop"
        class="flex items-center gap-3 cursor-pointer group"
      >
        <img
          :src="logoImage"
          alt="Logo"
          class="h-4 md:h-6 lg:h-8 object-contain"
          style="max-height: 100%;"
        />
      </div>

      <!-- 桌面端导航菜单 -->
      <div class="hidden md:flex items-center gap-8 lg:gap-10 ml-8 lg:ml-12">
        <template v-for="item in dataSource.navItems" :key="item.id">
          <!-- 有下拉菜单的项 -->
          <div v-if="item.hasDropdown" class="relative">
            <div
              @click.stop="toggleDropdown(item.id)"
              class="nav-link text-gray-800 text-sm md:text-base font-elegant tracking-wider cursor-pointer relative group"
              :class="{ active: showDropdown && currentDropdownId === item.id }"
            >
              {{ item.name }}
              <span
                class="nav-underline absolute bottom-0 left-0 w-0 h-px bg-linear-to-r from-transparent via-gray-800 to-transparent transition-all duration-500 group-hover:w-full"
              ></span>
            </div>
          </div>
          <!-- 没有下拉菜单的项 -->
          <router-link
            v-else
            :to="item.slug ? `/${item.slug}` : '/'"
            class="nav-link text-gray-800 text-sm md:text-base font-elegant tracking-wider relative group"
          >
            {{ item.name }}
            <span
              class="nav-underline absolute bottom-0 left-0 w-0 h-px bg-linear-to-r from-transparent via-gray-800 to-transparent transition-all duration-500 group-hover:w-full"
            ></span>
          </router-link>
        </template>
      </div>

      <!-- 移动端汉堡菜单按钮 -->
      <button
        @click="toggleMobileMenu"
        class="md:hidden text-gray-800 p-2 focus:outline-none absolute right-6"
        aria-label="菜单"
      >
        <svg
          v-if="!isMobileMenuOpen"
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- 导航下拉菜单 - 在导航栏下方 -->
    <div ref="dropdownContainer" class="relative z-50">
      <transition name="slide-down">
        <!-- 产品系列 下拉菜单 -->
        <MenuDropdown
          v-if="
            showDropdown &&
            currentDropdownId === 'products' &&
            currentDropdownItems.length > 0
          "
          :data="currentDropdownItems"
          @item-click="handleItemClick"
          @close="closeDropdown"
        />
      </transition>
      <transition name="slide-down">
        <!-- 科学解析 下拉菜单 -->
        <MenuDropdown
          v-if="
            showDropdown &&
            currentDropdownId === 'science-analysis' &&
            currentDropdownItems.length > 0
          "
          :data="currentDropdownItems"
          @item-click="handleScienceItemClick"
          @close="closeDropdown"
        />
      </transition>
      <transition name="slide-down">
        <!-- 品牌传承 下拉菜单 -->
        <MenuDropdown
          v-if="
            showDropdown &&
            currentDropdownId === 'brand-heritage' &&
            currentDropdownItems.length > 0
          "
          :data="currentDropdownItems"
          @item-click="handleBrandHeritageItemClick"
          @close="closeDropdown"
        />
      </transition>
      <transition name="slide-down">
        <!-- 会员中心 下拉菜单 -->
        <MenuDropdown
          v-if="
            showDropdown &&
            currentDropdownId === 'membership' &&
            currentDropdownItems.length > 0
          "
          :data="currentDropdownItems"
          @item-click="handleItemClick"
          @close="closeDropdown"
        />
      </transition>
    </div>

    <!-- 移动端侧边栏菜单 -->
    <teleport to="body">
      <transition name="slide-right">
        <div
          v-if="isMobileMenuOpen"
          class="mobile-menu-overlay fixed inset-0 bg-black/60 z-[9998] md:hidden"
          @click="closeMobileMenu"
        ></div>
      </transition>
      <transition name="slide-right">
        <div
          v-if="isMobileMenuOpen"
          class="mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-50 z-[9999] md:hidden overflow-y-auto shadow-2xl"
        >
        <!-- 移动端菜单头部 -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50">
          <div class="text-gray-600 font-elegant text-xl font-semibold">
            {{ dataSource?.home?.brand?.name }}
          </div>
          <button
            @click="closeMobileMenu"
            class="text-gray-500 p-2 hover:text-gray-400 transition-colors rounded-full hover:bg-gray-100"
            aria-label="关闭菜单"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- 移动端菜单项 -->
        <div class="py-2">
          <template v-for="item in dataSource.navItems" :key="item.id">
            <!-- 有下拉菜单的项 -->
            <div v-if="item.hasDropdown" class="border-b border-gray-200">
              <div
                @click="toggleMobileDropdown(item.id)"
                class="mobile-nav-item flex items-center justify-between px-6 py-4 text-gray-600 font-elegant text-base cursor-pointer hover:bg-gray-100 transition-colors active:bg-gray-200"
                :class="{ 'bg-gray-100': mobileDropdownId === item.id }"
              >
                <span class="font-medium">{{ item.name }}</span>
                <svg
                  class="w-5 h-5 transition-transform duration-300 text-gray-500"
                  :class="{ 'rotate-180': mobileDropdownId === item.id }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <!-- 移动端下拉菜单项 -->
              <transition name="mobile-dropdown">
                <div
                  v-if="mobileDropdownId === item.id"
                  class="bg-gray-100 border-l-2 border-gray-200"
                >
                  <div
                    v-for="subItem in item.dropdownItems"
                    :key="subItem.id || subItem.slug"
                    @click="handleMobileSubItemClick(item.id, subItem)"
                    class="mobile-sub-item px-10 py-3.5 text-gray-500 text-sm cursor-pointer hover:bg-gray-200 hover:text-gray-600 transition-colors active:bg-gray-300 font-medium"
                  >
                    {{ subItem.title || subItem.name }}
                  </div>
                </div>
              </transition>
            </div>
            <!-- 没有下拉菜单的项 -->
            <router-link
              v-else
              :to="item.slug ? `/${item.slug}` : '/'"
              @click="closeMobileMenu"
              class="mobile-nav-item block px-6 py-4 text-gray-600 font-elegant text-base border-b border-gray-200 hover:bg-gray-100 transition-colors active:bg-gray-200 font-medium"
            >
              {{ item.name }}
            </router-link>
          </template>
        </div>
      </div>
    </transition>
    </teleport>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import MenuDropdown from './MenuDropdown.vue'
import { useI18nData } from '../composables/useI18nData'
import logoImage from '../assets/logo.png'

const { dataSource } = useI18nData()

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()

const showDropdown = ref(false)
const currentDropdownId = ref('')
const dropdownContainer = ref(null)
const navElement = ref(null)
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const mobileDropdownId = ref('')

// 当前下拉菜单的菜单项
const currentDropdownItems = computed(() => {
  if (!currentDropdownId.value) return []
  const navItem = dataSource.value?.navItems?.find(
    (item) => item.id === currentDropdownId.value
  )
  return navItem?.dropdownItems || []
})

const toggleDropdown = (id) => {
  // 关闭菜单
  if (showDropdown.value && currentDropdownId.value === id) {
    closeDropdown()
  } else {
    // 打开菜单
    currentDropdownId.value = id
    showDropdown.value = true
  }
}

const closeDropdown = () => {
  showDropdown.value = false
  setTimeout(() => {
    if (!showDropdown.value) {
      currentDropdownId.value = ''
    }
  }, 300)
}

// 移动端菜单控制
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (!isMobileMenuOpen.value) {
    mobileDropdownId.value = ''
  }
  // 防止背景滚动
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  mobileDropdownId.value = ''
  document.body.style.overflow = ''
}

// 移动端下拉菜单切换
const toggleMobileDropdown = (id) => {
  if (mobileDropdownId.value === id) {
    mobileDropdownId.value = ''
  } else {
    mobileDropdownId.value = id
  }
}

// 移动端子菜单项点击处理
const handleMobileSubItemClick = (parentId, subItem) => {
  // 根据父菜单ID选择对应的处理函数
  if (parentId === 'products') {
    handleItemClick(subItem)
  } else if (parentId === 'science-analysis') {
    handleScienceItemClick(subItem)
  } else if (parentId === 'brand-heritage') {
    handleBrandHeritageItemClick(subItem)
  } else if (parentId === 'membership') {
    handleItemClick(subItem)
  }
  closeMobileMenu()
}

// 点击外部关闭下拉菜单
const handleClickOutside = (event) => {
  if (!showDropdown.value) return

  const nav = document.querySelector('nav')
  const target = event.target

  // 检查点击是否在导航栏或下拉菜单外部
  if (nav && !nav.contains(target)) {
    if (dropdownContainer.value && !dropdownContainer.value.contains(target)) {
      closeDropdown()
    }
  }
}

// 监听滚动，添加阴影效果
const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll)
  // 添加进入动画
  if (navElement.value) {
    navElement.value.style.opacity = '0'
    navElement.value.style.transform = 'translateY(-20px)'
    setTimeout(() => {
      if (navElement.value) {
        navElement.value.style.transition =
          'opacity 0.6s ease-out, transform 0.6s ease-out'
        navElement.value.style.opacity = '1'
        navElement.value.style.transform = 'translateY(0)'
      }
    }, 100)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll)
  // 确保清理移动端菜单状态
  document.body.style.overflow = ''
})

const handleItemClick = (item) => {
  if (typeof item === 'object') {
    const slug = item.slug || (item.id && typeof item.id === 'string' ? item.id : null)
    if (slug) {
      router.push(`/${slug}`)
    }
  }
  closeDropdown()
}

const handleScienceItemClick = (item) => {
  if (typeof item === 'object' && item.slug) {
    // 起源页面使用特殊路由 /origin
    if (item.slug === 'origin') {
      router.push('/origin')
    } else {
      // 其他页面使用 /origin/ 前缀
      router.push(`/origin/${item.slug}`)
    }
  }
  closeDropdown()
}

const handleBrandHeritageItemClick = (item) => {
  if (typeof item === 'object' && item.slug) {
    // 核心成分页面
    if (item.slug === 'key-ingredients') {
      router.push('/key-ingredients')
    } else if (item.slug === 'Technology') {
      // 技术与专利页面
      router.push('/technology')
    } else {
      router.push(`/origin/${item.slug}`)
    }
  }
  closeDropdown()
}

// 点击 logo 区域跳转到首页顶部
const scrollToTop = () => {
  // 如果当前不在首页，先跳转到首页
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      // 等待路由切换完成后再滚动
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 100)
    })
  } else {
    // 如果已经在首页，直接滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.5s ease,
    box-shadow 0.5s ease;
}

.navbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 0, 0, 0.1),
    transparent
  );
}

/* 滚动时的阴影效果 */
.navbar.scrolled {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 1);
}

/* 优雅字体 */
.font-elegant {
  font-family: 'Playfair Display', 'Cormorant Garamond', 'Georgia',
    'Times New Roman', serif;
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* 导航链接动画 */
.nav-link {
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.5rem 0;
}

.nav-link:hover {
  transform: translateY(-2px);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-link.active {
  color: #d97706;
}

/* 下划线动画 */
.nav-underline {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
}

/* 下拉展开动画 */
.slide-down-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-down-leave-active {
  transition: all 0.3s ease-in;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Logo 动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 导航栏隐藏/显示动画 - 使用更高优先级的选择器 */
.navbar.navbar-hidden {
  transform: translateY(-100%) !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* 移动端菜单样式 */
.mobile-menu-overlay {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.mobile-menu {
  border-left: 1px solid rgba(229, 231, 235, 0.5);
  /* 确保菜单在最上层 */
  position: fixed !important;
  top: 0 !important;
  right: 0 !important;
  /* 浅色背景 */
  background: linear-gradient(
    180deg,
    rgba(249, 250, 251, 0.98) 0%,
    rgba(243, 244, 246, 0.98) 50%,
    rgba(249, 250, 251, 0.98) 100%
  ) !important;
}

.mobile-nav-item {
  position: relative;
}

.mobile-nav-item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(156, 163, 175, 0.5), transparent);
  transition: width 0.3s ease;
}

.mobile-nav-item:hover::after {
  width: 100%;
}

.mobile-sub-item {
  position: relative;
  padding-left: 2.5rem;
}

.mobile-sub-item::before {
  content: '→';
  position: absolute;
  left: 1.5rem;
  color: rgba(107, 114, 128, 0.6);
  font-size: 0.875rem;
}

/* 移动端菜单滑入动画 */
.slide-right-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  opacity: 0;
}

.slide-right-leave-to {
  opacity: 0;
}

.slide-right-enter-from .mobile-menu-overlay {
  opacity: 0;
}

.slide-right-enter-from .mobile-menu {
  transform: translateX(100%);
}

.slide-right-leave-to .mobile-menu {
  transform: translateX(100%);
}

/* 移动端下拉菜单动画 */
.mobile-dropdown-enter-active {
  transition: all 0.3s ease-out;
  max-height: 1000px;
}

.mobile-dropdown-leave-active {
  transition: all 0.3s ease-in;
  max-height: 1000px;
}

.mobile-dropdown-enter-from {
  opacity: 0;
  max-height: 0;
}

.mobile-dropdown-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
