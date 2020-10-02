<template>
<!--    <v-app>-->
    <v-card id="navCard" s12 md8 dark >
        <Nav  class="navBar"> <!-- Nav and ul should be the same class because they share the same styling -->
            <div id="indicator"/>

            <ul  class="navBar">

                    <v-layout row style="margin-right: 10px;" >

                    <v-flex class="flex" xs2 md1 >
                    <img src="../assets/all-rise-logo.png"
                         class="logo-img"
                         style="  margin-left: auto; margin-right: auto;"
                    >
                    </v-flex>
                    <v-flex class="flex" xs1 md2 lg1 xl1 style=" min-width: fit-content;">
                <li v-bind:class = "progressPage" id="Progress" @click="switchPage('Progress')">

                        <router-link :to="progress.path" class="link" v-bind:class = "loadedPage" >
                            <!--                    <div class="icon" v-bind:class = "selectedPage">-->
                            <img src="../assets/progressOrange.png" alt="logo" v-if="loadedPage.userProgress === true" class="image"
                                 v-bind:class = "progressPage"/>
                            <img src="../assets/progressGrey.png" alt="logo" v-if="loadedPage.userProgress !== true" class="image"
                                 v-bind:class = "progressPage"/>
                            {{progress.text}}
                        </router-link>

                </li>
                    </v-flex>
                    <v-flex class="flex" xs1 md2 lg1 xl1 style=" min-width: fit-content;">
                <li v-bind:class = "challengePage" id="challenge" @click="switchPage('challenge')">

                    <router-link :to="challenge.path" class="link" v-bind:class = "loadedPage" >
                        <img src="../assets/challengeOrange.png" alt="logo" v-if="loadedPage.challenge === true" class="image"
                             v-bind:class = "challengePage"/>
                        <img src="../assets/challengeGrey.png" alt="logo" v-if="loadedPage.challenge !== true" class="image"
                             v-bind:class = "challengePage"/>
                        {{challenge.text}}
                    </router-link>

                </li>
                    </v-flex>
                    <v-flex class="flex" xs1 md2 lg1 xl1 style=" min-width: fit-content;">
                <li v-bind:class = "leaderPage" id="leaderboards" @click="switchPage('leaderboards')">

                    <router-link :to="board.path" class="link" v-bind:class = "loadedPage" >
                            <img src="../assets/leaderBoardOrange.png" alt="logo" v-if="loadedPage.leaderboard === true" class="image"
                                 v-bind:class = "leaderPage"/>
                            <img src="../assets/leaderBoardGrey.png" alt="logo" v-if="loadedPage.leaderboard !== true" class="image"
                                 v-bind:class = "leaderPage"/>
                        {{board.text}}

                    </router-link>

                </li>
                    </v-flex>
                        <v-spacer  />
                    <v-flex xs1 sm2 md2 lg2 justify-end v-if="this.$store.state.userIsAuthorized">

<!--                    <a  :key="this.$store.state.userIsAuthorized" v-if="!this.$store.state.userIsAuthorized" class="signin" @click="auth0Login" >-->

<!--                    <i  class="fa fa-user-circle fa-lg" aria-hidden="true"></i>-->
<!--                        Login-->
<!--                    </a>-->
                        <v-row md="12">
                            <v-col class="signInDiv1" cols="6" >
                                <a v-if="this.$store.state.userIsAuthorized" class="signin" @click="logout" >
                                    SignOut
                                    <h1 id="displayUserName" >{{ user.firstName }}</h1>
                                </a>
                            </v-col>
                            <v-col class="signInDiv2" cols="6">

    <!--                    </v-flex>-->
    <!--                        <v-flex xs1 md1 xl1  >-->
                             <img id="userProfile" :src="user.avatar150"
                                   class="logo-img"
                                  style="  margin-left: auto; margin-right: auto;"
                             >
                            </v-col>
                        </v-row>
                        </v-flex>

                    </v-layout>
            </ul>
        </Nav>
<!--    </v-app>-->
    </v-card>
</template>

