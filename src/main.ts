import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/routes';
// @ts-ignore
import store from './store/indexTs';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
