<template>
  <div class="hello">
    <button type="button" class="addButton" @click="this.setModal()" >
      <img  id="plus"  src="../assets/addImage.png" alt="Add">
    </button>
    
    <v-dialog v-model="modal" activator=".addButton" width="500px">
      <v-card dark>
      <v-card-title><h3 class="challengeTitle">Choose a type</h3></v-card-title>
        <div>
        <button  type="button" class="customButton" @click="customChallenge = !customChallenge">Custom challenge</button>
        </div>
        <button  type="button" class="fixedButton" @click="fixedChallenge = !fixedChallenge">Fixed challenge</button>
      </v-card>
    </v-dialog>
      
    <v-dialog v-model="customChallenge" activator=".customButton" width="500px">
      <v-card dark>
          <v-card-title >
            <h3 class="challengeTitle">Create your challenge</h3>
          </v-card-title>
          <v-form ref="form" class="px-15" dark v-model="valid">
            <v-row md="6">
                <v-text-field label="Challenge name" dark v-model="challengeName" :rules="nameRule" required/>
              </v-row>
              <v-row  md="6">
                <v-text-field label="Challenge Reward" dark v-model="reward" :rules="rewardRule" required/>
              </v-row>
            <v-row  md="6">
              <v-overflow-btn :items="names" v-model="participant" :rules="idRule" editable required/>
            </v-row>

          <v-row class=" pb-5" >
            <v-spacer/>
            <v-btn type="button" class=" btn btn-secondary"  @click="toggleDialog" style="margin-right: 25px; color: lightgrey">Cancel</v-btn>
            <v-btn type="button" :disabled="!valid" @click="postChallenge()" class=" btn btn-success" style="color: #e06e3c; float: right; border: solid 1px #e06e3c">Create</v-btn>
          </v-row>
          </v-form>

        </v-card>

    </v-dialog>

    <v-dialog v-model="fixedChallenge" class="fixedModal" activator=".fixedButton" width="500px">
      <v-card dark>
      <v-card-title><h3 id="challengeTitle">Choose a challenge</h3></v-card-title>
        <v-form ref="form" class="px-15" dark v-model="valid">
          <v-overflow-btn :items="fixedList" v-model="chosenFixed" :rules="idRule" required/>
          <v-row  md="6">
            <v-text-field label="Challenge Reward" dark v-model="reward" :rules="rewardRule" required/>
          </v-row>
            <v-overflow-btn :items="names" v-model="participant" :rules="idRule" editable required/>
            <v-spacer/>
            <v-btn type="button" class=" btn btn-secondary"  @click="toggleDialog" style="margin-right: 25px; color: lightgrey; margin-bottom: 20px">Cancel</v-btn>
            <v-btn type="button" :disabled="!valid" @click="postFixed()" class=" btn btn-success" style="color: #e06e3c; border: solid 1px #e06e3c; margin-bottom: 20px">Create</v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
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
  name: 'ChallengePopUp',
  props: {
    msg: String
  },
  data () {
    return {
    challengeName: null,
    reward: null,
    userId: null,
    participantId: null,
    chosenFixed: null,
      modal: false,
      customChallenge: false,
      fixedChallenge: false,
      valid: false,
      nameRule: [
        v => !!v || 'A name for the challenge is required',
        v => isNaN(v) || 'The name can\'t be a number',
      ],
      rewardRule: [
        v => !!v || 'A reward for the challenge is required',
        v => isNaN(v) || 'The reward can\'t be a number',
      ],
      idRule:[
        v => !!v || 'an id is required',
      ],
      users: [],
      names: [],
      participant: null,
      fixedList: ["Ping pong", "Most steps", "Burner"]

    }
    
  },
  mounted(){
    this.setId();
    this.loadUsers().then(this.getNames);
  },
  computed: {
    user() {
      return this.$store.getters.fitbit.user
    },
  },
  methods: {
    setModal(){
      this.modal = true;
    },
    setId(){
      this.userId = this.user.encodedId;
    },
    postChallenge: function(){
      console.log("Im being called!!!!!!!!!!!!!!");
      for(let i = 0; i < this.users.length; i++){
        if(this.users[i].name == this.participant){
          this.participantId = this.users[i].id;
        }
      }
      axios.post('/challenges/' + this.challengeName + '/' + this.reward + '/' + this.userId + '/' + this.participantId)
              .catch(e => {
                console.log(e);
              });
      this.toggleDialog();
      // this.$router.go(0);
      let thisPage = window.location.pathname;
      let newPage = thisPage.split('/', 1);
      this.$router.push(newPage[0] + '/reloadPage/waiting');
    },
    postFixed: function(){
      for(let i = 0; i < this.users.length; i++){
        if(this.users[i].name == this.participant){
          this.participantId = this.users[i].id;
        }
      }
      axios.post('/challenges/fixed/'+ this.chosenFixed +'/' + this.reward + '/' + this.userId + '/' + this.participantId)
              .catch(e => {
                console.log(e);
              });
      this.toggleDialog();
      let thisPage = window.location.pathname;
      let newPage = thisPage.split('/', 1);
      this.$router.push(newPage[0] + '/reloadPage/waiting');
    },
    toggleDialog(){
      this.challengeName = null;
      this.reward = null;
      this.userId = null;
      this.participantId = null;
      this.modal = false;
      this.customChallenge = false;
      this.fixedChallenge = false;
    },
    loadUsers(){
      return axios.get('/users')
          .then(response => this.users = response.data)
          .catch( err => console.log(err))  
    },
    getNames(){
      let place = 0;
      for(let i = 0; i < this.users.length; i++){
        if(this.users[i].id != this.userId){
          this.names[place] = this.users[i].name;
          place++;
        }
      }
    }
    
}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .addButton {
    /*padding-top: 4px;*/
    background: #28847B;
    height: 80px;
    width: 80px;
    margin-top: 3%;
    margin-right: auto;
    margin-left: auto;
    display: table;
    border-radius: 40px;
    border-style: none;
    cursor: pointer;

    background-position: center;
    transition: background 0.8s;
  }
  .addButton:active{
    background-color: #2c3e50;
    background-size: 100%;
    transition: background 0s;
    outline: none;
    border: none;
  }
  .addButton:focus{
    outline: 0;
  }
  .customButton{
   margin-right: 25px; 
   color: lightgrey;
   border: solid 1px grey;
   width: 50%;
   padding: 1%;
   margin-bottom: 10px;
  }
  .customButton:active{
    background: grey;
  }
  .fixedButton{
   margin-right: 25px; 
   color: lightgrey;
   border: solid 1px grey;
   width: 50%;
   padding: 1%;
   margin-bottom: 10px;
  }
  .fixedClass{
    width: auto;
  }

  #plus{
    width: 45px;
    height: 45px;
    margin-left: auto;
    margin-right: auto;
    /*margin-top: 10px;*/
  }

  @media only screen and (max-width: 625px) {
    .addButton{
      width: 60px;
      height: 60px;
    }
    #plus{
      height: 33px;
      width: 33px;
    }
    .hello #plus{
      margin-left: 3px;
      margin-top: 3px;
    }
  }

</style>
