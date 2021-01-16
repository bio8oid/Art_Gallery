<template>
   <div id="app">
      <Navbar />
      <router-view />
      <Footer />
   </div>
</template>

<script lang="ts">
import Footer from './components/Footer.vue';
import Navbar from './components/Navbar.vue';

export default {
   components: {
      Footer,
      Navbar,
   },
};
</script>

<style lang="scss">
#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
}

body {
   color: #c8c7e2;
   padding: 0;
   margin: 0;
   background: #40474f;
   margin-top: 12vh;
}

*,
*::before,
*::after {
   box-sizing: border-box;
}

html {
   box-sizing: border-box;
}
</style>
