import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(BootstrapVue);
// register jw pagination component globally
import JwPagination from 'jw-vue-pagination';
Vue.component('jw-pagination', JwPagination);
import VModal from 'vue-js-modal'
 
Vue.use(VModal)

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyDdBrcA_slQq6owvm3Q5_waRJAA0PjyzhI",
  authDomain: "nlpf-1570028868321.firebaseapp.com",
  databaseURL: "https://nlpf-1570028868321.firebaseio.com",
  projectId: "nlpf-1570028868321",
  storageBucket: "nlpf-1570028868321.appspot.com",
  messagingSenderId: "811645163630",
  appId: "1:811645163630:web:5af5ebe66a950db88a6e7f",
  measurementId: "G-CDS8G5F4XD"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');