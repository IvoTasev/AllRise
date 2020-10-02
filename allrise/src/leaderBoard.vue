<template>
    <v-app style="background: none; margin-top: 0" >

          <div class="board">
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <!--    <img src = "./assets/logo.png" id = image  alt="" />-->
        <!--      <Navigation page="leaderboards" />-->
<!--              <edit-navigation page="leaderboards"/>-->
              <v-layout row wrap>
                <v-flex xs12 md6 lg6 order-lg2 order-md2 order-sm1>
                  <div class="boardContainer">
                      <div class="boardTitle">Leader Board</div>

                      <div class="points" >
<!--                          <div class="RankList" >-->
                          <v-layout row wrap>
                              <v-flex xs2 sm2 md2 lg2>
                                 <div v-bind:key="number" class="Ranks" v-for="number in RankList">{{number}}</div>
                              </v-flex>
<!--                          </div>-->
<!--                          <div class = "topList">-->
                              <v-flex xs10 sm10 md10 lg10  >
                                  <UserPoints v-bind:key="topUser.name" v-for="topUser in SortedBoard.leaderBoard" :name="topUser.name" :points = "topUser.points" position = "first" />
                              </v-flex>

<!--                          </div>-->
                          </v-layout>
                      </div>
                  </div>
                </v-flex>

                  <v-flex id="indicatorFlexer" xs12 lg12 order-lg1 order-md1 order-sm2>
                      <RankPosition id = "Rank" :rank = "SortedBoard.userRank" :points = "users[userPosition].points" :position = "SortedBoard.userPosition"/>
                  </v-flex>

                <v-flex  xs12 md6 lg6 order-md12 order-sm12 order-lg12>
                <div class="boardContainer" >
                    <div class="boardTitle">In front of you</div>
                  <div class="points">
                      <v-layout row wrap>
                          <v-flex xs2>
<!--                      <div class="RankList" >-->
                            <div v-bind:key="number" class="Ranks" v-for="number in SortedBoard.midRank" style="background: #28847B">{{number}}</div>
<!--                      </div>-->
                          </v-flex>
                          <v-flex xs10>
<!--                      <div class = "topList">-->
                            <UserPoints v-bind:key="bottomUser.name" v-for="bottomUser in SortedBoard.nearUser" :name="bottomUser.name" :points = "bottomUser.points" position = "middle" />
<!--                      </div>-->
                          </v-flex>
                      </v-layout>
                  </div>
            <!--    </div>-->

            <!--      <div class="container">-->
                    <div id = "spacer"></div>
                      <div class="boardTitle">Behind you</div>
                      <div class="points">
                          <v-layout row wrap>
                            <v-flex xs2 sm2 md2 lg2>
<!--                          <div class="RankList" >-->
                                <div  class="Ranks" style="background: #808080">{{SortedBoard.lastRank}}</div>
<!--                          </div>-->
                            </v-flex>
<!--                          <div class = "topList">-->
                            <v-flex xs10>
                                <UserPoints  :name="SortedBoard.closestThreat.name" :points = "SortedBoard.closestThreat.points" position = "last" />
<!--                          </div>-->
                            </v-flex>
                          </v-layout>
                      </div>
                  </div>
                </v-flex>
              </v-layout>
          </div>
    </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import UserPoints from './components/UserPoints.vue'
import RankPosition from "./components/RankPosition"
// import Navigation from "./components/Navigation"
// import EditNavigation from "./components/EditNavigation";
import axios from 'axios'

// console.log(window.location.hostname)
if(process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://all-rise-backstage.herokuapp.com'
}else{
    axios.defaults.baseURL = 'http://' + window.location.hostname + ':3000'
}
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


