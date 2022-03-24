// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/fonts/back/iconfont.css'
import "muse-ui/dist/muse-ui.css";
import './assets/fonts/search/iconfont.css'
import './assets/fonts/user/iconfont.css'
import './assets/fonts/library/iconfont.css'
import './assets/fonts/setting/iconfont.css'
import './assets/fonts/about/iconfont.css'
import './assets/fonts/night/iconfont.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
