<template>
   <div>
      <div id="nav">
         <router-link to="/">Home</router-link> |
         <router-link to="/categories">Categories</router-link> |
         <router-link to="/randomizer">Random</router-link>
      </div>
      <LanguageButton />
   </div>
</template>

<script>
import LanguageButton from '@/components/LanguageButton.vue';

export default {
   name: 'Navbar',

   components: {
      LanguageButton,
   },
};
</script>

<style lang="scss">
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
