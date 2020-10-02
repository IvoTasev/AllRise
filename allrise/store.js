import Vue from 'vue'
import Vuex from 'vuex'
// import auth0 from 'auth0-js'
// import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userIsAuthorized:false,

        fitbit: {
            user: {},
            activity:{}
        },

    },
    getters:{
        fitbit: state => {
            return state.fitbit
        }
    },
    mutations: {
        setFitbitUser (state, user) {
            state.fitbit.user = user;
            state.fitbit.userIsAuthorized = true;
        },
        setFitbitActivity (state, activity) {
            state.fitbit.activity = activity
        },
        setUserIsAuthenticated(state, replacement){
            state.userIsAuthorized = replacement;
        }

    },


    actions: {
        auth0Logout() {

            localStorage.removeItem('fitbitOauthToken');
            localStorage.removeItem('fitbitOauthExpiresIn');
            localStorage.removeItem('fitbitOauthAccountUserId');

            // redirect to auth0 logout to completely log the user out
            window.location.href = "/login"
            // window.location.href = process.env.VUE_APP_AUTH0_CONFIG_DOMAINURL + "/v2/logout?returnTo=" + process.env.VUE_APP_DOMAINURL + "/login&client_id=" + process.env.VUE_APP_AUTH0_CONFIG_CLIENTID;
        },
        fetchProfile({commit},fitbit){
            console.log('acount id ' + fitbit.accountUserId);
            Vue.prototype.$axios({
                url: 'https://api.fitbit.com/1/user/' + fitbit.accountUserId + '/profile.json',
                method: 'GET'
            }).then(function (response) {
                commit('setFitbitUser', response.data.user);
                console.log('Profile Data ' ,response.data);

            }).catch(function (error) {
                console.log(error.response)
            })
        },
        fetchActivity({commit},fitbit){
            Vue.prototype.$axios({
                url: 'https://api.fitbit.com/1/user/' + fitbit.accountUserId + '/activities/date/today.json',
                method: 'GET'
            }).then(function (response) {
                commit('setFitbitActivity', response.data.summary);
                console.log('Activity Data ' ,response.data);

            }).catch(function (error) {
                console.log(error.response)
            })
        },

    }
})