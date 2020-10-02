<template>
    <v-app style="background: none; margin-top: 0;" >
  <div class="challengeWaiting">
<!--      <EditNavigation page="challenge"/>-->
<!--      <div>{{something}}</div>-->
        <ul class="challengesList">
            <li  v-bind:key="challenge.name" v-for="challenge in challenges" class="challenges">
                 <div class="textChallenge">
                     <p id="TitleName">{{challenge.name}}</p>
                     <p class="textContent"> Challenger: {{getChallenger(challenge.creator_id)}} </p>
                        <p class="textContent"> Reward: {{challenge.reward}} </p>
                </div>
                <router-link type="button" :to='"/challenge/" + challenge.id' class="challengeButton">
<!--                    <img src="./assets/acceptButton.png" alt="Go">-->
                    <img src="./assets/playButton.png" alt="Go">
                </router-link>
            </li>

            <PopUp/>

        </ul>
  </div>
    </v-app>
</template>

<style>
    .v-application p{
        margin-bottom: unset;
    }
    .challengesList{
        height: auto;
    }
    .challenges {
        display: flex;
        flex-wrap: wrap;
        background: #CCE8D1;
        /*background: #B3B3B3;*/
        width: 60%;
        max-width: 800px;
        text-align: center;
        min-height: 100px;
        border-style: none;
        border-radius: 20px;
        font-size: 24px;
        margin-top: 3%;
        margin-left: auto;
        margin-right:auto;
        height: auto;
    }
    .textChallenge{
        flex-wrap: wrap;
        width: 70%;
        text-align:left;
        margin-left: 5%;
        margin-right: auto;
        margin-top: 10px;
       font-style: normal;
        font-family: Verdana;
        padding-top: 15px;
        padding-bottom: 25px;
    }

    .challengeButton {
        padding: 7px;
        background: #28847B;
        height: 50px;
        width: 50px;
        margin-top: auto;
        margin-bottom: auto;
        margin-right: 5%; 
        margin-left: auto;
        float: right;
        border-radius: 40px;
        border-style: none;
        cursor: pointer;

        background-position: center;
        transition: background 0.8s;
    }
    .challengeButton:active{
        background-color: #2c3e50;
        background-size: 100%;
        transition: background 0s;
        outline: none;
        border: none;
    }
    .challengeButton:focus{
        outline: 0;
    }

    #TitleName{
        margin-bottom: unset;
        /*margin-top: 10px;*/
        font-family: Verdana;
        font-weight: bold;
        font-size: 24px;
    }

    .textContent{

        margin-top: 5px;
        font-family: Verdana;
        font-weight: bold;
        font-size: 17px;
    }


    img{
       margin-left: 7px;
        margin-bottom: 4px;
        width: 25px;
        height: 30px;
    }

    @media only screen and (max-width: 625px) {
        .challengesList{
           margin-left: -20px;
        }
        .challenges{
            width: 95%;
        }
       #TitleName{
           font-size: 20px;
       }
       .textContent{
           font-size: 13px;
           margin-bottom: 8px;
       }
    }

</style>

<script>
import axios from 'axios'
// import EditNavigation from "./components/EditNavigation";
import PopUp from "./components/ChallengePopUp";
if(process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://all-rise-backstage.herokuapp.com'
}else{
    axios.defaults.baseURL = 'http://' + window.location.hostname + ':3000'
}
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
    components: {
        // EditNavigation,
        PopUp
    },
    data () {
        return {
            users: [],
            challenges: [],
            popUp: false
        }
    },
    computed:{
        user() {
            return this.$store.getters.fitbit.user
        }
    },
    mounted(){
         axios.get('/challengeWaiting/' + this.user.encodedId)
            .then(response => this.challenges = response.data)
            .catch( err => console.log(err));
        axios.get("/users")
            .then(response => this.users = response.data)
            .catch(err => console.log(err));
    },
    methods: {
        getChallenger(challengerId){
            for(let count = 0; count < this.users.length; count++){
                if(this.users[count].id === challengerId){
                    return this.users[count].name;
                }
            }
            return "No one...";
        }
    }

    // comments:{EditNavigation},

    
}
</script>

<style>

</style>
