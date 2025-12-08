import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ProductPage from '../views/ProductPage.vue'
import ProductDetail from '../views/ProductDetail.vue'
import AboutUs from '../views/AboutUs.vue'
import JoinUs from '../views/JoinUs.vue'
import AllProducts from '../views/AllProducts.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about/:slug',
    name: 'AboutUs',
    component: AboutUs,
    props: true
  },
  {
    path: '/join-us',
    name: 'JoinUs',
    component: JoinUs
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

