import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// // 路由守卫
// router.beforeEach((to, from, next) => {
//   // 如果用户访问的是登录页
//   if (to.path === 'login') return next()
//   // 获取token
//   const tokenstr = window.sessionStorage.getItem('token')
//   // 没有token，强制跳转登录页面
//   if (!tokenstr) return next('/login')
//   next()
// })
export default router
