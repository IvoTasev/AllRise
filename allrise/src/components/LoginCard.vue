<template >
    <v-container v-if="!this.$store.state.userIsAuthorized">
        <v-slide-y-transition mode="out-in" >
            <v-layout row wrap align-center>
                <v-flex xs12 sm8 md5  lg4 offset-lg4>
                    <v-card style="background-color: black !important;" class="transparent">

                                <v-layout  justify-center="center" >

                                <v-flex xs5  >

                                <v-img

                                        src="../assets/fitbit_logo.png"
                                        height="125px"
                                        contain
                                />

                            </v-flex>
                                </v-layout>

                        <v-card-actions class="pa-2">
                            <v-col cols="12"> <v-btn class="btn"  @click="login">Login</v-btn></v-col>


                        </v-card-actions>

                    </v-card></v-flex>
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
    export default {
        name: "LoginCard",
        data(){
          return {
              fitbitClientId: '22BMLD'


          }
        },
        methods: {
            auth0Login(){
                this.$store.dispatch('auth0Login');
                     console.log('we are in auth0Login');
            },
            login(){
                // window.location.href = 'https://www.fitbit.com/oauth2/authorize?client_id=' + this.fitbitClientId + '&response_type=token&scope=activity%20profile&expires_in=2592000'
                if(process.env.NODE_ENV === 'production'){
                    window.location.href = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=" + this.fitbitClientId + "&redirect_uri=https://all-rise-stage.herokuapp.com/progresspage/auth0callback&scope=activity%20heartrate%20profile%20social&expires_in=604800"
                }else {
                    window.location.href = "https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=" + this.fitbitClientId + "&redirect_uri=http://localhost:8080/progresspage/auth0callback&scope=activity%20heartrate%20profile%20social&expires_in=604800"
                }
            },
        },
    }
</script>

<style scoped>
    .transparent {
        background-color: white!important;
        opacity: 0.65;
        border-color: transparent!important;
    }
    .btn:hover{
        color:  #E06E3C;
    }

</style>