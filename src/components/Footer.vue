<template>
   <div class="footer">
      <div class="footer-site-map">
         <router-link v-for="item in this.$store.state.siteMap" :key="item.name" :to="item.path">{{
            item.name
         }}</router-link>
      </div>
      <a class="footer-logo" v-bind:href="logoLink" target="_blank">bio8oid © {{ new Date().getFullYear() }}</a>
   </div>
</template>

<script lang="ts">
import store from '../store/indexTs';
import { mapActions } from 'vuex';

export default {
   name: 'Footer',

   data() {
      return {
         logoLink: 'https://github.com/bio8oid',
      };
   },

   watch: {
      $route: 'generateSiteMap',
   },

   methods: {
      ...mapActions(['generateSiteMap']),
   },

   created() {
      store.dispatch.generateSiteMap();
   },
};
</script>

<style lang="scss">
.footer {
   height: 20vh;
   background: #020202;
   margin-top: 20vh;
   padding: 20px 0;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;

   .footer-site-map {
      a {
         color: #96ffc2;
         font-weight: bold;
         text-decoration: none;
         font-weight: 300;
         font-size: 16px;
         padding: 20px;
         cursor: pointer;

         &:hover {
            font-weight: 500;
            color: #ffdc96;
         }
      }
   }

   .footer-logo {
      text-decoration: none;
      color: #2c3e50;
      font-size: 16px;

      &:hover {
         color: #ffdc96;
      }
   }
}

@media (max-width: 320px) {
   .footer .footer-site-map a {
      padding: 10px;
   }
}
</style>
