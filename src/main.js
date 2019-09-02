import Vue from 'vue'
import App from './App.vue'
import * as fb from 'firebase'
import router from './router/router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import BuyModalComponent from './components/Shared/BuyModal'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyCiYvXt8dU1gXz9GXHlyJoa-jh2GLYqCUo',
      authDomain: 'spa-te.firebaseapp.com',
      databaseURL: 'https://spa-te.firebaseio.com',
      projectId: 'spa-te',
      storageBucket: 'spa-te.appspot.com',
      messagingSenderId: '1078131389133',
      appId: '1:1078131389133:web:602b68f7f85f2654' })
    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
}).$mount('#app')
