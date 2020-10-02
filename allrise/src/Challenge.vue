<template>
    <v-app style="background: none; margin-top: 0;">
        <transition name="view">
    <div class="challenge" >
     
    <!-- The page -->
<!--      <Navigation page="challenge" />-->
<!--        <edit-navigation page="challenge"/>-->

        <h4 class="textTitle">Challenge Accepted!</h4>

        <div class="greenField">
            <H5 class="challengeName"><b> {{challenges[calcPosition].name}} </b></H5>
            <h5 class="Reward">Reward for winning: {{challenges[calcPosition].reward}} </h5>
        </div>

        <div  class="orangeBallTimer" v-if="!isFixedChallenge" @click="starttimer" >
          <a class="timer" style="color: white;" >{{formattedElapsedTime}}</a>
        </div>

        <div  class="orangeBallTimer" v-if="isFixedChallenge" @click="startFitbitTracker" >
            <a class="timer" v-if="!started" style="color: white;" >Start</a>
            <a class="timer" v-if="started" style="color: white;" >GameOn</a>

        </div>

        <div class="greenField">
            <div class="personContainer">

                <v-layout row wrap>
                    <v-row>

                        <v-col cols="5" >
                            <v-layout justify-end="end">
                            <div class="Challenger1">
<!--                                <div class="challengersField" style="margin-bottom: 0; width: 90%">{{challenges[calcPosition].creator_id}}</div>-->
                                <div class="challengersField" style="margin-bottom: 0; width: 90%" >{{this.creator[0].name}}</div>
                            </div>
                            </v-layout>
                        </v-col>

                        <v-col cols="2" style="padding: 0; padding-top: 10px; padding-left: 4px;">
                            <div class="orangeBall" style="margin:0">VS</div>
                        </v-col>
                        <v-col cols="5">
                            <v-layout justify-start="start">
                            <div class="Challenger2">
<!--                                <div class="challengersField" style="margin-bottom: 0; width: 90%">{{challenges[calcPosition].participant_id}}</div> &lt;!&ndash; In these challengersFields there need to be the names of the participants for 1v1's &ndash;&gt;-->
                                <div class="challengersField" style="margin-bottom: 0;" >{{this.participant[0].name}}</div> <!-- In these challengersFields there need to be the names of the participants for 1v1's -->
                            </div>
                            </v-layout>
                        </v-col>
                    </v-row>
                </v-layout>
<!--                <div class="Challenger1">-->
<!--                <div class="challengersField">{{this.creator[0].name}}</div>-->
<!--                </div>-->



<!--                <div class="Challenger2">-->
<!--                <div class="challengersField">{{this.participant[0].name}}</div> &lt;!&ndash; In these challengersFields there need to be the names of the participants for 1v1's &ndash;&gt;-->
<!--                </div>-->

                </div>
            <button class="finishButton" data-toggle="modal" @click="checkWinner" data-target="#winnerModal">Finish Game!</button>
        </div>



             <!-- Modal -->
        <v-dialog v-model="modal" activator=".finishButton" width="500px" >

