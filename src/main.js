// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Toast from './components/common/toast.js'
require('bootstrap')
import './assets/css/bootstrap.css'
import './assets/css/toast.css'
import './assets/css/calendar.scss'

Vue.use(Toast);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
