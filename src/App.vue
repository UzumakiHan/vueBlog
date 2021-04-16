<template>
  <div id="app">
  
    <Nav v-show="$route.meta.show"/>
    <router-view name="Owner"></router-view>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/Nav/Nav'
// import Slider from './components/Slider/Slider'
export default {
  name: 'App',
  data(){
    return{}
  },
  mounted(){
    // this.$store.dispatch('resMessage');
  },
  components:{
    Nav
  }
}
</script>

<style>
/* body{width: 100%;height: 100%;position: relative;background-color: #ccc} */
</style>
