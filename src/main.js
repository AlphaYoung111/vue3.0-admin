import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/normalize.scss'

//ele
import 'element-ui/lib/theme-chalk/index.css'
import ele from './plugin/ele'
Vue.use(ele)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