<!--            challenge is finished-->
            <v-card dark style="padding-bottom: 25px;">
                <v-card-title v-if="isFixedChallenge"  >
                    <h3 id="challengeTitle">Winner Is!</h3>
                </v-card-title>
                    <v-card-title  v-if="!isFixedChallenge" >
                        <h3 id="challengeTitle">Challenge finished!</h3>
                    </v-card-title>
                <div class="greenField" style="padding-top: 20px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; padding-bottom: 20px;">
                    <v-layout row wrap  >
                        <v-row justify-center="center"  >

                            <v-col cols="12" >
                                <v-layout justify-center="center">
                                    <div v-if="isFixedChallenge" class="Challenger1" >
                                        <h2 class="winnerText">{{showWinner()}}</h2>
                                        <button v-if="draw" class="challengersButton" @click="aDraw" style="margin-top: 0;  width: 80%;">Next</button>

                                        <button v-if="creatorWin"   class="challengersButton" @click="vote1" style="margin-top: 0;  width: 80%;">Next</button>
                                        <button v-if="participantWin" class="challengersButton" @click="vote2" style="margin-top: 0;  width: 80%;">Next</button>


                                    </div>
                                    <div v-if="!isFixedChallenge" class="Challenger1"  >
                                        <button class="challengersButton" @click="vote1" style="margin-top: 0;  width: 80%;">{{this.creator[0].name}}</button>
                                    </div>
                                </v-layout>
                            </v-col>
                            <v-col v-if="!isFixedChallenge" cols="12"  style="padding: 0; padding-top: 10px; padding-left: 4px;" >
                                <div class="orangeBall" style="margin:0">VS</div>
                            </v-col>
                            <v-col cols="12" v-if="!isFixedChallenge" >
                                <v-layout justify-center="center" >
                                    <div class="Challenger2">
                                        <button class="challengersButton" @click="vote2" style="margin-top: 0; width: 80%;">{{this.participant[0].name}}</button>
                                    </div>
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-layout>
                </div>
            </v-card>
            <v-card v-if="!isFixedChallenge" >
                <v-card-title >
                    <h3 id="challengeTitle">Challenge finished!</h3>
                </v-card-title>
                <div class="greenField" style="padding-top: 20px; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; padding-bottom: 20px;">
                    <v-layout row wrap  >
                        <v-row justify-center="center">
                            <v-col cols="12"   >
                                <v-layout justify-center="center">
                                <div class="Challenger1" >
                                    <button class="challengersButton" @click="vote1" style="margin-top: 0;  width: 80%;">{{this.creator[0].name}}</button>
                                </div>
                                </v-layout>
                            </v-col>
                            <v-col cols="12"  style="padding: 0; padding-top: 10px; padding-left: 4px;">
                                <div class="orangeBall" style="margin:0">VS</div>
                            </v-col>
                            <v-col cols="12" >
                                <v-layout justify-center="center">
                                    <div class="Challenger2">
                                        <button class="challengersButton" @click="vote2" style="margin-top: 0; width: 80%;">{{this.participant[0].name}}</button>
                                    </div>
                                </v-layout>
                            </v-col>
                        </v-row>
                    </v-layout>
                </div>
            </v-card>
        </v-dialog>
    </div>
        </transition>
    </v-app>
</template>


