import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router/routes';
import store from './store/indexTs';
console.log('store:', store)

Vue.config.productionTip = false;

new Vue({
    router,
    // store,
    store: store.original, // Inject the classic Vuex store.
    render: h => h(App),
}).$mount('#app');


// import Vue from "vue"
// import App from './App.vue';
// import store from './store/indexTs';
// import './registerServiceWorker';
// import router from './router/routes';

// // console.log('store:', store)
// // console.log('store:', store.original)

// new Vue({
//     router,
//     store: store.original, // Inject the classic Vuex store.
//     render: h => h(App),
// }).$mount("#app")