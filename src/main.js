import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import { showLoading, hideLoading } from '@/utils/loading'

Vue.config.productionTip = false
Vue.prototype.$showLoading = showLoading
Vue.prototype.$hideLoading = hideLoading
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
