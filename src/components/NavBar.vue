<template>
  <!-- 导航栏 -->
  <nav
    ref="navElement"
    :class="[
      'navbar fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 md:py-6',
      { scrolled: isScrolled, 'navbar-hidden': !props.isVisible },
    ]"
  >
    <div class="flex items-center justify-between mx-auto max-w-7xl">
      <!-- Logo -->
      <div
        @click="scrollToTop"
        class="flex items-center gap-3 cursor-pointer group"
      >
        <div
          class="text-white font-elegant text-xl md:text-2xl lg:text-3xl tracking-wide"
        >
          {{ dataSource?.home?.brand?.name }}
        </div>
      </div>

      <!-- 导航菜单 -->
      <div class="hidden md:flex items-center gap-8 lg:gap-10">
        <template v-for="item in dataSource.navItems" :key="item.id">
          <!-- 有下拉菜单的项 -->
          <div v-if="item.hasDropdown" class="relative">
            <div
              @click.stop="toggleDropdown(item.id)"
              class="nav-link text-white text-sm md:text-base font-elegant tracking-wider cursor-pointer relative group"
              :class="{ active: showDropdown && currentDropdownId === item.id }"
            >
              {{ item.name }}
              <span
                class="nav-underline absolute bottom-0 left-0 w-0 h-px bg-linear-to-r from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full"
              ></span>
            </div>
          </div>
          <!-- 没有下拉菜单的项 -->
          <router-link
            v-else
            :to="item.slug ? `/${item.slug}` : '/'"
            class="nav-link text-white text-sm md:text-base font-elegant tracking-wider relative group"
          >
            {{ item.name }}
            <span
              class="nav-underline absolute bottom-0 left-0 w-0 h-px bg-linear-to-r from-transparent via-white to-transparent transition-all duration-500 group-hover:w-full"
            ></span>
          </router-link>
        </template>
      </div>
    </div>

    <!-- 导航下拉菜单 - 在导航栏下方 -->
    <div ref="dropdownContainer" class="relative">
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
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import MenuDropdown from './MenuDropdown.vue'
import { useI18nData } from '../composables/useI18nData'

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
    // 核心成分页面使用特殊路由 /key-ingredients
    if (item.slug === 'key-ingredients') {
      router.push('/key-ingredients')
    } else if (item.slug === 'Technology and Patents') {
      // 技术与专利页面使用特殊路由 /technology-and-patents
      router.push('/technology-and-patents')
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
/* 导航栏样式 - 深色渐变背景 */
.navbar {
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.98) 100%
  );
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
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
    rgba(255, 255, 255, 0.3),
    transparent
  );
}

/* 滚动时的阴影效果 */
.navbar.scrolled {
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.98) 0%,
    rgba(30, 41, 59, 0.99) 100%
  );
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
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
}

.nav-link.active {
  color: #fbbf24;
}

/* 下划线动画 */
.nav-underline {
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
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
</style>
