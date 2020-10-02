<template>
    <div class="hello">

        <button type="button" class="Button unactivated " :id="coupon.id" @click="setCoupon(coupon)" v-bind:key="coupon.name" v-for="coupon in description" >
            {{checkActivation(coupon)}}
            {{coupon.description}} <br/> from {{getUserName(coupon.loser_id)}}
        </button>

<!--        {{checkActivation()}}-->

        <v-dialog v-model="modal" max-width="500px" >
            <v-card dark>
                <div v-if="this.clickedCoupon.activated !== 1">
                    <v-card-title >
                        <v-row md="12">
                            <p class="couponTitle">Would you like to use your coupon:  </p>
                        </v-row>
                        <v-row md="12" >
                            <div class="cardText" >
                                {{clickedCoupon.description}}
                            </div>
                        </v-row>
                    </v-card-title>
                </div>
                <div v-else>
                    <v-card-title >
                        <v-row md="12">
                            <p class="couponTitle">Would you like to cancel the coupon:  </p>
                        </v-row>
                        <v-row md="12" >
                            <div class="cardText" >
                                {{clickedCoupon.description}}
                            </div>
                        </v-row>
                    </v-card-title>
                </div>
                    <v-row style="width:75%; margin-top: 10px; padding-bottom: 25px; margin-left: 25%;" >
                        <v-btn type="button" class=" btn btn-secondary"  @click="toggleDialog" style="width: 100px; height: 50px; margin-right: 50px;">No</v-btn>
                        <v-btn type="button" @click="useCoupon" class=" btn btn-success" style=" width: 100px; height: 50px; color: #e06e3c; float: right; border: solid 1px #e06e3c">Yes</v-btn>
                    </v-row>

            </v-card>
        </v-dialog>


    </div>
</template>

<script>

    import axios from "axios";
    if(process.env.NODE_ENV === 'production') {
        axios.defaults.baseURL = 'https://all-rise-backstage.herokuapp.com/'
    }else{
        axios.defaults.baseURL = 'http://' + window.location.hostname + ':3000'
    }
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    export default {
        name: 'SelectCouponPopUp',
        props: {
           description: Array,
            id: Number,
        },
        data () {
            return {
                coupons: [],
                clickedCoupon: {},
                users: [],
                modal: false,
            }

        },
        methods: {
            postChallenge: function(){

            },
            toggleDialog(){

                this.modal = !this.modal;
            },
            loadUsers(){

            },
            getUserName(loserId){
                for( let count = 0; count < this.users.length; count++) {
                    if( this.users[count].id === loserId){
                        return this.users[count].name;
                    }
                }
                return "No one";
            },
            setCoupon(activatedCoupon){
                this.clickedCoupon = activatedCoupon;
                this.modal = !this.modal;
            },
            useCoupon(){
                // let activationHolder = this.clickedCoupon.activated;

                if(this.clickedCoupon.activated === 1){
                    axios.post('/coupon/0/' + this.clickedCoupon.id)
                        .catch(e => {
                            console.log(e);
                        });

                    this.updateActivation(this.clickedCoupon, 0);
                    // activationHolder = 0;
                    console.log("activation was :" + this.clickedCoupon.activated);
                    // this.activationHolder = 0;
                     console.log("Setting coupon to 0");
                    // console.log("activation is :" + this.activationHolder);

                }else {
                    axios.post('/coupon/1/' + this.clickedCoupon.id)
                        .catch(e => {
                            console.log(e);
                        });
                    console.log("activation was :" + this.clickedCoupon.activated);
                    this.updateActivation(this.clickedCoupon, 1);
                     // activationHolder = 1;
                    console.log("activation was :" + this.clickedCoupon.activated);
                    // this.activationHolder = 1;
                    console.log("Setting coupon to 1");
                    // console.log("activation is :" + this.activationHolder);
                }

                // let element = document.getElementById(this.clickedCoupon.id);
                //
                // if(element !== null) {
                //     console.log("Compare : " + this.clickedCoupon.id + " to " + element.className);
                //     if (this.clickedCoupon.activated === 1) {
                //         element.classList.toggle("activated");
                //         element.classList.toggle('unactivated');
                //
                //     } else{
                //         element.classList.toggle("unactivated");
                //         element.classList.toggle("activated");
                //     }
                //     console.log("Compare : " + this.clickedCoupon.id + " to " + element.className);
                // }

                this.modal = !this.modal;



            },
            checkActivation(coupon){
                // console.log("checking coupon : " + this.coupons[0].description);
                //  for( let count = 0; count < this.coupons.length; count++) {
                    let currentElement = document.getElementById( coupon.id);

                    if(currentElement !== null) {
                        console.log("coupon: " + coupon.description + " is " + coupon.activated );
                        if (coupon.activated === 1 && currentElement.className !== "activated" ) {
                            console.log("Activating");
                            currentElement.classList.toggle("activated");
                            currentElement.classList.toggle("unactivated");
                        }
                        // }else if( coupon.activated === 0 && currentElement.className !== "unactivated"){
                        //     console.log("deActivating");
                        //     currentElement.classList.toggle("activated");
                        //     currentElement.classList.toggle("unactivated");
                        // }
                    }
                 // }
            },
            updateActivation(checkedCoupon, value){

                // axios.get('/coupon/winner/1') //should get by Id not by 1
                //     .then(response => this.coupons = response.data)
                //     .catch( err => console.log( err));
                for(let count = 0; count < this.description.length; count++){
                    if(this.description[count].id === checkedCoupon.id){
                        this.description[count].activated = value;
                    }
                }

                // this.checkActivation();

                // let element = document.getElementById(this.clickedCoupon.id);
                //
                // if(element !== null) {
                //     console.log("Compare : " +this.clickedCoupon.id + " to " + element.className);
                //     if (this.clickedCoupon.activated === 1) {
                //         element.classList.remove("activated");
                //         element.classList.add("unactivated");
                //     } else {
                //         element.classList.add("activated");
                //         element.classList.remove("unactivated");
                //     }
                //     console.log("Compare : " +this.clickedCoupon.id + " to " + element.className);
                // }
            }

        },
        mounted(){

            axios.get('/users')
                .then(response => {this.users = response.data;})
                .catch( err => console.log(err));

        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    .cardText{
          margin: auto;
          text-align: center;
          font-family: Verdana;
          color: #e06e3c;
          font-weight: bold;
          font-size: 24px;
          word-break: normal;
      }

    .couponTitle{
        text-align: center;
        font-family: Verdana;
        color: white;
        font-weight: bold;
        font-size: 28px;
        word-break: normal;
        border-bottom-style: none;
        margin-bottom: 15px;
    }

    .Button {
        font-family: Verdana;
        font-size: 18px;
        font-weight: bold;
        color: white;

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
    .unactivated{
        background: #28847B;
    }
    .activated{
        background: #e06e3c;
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

    @media only screen and (max-width: 625px) {

    }

</style>