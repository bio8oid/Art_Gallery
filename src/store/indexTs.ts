import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';
import { StateTypes } from './types';
// import { Id, StateTypes, Item, Router, Routes } from './types';
// import router from '../router/routes';
// import axios from 'axios';
import state from './state';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const { store, rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext } = createDirectStore({
   state: (): StateTypes => state,
   // // state,
   mutations,
   actions,

   // state: (): StateTypes => {
   //    return {
   //       items: JSON.parse(localStorage.getItem('items') as string) || [],
   //       itemsId: JSON.parse(localStorage.getItem('items-id') as string) || [],
   //       language: JSON.parse(localStorage.getItem('language') as string) || 'nl',
   //       singleItem: JSON.parse(localStorage.getItem('single-item') as string) || [],
   //       paginationNumbers: [],
   //       paginatedItems: [],
   //       relatedItems: [],
   //       siteMap: [],
   //       maxRecordsNumber: '30',
   //       recordsPerPage: 10,
   //       APIkey: 'iOQQBTgH',
   //       loading: false,
   //       error: '',
   //       route: '',
   //    };
   // },

   // mutations: {
   //    SET_ITEMS(state, items: Array<Item>) {
   //       const firstPage = items.slice(0, state.recordsPerPage);
   //       state.paginatedItems = firstPage;
   //       state.items = items;
   //       localStorage.setItem('items', JSON.stringify(state.items));
   //    },

   //    SET_SINGLE_ITEM(state, singleItem: Array<object>) {
   //       state.singleItem = singleItem;
   //       localStorage.setItem('single-item', JSON.stringify(state.singleItem));
   //    },

   //    SET_ITEMS_ID(state, itemsId: Array<string>) {
   //       state.itemsId = itemsId;
   //       localStorage.setItem('items-id', JSON.stringify(state.itemsId));
   //    },

   //    CHANGE_LANGUAGE(state, language: string) {
   //       state.language = language;
   //       localStorage.setItem('language', JSON.stringify(state.language));
   //    },

   //    SET_PAGINATION_NUMBERS(state, items: Array<number>) {
   //       const pages = Math.ceil(items.length / state.recordsPerPage);
   //       const pageNumbers = Array.from({ length: pages }, (x, page) => ++page);
   //       state.paginationNumbers = pageNumbers;
   //    },

   //    SET_PAGINATED_ITEMS(state, paginatedItems: Array<Item>) {
   //       state.paginatedItems = paginatedItems;
   //    },

   //    SET_RELATED_ITEMS(state, filtered: Array<object>) {
   //       state.relatedItems = filtered;
   //    },

   //    SET_LOADING_STATUS(state, status: boolean) {
   //       state.loading = status;
   //    },

   //    SET_ERROR(state, err: string) {
   //       state.error = err;
   //    },

   //    SET_SITEMAP(state, siteMapData: Array<object>) {
   //       state.siteMap = siteMapData;
   //    },

   //    SET_ROUTE_DATA(state, routeData: string) {
   //       state.route = routeData;
   //    },

   //    SET_SORTED_ITEMS(state, sorted: Array<Item>) {
   //       state.paginatedItems = sorted;
   //    },

   //    SET_RESET(state) {
   //       state.paginationNumbers = [];
   //       state.paginatedItems = [];
   //    },
   // },

   // actions: {
   //    changeStoreLanguage(context) {
   //       const { state } = rootActionContext(context);
   //       let language = '';
   //       state.language === 'nl' ? (language = 'en') : (language = 'nl');
   //       context.commit('CHANGE_LANGUAGE', language);
   //    },

   //    getRelatedItems(context) {
   //       const { state } = rootActionContext(context);
   //       const shuffeledItems = state.items.sort(() => Math.random() - 0.5);
   //       const filtered = shuffeledItems.slice(0, 3);
   //       context.commit('SET_RELATED_ITEMS', filtered);
   //    },

   //    getRandom(context) {
   //       const { state } = rootActionContext(context);
   //       const random = Math.floor(Math.random() * (state.items.length - 1) + 1);
   //       context.dispatch('fetchContent', state.itemsId[random]);
   //       window.scrollTo(0, 0);
   //    },

   //    handlePage(context, event: number) {
   //       const { state } = rootActionContext(context);
   //       const dataset = state.items;
   //       const pageNumber = event;
   //       const offset = (pageNumber - 1) * state.recordsPerPage;
   //       const paginatedItems = dataset.slice(offset).slice(0, state.recordsPerPage);
   //       context.commit('SET_PAGINATED_ITEMS', paginatedItems);
   //    },

   //    reset(context) {
   //       context.commit('SET_RESET');
   //    },

   //    loadContent(context, routeData: string) {
   //       context.dispatch('getRelatedItems');
   //       context.dispatch('fetchContent', routeData);
   //       window.scrollTo(0, 0);
   //    },

   //    generateSiteMap(context) {
   //       // interface Router {
   //       //    options: Content;
   //       //    history?: Current;
   //       // }

   //       // interface Content {
   //       //    routes: Array<Routes>;
   //       // }

   //       // interface Routes {
   //       //    component?: object;
   //       //    name?: string;
   //       //    path?: string;
   //       // }

   //       // interface Current {
   //       //    current: Path;
   //       // }

   //       // interface Path {
   //       //    path: string;
   //       // }

   //       const typedRouter = router as Router;

   //       // Remove "details" path from siteMap paths
   //       const typedRoutes = typedRouter.options.routes as Array<Routes>;
   //       const allRoutes = typedRoutes.filter(x => !/\bdetails\b/g.test(x.path as string));

   //       let currentRoute = '';
   //       if (typedRouter.history !== undefined) {
   //          currentRoute = typedRouter.history.current.path;
   //       }

   //       // Remove current path from site map
   //       const filteredPaths = allRoutes.filter(x => x.path !== currentRoute);
   //       context.commit('SET_SITEMAP', filteredPaths);
   //    },

   //    sortItems(context, value: string) {
   //       const { state } = rootActionContext(context);
   //       let sortedItems: Array<Item> = [];
   //       switch (value) {
   //          case 'z-a':
   //             sortedItems = state.paginatedItems.sort((a, b) => b.title.localeCompare(a.title));
   //             break;
   //          case 'a-z':
   //             sortedItems = state.paginatedItems.sort((a, b) => a.title.localeCompare(b.title));
   //             break;
   //          case 'newest':
   //             sortedItems = state.paginatedItems.sort(
   //                (a, b) => Number(b.longTitle.match(/\d{4}/)) - Number(a.longTitle.match(/\d{4}/))
   //             );
   //             break;
   //          case 'oldest':
   //             sortedItems = state.paginatedItems.sort(
   //                (a, b) => Number(a.longTitle.match(/\d{4}/)) - Number(b.longTitle.match(/\d{4}/))
   //             );
   //             break;
   //       }
   //       console.log('sortedItems:', sortedItems);
   //       context.commit('SET_SORTED_ITEMS', sortedItems);
   //    },

   //    fetchContent(context, routeData: string) {
   //       const { state } = rootActionContext(context);
   //       context.commit('SET_ERROR', '');
   //       context.commit('SET_LOADING_STATUS', true);

   //       let detailsRoute = '';
   //       let categoriesRoute = '';
   //       let recordsNumber = '';

   //       if (/\d/.test(routeData)) {
   //          detailsRoute = '/' + routeData;
   //          recordsNumber = '';
   //          context.commit('SET_ROUTE_DATA', detailsRoute);
   //       } else {
   //          recordsNumber = `&ps=${state.maxRecordsNumber}`;
   //          categoriesRoute = routeData;
   //          context.commit('SET_ROUTE_DATA', categoriesRoute);
   //          if (categoriesRoute !== '') context.commit('CHANGE_LANGUAGE', 'en');
   //       }

   //       const urlData = `https://www.rijksmuseum.nl/api/${state.language}/collection${detailsRoute}?key=${state.APIkey}${categoriesRoute}&imgonly=True${recordsNumber}`;
   //       // console.log('urlData:', urlData);

   //       axios
   //          .get(urlData)
   //          .then(res => {
   //             context.commit('SET_LOADING_STATUS', false);

   //             if (res.data.artObjects !== undefined) {
   //                const data = res.data.artObjects;
   //                context.commit('SET_ITEMS', data);
   //                context.commit('SET_PAGINATION_NUMBERS', data);

   //                // interface Id {
   //                //    objectNumber: string;
   //                // }

   //                context.commit(
   //                   'SET_ITEMS_ID',
   //                   data.map((x: Id) => x.objectNumber)
   //                );
   //             } else {
   //                context.commit('SET_SINGLE_ITEM', res.data.artObject);
   //             }
   //          })
   //          .catch(err => {
   //             context.commit('SET_LOADING_STATUS', false);
   //             context.commit('SET_ERROR', err);
   //          });
   //    },
   // },
}); // Export the direct-store instead of the classic Vuex store.

export default store; // The following exports will be used to enable types in the
// implementation of actions.
export { rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext };

export type AppStore = typeof store;

declare module 'vuex' {
   interface Store<S> {
      direct: AppStore;
   }
}