<script >
    import axios from "axios"
    import router from "../../router";
    // import router from 'vue-router'
    if(process.env.NODE_ENV === 'production') {
        axios.defaults.baseURL = 'https://all-rise-backstage.herokuapp.com'
    }else{
        axios.defaults.baseURL = 'http://' + window.location.hostname + ':3000'
    }
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log(router);

    export default {
        name: "EditNavigation",
        props: {
            // router,
            // page:String,
        },
        data() {
            return {
                client: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID,
                page: "",
                activeElement: "",
                leaderboard: false,
                userchallenge: false,
                userProgress: false,
                fitbitData:{},
                loggedIn: false,
                progress:    {
                    text: " Progress ",
                    path: "/progresspage",
                    icon: "progress"
                },
                challenge:   {
                    text: "Challenges",
                    path: "/waiting",
                    icon: "challenge"
                },
                board:   {
                    text: "LeaderBoard",
                    path: "/leaderboards",
                    icon: "board"
                }
            }
        },
        mounted(){
            var indicator = document.querySelector('#indicator');
            var item = document.querySelectorAll('li');
            var currentIndicator = "";

            indicator.style.width = 0;

            var CheckSize = function(){
                var UpdateIndicator = function(){
                    var called = false;
                    var elements = document.getElementsByTagName('li');
                    for(let count = 0; count < elements.length; count++){
                        if(elements[count].getAttribute('id') !== undefined) {
                            if (elements[count].getAttribute('id') === currentIndicator) {
                                // console.log("Moving to indicator: " + elements[count].getAttribute('id'));
                                // console.log("current indicator is: " + elements[count].getAttribute('id'));
                                switchIndicator(elements[count]);
                                called = true;
                                break;
                            }
                        }
                            if(called === false){
                                indicator.style.width = 0;
                            }
                    }
                }
                window.addEventListener('resize', UpdateIndicator, false);
            }
            //
            document.addEventListener('DOMContentLoaded', CheckSize, false );

            function switchIndicator(e){
                if(e.tagName === "IMG") {
                    var parent = e.parentElement;
                    console.log("tye of element clicked is: " + parent.tagName);
                    indicator.style.left = parent.offsetLeft + "px";
                    indicator.style.width = parent.offsetWidth + "px";
                }else{
                    console.log("tye of element clicked is: " + e.tagName);
                    indicator.style.left = e.offsetLeft + "px";
                    indicator.style.width = e.offsetWidth + "px";
                }
            }

            item.forEach(link => {
                link.addEventListener('click', (e)=>{
                    console.log("Setting page to: " + this.page);
                    currentIndicator = this.page;
                    console.log("Indicator set to: " + currentIndicator);
                    switchIndicator(e.target);
                })
            })
        },
        methods:{

            logout(){
                this.$store.dispatch('auth0Logout');
                console.log('logging out');
            },
            // auth0Login(){
            //     this.$store.dispatch('auth0Login');
            //     console.log('we are in auth0Login');
            // },
            switchPage: function(newPage){

                // this.leaderboard = boardPage;
                // this.userchallenge = challengePage;
                // this.userProgress = mainPage;
                this.page = newPage;
                console.log("page updated to : " + this.page);

            },

        },

        computed: { //Determining which page the navigation bar is on, and highlighting the indicator
            // getting user fitbit data
            user () {
                return this.$store.getters.fitbit.user

            },
            progressPage: function() {
                 let leaderboard = false, challenge = false, progress = false;
                //let progress = false;
                if (this.page === "Progress") {
                    console.log(this.name + " is progress!");
                    progress = true;
                }
                return {
                    leaderboard: leaderboard,
                    challenge: challenge,
                    userProgress: progress
                }
            },
            challengePage: function(){
                let leaderboard = false, challenge = false, progress = false;
                 if (this.page === "challenge") {
                    console.log(this.name + " is challenge!");
                    challenge = true;
                }
                return {
                    leaderboard: leaderboard,
                    challenge: challenge,
                    userProgress: progress
                }
            },
            leaderPage: function(){
                let leaderboard = false, challenge = false, progress = false;
                if (this.page === "leaderboards") {
                    console.log(this.name + " is board!");
                    leaderboard = true;
                }
                return {
                    leaderboard: leaderboard,
                    challenge: challenge,
                    userProgress: progress
                }
            },
            loadedPage: function(){
                let leaderboard = false, challenge = false, progress = false;
                if (this.page === "Progress") {
                    console.log(this.name + " is progress!");
                    progress = true;
                }
                else if (this.page === "challenge") {
                    console.log(this.name + " is challenge!");
                    challenge = true;
                }
                else if (this.page === "leaderboards") {
                    console.log(this.name + " is board!");
                    leaderboard = true;
                }
                return {
                    leaderboard: leaderboard,
                    challenge: challenge,
                    userProgress: progress
                }
            }
        }
    }

</script>


