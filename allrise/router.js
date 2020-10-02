import Vue from 'vue'
import VueRouter from 'vue-router';
import board from './src/leaderBoard.vue'
import navBar from './src/components/EditNavigation'
import challengeWaiting from './src/ChallengeWaiting.vue'
import challenge from './src/Challenge.vue'
import progress from './src/Progress.vue'
 import Store from "./store";
import auth0callback from "./src/auth0callback";
import LoginCard from "./src/components/LoginCard";
import reload from "./src/components/reload";


Vue.use(VueRouter);


const router =  new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/', component: navBar, name: 'navBar',redirect: '/login'},
        {path:'/login',component:LoginCard, name:'LoginCard'},
        {path:'/progresspage/auth0callback',component:auth0callback,name:'callback'},
        {path: '/progresspage', component: progress,  name: 'progress' ,meta: {requiresAuth:true}},
        {path: '/leaderboards', component: board,  name: 'board',meta: {requiresAuth:true}},
        {path: '/waiting', component: challengeWaiting,  name: 'challengeWaiting', meta: {requiresAuth:true}},
        {path: '/challenge/:id', component: challenge,  name: 'challenge', props: true,meta: {requiresAuth:true}},
        {path: '/reloadPage/:returnAddress', component: reload, name: "reload"}
    ]
});

    router.beforeEach( (to, from, next)=>{

    let routerAuthCheck = false;


        // Verify all the proper access variables are present for proper authorization
    if( localStorage.getItem('fitbitOauthToken') && localStorage.getItem('fitbitOauthAccountUserId') && localStorage.getItem('fitbitOauthExpiresIn') ){
        console.log('found local storage tokens');
        // Check whether the current time is past the Access Token's expiry time
        let expiresAt = localStorage.getItem('fitbitOauthExpiresIn');
        // set localAuthTokenCheck true if unexpired / false if expired
        routerAuthCheck = new Date().getTime() < expiresAt;
        console.log("router auth checkk  "+routerAuthCheck);
        console.log("expires at   "+expiresAt +" "+ new Date().getTime());

    }

    // set global ui understanding of authentication
    Store.commit('setUserIsAuthenticated', routerAuthCheck);

    // check if the route to be accessed requires authorizaton
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Check if user is Authenticated
        if(routerAuthCheck){
            // user is Authenticated - allow access
            next();
        }
        else{
            // user is not authenticated - redirect to login
            router.replace('/login');
        }

    }
    // Allow page to load
    else{
        next();
    }
});

export default router;

