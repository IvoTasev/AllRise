import Vue from 'vue'
import App from './App.vue'
 import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import store from "../store";
import router from "../router";
import axios from 'axios'
Vue.prototype.$axios = axios;


Vue.use(VueRouter);

Vue.config.productionTip = false;

Vue.prototype.$fitbit = {
    token: window.localStorage.getItem('fitbitOauthToken'),
    expiresIn: window.localStorage.getItem('fitbitOauthExpiresIn'),
    accountUserId: window.localStorage.getItem('fitbitOauthAccountUserId'),
    isLoggedIn: window.localStorage.getItem('fitbitOauthToken') !== undefined
};

if (Vue.prototype.$fitbit.token !== undefined) {
    Vue.prototype.$axios.defaults.headers.common = {
        'Authorization': 'Bearer ' + Vue.prototype.$fitbit.token
    }
}

new Vue({
   el: '#app',
  router,
  vuetify,
    store,
  render: h => h(App)
});