<style scoped>
    @import url("//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    .navBar{

        margin-right: auto;
        margin-left: auto;
        min-height: 75px;
        height: fit-content;
        /*border-bottom-width: 1px;*/
        /*border-bottom-style: solid;*/
        /*width: 75%;*/
        /*margin-bottom: 10px;*/

    }
    .profile{
        float:right;
        width: 86px;
        height:98px;
        display:block;
    }
    .navBar ul{
        min-height: 75px;
        height: fit-content;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        margin-left: 0;
        border-bottom: lightgray;
    }

    .navBar li{
        width: 100%;
        height: 75px;
        vertical-align: center;
        horiz-align: left;
        color: white;
        margin: 5px;
        display: inline-grid;
        list-style-type: none;
    }

    .flex{
        height: 75px;
    }

    .signin{

        /*horiz-align: center;*/
        /*vertical-align: center;*/
        float: right;
        font-family: Verdana;
        font-size: 15px;
        /*color: black;*/
        color: white;
        text-decoration: none;
       /*margin-top: 25px;*/
        margin-left: 25%;
        margin-right: 25%;
        /*padding-top: 20px;*/
        /*padding-left: 15px;*/
        /*padding-right: 15px;*/
        bottom: 0;
    }
    .signin:hover{
        color: #E06E3C;

    }
    .navBar .link {

        position: relative;

        display: table-column;
        /*height: 70px;*/
        width: 100%;
        height: 100%;
        vertical-align: bottom;
        float: bottom;
        font-family: Verdana;
        font-size: 18px;
        /*color: black;*/
        color: white;
        text-decoration: none;
        padding-top: 5px;
        padding-left: 15px;
        padding-right: 15px;
        bottom: 0;

    }

    .navBar .link:hover{
        color: #E06E3C;
        /*background: rgba(236, 236, 236, 0.81);*/
        background: rgb(48, 48, 48);


    }
    .logo-img{
        vertical-align: center;
        horiz-align: center;
        width: 90px ;
        height: 90px;
        /*width: 86px;*/
        /*height:75px;*/
        display:block;
    }

    /*.leaderboard .link{*/
    /*    !*color: #E06E3C;*!*/
    /*    border-bottom: #E06E3C;*/
    /*    border-bottom-style: solid;*/
    /*    border-bottom-width: 3px;*/
    /*}*/
    /*.challenge .link{*/
    /*    !*color: #E06E3C;*!*/
    /*    border-bottom: #E06E3C;*/
    /*    border-bottom-style: solid;*/
    /*    border-bottom-width: 3px;*/
    /*}*/
    /*.logo-img{*/
    /*    margin: 0; padding: 0;*/
    /*}*/
    /*.userProgress .link {*/
    /*    !*color: #E06E3C;*!*/
    /*    border-bottom: #E06E3C;*/
    /*    border-bottom-style: solid;*/
    /*    border-bottom-width: 3px;*/
    /*}*/


    /*.icon{ //Intentionally commented out for testing    */
    /*   !*vertical-align: top;*!*/
    /*   !* height: 20px;*!*/
    /*   !* width: 20px;*!*/
    /*   !* background: #999999;*!*/
    /*   !* border-radius: 10px;*!*/
    /*   !* margin-left: auto;*!*/
    /*   !* margin-right: auto;*!*/

    /*    display: table-column;*/
    /*    vertical-align: top;*/
    /*    width: 20px;*/
    /*    height: 20px;*/
    /*    float: top;*/
    /*    margin-left: 25%;*/
    /*    margin-right: 25%;*/
    /*}*/

    .image{
        transition: opacity 0.5s ease-in-out, transform 0.5s ease;

        display: table-column;
        vertical-align: top;
        horiz-align: center;
        width: 35px;
        height: 30px;
        float: top;
        margin-left: auto;
        margin-right: auto;
    }
    #displayUserName{
        font-size: 24px;
    }
    #userProfile{
        /*margin-top: 10px;*/
        width: 65px ;
        height: 65px;
        border-radius: 50%;
    }
    .signInDiv1{
        padding-right: 0;
        padding-left: 40px;
    }
    .signInDiv2{
        padding-right: 40px;
        padding-left: 0;
    }

    #indicator {
        position: absolute;
        height: 4px;
        /*width: 100%;*/
        background: #E06E3C;
        margin-top: 5em;
        /*bottom: -8px;*/
        transition: 0.5s;
    }


    /*@media only screen and (min-width: 960px) {*/
    /*    #indicator {*/
    /*        position: absolute;*/
    /*        height: 4px;*/
    /*        width: 100%;*/
    /*        background: #E06E3C;*/
    /*        margin-top: 5em;*/
    /*        !*bottom: -8px;*!*/
    /*        transition: 0.5s;*/
    /*    }*/
    /*}*/
    @media only screen and (max-width: 768px){
        #indicator {
            position: absolute;
            height: 4px;
            /*width: 100%;*/
            background: #E06E3C;
            margin-top: 3em;
            /*bottom: -8px;*/
            transition: 0.5s;
        }
        .logo-img{
            width: 50px ;
            height: 50px;
        }
        .image{
            width: 22px;
            height: 20px;
        }

        .navBar .link {
            font-size: 10px;
            padding: unset;
        }
        .navBar li{
            height: fit-content;
        }
        .navBar{
            margin-top: 10px;
            min-height: 50px;
            height: 50px;
        }
        .navBar ul{
            margin-bottom: unset;
            min-height: 50px;
            height: 50px;
        }

        #navCard{
            margin-top: -15px;
            width: 100%;
        }
        .signin{
           margin-left: 10px;
            margin-top: 0;
            font-size: 12px;

        }
        .flex{
            height: 50px;
        }

        #displayUserName{

            font-size: 14px;
        }
        #userProfile{

            width: 32px ;
            height: 32px;
        }
        .signInDiv1{
            padding-top: 2px;
            /*padding-right: 0;*/
            /*padding-left: 40px;*/
        }
        .signInDiv2{
            padding-top: 2px;
            /*padding-right: 40px;*/
            /*padding-left: 0;*/
        }

    }
    /*@media only screen and  (max-width: 458px) {*/
    /*    #indicator {*/
    /*        position: absolute;*/
    /*        height: 4px;*/
    /*        width: 0;*/
    /*        background: #E06E3C;*/
    /*        margin-top: 9.5em;*/
    /*        !*bottom: -8px;*!*/
    /*        transition: 0.5s;*/
    /*    }*/
    /*}*/


</style>