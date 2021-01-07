export default {
   SET_ITEMS(state, items) {
      const firstPage = items.slice(0, state.recordsPerPage);
      state.paginatedItems = firstPage;
      state.items = items;
      localStorage.setItem('items', JSON.stringify(state.items));
   },

   SET_SINGLE_ITEM(state, singleItem) {
      state.singleItem = singleItem;
      localStorage.setItem('single-item', JSON.stringify(state.singleItem));
   },

   SET_ITEMS_ID(state, itemsId) {
      state.itemsId = itemsId;
      localStorage.setItem('items-id', JSON.stringify(state.itemsId));
   },

   CHANGE_LANGUAGE(state, language) {
      state.language = language;
      localStorage.setItem('language', JSON.stringify(state.language));
   },

   SET_PAGINATION_NUMBERS(state, items) {
      const pages = Math.ceil(items.length / state.recordsPerPage);
      const pageNumbers = Array.from({ length: pages }, (x, page) => ++page);
      state.paginationNumbers = pageNumbers;
   },

   SET_PAGINATED_ITEMS(state, paginatedItems) {
      state.paginatedItems = paginatedItems;
   },

   SET_RELATED_ITEMS(state, filtered) {
      state.relatedItems = filtered;
   },

   SET_LOADING_STATUS(state, status) {
      state.loading = status;
   },

   SET_ERROR(state, err) {
      state.err = err;
   },

   SET_RANDOM(state, random) {
      state.random = random;
   },

   SET_ROUTE_DATA(state, routeData) {
      state.route = routeData;
   },

   SET_SORTED_ITEMS(state, sorted) {
      state.paginatedItems = sorted;
   },

   SET_RESET(state) {
      state.paginationNumbers = [];
      state.paginatedItems = [];
   },
};
