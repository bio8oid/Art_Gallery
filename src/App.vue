<template>
   <div id="app">
      <Navbar />
      <Loading />
      <router-view class="content" />
      <Footer />
   </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Navbar from '@/components/Navbar.vue';
import Loading from '@/components/Loading.vue';

export default {
   components: {
      Footer,
      Navbar,
      Loading,
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

   h1,
   h2 {
      text-shadow: 3px 3px 5px #000;
      color: rgb(199, 199, 199);
   }

   button:hover {
      box-shadow: 0 0 5px 1px #ffdc96;
   }

   a:hover {
      color: #ffdc96;
   }

   select,
   button,
   .record,
   .navbar,
   img {
      box-shadow: 5px 5px 10px #202327;
   }
}

body {
   padding: 0;
   margin: 0;
   background: #40474f;
   margin-top: 12vh;
}

.content {
   min-height: 48vh;
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
