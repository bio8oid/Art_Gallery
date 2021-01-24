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
import router from '../router/routes';
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
      //    getRoutesList(): void {
      //       // getRoutesList(): Array<object> {
      //       interface Router {
      //          options: Content;
      //          history?: Current;
      //       }

      //       interface Content {
      //          routes: Array<Routes>;
      //       }

      //       interface Routes {
      //          component?: object;
      //          name?: string;
      //          path?: string;
      //       }

      //       interface Current {
      //          current: Path;
      //       }

      //       interface Path {
      //          path: string;
      //       }

      //       const typedRouter = router as Router;

      //       // Remove "details" path from navigation routes
      //       const typedRoutes = typedRouter.options.routes as Array<Routes>;
      //       const allRoutes = typedRoutes.filter((x: Routes) => !/\bdetails\b/g.test(x.path as string));

      //       let currentRoute = '';
      //       if (typedRouter.history !== undefined) {
      //          currentRoute = typedRouter.history.current.path;
      //       }

      //       // Remove current path from site map
      //       const filteredPaths = allRoutes.filter((x: Routes) => x.path !== currentRoute);
      //       console.log('filteredPaths:', filteredPaths);
      //       store.dispatch.generateSiteMap(filteredPaths);
      //    },

      ...mapActions(['generateSiteMap']),
   },

   created() {
      // this.getRoutesList();
      // console.log('store.state.siteMa:', store.state.siteMap);
      store.dispatch.generateSiteMap();
      // store.dispatch.generateSiteMap(this.typedRouter.history.current.path);
   },
};
</script>

<style lang="scss">
/* <script lang="ts">
import router from '../router/routes';
// import store from '../store/indexTs';

interface Map {
   siteMap: Array<object>;
   logoLink: string;
}

export default {
   name: 'Footer',

   data() {
      return {
         siteMap: [],
         logoLink: 'https://github.com/bio8oid',
      };
   },

   watch: {
      $route: 'getRoutesList',
   },

   methods: {
      getRoutesList(): void {
         interface Router {
            options: Content;
            history?: Current;
         }

         interface Content {
            routes: Array<Routes>;
         }

         interface Routes {
            component?: object;
            name?: string;
            path?: string;
         }

         interface Current {
            current: Path;
         }

         interface Path {
            path: string;
         }

         // interface Map {
         //    siteMap: Array<Routes>;
         // }

         const typedRouter = router as Router;
         // console.log('typedRouter:', typedRouter);

         // Remove "details" path from navigation routes
         const typedRoutes = typedRouter.options.routes as Array<Routes>;
         const allRoutes = typedRoutes.filter((x: Routes) => !/\bdetails\b/g.test(x.path as string));
         // console.log('allRoutes:', allRoutes);

         let currentRoute = '';
         if (typedRouter.history !== undefined) {
            currentRoute = typedRouter.history.current.path;
            // console.log('currentRoute:', currentRoute);
            // Remove current path from site map
            // const map: Array<Routes> = filteredPaths;
         }
         const filteredPaths = allRoutes.filter((x: Routes) => x.path !== currentRoute);
         // console.log('filteredPaths:', filteredPaths);
         // const siteMap: Array<object> = filteredPaths;
         this.siteMap = filteredPaths;
      },
   },

   created() {
      this.getRoutesList();
   },
};
</script> */

/* <script>
import router from '../router/routes';

export default {
   name: 'Footer',

   data() {
      return {
         siteMap: [],
         logoLink: 'https://github.com/bio8oid',
      };
   },

   watch: {
      $route: 'getRoutesList',
   },

   methods: {
      getRoutesList() {
         // Filter all routes from details path
         const allRoutes = router.options.routes.filter(x => !/\bdetails\b/g.test(x.path));
         const currentRoute = this.$route.path;
         // Remove current route from site map
         const filteredPaths = allRoutes.filter(x => x.path !== currentRoute);
         const sitemap = filteredPaths;
         this.siteMap = sitemap;
      },
   },
   created() {
      this.getRoutesList();
   },
};
</script> */

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
