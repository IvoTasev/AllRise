<template>
    <div class="callback"> </div>
</template>

<script>
    export default {
        name: 'callback',
        created() {
            this.setOauthInStorage();
            this.setOauthInVue();
            this.$router.push('/progresspage');

        },
        methods: {
            setOauthInStorage () {
                var url = window.location.href;
                console.log("URL  "+url);

                var access_token = url.split("#")[1].split("=")[1].split("&")[0];
                var userId = url.split("#")[1].split("=")[2].split("&")[0];
                var expiresIn = url.split("#")[1].split("=")[5].split("&")[0] * 1000 + new Date().getTime();
                console.log("expiry " + expiresIn);
                localStorage.setItem('fitbitOauthToken', access_token);
                localStorage.setItem('fitbitOauthExpiresIn', expiresIn);
                localStorage.setItem('fitbitOauthAccountUserId', userId)
            },
            setOauthInVue () {
                this.$fitbit.token = localStorage.getItem('fitbitOauthToken');
                this.$fitbit.expiresIn = localStorage.getItem('fitbitOauthExpiresIn');
                this.$fitbit.accountUserId = localStorage.getItem('fitbitOauthAccountUserId');
                this.$fitbit.isLoggedIn = localStorage.getItem('fitbitOauthToken') !== undefined;
                this.$axios.defaults.headers.common = {
                    'Authorization': 'Bearer ' + this.$fitbit.token
                };
                console.log("Token "+this.$fitbit.token )
            },

        },
        mounted() {

        }
    }
</script>