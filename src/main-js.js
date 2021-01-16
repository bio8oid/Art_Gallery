import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/routes';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(Vuex)

new Vue({
   router,
   store,
   render: h => h(App),
}).$mount('#app');
