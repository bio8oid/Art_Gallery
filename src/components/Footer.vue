<template>
   <div class="footer">
      <div class="footer-site-map">
         <!-- <a v-for="item in this.siteMap" :key="item.name" v-bind:href="baseUrl + item.path">{{ item.name }}</a> -->
         <router-link v-for="item in this.siteMap" :key="item.name" :to="item.path">{{ item.name }}</router-link>

         <!-- <router-link to="/">Home</router-link> | <router-link to="/categories">Categories</router-link> |
         <router-link to="/random">Random</router-link> -->
      </div>

      <a class="footer-logo">bio8oid © {{ new Date().getFullYear() }}</a>
   </div>
</template>

<script>
import router from '../router/routes';

export default {
   name: 'Footer',

   data() {
      return {
         siteMap: [],
         baseUrl: 'https://a-r-t-gallery.netlify.app',
         // baseUrl: 'http://localhost:8080',
      };
   },

   watch: {
      $route: 'getRoutesList',
   },

   methods: {
      getRoutesList() {
         // Filter all routes from details path
         const allRoutes = router.options.routes.filter(x => !/\bdetails\b/g.test(x.path));
         let currentRoute = this.$route.path;
         // Remove current route from site map
         const filteredPaths = allRoutes.filter(x => x.path !== currentRoute);
         this.siteMap = filteredPaths;
      },
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
         padding: 20px;
         cursor: pointer;

         &:hover {
            font-weight: 500;
            color: #ffdc96;
         }
      }
   }
}
</style>
