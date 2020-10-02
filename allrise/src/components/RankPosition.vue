<template>
    <v-app style="background: none">
    <div id="indicator" >

        <div id="container" v-bind:class="compColor">


           <div id="rank">Rank: {{rank}} </div>

            <div id="UserPoints">
                <div id="points" >{{ points }} </div>
                <div id ="text" >points</div>
            </div>

        </div>

        <div id="detailLeft" v-bind:class="compColor"/>
        <div id="detailRight" v-bind:class="compColor"/>
        <div id="smallDetailLeft" v-bind:class="compColor"/>
        <div id="smallDetailRight" v-bind:class="compColor"/>
    </div>
    </v-app>
</template>

<script>
export default {
    name: 'RankPosition',
    props: {
        rank: Number,
        points: Number,
        position: String
    },
    computed: {
        compColor: function() {
            let first = false, last = false, middle = false;
            if (this.position === "first") {
                first = true;
            } else if (this.position === "last") {
                last = true;
            } else {
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

<style scoped>
    #indicator{
        margin-top: 20px;
        height: 200px;
        width: 600px;
        margin-left: auto;
        margin-right: auto;
        background: none;
    }
    .first {
        background: #E06E3C;
    }
    .middle {
        background: #28847B;
    }
    .last {
        background: #999999;
    }
#container{
    margin-left: 100px;
    margin-right: auto;
    display: table;
    width: 200px;
    height: 200px;
    /*width: 60%;*/
    /*height: 120%;*/
    /*border-radius: 80px;*/
    border-radius: 100%;
}


#rank{
    position: absolute;
    font-family:Verdana;
    color: white;
    font-size: 30px;
    font-weight: bold;
    padding-top: 60px;
    vertical-align: center;
    margin-left: 40px;

}
#UserPoints{
    position: absolute;
    margin-top: 95px;
    margin-left: 40px;
    font-family:Verdana;
    color: white;
    font-size: 30px;
   vertical-align: center;
}
#points{
    /*padding-left: 5px;*/
    font-weight: bold;
    display: table-cell;
}
#text{
    padding-left: 10px;
    display: table-cell;
    font-size: small;
}

/*    Adding details to indicator*/
#detailLeft{
    /*display: block;*/
    /*float:left;*/
    /*margin-left: auto;*/
    /*margin-right: auto;*/
    margin-top: -155px;
    margin-left: 30px;
    /*margin-top: -35px;*/
    /*margin-top: 35px;*/
    /*margin-left: -50px;*/
    /*margin-right: auto;*/

    width: 120px;
    height: 120px;
    border-radius: 100%;
}
#detailRight{
    /*float: right;*/
    /*margin-top: 35px;*/
    /*margin-left: 300px;*/
    vertical-align: center;
    margin-top: -120px;
    margin-left: 250px;
    width: 120px;
    height: 120px;
    border-radius: 100%;
}
    #smallDetailLeft{
        margin-top: -85px;
        margin-left: -80px;
        width: 60px;
        height: 60px;
        border-radius: 100%;
    }
    #smallDetailRight{
        margin-top: -60px;
        margin-left: 415px;
        width: 60px;
        height: 60px;
        border-radius: 100%;
    }

    @media only screen and (max-width: 625px) {
        #indicator{
            margin-top: unset;
            margin-left: auto;
            margin-right: auto;
            height: 100px;
            width: 300px;

        }
        #rank{
            position: absolute;
            font-family:Verdana;
            color: white;
            font-size: 20px;
            font-weight: bold;
            padding-top: 25px;
            margin-left: 5px;

        }
        #Rank{
            width: 100%;
        }

        #container{
            /*margin-left: 110px;*/
            height: 100px;
            width: 100px;
        }
        #detailRight{
            margin-left: 175px;
            margin-top: -62px;
            height: 60px;
            width: 60px;
        }
        #detailLeft{
            margin-left: 65px;
            margin-top: -80px;
            height: 60px;
            width: 60px;
        }
        #smallDetailLeft{
            margin-top: -40px;
            margin-left: 5px;
            width: 30px;
            height: 30px;
        }
        #smallDetailRight{
            margin-top: -35px;
            margin-left: 260px;
            width: 30px;
            height: 30px;
        }
        #UserPoints{
            margin-left: 20px;
            margin-top: 50px
        }
        #points{
            font-size: 18px;
        }
        #text{
            padding-left: 2px;
            font-size: 11px;
        }

    }

</style>