<template>
   <div>
      <div class="navbar" id="nav">
         <router-link to="/">Home</router-link> | <router-link to="/categories">Categories</router-link> |
         <router-link to="/random">Random</router-link>
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
.navbar {
   height: 12vh;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   background: #1a1a1e;
   color: #96ffc2;
   z-index: 2;

   a {
      color: #96ffc2;
      font-weight: bold;
      text-decoration: none;
      font-weight: 300;
      padding: 0 10px;
      line-height: 12vh;

      &.router-link-exact-active {
         color: #ffdc96;
      }
   }
}

@media (max-width: 320px) {
   #nav a {
      padding: 0 2px;
   }
}
</style>
