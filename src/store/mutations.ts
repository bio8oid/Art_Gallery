import { defineMutations } from 'direct-vuex';
import { StateTypes, Item } from './types';

export default defineMutations<StateTypes>()({
   SET_ITEMS(state, items: Array<Item>) {
      const firstPage = items.slice(0, state.recordsPerPage);
      state.paginatedItems = firstPage;
      state.items = items;
      localStorage.setItem('items', JSON.stringify(state.items));
   },

   SET_SINGLE_ITEM(state, singleItem: Array<object>) {
      state.singleItem = singleItem;
      localStorage.setItem('single-item', JSON.stringify(state.singleItem));
   },

   SET_ITEMS_ID(state, itemsId: Array<string>) {
      state.itemsId = itemsId;
      localStorage.setItem('items-id', JSON.stringify(state.itemsId));
   },

   CHANGE_LANGUAGE(state, language: string) {
      state.language = language;
      localStorage.setItem('language', JSON.stringify(state.language));
   },

   SET_PAGINATION_NUMBERS(state, items: Array<number>) {
      const pages = Math.ceil(items.length / state.recordsPerPage);
      const pageNumbers = Array.from({ length: pages }, (x, page) => ++page);
      state.paginationNumbers = pageNumbers;
   },

   SET_PAGINATED_ITEMS(state, paginatedItems: Array<Item>) {
      state.paginatedItems = paginatedItems;
   },

   SET_RELATED_ITEMS(state, filtered: Array<object>) {
      state.relatedItems = filtered;
   },

   SET_LOADING_STATUS(state, status: boolean) {
      state.loading = status;
   },

   SET_ERROR(state, err: string) {
      state.error = err;
   },

   SET_SITEMAP(state, siteMapData: Array<object>) {
      state.siteMap = siteMapData;
   },

   SET_ROUTE_DATA(state, routeData: string) {
      state.route = routeData;
   },

   SET_SORTED_ITEMS(state, sorted: Array<Item>) {
      state.paginatedItems = sorted;
   },

   SET_RESET(state) {
      state.paginationNumbers = [];
      state.paginatedItems = [];
   },
});
