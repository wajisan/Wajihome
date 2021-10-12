import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import vuetify from './plugins/vuetify';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
//import '../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css';
import '../node_modules/@fortawesome/fontawesome-free/js/brands.js';
import '../node_modules/@fortawesome/fontawesome-free/js/solid.js';
import '../node_modules/@fortawesome/fontawesome-free/js/fontawesome.js';
import "./design/style.css";

Vue.config.productionTip = false

const base = axios.create({
  baseURL: "http://wajihome.wajisan.eu:9765"
});



Vue.prototype.$http = base;
Vue.prototype.$appName = 'WajiHome';
Vue.prototype.$appURL = 'http://wajihome.wajisan.eu:9005/'

Vue.config.productionTip = false;
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
