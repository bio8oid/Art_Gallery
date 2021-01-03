<template>
   <div id="app">
      <div id="nav">
         <router-link to="/">Home</router-link> |
         <router-link to="/categories">Categories</router-link> |
         <router-link to="/randomizer">Random</router-link>
      </div>
      <router-view />
      <Footer />
   </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
   components: { Footer },
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
}

*,
*::before,
*::after {
   box-sizing: border-box;
}

html {
   box-sizing: border-box;
}

#nav {
   padding: 30px;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   background: #1a1a1e;
   box-shadow: 0 0 10px #000;
   color: #96ffc2;
   z-index: 2;

   a {
      color: #96ffc2;
      font-weight: bold;
      text-decoration: none;
      font-weight: 300;
      padding: 0 10px;

      &.router-link-exact-active {
         color: #ffdc96;
      }
   }
}
</style>