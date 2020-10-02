<template>
    <v-app style="background: none; margin-top: 0;">

        <UsedCouponPopUp :v-if="showPopUp" v-bind:key="coupon.id" v-for="coupon in checkedCouponList" :loserCoupons="coupon" :person="person" :id="id" />
        <v-layout class="layoutContainer" row wrap justify-start="start">
            <v-row class="layoutContainer">
            <v-flex class="layoutContainer" xs12 md8 lg7 >

                <v-row  justify-lg="center" justify-md="center" justify-sm="center" >
                    <v-flex  xs11 sm10 md10 lg10 >
                        <v-layout  row justify-end="end" >

                            <div class ="containerProgress" id="container1"  >
                                <div id="steps">
                                    <v-progress-circular id="progress1" :color="color1" rotate="129"  :size="wheelSize" :value="(getSteps())" :width="wheelWidth"/>
                                    <div class = "barSize"></div>
                                    <div class="infoContainer">
                                        <p class = "number" :style="{color: color1}">{{activity.steps}}</p>
                                        <p class = "word"   :style="{color: color1}">Steps</p>
                                    </div>
                                </div>
                            </div>

                            <v-dialog v-model="stepDialog" width="500px" activator="#container1">
                                <v-card dark>
                                    <v-card-title>
                                        <h3>Set your daily step goal</h3>
                                        <v-form ref="form" class="px-3" dark v-model="valid" style="width: 100%">
                                            <v-layout row wrap>
                                                <v-col  md="6">
                                                     <v-text-field label="Step Goal" dark v-model="newStepGoal" :rules="stepRules" required/>
                                                </v-col>
                                                <v-col md="6">
                                                    <v-btn flat class=" btn btn-success" style="color: #e06e3c; float: right; border: solid 1px #e06e3c" @click="submitStepGoal" :disabled="!valid" > Submit </v-btn>
                                                </v-col>
                                            </v-layout>
                                        </v-form>
                                    </v-card-title>
                                </v-card>
                            </v-dialog>

                            <div class ="containerProgress" id="container2">
                                <div id="calories">
                                    <v-progress-circular :color="color2" rotate="129" :size="wheelSize" :value="(getCalories())" :width="wheelWidth"/>
                                    <div class = "barSize"></div>
                                    <div class="infoContainer">
                                        <p class = "number" :style="{color: color2}">{{activity.caloriesOut}}</p>
                                        <p class = "word" :style="{color: color2}">Calories</p>
                                    </div>
                                </div>
                            </div>

                            <v-dialog v-model="calorieDialog" width="500px" activator=" #container2">
                                <v-card dark>
                                    <v-card-title>
                                        <h3>Set your daily calorie goal</h3>
                                        <v-form ref="form" class="px-3" dark v-model="calorieValid" style="width: 100%">
                                                <v-layout row wrap>
                                                <v-col xs="12" sm="12" md="6">
                                                    <v-text-field label="Calorie Goal" dark v-model="newCalorieGoal" :rules="calorieRules" required/>
                                                </v-col>
                                                <v-col  xs="12" sm="12" md="6">
                                                    <v-btn flat class=" btn btn-success" style="color: #e06e3c; float: right; border: solid 1px #e06e3c" @click="submitCalorieGoal" :disabled="!calorieValid" > Submit </v-btn>
                                                </v-col>
                                                </v-layout>
                                        </v-form>
                                    </v-card-title>
                                </v-card>
                            </v-dialog>
                        </v-layout>
                    </v-flex>
                </v-row>

                <v-layout id="pointLayout" row justify-center="center">
                    <v-flex xs12 sm10 md10 lg10 >
                    <v-row justify-md="end" justify-sm="center">
                        <div class="pointContainer">
                            <point-component :name="user.fullName" :points="person[personId].points" position="middle"/>
                        </div>
                    </v-row>
                    </v-flex>
                </v-layout>

                <v-layout id="factLayout" row justify-center="center">
                    <v-flex xs12 sm10 md10 lg10 >
                    <v-row justify-md="end" justify-sm="center">
                            <div class="messageContainer">
                                <div class = "greetingTitle">Hello {{user.firstName}},</div>  <!--  /** id as array position!!!/ -->
                                <p class = "funFact">     Did you know that {{fact[0].description}}</p>
                            </div>
                    </v-row>
                    </v-flex>
                </v-layout>
<!--                </div>-->
            </v-flex>

                <v-flex class="couponLayout"  md3 lg3 style="horiz-align: left">
                    <v-layout class="couponLayout" justify-start="start">
                        <div class="couponContainer">
                            <div class="couponTitle">coupons</div>
                            <CouponPopUp :description="this.coupons"/>
                        </div>
                    </v-layout>
                </v-flex>
            </v-row >
        </v-layout>
    </v-app>
</template>

<script>
    // import EditNavigation from "./components/EditNavigation";
    import Image from './assets/All-rise-background.jpg'
    import pointComponent from "./components/UserPoints"
    import CouponPopUp from "./components/SelectCouponPopUp"
    import UsedCouponPopUp from "./components/UsedCoupon"
    import axios from "axios"
    // import goal from "../../backend/models/goal";

    console.log(process.env.NODE_ENV);
    if(process.env.NODE_ENV === 'production') {
        axios.defaults.baseURL = 'https://all-rise-backstage.herokuapp.com'
    }else{
        axios.defaults.baseURL = 'http://' + window.location.hostname + ':3000'
    }
    axios.defaults.headers.post['Access-Control-Allow-Origin']= '*';
     export default {
         name: "Progress",
         components: {
             pointComponent,
             CouponPopUp,
             UsedCouponPopUp,
         },
         data: function () {
             return {
                 Image,
                 show: true,
                 person: [],
                 fact: {},
                 coupons: [],
                 stepsProgress: 0,
                 calorieProgress: 0,
                 id: 1,
                 personId: 0,
                 color1: '#28847b',
                 color2: '#28847b',
                 stepGoal: 0,
                 calorieGoal: 0,
                 goals: [],
                 newStepGoal: null,
                 newCalorieGoal: null,
                 stepDialog: false,
                 calorieDialog: false,
                 stepGoalId: 0,
                 calorieGoalId: 0,
                 stepRules: [
                     v => !!v || 'A goal is required',
                     v => !isNaN(v) || 'Goal must be a number',
                     v => v > 250 || 'minimum goal is 250 steps'
                 ],
                 calorieRules: [
                     v => !!v || 'A goal is required',
                     v => !isNaN(v) || 'Goal must be a number',
                     v => v > 1000 || 'minimum goal is 1000 calories'
                 ],
                 valid: false,
                 calorieValid: false,
                 loserCoupon: [],
                 checkedCouponList: [],
                 showPopUp: false,
                 wheelSize: 200,
                 wheelWidth: 30,
              };
         },
         props: {
             page: String

         },
         computed: {
             user() {
                 return this.$store.getters.fitbit.user;
             },
             activity() {
                 return this.$store.getters.fitbit.activity
             }

         },
         created() {
             window.addEventListener("resize", this.updateWindowSize);

             this.show = Object.keys(this.user).length > 0;
             if (!this.show) {
                 var self = this;
                 this.$axios.all([
                     self.$store.dispatch('fetchProfile', this.$fitbit),
                     self.$store.dispatch('fetchActivity', this.$fitbit)
                 ])
             }

         },
         beforeMount() {

             var context = this;
             context.id = context.user.encodedId;

             axios.get('/users')
                 .then(function (response) {
                     context.person = response.data;
                     context.calcUserArrayPosition( false);
                     context.postNewUser();
                 })
                 .catch( err => console.log(err));

             axios.get('/health_fact')
                 .then(response => this.fact = response.data)
                 .catch( err => console.log(err));



             axios.get('/coupon/winner/' + this.user.encodedId) //should get by Id not by 1
                 .then(response => this.coupons = response.data)
                 .catch( err => console.log( err));

             axios.get('/coupon/loser/' + this.id) .then(function (response) { //should get by id not by 1
                 context.loserCoupons = response.data;
                 console.log("Loser coupon list from " + context.user.encodedId + " : " + response.data);
                 if(context.loserCoupons !== []) {
                     console.log(context.loserCoupons);
                     context.checkUsedCoupon();
                 }
                 else{
                     console.log(context.loserCoupons);
                 }
             })
                 .catch( err => console.log(err));

             axios.get('/goals/' + this.user.encodedId)
                 .then(function (response) {

                     // this.goals = response.data;
                     context.goals = response.data;
                     context.postNewStepGoal();
                     context.postNewCalorieGoal();
                 })
                 .catch( err => console.log( err));

             this.updateWindowSize();
         },
         methods: {
             getSteps: function () {
                 if(this.activity.steps === 0 ){return 0}
                 else {
                     this.stepsProgress = (this.activity.steps / this.stepGoal) * 78.888;
                     console.log("steps is: " + this.stepsProgress);

                     if (this.stepsProgress >= 78.888) {
                         this.color1 = '#E06E3C';
                     } else {
                         this.color1 = '#28847b';
                     }
                     return this.stepsProgress;
                 }
             },
             getCalories: function () {
                 if(this.activity.caloriesOut === 0 ){return 0}
                 else {
                     this.calorieProgress = (this.activity.caloriesOut / this.calorieGoal) * 78.888;
                     console.log("steps is: " + this.calorieProgress);
                     if (this.calorieProgress > 78.888) {
                         this.color2 = '#E06E3C';
                     } else {
                         this.color2 = '#28847b';
                     }
                     return this.calorieProgress;
                 }
             },
             submitStepGoal: function () {
                 this.stepDialog = false;
                 console.log(this.newStepGoal);
                 axios.post('/goals/' + this.stepGoalId + '/' + this.newStepGoal).catch(e => {
                     console.log(e);
                 });
                 this.stepGoal = this.newStepGoal;
             },
             submitCalorieGoal: function () {
                 this.calorieDialog = false;
                 axios.post('/goals/' + this.calorieGoalId + '/' + this.newCalorieGoal).catch(e => {
                     console.log(e);
                 });
                 this.calorieGoal = this.newCalorieGoal;
             },
             postNewStepGoal() {
                 let count = 0, continueLoop = true, checkStepGoal = 0;

                 while (continueLoop) {
                     if (this.goals[count] === undefined) {
                         break;
                     }
                     if (this.goals[count].name === "steps") {
                         checkStepGoal = parseInt(this.goals[count].desciption);
                         this.stepGoalId = parseInt(this.goals[count].id);
                         console.log("recorded step goal is: " + checkStepGoal);
                     }
                     if (this.goals[count + 1] === undefined) {
                         break;
                     }
                     console.log("count: " + count);
                     count++;
                 }
                 console.log("after while count: " + count);

                 console.log("called! " + checkStepGoal);
                 if (checkStepGoal === 0) {
                     console.log("calling : /goals/" + this.user.encodedId);
                     axios.post('/goals/steps/1024/' + this.user.encodedId).catch(e => {
                         console.log(e);
                     });
                     this.stepGoal = checkStepGoal;
                 } else {
                     this.stepGoal = checkStepGoal;
                 }
             },
             calcUserArrayPosition(returnStatement) {
                 let count;
                 for (count = 0; count < this.person.length; count++) {
                     console.log("checking: " + this.person[count].id + " === " + this.user.encodedId);
                     if (this.person[count].id === this.user.encodedId) {
                         console.log("checking FOUND!");
                         if (returnStatement) {
                             console.log("returns 1");
                             return count;
                         } else {
                             console.log("returns nothing");
                             this.personId = count;
                             console.log("Array id is: " + this.personId);
                         }
                     }
                 }
             },
             postNewCalorieGoal() {
                 let count = 0, continueLoop = true, checkCalorieGoal = 0;

                 while (continueLoop) {
                     if (this.goals[count] === undefined) {
                         break;
                     }
                     if (this.goals[count].name === "calories") {
                         checkCalorieGoal = parseInt(this.goals[count].desciption);
                         this.calorieGoalId = parseInt(this.goals[count].id);
                     }
                     if (this.goals[count + 1] === undefined) {
                         break;
                     }
                     count++;
                 }

                 console.log("called! " + checkCalorieGoal);
                 if (checkCalorieGoal === 0) {
                     console.log("calling : /goals/" + this.user.encodedId);
                     axios.post('/goals/calories/1000/' + this.user.encodedId).catch(e => {
                         console.log(e);
                     });
                     this.calorieGoal = checkCalorieGoal;
                 } else {
                     this.calorieGoal = checkCalorieGoal;
                 }
             },
             postNewUser(){
                 let position = this.calcUserArrayPosition(true);
                 if(this.person[position] === undefined && this.user.encodedId !== undefined) {
                     console.log(this.calcUserArrayPosition(true) + "*****and ***" + this.user.encodedId);
                     axios.post('/users/' + this.user.encodedId + '/' + this.user.fullName + '/' + this.activity.caloriesOut + '/' + ((parseInt)(this.activity.caloriesOut) / 50) + '/' + this.activity.steps)
                         .then(() => {
                             console.log("user " + this.user.encodedId + " added");
                         })
                         .catch(err => console.log(err));
                 } else{
                         console.log("user already exists");
                     }
             },
             checkUsedCoupon() {
                 for (let count = 0; count < this.loserCoupons.length; count++) {
                     console.log(this.loserCoupons[count]);
                     // console.log("coupon " + this.coupons[count].id + "is activated at " + count);
                     if (this.loserCoupons[count].activated === 1) {
                         //if (this.loserCoupons[count].loser_id === 1) {
                             this.checkedCouponList.push(this.loserCoupons[count]);
                             console.log("Adding to the coupon List! " + this.loserCoupons[count]);
                         }
                     }

                 console.log(this.checkedCouponList);
                 if (this.checkedCouponList !== []) {
                     this.showPopUp = true;
                     console.log("showPopUp : " + this.showPopUp);
                 }
             },
             updateWindowSize() {

                     var windowWidth = window.innerWidth;

                     if(windowWidth > 703){
                        this.wheelSize = 200;
                        this.wheelWidth = 30;
                     }else if(windowWidth < 703){
                        this.wheelSize = 100;
                        this.wheelWidth = 13;
                     }
             },
         },

         destroyed() {
             window.removeEventListener("resize", this.updateWindowSize);
         },
     }
</script>

<style >

    div .v-input__slot:after{
    color: #e06e3c;
    }

    #progress1{
        /*transition-delay: 1s;*/
    }

    .pageContainer{
        font-size: 0;
        letter-spacing: 0;
        word-spacing: 0;
        transition-delay: .5ms;
    }

    .containerProgress{
        /*margin-right: 30px;*/
        margin-left: 25px;
        margin-top: 30px;
        display: inline-block;
        width: 300px;
        height: 300px;
        background: #CCE8D1;
        /*background: #B3B3B3;*/
        border-radius: 15px;
        padding-top: 20px;

        font-family: Verdana;
        font-size: 30px;
        color: #28847B;
        font-weight: bold;

    }
    #container2:hover, #container1:hover{
        cursor: pointer;
    }


    .pointContainer{
        margin-top: 30px;
        /*margin-left: auto;*/
        /*margin-right: auto;*/
        /*margin-right: 5%;*/
        min-width: 300px;
        max-width: 650px;
        /*width: 70%;*/
        width: 100%;
        height: 80px;

        background: #CCE8D1;
        /*background: #B3B3B3;*/
        border-radius: 10px;
       padding-top: 15px;
        padding-left: 15px;
    }

    .messageContainer{
        margin-top: 30px;
        /*margin-left: auto;*/
        /*margin-left: 30px;*/
        /*margin-right: auto;*/
        /*margin-right: 5%;*/
        min-width: 300px;
        max-width: 650px;
        /*width: 70%;*/
        width: 100%;
        min-height: 100px;
        height: fit-content;
        background: #CCE8D1;
        /*background: #B3B3B3;*/
        border-radius: 10px;
        padding: 5px;
        padding-bottom: 15px;
    }

    h3{
        word-break: normal;
    }

    .blockContainer{
        /*margin-top: -20px;*/
        display: inline-block;
        margin-left: auto;
        margin-right: auto;
        max-width: 700px;
        width: 85%;
        height:fit-content;
    }

    .couponContainer{
        vertical-align: top;
        display: inline-block;
        margin-top: 30px;
        margin-left: auto;
        margin-right: auto;
        min-width: 300px;
        max-width: 650px;
        width: 100%;
        min-height: 600px;
        max-height: 600px;
        height: fit-content;
        background: #CCE8D1;
        /*background: #B3B3B3;*/
        border-radius: 10px;
        overflow-y: scroll;
        /*padding: 5px;*/
        /*padding-bottom: 15px;*/
    }

    .couponTitle{
        font-family: Verdana;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5px;
        margin-top: 5px;
        font-weight: bold;
        font-size: 24px;
        color: #2c3e50;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #2c3e50;
        width: 60%;
        padding: 2px;
    }


    body {
        margin: 15px;
    }

    .barSize{
        float: bottom;
        margin-left: auto;
        margin-right: auto;
        margin-top: -80px;
        width: 0;
        height: 0;
        border-left: 100px solid transparent;
        border-right: 100px solid transparent;
        border-bottom: 80px solid #E06E3C;
    }

    #calories .barSize, #steps .barSize{
        position: absolute;
        z-index: 1;
        margin-top: -105px;
        margin-left: 38px;

        border-left: 110px solid transparent;
        border-right: 110px solid transparent;
        border-bottom: 150px solid  #CCE8D1;

    }


    .infoContainer{
        position: absolute;
        z-index: 2;
        width: 300px;
        height: 100px;
        margin-top: -50px;

    }

    .infoContainer .number{
        margin-right: auto;
        margin-left: auto;
        margin-bottom: unset;
    }
    .infoContainer .word{
        margin-right: auto;
        margin-left: auto;
        margin-bottom: unset;
    }

    /* .containerProgress #steps .number, .containerProgress  #steps .word{*/
    /*     color: #E06E3C;*/
    /*}*/

    /*.containerProgress #calories  .number, .containerProgress #calories  .word{*/
    /*    color: #28847b;*/
    /*}*/

    .greetingTitle{
        margin-top: 10px;
        margin-left: 10px;
        text-align: left;
        font-family: Verdana;
        font-size: 18px;
        font-weight: bold;
    }

    .funFact{
        margin-top: 10px;
        margin-left: 10px;
        text-align: left;
        font-family: Verdana;
        font-size: 18px;
        font-weight: bold;
    }
    @media only screen and (max-width: 1090px) and (min-width: 960px){
        .containerProgress{
            /*margin-left: 15px;*/
            width: 270px;
            height: 270px;
        }
        #calories .barSize, #steps .barSize {
            /*margin-top: -52px;*/
            margin-left: 23px;
            /*border-bottom: 150px solid #CCE8D1;*/

            /*border-left: 55px solid transparent;*/
            /*border-right: 55px solid transparent;*/
            /*border-bottom: 150px solid transparent;*/
        }
        .infoContainer .number{
            width: 270px;
            margin-right: 0 !important;
            margin-left: 0;
        }
        .infoContainer{
            width: 180px;
        }
        .infoContainer .word{
            width:  270px;
            margin-left: 0;
            margin-right: 0 !important;
    }
        @media only screen and (max-width: 982px) and (min-width: 959px){
            #container2 {
                 margin-left: 10px;
            }
        }
    }
    @media only screen and (max-width: 959px) and (min-width: 866px){
        #container2{
            margin-right: 10%;
        }
    }
    @media only screen and (max-width: 759px) and (min-width: 702px) {
        .containerProgress {
            /*margin-left: 15px;*/
            width: 270px;
            height: 270px;
        }

        #calories .barSize, #steps .barSize {
            /*margin-top: -52px;*/
            margin-left: 23px;
            /*border-bottom: 150px solid #CCE8D1;*/

            /*border-left: 55px solid transparent;*/
            /*border-right: 55px solid transparent;*/
            /*border-bottom: 150px solid transparent;*/
        }

        .infoContainer .number {
            width: 270px;
            margin-right: 0 !important;
            margin-left: 0;
        }

        .infoContainer {
            width: 180px;
        }

        .infoContainer .word {
            width: 270px;
            margin-left: 0;
            margin-right: 0 !important;
        }
    }

    @media only screen and (max-width: 866px) and (min-width: 740px){
        #container2{
            margin-right: 4%;
        }
    }

    @media only screen and (max-width: 702px) and (min-width: 599px){
        #container1{
            margin-left: 0;
        }
    }

    @media only screen and (max-width: 702px){
        #calories .barSize, #steps .barSize {
            margin-top: -52px;
            margin-left: 34px;
            /*border-bottom: 150px solid #CCE8D1;*/

            border-left: 55px solid transparent;
            border-right: 55px solid transparent;
            border-bottom: 75px solid #CCE8D1;
        }
        .infoContainer .number{
            margin-top: 40px;
            font-size: 20px;
            width: 180px;
            margin-right: 0 !important;
            margin-left: 0;
        }
        .infoContainer{
            width: 180px;
        }
        .infoContainer .word{
            margin-top: -5px;
            font-size: 24px;
            width: 180px;
            margin-left: 0;
            margin-right: 0 !important;

        }
        .containerProgress{
            /*margin-left: 15px;*/
            width: 180px;
            height: 180px;
        }
        .couponContainer{
            min-width: 300px;
            width: 93%;
            margin-left: 30px;
            min-height: 300px;
            height: 350px;
        }
        .messageContainer{
            min-width: 300px;
            /*margin-left: 5px;*/
            margin-left: 50px;
            width:90%;
        }
        .pointContainer{
            min-width: 300px;
            margin-left: 50px;
            width:90%;
            padding-top: 20px;
        }
        #container2{
            margin-left: 15px;
            margin-right: -15px;
        }
        .couponLayout{
            max-width: 400px;
        }
        #factLayout{
            max-width: 400px;
        }
        #pointLayout {
            max-width: 400px;
        }
        .layoutContainer{
            max-width: 400px;
        }
    }

    @media only screen and (max-width: 360px){
        .messageContainer{
            min-width: 300px;
            /*margin-left: 5px;*/
            margin-left: 35px;
            width:90%;
        }
        .pointContainer{
            min-width: 300px;
            margin-left: 35px;
            width:90%;
            padding-top: 20px;
        }
        #container2{
            margin-left: 15px;
            /*margin-right: -15px;*/
        }
    }

    .Button {
        font-family: Verdana;
        font-size: 18px;
        font-weight: bold;
        color: white;

        background: #28847B;
        min-height: 50px;
        height: fit-content;
        padding: 5px;
        width: 80%;
        margin: auto;
        margin-top: 10px;
        border-radius: 10px;
        border-style: none;
        cursor: pointer;

        background-position: center;
        transition: background 0.8s;
    }
    .Button:active{
        background-color: #2c3e50;
        background-size: 100%;
        transition: background 0s;
        outline: none;
        border: none;
    }
    .Button:focus{
        outline: 0;
    }


</style>
