<template>
    <v-dialog v-model="usedCoupon" max-width="500px" id="dialogWidth">
        <v-card dark>
            <v-card-title >
                <v-row md="12">
                    <p class="couponPopUpTitle"> The time has come... </p>

                </v-row>
                <v-row md="12" >
                    <p class="userText" >  {{name}} turned in the coupon:  </p>
                </v-row> <br/>
                <v-row md="12">
                    <div id="cardText" >
                        <p style="color: #e06e3c"> {{this.loserCoupons.description}} </p>
                    </div>
                </v-row>
            </v-card-title>

            <v-row class="buttonRow"  >
                <v-btn type="button" class=" btn btn-secondary"  @click="denyCoupon" style="width: 100px; height: 50px; margin-right: 50px;">Not now</v-btn>
                <v-btn type="button" @click="acceptCoupon" class=" btn btn-success" style=" width: 130px; height: 50px; color: #e06e3c; float: right; border: solid 1px #e06e3c">Ok, I'll do it</v-btn>
            </v-row>

        </v-card>
    </v-dialog>
</template>

<script>

    import axios from "axios";
    if(process.env.NODE_ENV === 'production') {
        axios.defaults.baseURL = 'https://all-rise-backstage.herokuapp.com'
    }else{
        axios.defaults.baseURL = 'http://' + window.location.hostname + ':3000'
    }
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    export default {
        props: {
            loserCoupons: Object,
            person: Array,
        },
        data: function() {
            return {
                usedCoupon: true,
                // couponOwnerId: 1,
                // couponPosition: 0,
                name: "",
            }
        },
        methods:{
            denyCoupon(){

                this.usedCoupon = !this.usedCoupon;
            },
            acceptCoupon(){
                axios.post('/coupon/' + this.loserCoupons.id)
                    .catch(e =>{console.log(e);});
                this.usedCoupon = !this.usedCoupon;
            },
            calcUserArrayPosition(id, returnStatement){
                for(let count = 0; count < this.person.length; count++){
                    if(this.person[count].id === id){
                        if(!returnStatement) {
                            this.personId = count;
                            console.log("Array id is: " + this.personId);
                        }else{
                            return count;
                        }
                    }
                }
            },

        },
        mounted(){
            console.log("I'm being called!");
            for(let count = 0; count < this.person.length; count++){
                if(this.person[count].id === this.loserCoupons.winner_id){
                    this.name = this.person[count].name;
                }
            }
            // this.couponOwnerId = this.loserCoupons.winner_id;
            // this.usedCoupon = true;

            // var context = this;

            // axios.get('/users')
            //     .then(function (response) {
            //         context.person = response.data;
            //     })
            //     .catch( err => console.log(err));
            //
            // axios.get('/coupon/loser/1') .then(function (response) {
            //     context.loserCoupons = response.data;
            //     if(context.loserCoupons !== []) {
            //         context.showPopUp = true;
            //     }
            //     else{
            //         context.showPopUp = false;
            //         context.loserCoupons=[{name: "", description: ""}];
            //         console.log(context.loserCoupons);
            //     }
            // })
            //     .catch( err => console.log(err));


            // checkUsedCoupon(){
                // this.calcUserArrayPosition(this.id, false);

                // for(let count = 0; count < this.loserCoupons.length; count++){
                //     // console.log("coupon " + this.coupons[count].id + "is activated at " + count);
                //     if(this.loserCoupons[count].activated === 1){
                //         if(this.loserCoupons[count].loser_id === 1 ){
                            // console.log("coupon " + this.coupons[count].id + "is activated at " + count);

                        }
                    // }
                // }
            // },
        // }
    }

</script>

<style>
    #dialogWidth{
        max-width: 500px;
        width: 100%
    }
    .couponPopUpTitle{
       margin-left: auto;
        margin-right: auto;
        font-family: Verdana;
        color: white;
        font-weight: bold;
        font-size: 24px;
        word-break: normal;
        border-bottom-style: none;
    }
    .userText{
        margin-left: auto;
        margin-right: auto;
        font-family: Verdana;
        color: white;
        font-weight: bold;
        font-size: 24px;
        word-break: normal;
        border-bottom-style: none;
    }

    #cardText{
        margin: auto;
        text-align: center;
        font-family: Verdana;
        color: #e06e3c;
        font-weight: bold;
        font-size: 28px;
        word-break: normal;
    }
    .buttonRow{
        width:75%;
        margin-top: 10px;
        padding-bottom: 25px;
        margin-left: 25%;
    }


    @media only screen and (max-width: 625px) {
        /*.v-overlay{*/
        /*    width: 400px;*/
        /*}*/
        .btn-secondary{
            margin-right: 5px;

        }
        .buttonRow{
            width:85%;
            margin-top: 10px;
            padding-bottom: 25px;
            margin-left: 15%;
        }


    }



</style>