import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'

// import "reset-css/reset.css";
// import "sweetalert2/dist/sweetalert2.css";


Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: routerMode,
    strict: process.env.NODE_ENV !== 'production'
})


new Vue({
    router,
    store,
}).$mount('#app')