export default {
  name: 'App',
  components: {
      // EditNavigation,
    RankPosition,
    // HelloWorld,
    UserPoints,
     // Navigation
  },
    data: function() {
    return {
        users: [],
        bottomUsers: [],
        topUsers: [],
        User: {name: "someone", points: 2000, position: "first"},
        Base: {name: "No one", points: 0, position: "last"},
        RankList:[ 1, 2, 3, 4, 5],
        id: undefined,
        userPosition: undefined,
        };
    },
    computed:{
        user() {
            return this.$store.getters.fitbit.user
        },
        SortedBoard: function() {
            let Leaderboard = [this.Base], NearUser = [this.Base], ClosestThreat = this.Base, rank = 1, position = "", midrank=[0], lastrank = 0; //initializing arrays
            for( let count = 0; count < this.users.length; count++){

                if(this.users[count].points > this.users[this.userPosition].points){rank++;}

                for(let boardCount = 0; boardCount < Leaderboard.length; boardCount++){ //Leader board
                    // if(Leaderboard.length < 5){
                    if(this.users[count].points > Leaderboard[boardCount].points){
                        Leaderboard.splice(boardCount, 0, this.users[count]);
                        break;
                    }
                }

                if(Leaderboard.length > 5){ //If LeaderBoard gets too long remove the lowest person
                    Leaderboard.splice(5,1);
                }

                if(NearUser[0].name === "No one" && this.users[count].points > this.users[this.userPosition].points){
                    NearUser = null;
                    NearUser = [this.users[count]];
                }else {
                    for (let midCount = 0; midCount < NearUser.length; midCount++) {
                        if (this.users[count].points > this.users[this.userPosition].points) {
                            if (NearUser.length < 3) {
                                if (this.users[count].points < NearUser[midCount].points) {
                                    if (NearUser[midCount + 1] != null) {
                                        if (this.users[count].points < NearUser[midCount + 1].points) {
                                            NearUser.splice(midCount + 2, 0, this.users[count]);
                                            break;
                                        } else {
                                            NearUser.splice(midCount + 1, 0, this.users[count]);
                                            break;
                                        }
                                    } else {
                                        NearUser.splice(midCount + 1, 0, this.users[count]);
                                        break;
                                    }
                                } else {
                                    if (this.users[count].points > NearUser[midCount].points) {
                                        NearUser.splice(midCount, 0, this.users[count]);
                                        break;
                                    }
                                }
                            } else if (midCount === 0) {
                                if (this.users[count].points < NearUser[0].points && this.users[count].points > NearUser[1].points) {
                                    //if (this.users[count].points < NearUser[midCount].points) {
                                    NearUser.splice(midCount + 1, 0, this.users[count]);
                                    break;
                                    //}
                                }
                            } else if ((midCount + 1) < NearUser.length) {
                                if (this.users[count].points < NearUser[midCount].points && this.users[count].points > NearUser[midCount + 1].points) {
                                    // if (this.users[count].points < NearUser[midCount].points) {
                                    NearUser.splice(midCount + 1, 0, this.users[count]);
                                    break;
                                    // }
                                }
                            }else {
                                if(this.users[count].points < NearUser[midCount].points){
                                    NearUser.splice(midCount+1, 0, this.users[count]);
                                    break;
                                }
                            }
                        }
                    }
                }

                if(NearUser.length > 3){
                    NearUser.splice(0, 1);
                }



                if( this.users[count].points <this.users[this.userPosition].points && this.users[count].points > ClosestThreat.points){
                    ClosestThreat = null;
                    ClosestThreat = this.users[count];
                }

            }

            if(rank <= 5){position = "first";}
            else{position = "middle";}

            for(let rankCount = 0; rankCount < NearUser.length; rankCount++){
                midrank.splice(rankCount, 0, rank - (NearUser.length - rankCount));
                if(midrank[rankCount+1] === 0){midrank.splice(rankCount + 1, 1);}
            }

            if(ClosestThreat.name !== "No one") {
                lastrank = (rank + 1);
            }else{
                lastrank = rank;
            }


            return{
                leaderBoard: Leaderboard,
                nearUser: NearUser,
                closestThreat: ClosestThreat,
                userRank: rank,
                userPosition: position,
                midRank: midrank,
                lastRank: lastrank
            }
        }
    },
    mounted() {
        var context = this;
        axios.get('/users')
            .then(function (response) {
                context.users = response.data;
                context.getIdPosition();
            })
            .catch( err => console.log(err));

    },
    methods : {
        getIdPosition(){
            for(let count = 0; count < this.users.length; count++){
                if(this.users[count].id === this.user.encodedId){
                    this.userPosition = count;
                }
            }
        }
    },
}
</script>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#image{
  width: 100px;
  height: 100px;
}
  .boardContainer{
      /*margin-top: 30px;*/
    margin-left: auto;
    margin-right:auto;
    min-width: 360px;
      width:75%;
      padding-right: 5px;
      padding-left: 5px;
    /*min-height: 175px;*/
    height: fit-content;
      padding-bottom: 20px;
      padding-top: 20px;
    border-radius: 10px;
    background: #CCE8D1;
      margin-top: 15px;
      margin-bottom: 15px;
      /*background: #B3B3B3;*/
  }
  .points{
      /*display: inline-block;*/
      /*display: inline-table;*/
   padding: 2.5px;
  }
  #Rank{
    margin-top: 20px;
    margin-bottom: 60px;
    margin-left: auto;
    margin-right: auto;
    height: 158px;
    width: 400px;
    /*background: gray;*/
  }
    .boardTitle{

        font-family: Verdana;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 5px;
        font-weight: bold;
        font-size: 24px;
        color: #2c3e50;
        border-bottom-style: solid;
        border-bottom-width: 2px;
        border-bottom-color: #2c3e50;
        width: 60%;
        padding: 2px;
    }

    .RankList{
        margin-top: 9px;
        margin-left: 15px;
        width: 50px;
        height: 100%;
        /*margin-left:0px;*/
        float: left;
        /*display: table-column-group;*/
    }

    .topList{

       margin-left: 70px;
        width: auto;
        margin-right: 5px;
        /*display: table-column-group;*/
    }
#indicatorFlexer{
    height: 275px;
}

    .Ranks{
        font-family: Verdana;
        font-size: 24px;
        color: white;
        padding-top: 10px;
        vertical-align: center;
        horiz-align: center;
        margin-bottom: 10px;
        margin-left: 25%;
        min-width: 54px;
        min-height: 54px;
        width: fit-content;
        /*border-style: solid;*/
        /*border-width: 3px;*/
        border-radius: 15%;
        /*border-color: #E06E3C;*/
        background: #E06E3C;
    }

    #spacer{
        margin-top: 10px;
    }

@media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .boardTitle{
        font-size: 18px;
    }
   .Ranks{
       min-width: 37px;
       min-height: 30px;
       width: fit-content;
       font-size: 18px;
   }
    .boardContainer{
        margin-left: auto;
        margin-right: auto;
    }

}
    @media only screen and (max-width: 625px) {
        #indicatorFlexer{
            height: 140px;
        }
        .v-application--wrap{
            min-height: unset;
        }
    }


</style>
