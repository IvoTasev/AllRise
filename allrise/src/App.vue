<template>
  <v-app style="margin-top: 0; background: #444444;" >
      <NavBar />

      <v-content >
          <img src="./assets/All-rise-background.jpg" id="backgroundImage"/>
<!--          <v-parallax src="./assets/All-rise-background.jpg" height="675" style="height: 675px; width: 1200px; position:absolute; z-index: 0;"/>-->
<!--          <div :style="{ backgroundImage: 'url( ${Image} );' }"></div>-->
          <transition name="view">
            <router-view></router-view>
          </transition>
      </v-content>
  </v-app>

</template>

<script>
// import HelloWorld from './components/HelloWorld';
// import Image from "./assets/All-rise-background.jpg"
import NavBar from './components/EditNavigation';

export default {
  name: 'App',

  components: {
    // HelloWorld,
    NavBar,
  },

  data: () => ({
      // Image
    //
  }),
};
</script>
<style>
    body{
        background: #444444;
    }
    /*#backdrop{*/
    /*    background: #444444;*/

    /*}*/
    /*#background{*/
    /*   */
    /*}*/
    #backgroundImage{
        height: 675px;
        width: 1200px;
        margin-left: -600px;
        position:fixed;
        z-index: 0;
    }


    /**The following css classes run the transitions between web pages, but are not recognised by eslint**/
    .view-enter-active, .view-leave-active{
        transition: opacity 0.5s ease-in-out, transform 0.5s ease;
    }

    .view-enter-active{
        transition-delay: 0.5s;
    }

    .view-enter, .view-leave-to{
        opacity: 0;
        transform: translateY(+120px);
    }

    .view-enter-to, .view-leave{
        opacity:1;
        transform: translateY(0px);
    }
    
</style>
