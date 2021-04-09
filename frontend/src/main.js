/* Author: Y.Anderegg
Date: 17.03.2021
Topic: Eventmanager IPA 2021 */

//necessary imports
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

//new created Vue Instance
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')