<script>
import axios from 'axios'
if(process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://all-rise-backstage.herokuapp.com'
}else{
    axios.defaults.baseURL = 'http://' + window.location.hostname + ':3000'
}
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
  props: [
    'id',
    'creator_id',
    'participant_id'
  ],
    components: 
    {
        // EditNavigation,
    },
    data () {
        return {
            draw:false,
            creatorWin:false,
            participantWin:false,
            finaleScoreCreator:0,
            finalScoreParticipant:0,
            startingStepsCreator:0,
            endStepsCreator:0,
            startingStepsParticipant:0,
            endStepsParticipant:0,
            challenge: {},
            challenges: [],
            creator: [],
            participant: [],
            elapsedTime: 0,
            timer: undefined,
            modal: false,
            started: false
        }
    },
    computed: {
      formattedElapsedTime() {
       var date = new Date(null);
       date.setSeconds(this.elapsedTime / 1000);
       const utc = date.toUTCString();
       return utc.substr(utc.indexOf(":") - 2, 8);
      },
        calcPosition() {
          var count = 0, continueLoop = true;
          while(continueLoop){
                if(parseInt(this.challenges[count].id) === parseInt(this.id)){
                    break;
                }
                if(this.challenges[count+1] === undefined){
                    break;
                }
                count++;
            }
            return count;
        }
    },
    beforeMount(){
        this.loadChallenge().then(this.loadParticipants)
    },
    mounted(){

    },
    methods:{

        startFitbitTracker: function(){
            this.started = true;
            let creatorId = this.challenges[this.calcPosition].creator_id;
            let participantId = this.challenges[this.calcPosition].participant_id;

            if (this.challenges[this.calcPosition].name === "Most steps") {

                const compareData = async () => {

                    let resCreator = await axios.get('https://api.fitbit.com//1/user/' + creatorId+'/activities/steps/date/today/1d.json').then( res => {
                        this.startingStepsCreator = res.data['activities-steps'][0].value;
                    });

                    console.log(" IGNORE => "+ resCreator + " "+ this.startingStepsCreator);

                    let resParticipant = await axios.get('https://api.fitbit.com//1/user/' +participantId+'/activities/steps/date/today/1d.json').then(res =>{
                       this.startingStepsParticipant =  res.data['activities-steps'][0].value;


                    });
                    console.log( "IGNORE => ", resParticipant);


                };
                compareData().catch(error => console.log(error));

            }else {

                const compareDat = async () => {

                    let resCreator = await axios.get('https://api.fitbit.com//1/user/' + creatorId+'/activities/calories/date/today/1d.json').then( res => {
                        this.startingStepsCreator = res.data['activities-calories'][0].value;
                    });

                    console.log("IGNORE => "+ resCreator);

                    let resParticipant = await axios.get('https://api.fitbit.com//1/user/' +participantId+'/activities/calories/date/today/1d.json').then(res =>{
                        this.startingStepsParticipant =  res.data['activities-calories'][0].value;
                    });
                    console.log("IGNORE => ", resParticipant);


                };
                compareDat().catch(error => console.log(error));
            }


        },

      checkWinner(){
          this.started = false;
          let creatorId = this.challenges[this.calcPosition].creator_id;
          let participantId = this.challenges[this.calcPosition].participant_id;


          if (this.challenges[this.calcPosition].name === "Most steps") {
              const getData = async () => {

                  let resCreator = await axios.get('https://api.fitbit.com//1/user/' + creatorId+'/activities/steps/date/today/1d.json').then( res => {
                      this.endStepsCreator = res.data['activities-steps'][0].value;
                  }).catch( err => console.log(err));

                  console.log("IGNORE => "+ resCreator);

                  let resParticipant = await axios.get('https://api.fitbit.com//1/user/' + participantId + '/activities/steps/date/today/1d.json').then(res => {
                      this.endStepsParticipant = res.data['activities-steps'][0].value;

                  }).catch(err => console.log(err));

                  console.log(" IGNORE => "+ resParticipant);

              };
              getData().then(this.compare);


          }else  {
              const getData = async () => {

                  let resCreator = await axios.get('https://api.fitbit.com//1/user/' + creatorId+'/activities/calories/date/today/1d.json').then( res => {
                      this.endStepsCreator = res.data['activities-calories'][0].value;
                  }).catch( err => console.log(err));

                  console.log(" IGNORE => "+ resCreator);

                  let resParticipant = await axios.get('https://api.fitbit.com//1/user/' + participantId + '/activities/calories/date/today/1d.json').then(res => {
                      this.endStepsParticipant = res.data['activities-calories'][0].value;

                  }).catch(err => console.log(err));

                  console.log("IGNORE => " + resParticipant);

              };
              getData().then(this.compare);

          }

      },

        compare(){
            console.log(" IGNORE after compare => " + this.endStepsParticipant - this.startingStepsParticipant);

            this.finaleScoreCreator =  this.endStepsCreator - this.startingStepsCreator;
            this.finalScoreParticipant = this.endStepsParticipant - this.startingStepsParticipant;
            if (this.finaleScoreCreator > this.finalScoreParticipant) {
                this.creatorWin = true;
            }else if (this.finaleScoreCreator < this.finalScoreParticipant) {
                this.participantWin = true;
            }else{
                this.draw = true;
            }
        },

        showWinner() {
            console.log("final score to be compared " + this.finaleScoreCreator + " " + this.finalScoreParticipant);
            if (this.finaleScoreCreator > this.finalScoreParticipant) {
                return this.creator[0].name;
            } else if (this.finaleScoreCreator === this.finalScoreParticipant) {
                return 'Draw !';
            } else {
                return this.participant[0].name;
            }
        },
      isFixedChallenge(){
          if ( this.challenges[this.calcPosition].name === "Most steps" ||
               this.challenges[this.calcPosition].name === "Burner") {

              return true
          }
          return false;
      },
      loadChallenge(){
        return axios.get('/challenges')
        .then((response) => {
          this.challenges = response.data;
          this.$nextTick(() => this.loadParticipants());
          })
        .catch( err => console.log(err))
      },
      loadParticipants(){
        this.$nextTick(function (){
          axios.get('/users/' + this.challenges[this.calcPosition].creator_id)
          .then(response => this.creator = response.data)
          .catch( err => console.log(err))


        axios.get('/users/' + this.challenges[this.calcPosition].participant_id)
          .then(response => this.participant = response.data)
          .catch( err => console.log(err))
        })
      },
        starttimer: function(){
          if(this.started === false){
          this.timer = setInterval(() => {
            this.elapsedTime += 1000;
          }, 1000);
          this.started = true;
          }
          var timerCircle = document.getElementsByClassName("orangeBallTimer")[0];
            console.log(timerCircle);
          timerCircle.classList.add("ballActive");
        },
        stoptimer: function(){
          clearInterval(this.timer);
          this.started = false;
            var timerCircle = document.getElementsByClassName("orangeBallTimer")[0];

            timerCircle.classList.remove("ballActive");
        },
        aDraw: function(){
            this.modal = !this.modal;
            let thisPage = window.location.pathname;
            let newPage = thisPage.split('/', 1);
            this.$router.push(newPage[0] + '/waiting');
        },
        vote1: function(){
          axios.post('/challenges/' + this.id +'/' + this.creator[0].id).catch(e =>{
            console.log(e);
          });

          let challangePos = this.calcPosition;
            axios.post('/coupon/' + this.challenges[challangePos].reward + '/' + this.challenges[challangePos].creator_id + '/' + this.challenges[challangePos].participant_id).catch(e =>{
                console.log(e);
            });


            this.modal = !this.modal;
            let thisPage = window.location.pathname;
            let newPage = thisPage.split('/', 1);
            this.$router.push(newPage[0] + '/waiting');
        },
        vote2: function(){
          axios.post('/challenges/' + this.id +'/' + this.participant[0].id).catch(e =>{
            console.log(e);
          });

            let challangePos = this.calcPosition;
            axios.post('/coupon/' + this.challenges[challangePos].reward + '/' + this.challenges[challangePos].participant_id + '/' + this.challenges[challangePos].creator_id).catch(e =>{
                console.log(e);
            });

            this.modal = !this.modal;
            let thisPage = window.location.pathname;
            let newPage = thisPage.split('/', 1);
            this.$router.push(newPage[0] + '/waiting');
        },
    },
    update(){

    }

}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.winnerText{
    color: #111;
    font-family: 'Helvetica Neue',
    sans-serif; font-weight: bold;
    letter-spacing: -1px;
    line-height: 1;
    text-align: center;
}

    .textTitle{
        font-family: Verdana;
        font-weight: bold;
        font-size: 24px;
        color: lightgray;
        /*margin-left: 10%;*/
        text-align: center;
        margin-right: auto;
        margin-left: auto;
        margin-top: 50px;
    }

  .text{
      font-family: Verdana;
      font-weight: bold;
      font-size: 18px;

    margin-left: 10%;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;
  }
  .nav-bar{
    margin-top: 70px;
    align-self: center;
  }
  .greenField{


       display:table;
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
        position: relative;
        min-height: 100px;
  }
  .orangeBall{
      display: inline-block;

      font-family: Verdana;
      font-weight: bold;
      font-size: 24px;
      color: white;

    display: inline-block;
    border-radius: 100%;
    background: #E06E3C;
    height: 50px;
    width: 50px;
    margin-top: 20px;
    margin-left: 5%;
    margin-right: 5%;

    padding: 5px;
  }
  .orangeBallTimer{
      color: white;

    display: block;
    border-radius: 100%;
    background: #E06E3C;
    height: 200px;
    width: 200px;
    margin: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  .ballActive{
    animation: pulse 1s infinite;
  }
  @keyframes pulse{
      0%{
          box-shadow: 0 0 0 0 rgba(224, 110, 60, 0.7);
      }
      70% {
         box-shadow: 0 0 0 30px rgba(224, 110, 60, 0);
      }
  }

  .timer{
      font-family: Verdana;
      font-weight: bold;
      font-size: 34px;
    color: white;
    display: flex;
    line-height: 180px;
    justify-content: center;
  }
  .personContainer{
      width: 100%
  }

  .finishButton{
      font-family: Verdana;
      font-weight: bold;
      font-size: 18px;
      color: white;


        display: table;
        flex-wrap: wrap;
        background: #28847B;
        width: 60%;
        height: 75px;
        max-width: 800px;
        text-align: center;
        min-height: 50px;
        border: 0px solid;
        border-radius: 20px;
        font-size: 24px;
        margin-top: 30px;
        margin-left: auto;
        margin-right:auto;
      margin-bottom: 20px;

        position: relative;

      background-position: center;
      transition: background 0.8s;
  }

  .finishButton:active{
    background-color: #2c3e50;
    background-size: 100%;
    transition: background 0s;
    outline: none;
    border: none;
  }

  .finishButton:focus{
      outline-width: 0;
  }
  .challengersField{
      display: inline-block;

      font-family: Verdana;
      font-weight: bold;
      font-size: 18px;
      color: white;

      padding: 10px;
      background: #28847B;
      min-width: 100px;
      min-height: 50px;
      /*width: 30%;*/
      width: 90%;
      height: fit-content;
      /*margin-top: 20px;*/
      /*margin-bottom: 20px;*/
      /*margin-left: 100px;*/
      /*margin-right: 100px;*/
      border: 0px solid;
      border-radius: 10px;
  }
  .Challenger1, .Challenger2{
      width: 80%;
  }
  .challengersButton{
      font-family: Verdana;
      font-weight: bold;
      font-size: 18px;
      color: white;

      background: #28847B;
      width: auto;
      height: auto;
      padding: 10px;
      margin-top: 20px;
      /*margin-bottom: 20px;*/
      /*margin-left: 100px;*/
      /*margin-right: 100px;*/
      border: 0px solid;
      border-radius: 10px;

      color: white;
      background-position: center;
      transition: background 0.8s;
  }
  .challengersButton:active{
    background-color: #2c3e50;
    background-size: 100%;
    transition: background 0s;
    outline: none;
    border: none;
  }

  .challengersButton:focus{
    outline-width: 0;
  }

  .challengeName{

      font-family: Verdana;
      font-weight: bold;
      font-size: 24px;

    width: auto;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
  }
  .Reward{
      font-family: Verdana;
      font-weight: bold;
      font-size: 18px;

    width: auto;
    text-align: center;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 20px;
    position: relative;
  }
@media only screen and (max-width: 625px) {
    .textTitle{
        margin-top: 15px;
    }
    .greenField{
        margin-top: 40px;
        width: 90%;
    }
    .challengeName{
        font-size: 20px;
    }
    .Reward{
        font-size: 14px;
    }
    .challengersField{
        font-size: 14px;
        /*min-width: 50px;*/
        width: 90% !important ;
    }
    .finishButton{
        margin-top: 10px;
        font-size: 20px;
    }

}


</style>>
