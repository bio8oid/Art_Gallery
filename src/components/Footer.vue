<template>
   <div class="footer">
      <div class="footer-site-map">
         <router-link v-for="item in this.$store.state.siteMap" :key="item.name" :to="item.path">{{
            item.name
         }}</router-link>
      </div>
      <a class="footer-thanks" v-bind:href="museumLink" target="_blank" rel="noopener">Thanks to Rijks Museum</a>
      <a class="footer-logo" v-bind:href="logoLink" target="_blank">bio8oid © {{ new Date().getFullYear() }}</a>
   </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
   name: 'Footer',

   data() {
      return {
         logoLink: 'https://github.com/bio8oid',
         museumLink: 'https://www.rijksmuseum.nl/en',
      };
   },

   watch: {
      $route: 'generateSiteMap',
   },

   methods: {
      ...mapActions(['generateSiteMap']),
   },

   created() {
      this.generateSiteMap();
   },
};
</script>

<style lang="scss">
.footer {
   min-height: 20vh;
   background: #020202;
   margin-top: 20vh;
   padding: 50px 0;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;
   font-size: 18px;
   box-shadow: -5px -3px 10px #202327;

   .footer-site-map {
      a {
         color: #96ffc2;
         font-weight: bold;
         text-decoration: none;
         font-weight: 300;
         padding: 20px;
         cursor: pointer;

         &:hover {
            font-weight: 500;
            color: #ffdc96;
         }
      }
   }

   .footer-thanks {
      margin: 25px 0;
   }

   .footer-logo,
   .footer-thanks {
      text-decoration: none;
      color: #6a8199;
   }
}

@media (max-width: 320px) {
   .footer .footer-site-map a {
      padding: 10px;
   }
}
</style>
