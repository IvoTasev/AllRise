import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import App from '../App.vue'
// import board from '../leaderBoard.vue'
// import navBar from '../components/EditNavigation'
// import challengeWaiting from '../ChallengeWaiting.vue'
// import challenge from '../Challenge.vue'
// import progress from '../Progress.vue'
import VueRouter from 'vue-router';
// import vuetify from '../plugins/vuetify';

// import Router from '../../router.js'

Vue.use(VueRouter);

Vue.config.productionTip = false

// const routes = [
//     {path: '/', component: navBar},
//     {path: '/progresspage', component: progress},
//     {path: '/leaderboards', component: board},
//     {path: '/waiting', component: challengeWaiting},
//     {path: '/challenge', component: challenge}
// ]
//
// const ourRouter = new VueRouter({
//     routes : routes,
//     mode : 'history'
// })



Vue.use(Vuetify);


export default new Vuetify({
    el: '#app',
    // router : Router,
    // vuetify,
    theme:{
        themes: {
            dark:{
                primary: '#e06e3c'
            }
        }
    },
    render: h => h(App)
});
