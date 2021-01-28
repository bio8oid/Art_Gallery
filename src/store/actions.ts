import axios from 'axios';
import { defineActions } from 'direct-vuex';
import { moduleActionContext } from '.';
import { Id, Item, Router, Routes } from './types';
import router from '../router/routes';

export default defineActions({
   changeStoreLanguage(context) {
      const { state } = moduleActionContext(context, context);
      let language = '';
      state.language === 'nl' ? (language = 'en') : (language = 'nl');
      context.commit('CHANGE_LANGUAGE', language);
   },

   getRelatedItems(context) {
      const { state } = moduleActionContext(context, context);
      const shuffeledItems = state.items.sort(() => Math.random() - 0.5);
      const filtered = shuffeledItems.slice(0, 3);
      context.commit('SET_RELATED_ITEMS', filtered);
   },

   getRandom(context) {
      const { state } = moduleActionContext(context, context);
      const random = Math.floor(Math.random() * (state.items.length - 1) + 1);
      context.dispatch('fetchContent', state.itemsId[random]);
      window.scrollTo(0, 0);
   },

   handlePage(context, event: number) {
      const { state } = moduleActionContext(context, context);
      const dataset = state.items;
      const pageNumber = event;
      const offset = (pageNumber - 1) * state.recordsPerPage;
      const paginatedItems = dataset.slice(offset).slice(0, state.recordsPerPage);
      context.commit('SET_PAGINATED_ITEMS', paginatedItems);
   },

   reset(context) {
      context.commit('SET_RESET');
   },

   loadContent(context, routeData: string) {
      context.dispatch('getRelatedItems');
      context.dispatch('fetchContent', routeData);
      window.scrollTo(0, 0);
   },

   generateSiteMap(context) {
      const typedRouter = router as Router;

      // Remove "details" path from siteMap paths
      const typedRoutes = typedRouter.options.routes as Array<Routes>;
      const allRoutes = typedRoutes.filter(x => !/\bdetails\b/g.test(x.path as string) && x.path !== '*');

      let currentRoute = '';
      if (typedRouter.history !== undefined) {
         currentRoute = typedRouter.history.current.path;
      }

      // Remove current path from site map
      const filteredPaths = allRoutes.filter(x => x.path !== currentRoute);
      context.commit('SET_SITEMAP', filteredPaths);
   },

   sortItems(context, value: string) {
      const { state } = moduleActionContext(context, context);
      let sortedItems: Array<Item> = [];
      switch (value) {
         case 'z-a':
            sortedItems = state.paginatedItems.sort((a: Item, b: Item) => b.title.localeCompare(a.title));
            break;
         case 'a-z':
            sortedItems = state.paginatedItems.sort((a: Item, b: Item) => a.title.localeCompare(b.title));
            break;
         case 'newest':
            sortedItems = state.paginatedItems.sort(
               (a: Item, b: Item) => Number(b.longTitle.match(/\d{4}/)) - Number(a.longTitle.match(/\d{4}/))
            );
            break;
         case 'oldest':
            sortedItems = state.paginatedItems.sort(
               (a: Item, b: Item) => Number(a.longTitle.match(/\d{4}/)) - Number(b.longTitle.match(/\d{4}/))
            );
            break;
      }
      context.commit('SET_SORTED_ITEMS', sortedItems);
   },

   fetchContent(context, routeData: string) {
      const { state } = moduleActionContext(context, context);
      context.commit('SET_ERROR', '');
      context.commit('SET_LOADING_STATUS', true);

      let detailsRoute = '';
      let categoriesRoute = '';
      let recordsNumber = '';

      if (/\d/.test(routeData)) {
         detailsRoute = '/' + routeData;
         recordsNumber = '';
         context.commit('SET_ROUTE_DATA', detailsRoute);
      } else {
         recordsNumber = `&ps=${state.maxRecordsNumber}`;
         categoriesRoute = routeData;
         context.commit('SET_ROUTE_DATA', categoriesRoute);
         if (categoriesRoute !== '') context.commit('CHANGE_LANGUAGE', 'en');
      }

      const urlData = `https://www.rijksmuseum.nl/api/${state.language}/collection${detailsRoute}?key=${state.APIkey}${categoriesRoute}&imgonly=True${recordsNumber}`;

      axios
         .get(urlData)
         .then(res => {
            context.commit('SET_LOADING_STATUS', false);

            if (res.data.artObjects !== undefined) {
               const data = res.data.artObjects;
               context.commit('SET_ITEMS', data);
               context.commit('SET_PAGINATION_NUMBERS', data);
               context.commit(
                  'SET_ITEMS_ID',
                  data.map((x: Id) => x.objectNumber)
               );
            } else {
               context.commit('SET_SINGLE_ITEM', res.data.artObject);
            }
         })
         .catch(err => {
            context.commit('SET_LOADING_STATUS', false);
            context.commit('SET_ERROR', err);
         });
   },
});
