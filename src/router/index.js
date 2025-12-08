import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductPage from '../views/product/ProductPage.vue'
import ProductDetail from '../views/product/ProductDetail.vue'
import Origin from '../views/science/Origin.vue'
import DevelopmentHistory from '../views/science/DevelopmentHistory.vue'
import HonorsAwards from '../views/science/HonorsAwards.vue'
import KeyIngredients from '../views/house/KeyIngredients.vue'
import TechnologyAndPatents from '../views/house/TechnologyAndPatents.vue'
import ExclusiveServices from '../views/member/ExclusiveServices.vue'
import MembershipSystem from '../views/member/MembershipSystem.vue'
import AllProducts from '../views/product/AllProducts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/origin/honors-awards',
    name: 'HonorsAwards',
    component: HonorsAwards
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
    path: '/origin',
    name: 'Origin',
    component: Origin
  },
  {
    path: '/key-ingredients',
    name: 'KeyIngredients',
    component: KeyIngredients
  },
  {
    path: '/technology-and-patents',
    name: 'TechnologyAndPatents',
    component: TechnologyAndPatents
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

