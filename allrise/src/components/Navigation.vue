<template>
    <div>
    <Nav class="navBar"> <!-- Nav and ul should be the same class because they share the same styling -->
        <ul class="navBar">

            <li v-bind:class = "progressPage">
                <router-link :to="progress.path" class="link" v-bind:class = "loadedPage">
                    <!--                    <div class="icon" v-bind:class = "selectedPage">-->
                    <img src="../assets/progressOrange.png" alt="logo" v-if="loadedPage.userProgress === true" class="image"
                         v-bind:class = "progressPage"/>
                    <img src="../assets/progressGrey.png" alt="logo" v-if="loadedPage.userProgress !== true" class="image"
                         v-bind:class = "progressPage"/>

                    {{progress.text}}
                </router-link>
            </li>

            <li v-bind:class = "challengePage">
                <router-link :to="challenge.path" class="link" v-bind:class = "loadedPage">
                    <img src="../assets/challengeOrange.png" alt="logo" v-if="loadedPage.challenge === true" class="image"
                         v-bind:class = "challengePage"/>
                    <img src="../assets/challengeGrey.png" alt="logo" v-if="loadedPage.challenge !== true" class="image"
                         v-bind:class = "challengePage"/>
                    {{challenge.text}}
                </router-link>
            </li>

            <li v-bind:class = "leaderPage">
                <router-link :to="board.path" class="link" v-bind:class = "loadedPage">
                        <img src="../assets/leaderBoardOrange.png" alt="logo" v-if="loadedPage.leaderboard === true" class="image"
                             v-bind:class = "leaderPage"/>
                        <img src="../assets/leaderBoardGrey.png" alt="logo" v-if="loadedPage.leaderboard !== true" class="image"
                             v-bind:class = "leaderPage"/>
                    {{board.text}}

                </router-link>
            </li>

        </ul>
    </Nav>
    </div>
</template>

<script >


    export default {
        name: "Navigation",
        props: {
            page:String,
        },
        data() {
            return {
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
        computed: { //Determining which page the navigation bar is on, and highlighting the indicator
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

    .navBar{

        height: 75px;
        border-bottom: lightgray;



    }
    .navBar ul{

        margin: -65px auto 30px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        width: 75%;
    }
    .navBar li{
        margin:5px;
        display: inline-grid;
        list-style-type: none;
    }
    .navBar .link {
        position: relative;

        display: table-column;
        height: 70px;
        vertical-align: bottom;
        float: bottom;
        font-family: Verdana;
        font-size: 18px;
        color: black;
        text-decoration: none;
        padding-top: 5px;
        padding-left: 15px;
        padding-right: 15px;
        bottom: 0;

    }

    .navBar .link:hover{
        color: #E06E3C;
        background: rgba(236, 236, 236, 0.81);

        border-bottom: #E06E3C;
        border-bottom-style: solid;
        border-bottom-width: 3px;
    }

    .leaderboard .link{
        /*color: #E06E3C;*/
        border-bottom: #E06E3C;
        border-bottom-style: solid;
        border-bottom-width: 3px;
    }
    .challenge .link{
        /*color: #E06E3C;*/
        border-bottom: #E06E3C;
        border-bottom-style: solid;
        border-bottom-width: 3px;
    }
    .userProgress .link {
        /*color: #E06E3C;*/
        border-bottom: #E06E3C;
        border-bottom-style: solid;
        border-bottom-width: 3px;
    }



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
        width: 35px;
        height: 30px;
        float: top;
        margin-left: 25%;
        margin-right: 25%;
    }

</style>