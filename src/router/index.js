import { createRouter, createWebHistory } from 'vue-router'
// 首页使用同步导入，确保快速显示
import Home from '../views/Home.vue'
// 其他页面使用懒加载，按需加载
const ProductPage = () => import('../views/product/ProductPage.vue')
const Series1Page = () => import('../views/product/Series1Page.vue')
const Series2Page = () => import('../views/product/Series2Page.vue')
const Series3Page = () => import('../views/product/Series3Page.vue')
const ProductDetail = () => import('../views/product/ProductDetail.vue')
const Origin = () => import('../views/science/Origin.vue')
const DevelopmentHistory = () => import('../views/science/DevelopmentHistory.vue')
const HonorsAwards = () => import('../views/science/HonorsAwards.vue')
const KeyIngredients = () => import('../views/house/KeyIngredients.vue')
const Technology = () => import('../views/house/Technology.vue')
const ExclusiveServices = () => import('../views/member/ExclusiveServices.vue')
const MembershipSystem = () => import('../views/member/MembershipSystem.vue')
const AllProducts = () => import('../views/product/AllProducts.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/origin',
    name: 'Origin',
    component: Origin
  },
  {
    path: '/origin/development-history',
    name: 'DevelopmentHistory',
    component: DevelopmentHistory,
    meta: {
      fullscreen: true,
      hideFooter: true
    }
  },
  {
    path: '/origin/honors-awards',
    name: 'HonorsAwards',
    component: HonorsAwards
  },
  {
    path: '/key-ingredients',
    name: 'KeyIngredients',
    component: KeyIngredients
  },
  {
    path: '/technology',
    name: 'Technology',
    component: Technology
  },
  {
    path: '/exclusive-services',
    name: 'ExclusiveServices',
    component: ExclusiveServices
  },
  {
    path: '/membership-system',
    name: 'MembershipSystem',
    component: MembershipSystem
  },
  {
    path: '/all-products',
    name: 'AllProducts',
    component: AllProducts
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/product-slug/:slug',
    name: 'ProductDetailBySlug',
    component: ProductDetail,
    props: true
  },
  {
    path: '/basic-revitalization-collection',
    name: 'Series1Page',
    component: Series1Page
  },
  {
    path: '/advanced-repair-collection',
    name: 'Series2Page',
    component: Series2Page
  },
  {
    path: '/limited-exclusive-collection',
    name: 'Series3Page',
    component: Series3Page
  },
  {
    path: '/:slug',
    name: 'ProductPage',
    component: ProductPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  // 配置滚动行为，每次路由切换时滚动到顶部
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（比如浏览器前进/后退），则使用保存的位置
    if (savedPosition) {
      return savedPosition
    } else {
      // 否则滚动到顶部
      return { top: 0 }
    }
  }
})

// 使用路由后置守卫确保页面跳转时滚动到顶部
router.afterEach((to, from) => {
  // 使用 nextTick 确保 DOM 更新完成后再滚动
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 平滑滚动，如果希望立即滚动可以改为 'auto'
    })
  }, 0)
})

export default router

