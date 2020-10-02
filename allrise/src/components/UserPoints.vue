<template>
  <div id="container" v-bind:class = "compColor" >
<!--    <span :class = "compColor"/>-->
    <div id="nameSpace" v-bind:class = "compColor">
      <div id="nameText" >{{ name }}</div>
    </div>
    <div class="spacing"/>
    <div id="points" >{{ points }} </div>
    <div id ="text" >pts</div>
  </div>
</template>

<script>
export default {
  name: 'UserPoints',
  props: {
    name: String,
    points: Number,
    position: String,
    color: String
  },

  computed: {
        compColor: function() {
           let first = false, last = false, middle = false;
          if (this.position === "first") {
            console.log(this.name + " is first!");
             first = true;
          } else if (this.position === "last") {
            console.log(this.name + " is last!");
            last = true;
          } else {
            console.log(this.name + " is in the middle of the pack");
            middle = true;
          }
          return {
            first: first,
            last: last,
            middle: middle
          }
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container{

    /*display:inline-grid;*/
    display:table;
    width: 90%;
    height:54px;
    margin-left: 15px;
    margin-bottom: 10px;
    /*margin-top: 8px;*/
    /*margin-left: auto;*/
    /*margin-right: auto;*/
    border-radius: 10px;
    border-style: solid;
    border-width: 3px;
    /*border-color: #E06E3C;*/
    /*over-flow: false;*/
}
.first{
  /*background: #E06E3C;*/
  color: #E06E3C;
  border-color: #E06E3C;
}
.middle{
  /*background: #28847B;*/
  color: #28847B;
  border-color: #28847B;
}
.last {
  /*background: #999999;*/
  /*color: #999999;*/
    color: #808080;
  /*border-color: #999999;*/
    border-color: #808080;
}

#text{
  font-family:Verdana;
    display: table-cell;

    /*grid-template-colums: repeat(2,1fr);*/
    /*padding: 5px;*/
    /*padding-top: 20px;*/
    text-align: left;
    width: 5%;
    padding-bottom: 10px;
  padding-left: 3px;
  padding-right: 3px;
    vertical-align: bottom;
    font-size: small;
    /*font-weight: bold;*/
    /*color: #E06E3C;*/
}
#points{
  font-family:Verdana;
  /*padding-top: 1px;*/
  /*margin-bottom: -2px;*/
  vertical-align: middle;
  text-align: right;
  display: table-cell;
  width: 30%;
  font-size: 24px;
  font-weight: bold;
  /*color: #E06E3C;*/
}
.spacing{
    width: auto;
    height: auto;
}

#nameText{
  font-family:Verdana;
  padding: 5px;
    /*height: 40px;*/
  vertical-align: center;
    margin-left: auto;
    margin-right: auto;
  color: white;
  font-size: 24px;
  /*font-weight: bold;*/
}
#nameSpace{

    display: flex;
    /*margin-left: -40px;*/
    alignment: left;
    /*display: table-column;*/
    /*width: 30px;*/
    width: 70%;
    /*max-width: 200px;*/
    /*width:fit-content;*/
    /*justify-content: space-around;*/
    height: 49px;
    /*border-radius: 5px;*/
  /*background: #E06E3C;*/
    color: white;
  overflow: hidden;

}
.first #nameSpace{
  background: #E06E3C;
}
.middle #nameSpace{
  background: #28847B;
}
.last #nameSpace{
  /*background: #999999;*/
    background: #808080;
}

@media only screen and (max-width: 768px) {
    /* For mobile phones: */
    #container{
        height: 30px;
        border-radius: 5px;
        margin-left: 10px;
    }

    #points{
        font-size: 18px;
    }

    #nameSpace{
        height: 31px;
        vertical-align: center;
    }

    #nameText{
        font-size: 20px;
    }

}

</style>
